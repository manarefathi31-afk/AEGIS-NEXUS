package dz.cyberdefense.aegisnexus

import android.Manifest
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import androidx.core.app.NotificationCompat
import androidx.core.content.ContextCompat

class SecurityNotification(private val context: Context) {

    private val manager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

    init {
        ensureChannels()
    }

    private fun ensureChannels() {
        val critical = NotificationChannel(
            CHANNEL_CRITICAL,
            "AEGIS NEXUS Critical Alerts",
            NotificationManager.IMPORTANCE_HIGH
        ).apply {
            description = "High and critical cybersecurity alerts from AEGIS NEXUS"
        }

        val general = NotificationChannel(
            CHANNEL_INFO,
            "AEGIS NEXUS Security Status",
            NotificationManager.IMPORTANCE_DEFAULT
        ).apply {
            description = "General security audit and monitoring notifications"
        }

        manager.createNotificationChannel(critical)
        manager.createNotificationChannel(general)
    }

    fun sendAlert(title: String, body: String, severity: String) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            val granted = ContextCompat.checkSelfPermission(
                context,
                Manifest.permission.POST_NOTIFICATIONS
            ) == PackageManager.PERMISSION_GRANTED
            if (!granted) return
        }

        val isHigh = severity.equals("CRITICAL", true) || severity.equals("HIGH", true)
        val channelId = if (isHigh) CHANNEL_CRITICAL else CHANNEL_INFO

        val intent = Intent(context, MainActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_SINGLE_TOP or Intent.FLAG_ACTIVITY_CLEAR_TOP
        }
        val pendingIntent = PendingIntent.getActivity(
            context,
            0,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )

        val notification = NotificationCompat.Builder(context, channelId)
            .setSmallIcon(R.drawable.ic_aegis_launcher)
            .setContentTitle("🇩🇿 $title")
            .setContentText(body)
            .setStyle(NotificationCompat.BigTextStyle().bigText(body))
            .setPriority(if (isHigh) NotificationCompat.PRIORITY_HIGH else NotificationCompat.PRIORITY_DEFAULT)
            .setContentIntent(pendingIntent)
            .setAutoCancel(true)
            .build()

        manager.notify((System.currentTimeMillis() % Int.MAX_VALUE).toInt(), notification)
    }

    companion object {
        const val CHANNEL_CRITICAL = "aegis_critical_alerts"
        const val CHANNEL_INFO = "aegis_info_alerts"
    }
}
