package dz.cyberdefense.aegisnexus

import android.content.ContentValues
import android.content.Context
import android.database.sqlite.SQLiteDatabase
import android.database.sqlite.SQLiteOpenHelper
import org.json.JSONArray
import org.json.JSONObject

class SecurityRepository(context: Context) : SQLiteOpenHelper(
    context.applicationContext,
    DATABASE_NAME,
    null,
    DATABASE_VERSION
) {

    override fun onCreate(db: SQLiteDatabase) {
        db.execSQL(
            """
            CREATE TABLE security_events (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp INTEGER NOT NULL,
                severity TEXT NOT NULL,
                module TEXT NOT NULL,
                title TEXT NOT NULL,
                detail TEXT NOT NULL
            )
            """.trimIndent()
        )

        db.execSQL(
            """
            CREATE TABLE threat_definitions (
                sha256 TEXT PRIMARY KEY,
                threat_name TEXT NOT NULL,
                severity TEXT NOT NULL,
                description TEXT NOT NULL,
                updated_at INTEGER NOT NULL
            )
            """.trimIndent()
        )

        db.execSQL(
            """
            CREATE TABLE scan_history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp INTEGER NOT NULL,
                scan_type TEXT NOT NULL,
                summary TEXT NOT NULL,
                status TEXT NOT NULL
            )
            """.trimIndent()
        )

        db.execSQL(
            """
            CREATE TABLE app_settings (
                setting_key TEXT PRIMARY KEY,
                setting_value TEXT NOT NULL
            )
            """.trimIndent()
        )

        seedOfflineThreatDefinitions(db)
    }

    override fun onUpgrade(db: SQLiteDatabase, oldVersion: Int, newVersion: Int) {
        db.execSQL("DROP TABLE IF EXISTS security_events")
        db.execSQL("DROP TABLE IF EXISTS threat_definitions")
        db.execSQL("DROP TABLE IF EXISTS scan_history")
        db.execSQL("DROP TABLE IF EXISTS app_settings")
        onCreate(db)
    }

    private fun seedOfflineThreatDefinitions(db: SQLiteDatabase) {
        val now = System.currentTimeMillis()
        val seeds = listOf(
            Triple(
                "275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f",
                "EICAR-Test-Signature",
                "HIGH"
            ) to "Standard antivirus verification signature matched locally."
        )

        for ((meta, desc) in seeds) {
            val cv = ContentValues().apply {
                put("sha256", meta.first)
                put("threat_name", meta.second)
                put("severity", meta.third)
                put("description", desc)
                put("updated_at", now)
            }
            db.insertWithOnConflict("threat_definitions", null, cv, SQLiteDatabase.CONFLICT_REPLACE)
        }
    }

    fun logEvent(severity: String, module: String, title: String, detail: String) {
        val cv = ContentValues().apply {
            put("timestamp", System.currentTimeMillis())
            put("severity", severity)
            put("module", module)
            put("title", title)
            put("detail", detail)
        }
        writableDatabase.insert("security_events", null, cv)
        writableDatabase.execSQL(
            "DELETE FROM security_events WHERE id NOT IN (SELECT id FROM security_events ORDER BY id DESC LIMIT 200)"
        )
    }

    fun getEventsJson(limit: Int = 100): JSONArray {
        val arr = JSONArray()
        readableDatabase.rawQuery(
            "SELECT id, timestamp, severity, module, title, detail FROM security_events ORDER BY id DESC LIMIT ?",
            arrayOf(limit.toString())
        ).use { cursor ->
            while (cursor.moveToNext()) {
                arr.put(
                    JSONObject().apply {
                        put("id", cursor.getLong(0))
                        put("timestamp", cursor.getLong(1))
                        put("severity", cursor.getString(2))
                        put("module", cursor.getString(3))
                        put("title", cursor.getString(4))
                        put("detail", cursor.getString(5))
                    }
                )
            }
        }
        return arr
    }

    fun clearEvents() {
        writableDatabase.delete("security_events", null, null)
    }

    fun recordScan(scanType: String, summary: String, status: String) {
        val cv = ContentValues().apply {
            put("timestamp", System.currentTimeMillis())
            put("scan_type", scanType)
            put("summary", summary)
            put("status", status)
        }
        writableDatabase.insert("scan_history", null, cv)
    }

    fun findThreatBySha256(sha256: String): JSONObject? {
        readableDatabase.rawQuery(
            "SELECT threat_name, severity, description, updated_at FROM threat_definitions WHERE sha256 = ? LIMIT 1",
            arrayOf(sha256.lowercase())
        ).use { cursor ->
            if (cursor.moveToFirst()) {
                return JSONObject().apply {
                    put("name", cursor.getString(0))
                    put("severity", cursor.getString(1))
                    put("description", cursor.getString(2))
                    put("updatedAt", cursor.getLong(3))
                }
            }
        }
        return null
    }

    fun getThreatSignatureCount(): Int {
        readableDatabase.rawQuery("SELECT COUNT(*) FROM threat_definitions", null).use { cursor ->
            return if (cursor.moveToFirst()) cursor.getInt(0) else 0
        }
    }

    fun putSetting(key: String, value: String) {
        val cv = ContentValues().apply {
            put("setting_key", key)
            put("setting_value", value)
        }
        writableDatabase.insertWithOnConflict("app_settings", null, cv, SQLiteDatabase.CONFLICT_REPLACE)
    }

    fun getSetting(key: String, defaultValue: String = ""): String {
        readableDatabase.rawQuery(
            "SELECT setting_value FROM app_settings WHERE setting_key = ? LIMIT 1",
            arrayOf(key)
        ).use { cursor ->
            if (cursor.moveToFirst()) return cursor.getString(0)
        }
        return defaultValue
    }

    companion object {
        private const val DATABASE_NAME = "aegis_nexus_secure.db"
        private const val DATABASE_VERSION = 1
    }
}
