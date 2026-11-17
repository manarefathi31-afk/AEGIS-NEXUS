package dz.cyberdefense.aegisnexus

import android.content.Context
import android.content.pm.ApplicationInfo
import android.content.pm.PackageInfo
import android.content.pm.PackageManager
import android.os.Build
import org.json.JSONArray
import org.json.JSONObject

class AppScanner(private val context: Context) {

    private val sensitivePermissions = setOf(
        "android.permission.CAMERA",
        "android.permission.RECORD_AUDIO",
        "android.permission.ACCESS_FINE_LOCATION",
        "android.permission.ACCESS_BACKGROUND_LOCATION",
        "android.permission.READ_CONTACTS",
        "android.permission.READ_SMS",
        "android.permission.RECEIVE_SMS",
        "android.permission.SEND_SMS",
        "android.permission.READ_CALL_LOG",
        "android.permission.READ_PHONE_STATE",
        "android.permission.REQUEST_INSTALL_PACKAGES",
        "android.permission.SYSTEM_ALERT_WINDOW",
        "android.permission.BIND_ACCESSIBILITY_SERVICE"
    )

    private val trustedStores = setOf(
        "com.android.vending",
        "com.sec.android.app.samsungapps",
        "com.huawei.appmarket",
        "com.xiaomi.market",
        "com.oppo.market"
    )

    fun scanInstalledApps(): JSONObject {
        val pm = context.packageManager
        val packages: List<PackageInfo> = try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                pm.getInstalledPackages(PackageManager.PackageInfoFlags.of(PackageManager.GET_PERMISSIONS.toLong()))
            } else {
                @Suppress("DEPRECATION")
                pm.getInstalledPackages(PackageManager.GET_PERMISSIONS)
            }
        } catch (_: Exception) {
            emptyList()
        }

        val appsArray = JSONArray()
        var highCount = 0
        var sideloadedCount = 0
        var scannedCount = 0

        for (pkg in packages) {
            val appInfo = pkg.applicationInfo ?: continue
            // Focus audit on third-party user-installed applications
            if ((appInfo.flags and ApplicationInfo.FLAG_SYSTEM) != 0) continue
            if (pkg.packageName == context.packageName) continue

            scannedCount++
            val label = try {
                pm.getApplicationLabel(appInfo).toString()
            } catch (_: Exception) {
                pkg.packageName
            }

            val installer = getInstallerPackage(pm, pkg.packageName)
            val sideloaded = installer == null || !trustedStores.contains(installer)
            if (sideloaded) sideloadedCount++

            val grantedSensitive = mutableListOf<String>()
            val reqPerms = pkg.requestedPermissions
            val reqFlags = pkg.requestedPermissionsFlags
            if (reqPerms != null) {
                for (i in reqPerms.indices) {
                    val perm = reqPerms[i]
                    if (sensitivePermissions.contains(perm)) {
                        val isGranted = reqFlags != null &&
                            i < reqFlags.size &&
                            (reqFlags[i] and PackageInfo.REQUESTED_PERMISSION_GRANTED) != 0
                        if (isGranted) {
                            grantedSensitive.add(perm.substringAfterLast('.'))
                        }
                    }
                }
            }

            // Risk reflects permission surface & installation source indicators (never claims malware without proof)
            val riskLevel = when {
                (sideloaded && grantedSensitive.size >= 3) || grantedSensitive.size >= 5 -> {
                    highCount++
                    "HIGH"
                }
                sideloaded || grantedSensitive.size >= 2 -> "MEDIUM"
                else -> "LOW"
            }

            appsArray.put(
                JSONObject().apply {
                    put("name", label)
                    put("packageName", pkg.packageName)
                    put("versionName", pkg.versionName ?: "1.0")
                    put("installer", installer ?: "Sideloaded / Unknown")
                    put("sideloaded", sideloaded)
                    put("dangerousPermissions", JSONArray(grantedSensitive))
                    put("riskLevel", riskLevel)
                }
            )
        }

        val state = when {
            packages.isEmpty() -> "UNAVAILABLE"
            highCount > 0 -> "WARNING"
            else -> "PROTECTED"
        }

        val summary = if (packages.isEmpty()) {
            "Package list restricted by OS policy"
        } else {
            "$scannedCount user apps audited | $highCount elevated | $sideloadedCount non-store"
        }

        return JSONObject().apply {
            put("state", state)
            put("summary", summary)
            put("totalApps", scannedCount)
            put("highRiskCount", highCount)
            put("sideloadedCount", sideloadedCount)
            put("apps", appsArray)
        }
    }

    private fun getInstallerPackage(pm: PackageManager, packageName: String): String? {
        return try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                pm.getInstallSourceInfo(packageName).installingPackageName
            } else {
                @Suppress("DEPRECATION")
                pm.getInstallerPackageName(packageName)
            }
        } catch (_: Exception) {
            null
        }
    }
}
