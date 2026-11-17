package dz.cyberdefense.aegisnexus

import android.content.Context
import android.net.Uri
import android.provider.OpenableColumns
import org.json.JSONArray
import org.json.JSONObject
import java.nio.charset.StandardCharsets
import java.security.MessageDigest

class ThreatDetector(
    private val context: Context,
    private val repository: SecurityRepository,
    private val notifier: SecurityNotification
) {

    private val suspiciousIndicators = listOf(
        "su -c",
        "chmod 777",
        "Runtime.getRuntime().exec",
        "DexClassLoader",
        "android.permission.BIND_ACCESSIBILITY_SERVICE"
    )

    fun scanUri(uri: Uri): JSONObject {
        var fileName = "selected_file"
        var sizeBytes = 0L

        context.contentResolver.query(uri, null, null, null, null)?.use { cursor ->
            if (cursor.moveToFirst()) {
                val nameIdx = cursor.getColumnIndex(OpenableColumns.DISPLAY_NAME)
                val sizeIdx = cursor.getColumnIndex(OpenableColumns.SIZE)
                if (nameIdx >= 0) fileName = cursor.getString(nameIdx) ?: fileName
                if (sizeIdx >= 0) sizeBytes = cursor.getLong(sizeIdx)
            }
        }

        val digest = MessageDigest.getInstance("SHA-256")
        var headerBytes = ByteArray(0)
        val textPreviewBuffer = ByteArray(262144)
        var textPreviewLen = 0
        var actualReadTotal = 0L

        context.contentResolver.openInputStream(uri)?.use { input ->
            val buf = ByteArray(8192)
            while (true) {
                val read = input.read(buf)
                if (read <= 0) break
                digest.update(buf, 0, read)
                actualReadTotal += read

                if (headerBytes.isEmpty()) {
                    headerBytes = buf.copyOf(minOf(16, read))
                }
                if (textPreviewLen < textPreviewBuffer.size) {
                    val toCopy = minOf(read, textPreviewBuffer.size - textPreviewLen)
                    System.arraycopy(buf, 0, textPreviewBuffer, textPreviewLen, toCopy)
                    textPreviewLen += toCopy
                }
            }
        }

        if (sizeBytes <= 0L) sizeBytes = actualReadTotal

        val sha256 = digest.digest().joinToString("") { "%02x".format(it) }
        val magic = headerBytes.take(4).joinToString("") { "%02X".format(it) }
        val fileType = when {
            magic.startsWith("504B0304") -> "ZIP / Android APK Archive"
            magic.startsWith("7F454C46") -> "ELF Native Binary"
            magic.startsWith("6465780A") -> "Android DEX Bytecode"
            magic.startsWith("4D5A") -> "PE Executable"
            else -> "General Data / Document"
        }

        val evidence = mutableListOf<String>()
        var severity = "INFORMATIONAL"
        var verdict = "No known threat signature matched in local offline database."

        val dbMatch = repository.findThreatBySha256(sha256)
        if (dbMatch != null) {
            severity = dbMatch.optString("severity", "HIGH")
            val threatName = dbMatch.optString("name", "Known-Indicator")
            verdict = "Matched local threat signature: $threatName"
            evidence.add(dbMatch.optString("description", "Matched local signature database."))
        }

        val previewText = String(textPreviewBuffer, 0, textPreviewLen, StandardCharsets.UTF_8)
        val matchedStrings = suspiciousIndicators.filter { previewText.contains(it) }
        if (matchedStrings.isNotEmpty()) {
            if (severity == "INFORMATIONAL") severity = "MEDIUM"
            evidence.add("Suspicious code/permission indicators found: ${matchedStrings.joinToString(", ")}")
        }

        if (fileName.endsWith(".apk", ignoreCase = true) || magic.startsWith("504B0304")) {
            evidence.add("Archive/APK magic header verified ($magic). Review installer & permissions before installing.")
        }

        if (severity == "HIGH" || severity == "CRITICAL") {
            repository.logEvent(severity, "NEXUS_THREAT", "Threat Match: $fileName", "SHA-256: $sha256 | $verdict")
            notifier.sendAlert("Threat Detected: $fileName", verdict, severity)
        } else {
            repository.recordScan("FILE_SCAN", "$fileName ($sha256)", severity)
        }

        return JSONObject().apply {
            put("fileName", fileName)
            put("sizeBytes", sizeBytes)
            put("sha256", sha256)
            put("fileType", fileType)
            put("severity", severity)
            put("verdict", verdict)
            put("evidence", JSONArray(evidence.ifEmpty { listOf("Clean against local offline rules.") }))
        }
    }

    fun getDbInfo(): JSONObject {
        return JSONObject().apply {
            put("version", "2026.11-OFFLINE-CORE")
            put("signatureCount", repository.getThreatSignatureCount())
            put("offlineReady", true)
        }
    }
}
