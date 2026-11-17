package dz.cyberdefense.aegisnexus

import android.content.Context
import android.content.Intent
import android.content.pm.ApplicationInfo
import android.content.pm.PackageInfo
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.provider.Settings
import org.json.JSONArray
import org.json.JSONObject

class PermissionAuditor(private val context: Context) {

    private data class PermCategory(
        val id: String,
        val label: String,
        val permissions: Set<String>,
        val riskNote: String
    )

    private val categories = listOf(
        PermCategory(
            "camera",
            "Camera",
            setOf("android.permission.CAMERA"),
            "Apps granted access to capture photos or video."
        ),
        PermCategory(
            "microphone",
            "Microphone",
            setOf("android.permission.RECORD_AUDIO"),
            "Apps granted access to record audio."
        ),
        PermCategory(
            "location",
            "Location",
            setOf(
                "android.permission.ACCESS_FINE_LOCATION",
                "android.permission.ACCESS_COARSE_LOCATION",
                "android.permission.ACCESS_BACKGROUND_LOCATION"
            ),
            "Apps granted GPS or network location access."
        ),
        PermCategory(
            "contacts",
            "Contacts",
            setOf("android.permission.READ_CONTACTS", "android.permission.WRITE_CONTACTS"),
            "Apps granted access to your address book."
        ),
        PermCategory(
            "storage",
            "Storage & Media",
            setOf(
                "android.permission.READ_EXTERNAL_STORAGE",
                "android.permission.WRITE_EXTERNAL_STORAGE",
                "android.permission.READ_MEDIA_IMAGES",
                "android.permission.READ_MEDIA_VIDEO",
                "android.permission.MANAGE_EXTERNAL_STORAGE"
            ),
            "Apps granted access to shared files or media."
        ),
        PermCategory(
            "sms_phone",
            "SMS & Phone",
            setOf(
                "android.permission.READ_SMS",
                "android.permission.RECEIVE_SMS",
                "android.permission.SEND_SMS",
                "android.permission.READ_CALL_LOG",
                "android.permission.READ_PHONE_STATE"
            ),
            "Apps with sensitive telephony or SMS permissions."
        )
    )

    fun audit(): JSONObject {
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

        val counts = mutableMapOf<String, MutableList<String>>()
        categories.forEach { counts[it.id] = mutableListOf() }

        for (pkg in packages) {
            val appInfo = pkg.applicationInfo ?: continue
            if ((appInfo.flags and ApplicationInfo.FLAG_SYSTEM) != 0) continue
            if (pkg.packageName == context.packageName) continue

            val reqPerms = pkg.requestedPermissions ?: continue
            val reqFlags = pkg.requestedPermissionsFlags
            val label = try {
                pm.getApplicationLabel(appInfo).toString()
            } catch (_: Exception) {
                pkg.packageName
            }

            for (cat in categories) {
                var hasGranted = false
                for (i in reqPerms.indices) {
                    if (cat.permissions.contains(reqPerms[i])) {
                        val granted = reqFlags != null &&
                            i < reqFlags.size &&
                            (reqFlags[i] and PackageInfo.REQUESTED_PERMISSION_GRANTED) != 0
                        if (granted) {
                            hasGranted = true
                            break
                        }
                    }
                }
                if (hasGranted) counts[cat.id]?.add(label)
            }
        }

        val catArray = JSONArray()
        var highPrivacyExposure = 0
        for (cat in categories) {
            val appList = counts[cat.id] ?: emptyList()
            if (cat.id in setOf("camera", "microphone", "location", "sms_phone") && appList.size > 5) {
                highPrivacyExposure++
            }
            val preview = if (appList.isEmpty()) "None" else appList.take(4).joinToString(", ")
            catArray.put(
                JSONObject().apply {
                    put("id", cat.id)
                    put("label", cat.label)
                    put("count", appList.size)
                    put("apps", JSONArray(appList))
                    put("riskNote", "${cat.riskNote} Active apps: $preview")
                }
            )
        }

        val state = when {
            packages.isEmpty() -> "UNAVAILABLE"
            highPrivacyExposure > 0 -> "WARNING"
            else -> "PROTECTED"
        }

        return JSONObject().apply {
            put("state", state)
            put("summary", "6 privacy permission categories audited across user apps")
            put("categories", catArray)
        }
    }

    fun openAndroidSettings(target: String, packageName: String): Boolean {
        return try {
            val intent = when (target) {
                "APP_DETAILS" -> {
                    if (packageName.isNotBlank()) {
                        Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS).apply {
                            data = Uri.fromParts("package", packageName, null)
                        }
                    } else {
                        Intent(Settings.ACTION_MANAGE_ALL_APPLICATIONS_SETTINGS)
                    }
                }
                "SECURITY" -> Intent(Settings.ACTION_SECURITY_SETTINGS)
                else -> Intent(Settings.ACTION_PRIVACY_SETTINGS)
            }.apply {
                addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            }
            context.startActivity(intent)
            true
        } catch (_: Exception) {
            false
        }
    }
}
