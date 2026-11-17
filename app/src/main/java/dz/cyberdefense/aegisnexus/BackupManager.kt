package dz.cyberdefense.aegisnexus

import android.content.ContentValues
import android.content.Context
import android.os.Build
import android.os.Environment
import android.provider.MediaStore
import org.json.JSONObject
import java.io.File
import java.nio.charset.StandardCharsets

class BackupManager(
    private val context: Context,
    private val storage: SecureStorage,
    private val repository: SecurityRepository
) {

    fun saveExportedFile(rawFilename: String, content: String): JSONObject {
        val safeName = rawFilename
            .replace(Regex("[^a-zA-Z0-9._-]"), "_")
            .ifBlank { "aegis-export-${System.currentTimeMillis()}.json" }

        return try {
            val savedPath = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                val values = ContentValues().apply {
                    put(MediaStore.Downloads.DISPLAY_NAME, safeName)
                    put(MediaStore.Downloads.MIME_TYPE, "application/json")
                    put(MediaStore.Downloads.RELATIVE_PATH, Environment.DIRECTORY_DOWNLOADS + "/AEGIS_NEXUS")
                }
                val uri = context.contentResolver.insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, values)
                    ?: throw IllegalStateException("Unable to create download entry")
                context.contentResolver.openOutputStream(uri)?.use { out ->
                    out.write(content.toByteArray(StandardCharsets.UTF_8))
                } ?: throw IllegalStateException("Unable to open output stream")
                "Downloads/AEGIS_NEXUS/$safeName"
            } else {
                val dir = context.getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS) ?: context.filesDir
                val target = File(dir, safeName)
                target.writeText(content, StandardCharsets.UTF_8)
                target.absolutePath
            }

            val digest = storage.sha256(content)
            repository.logEvent("INFORMATIONAL", "NEXUS_RECOVERY", "File Exported", "$safeName (SHA-256: $digest)")

            JSONObject().apply {
                put("saved", true)
                put("path", savedPath)
                put("sha256", digest)
            }
        } catch (e: Exception) {
            JSONObject().apply {
                put("saved", false)
                put("error", e.message ?: "Export failed")
            }
        }
    }
}
