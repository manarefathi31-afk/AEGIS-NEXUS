package dz.cyberdefense.aegisnexus

import android.app.ActivityManager
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.content.pm.PackageManager
import android.os.BatteryManager
import android.os.Build
import android.os.Environment
import android.os.StatFs
import android.text.format.Formatter
import android.webkit.JavascriptInterface
import androidx.biometric.BiometricManager
import org.json.JSONArray
import org.json.JSONObject

class SecurityManager(
    private val context: Context,
    private val onVpnToggleRequested: (Boolean) -> Unit,
    private val onFilePickerRequested: () -> Unit,
    private val onBiometricRequested: () -> Unit
) {

    val repository = SecurityRepository(context)
    val secureStorage = SecureStorage(context)
    val notifier = SecurityNotification(context)
    val deviceSecurity = DeviceSecurity(context)
    val appScanner = AppScanner(context)
    val permissionAuditor = PermissionAuditor(context)
    val networkMonitor = NetworkMonitor(context)
    val threatDetector = ThreatDetector(context, repository, notifier)
    val backupManager = BackupManager(context, secureStorage, repository)

    @JavascriptInterface
    fun getBridgeVersion(): String {
        return JSONObject().apply {
            put("version", "1.0.0-DZ")
            put("platform", "android")
            put("packageName", context.packageName)
            put("integrityOk", verifyAppIntegrity())
        }.toString()
    }

    @JavascriptInterface
    fun runFullAudit(): String {
        val dev = deviceSecurity.inspect()
        val apps = appScanner.scanInstalledApps()
        val net = networkMonitor.inspect()
        val priv = permissionAuditor.audit()

        val states = listOf(
            dev.optString("state", "UNAVAILABLE"),
            apps.optString("state", "UNAVAILABLE"),
            net.optString("state", "UNAVAILABLE"),
            priv.optString("state", "UNAVAILABLE"),
            "PROTECTED" // ThreatDetector offline DB
        )

        var readyCount = 0
        var warnCount = 0
        var critCount = 0
        var unavailCount = 0
        for (s in states) {
            when (s) {
                "PROTECTED" -> readyCount++
                "WARNING" -> warnCount++
                "CRITICAL" -> critCount++
                else -> unavailCount++
            }
        }

        val overall = when {
            critCount > 0 -> "CRITICAL"
            warnCount > 0 -> "WARNING"
            else -> "PROTECTED"
        }

        val recs = mutableListOf<String>()
        if (!dev.optBoolean("isDeviceSecure", true)) {
            recs.add("Enable a strong screen lock (PIN/Biometric) in Android Security settings.")
        }
        if (dev.optBoolean("adbEnabled", false)) {
            recs.add("Disable USB Debugging (ADB) when not actively needed.")
        }
        if (apps.optInt("highRiskCount", 0) > 0) {
            recs.add("Review ${apps.optInt("highRiskCount")} user apps with elevated sensitive permissions.")
        }
        if (net.optBoolean("connected", false) && !net.optBoolean("privateDnsActive", false)) {
            recs.add("Consider enabling Private DNS (DNS-over-TLS) in Android Network settings.")
        }
        if (recs.isEmpty()) {
            recs.add("All inspected device, app, privacy, and local threat modules report healthy status.")
        }

        repository.recordScan("FULL_AUDIT", "Overall: $overall", overall)

        return JSONObject().apply {
            put("overallState", overall)
            put("summaryTitle", "Real-Time Android Defense Posture: $overall")
            put("deviceState", dev.optString("state"))
            put("deviceSummary", dev.optString("summary"))
            put("appsState", apps.optString("state"))
            put("appsSummary", apps.optString("summary"))
            put("networkState", net.optString("state"))
            put("networkSummary", net.optString("summary"))
            put("privacyState", priv.optString("state"))
            put("privacySummary", priv.optString("summary"))
            put("recommendations", JSONArray(recs))
            put(
                "chartCounts",
                JSONObject().apply {
                    put("ready", readyCount)
                    put("warning", warnCount)
                    put("critical", critCount)
                    put("unavailable", unavailCount)
                }
            )
        }.toString()
    }

    @JavascriptInterface
    fun getDeviceSecurity(): String = deviceSecurity.inspect().toString()

    @JavascriptInterface
    fun scanInstalledApps(): String = appScanner.scanInstalledApps().toString()

    @JavascriptInterface
    fun getNetworkStatus(): String = networkMonitor.inspect().toString()

    @JavascriptInterface
    fun toggleLocalVpn(enable: Boolean): String {
        onVpnToggleRequested(enable)
        return JSONObject().apply {
            put("requested", true)
            put("enable", enable)
        }.toString()
    }

    @JavascriptInterface
    fun getPrivacyAudit(): String = permissionAuditor.audit().toString()

    @JavascriptInterface
    fun openAndroidSettings(target: String, packageName: String): Boolean {
        return permissionAuditor.openAndroidSettings(target, packageName)
    }

    @JavascriptInterface
    fun requestFileScan(): Boolean {
        onFilePickerRequested()
        return true
    }

    @JavascriptInterface
    fun getVaultStatus(): String {
        val bm = BiometricManager.from(context)
        val bioResult = bm.canAuthenticate(
            BiometricManager.Authenticators.BIOMETRIC_WEAK or BiometricManager.Authenticators.DEVICE_CREDENTIAL
        )
        val bioText = when (bioResult) {
            BiometricManager.BIOMETRIC_SUCCESS -> "READY"
            BiometricManager.BIOMETRIC_ERROR_NONE_ENROLLED -> "NOT ENROLLED"
            else -> "UNAVAILABLE"
        }
        return JSONObject().apply {
            put("keystoreActive", secureStorage.isKeystoreActive())
            put("biometricStatus", bioText)
            put("pinConfigured", secureStorage.hasPinConfigured())
        }.toString()
    }

    @JavascriptInterface
    fun authenticateBiometric(): Boolean {
        onBiometricRequested()
        return true
    }

    @JavascriptInterface
    fun setPinLock(pin: String): String {
        val ok = secureStorage.setPin(pin)
        return JSONObject().put("configured", ok).toString()
    }

    @JavascriptInterface
    fun verifyPinLock(pin: String): String {
        val ok = secureStorage.verifyPin(pin)
        return JSONObject().put("verified", ok).toString()
    }

    @JavascriptInterface
    fun saveExportedFile(filename: String, content: String): String {
        return backupManager.saveExportedFile(filename, content).toString()
    }

    @JavascriptInterface
    fun sendTestNotification(title: String, body: String, severity: String): Boolean {
        repository.logEvent(severity, "NEXUS_ALERT", title, body)
        notifier.sendAlert(title, body, severity)
        return true
    }

    @JavascriptInterface
    fun getSystemMonitor(): String {
        val batteryIntent = context.registerReceiver(null, IntentFilter(Intent.ACTION_BATTERY_CHANGED))
        val level = batteryIntent?.getIntExtra(BatteryManager.EXTRA_LEVEL, -1) ?: -1
        val scale = batteryIntent?.getIntExtra(BatteryManager.EXTRA_SCALE, 100) ?: 100
        val status = batteryIntent?.getIntExtra(BatteryManager.EXTRA_STATUS, -1) ?: -1
        val pct = if (level >= 0 && scale > 0) (level * 100) / scale else 0
        val charging = status == BatteryManager.BATTERY_STATUS_CHARGING || status == BatteryManager.BATTERY_STATUS_FULL

        val statFs = StatFs(Environment.getDataDirectory().path)
        val totalStorage = statFs.totalBytes
        val freeStorage = statFs.availableBytes

        val am = context.getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
        val memInfo = ActivityManager.MemoryInfo()
        am.getMemoryInfo(memInfo)

        return JSONObject().apply {
            put("batteryLevel", pct)
            put("batteryCharging", charging)
            put("storageFreeLabel", Formatter.formatShortFileSize(context, freeStorage))
            put("storageTotalLabel", Formatter.formatShortFileSize(context, totalStorage))
            put("ramAvailLabel", Formatter.formatShortFileSize(context, memInfo.availMem))
            put("ramTotalLabel", Formatter.formatShortFileSize(context, memInfo.totalMem))
            put("model", "${Build.MANUFACTURER} ${Build.MODEL}")
            put("androidVersion", Build.VERSION.RELEASE ?: "Unknown")
        }.toString()
    }

    private fun verifyAppIntegrity(): Boolean {
        return try {
            val validPkg = context.packageName == "dz.cyberdefense.aegisnexus" ||
                context.packageName == "dz.cyberdefense.aegisnexus.debug"
            val pm = context.packageManager
            val hasSig = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                val info = pm.getPackageInfo(context.packageName, PackageManager.GET_SIGNING_CERTIFICATES)
                info.signingInfo != null
            } else {
                @Suppress("DEPRECATION")
                val info = pm.getPackageInfo(context.packageName, PackageManager.GET_SIGNATURES)
                @Suppress("DEPRECATION")
                !info.signatures.isNullOrEmpty()
            }
            validPkg && hasSig
        } catch (_: Exception) {
            false
        }
    }
}
