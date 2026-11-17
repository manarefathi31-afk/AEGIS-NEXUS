package dz.cyberdefense.aegisnexus

import android.app.KeyguardManager
import android.app.admin.DevicePolicyManager
import android.content.Context
import android.os.Build
import android.provider.Settings
import org.json.JSONArray
import org.json.JSONObject
import java.io.File
import java.time.LocalDate
import java.time.temporal.ChronoUnit

class DeviceSecurity(private val context: Context) {

    fun inspect(): JSONObject {
        val keyguard = context.getSystemService(Context.KEYGUARD_SERVICE) as? KeyguardManager
        val dpm = context.getSystemService(Context.DEVICE_POLICY_SERVICE) as? DevicePolicyManager

        val isDeviceSecure = keyguard?.isDeviceSecure ?: false
        val encCode = dpm?.storageEncryptionStatus ?: DevicePolicyManager.ENCRYPTION_STATUS_UNSUPPORTED
        val encryptionStatus = when (encCode) {
            DevicePolicyManager.ENCRYPTION_STATUS_ACTIVE,
            DevicePolicyManager.ENCRYPTION_STATUS_ACTIVE_PER_USER -> "ENCRYPTED"
            DevicePolicyManager.ENCRYPTION_STATUS_ACTIVE_DEFAULT_KEY -> "DEFAULT_KEY"
            DevicePolicyManager.ENCRYPTION_STATUS_INACTIVE -> "INACTIVE"
            else -> "UNAVAILABLE"
        }

        val adbEnabled = Settings.Global.getInt(
            context.contentResolver,
            Settings.Global.ADB_ENABLED,
            0
        ) == 1

        val devOptionsEnabled = Settings.Global.getInt(
            context.contentResolver,
            Settings.Global.DEVELOPMENT_SETTINGS_ENABLED,
            0
        ) == 1

        val securityPatch = Build.VERSION.SECURITY_PATCH ?: "Unknown"
        val patchRecent = isPatchWithinDays(securityPatch, 180)
        val suIndicator = hasSuBinaryIndicator()
        val releaseKeys = Build.TAGS?.contains("release-keys") == true

        val details = JSONArray()
        details.put(
            checkItem(
                "Screen Lock Security",
                isDeviceSecure,
                if (isDeviceSecure) "PIN, pattern, or password lock is active."
                else "No secure lock screen detected. Enable PIN/Biometric lock immediately."
            )
        )
        details.put(
            checkItem(
                "Storage Encryption",
                encryptionStatus == "ENCRYPTED",
                "Storage encryption status: $encryptionStatus"
            )
        )
        details.put(
            checkItem(
                "Android Security Patch",
                patchRecent != false,
                when (patchRecent) {
                    true -> "Patch level $securityPatch is within 180 days."
                    false -> "Patch level $securityPatch is older than 180 days. Check system updates."
                    null -> "Patch level reported as $securityPatch."
                }
            )
        )
        details.put(
            checkItem(
                "USB Debugging (ADB)",
                !adbEnabled,
                if (adbEnabled) "USB Debugging is enabled. Disable when not actively developing."
                else "USB Debugging is disabled."
            )
        )
        details.put(
            checkItem(
                "Developer Options",
                !devOptionsEnabled,
                if (devOptionsEnabled) "Developer options are enabled on this device."
                else "Developer options are disabled."
            )
        )
        details.put(
            checkItem(
                "System Build & Root Indicators",
                !suIndicator && releaseKeys,
                if (suIndicator || !releaseKeys) "Non-standard build tags or su binary indicator present (Build tags: ${Build.TAGS})."
                else "Official release-keys build with no standard su binary indicator."
            )
        )

        val state = when {
            !isDeviceSecure || encryptionStatus == "INACTIVE" -> "CRITICAL"
            adbEnabled || suIndicator || patchRecent == false -> "WARNING"
            else -> "PROTECTED"
        }

        val summary = "Android ${Build.VERSION.RELEASE} | Lock: ${if (isDeviceSecure) "ON" else "OFF"} | $encryptionStatus"

        return JSONObject().apply {
            put("state", state)
            put("summary", summary)
            put("manufacturer", Build.MANUFACTURER ?: "Android")
            put("model", Build.MODEL ?: "Device")
            put("androidVersion", Build.VERSION.RELEASE ?: "Unknown")
            put("sdkInt", Build.VERSION.SDK_INT)
            put("securityPatch", securityPatch)
            put("isDeviceSecure", isDeviceSecure)
            put("encryptionStatus", encryptionStatus)
            put("adbEnabled", adbEnabled)
            put("rootIndicator", suIndicator)
            put("details", details)
        }
    }

    private fun checkItem(title: String, ok: Boolean, message: String): JSONObject {
        return JSONObject().apply {
            put("title", title)
            put("ok", ok)
            put("message", message)
        }
    }

    private fun isPatchWithinDays(patchDate: String, maxDays: Long): Boolean? {
        return try {
            val parsed = LocalDate.parse(patchDate)
            val days = ChronoUnit.DAYS.between(parsed, LocalDate.now())
            days <= maxDays
        } catch (_: Exception) {
            null
        }
    }

    private fun hasSuBinaryIndicator(): Boolean {
        val paths = listOf(
            "/system/bin/su",
            "/system/xbin/su",
            "/sbin/su",
            "/vendor/bin/su",
            "/su/bin/su"
        )
        return paths.any { path ->
            try {
                File(path).exists()
            } catch (_: Exception) {
                false
            }
        }
    }
}
