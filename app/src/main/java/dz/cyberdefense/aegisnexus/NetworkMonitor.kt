package dz.cyberdefense.aegisnexus

import android.content.Context
import android.content.Intent
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import android.net.VpnService
import android.os.ParcelFileDescriptor
import org.json.JSONArray
import org.json.JSONObject
import java.io.FileInputStream

class NetworkMonitor(private val context: Context) {

    fun inspect(): JSONObject {
        val cm = context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        val activeNetwork = cm.activeNetwork
        val caps = if (activeNetwork != null) cm.getNetworkCapabilities(activeNetwork) else null
        val linkProps = if (activeNetwork != null) cm.getLinkProperties(activeNetwork) else null

        val connected = caps != null && caps.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
        val validated = caps != null && caps.hasCapability(NetworkCapabilities.NET_CAPABILITY_VALIDATED)
        val isVpnTransport = caps != null && caps.hasTransport(NetworkCapabilities.TRANSPORT_VPN)
        val localVpnRunning = AegisVpnService.isRunning

        val transport = when {
            caps == null -> "OFFLINE"
            caps.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) -> "WI-FI"
            caps.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR) -> "CELLULAR"
            caps.hasTransport(NetworkCapabilities.TRANSPORT_ETHERNET) -> "ETHERNET"
            isVpnTransport -> "VPN"
            else -> "OTHER"
        }

        val dnsServers = mutableListOf<String>()
        linkProps?.dnsServers?.forEach { addr ->
            addr.hostAddress?.let { dnsServers.add(it) }
        }

        val privateDnsActive = linkProps?.isPrivateDnsActive == true
        val recs = mutableListOf<String>()

        if (!connected) {
            recs.add("Device is currently offline. Offline-First protection remains active.")
        } else {
            if (transport == "WI-FI" && !privateDnsActive) {
                recs.add("Connected via Wi-Fi without Private DNS (DoT). Verify router trustworthiness or enable Private DNS.")
            }
            if (!validated) {
                recs.add("Network lacks validated internet capability (possible captive portal or restricted network).")
            }
            if (!isVpnTransport && !localVpnRunning) {
                recs.add("Local VPN defense is inactive. Enable only if desired for local traffic monitoring.")
            }
            if (recs.isEmpty()) {
                recs.add("Network capabilities and DNS configuration look healthy.")
            }
        }

        val state = when {
            !connected -> "PROTECTED"
            transport == "WI-FI" && !privateDnsActive && !localVpnRunning -> "WARNING"
            else -> "PROTECTED"
        }

        val summary = if (!connected) {
            "Offline Mode"
        } else {
            "$transport | DNS: ${dnsServers.firstOrNull() ?: "Unknown"} | VPN: ${if (localVpnRunning || isVpnTransport) "ON" else "OFF"}"
        }

        return JSONObject().apply {
            put("state", state)
            put("summary", summary)
            put("connected", connected)
            put("validated", validated)
            put("transport", transport)
            put("privateDnsActive", privateDnsActive)
            put("dnsServers", JSONArray(dnsServers))
            put("vpnActive", localVpnRunning || isVpnTransport)
            put("recommendations", JSONArray(recs))
        }
    }
}

class AegisVpnService : VpnService() {

    private var vpnInterface: ParcelFileDescriptor? = null
    @Volatile
    private var workerThread: Thread? = null

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        if (intent?.action == ACTION_STOP) {
            stopVpnSession()
            return START_NOT_STICKY
        }
        startVpnSession()
        return START_STICKY
    }

    private fun startVpnSession() {
        if (isRunning) return
        try {
            val builder = Builder()
                .setSession("AEGIS NEXUS Local Shield")
                .addAddress("10.111.222.1", 32)
                .addRoute("10.111.222.0", 24)
                .setMtu(1500)

            vpnInterface = builder.establish() ?: return
            isRunning = true

            val fd = vpnInterface?.fileDescriptor ?: return
            workerThread = Thread {
                val buffer = ByteArray(32767)
                try {
                    FileInputStream(fd).use { input ->
                        while (isRunning && !Thread.currentThread().isInterrupted) {
                            val len = input.read(buffer)
                            if (len <= 0) {
                                Thread.sleep(100)
                            }
                        }
                    }
                } catch (_: Exception) {
                }
            }.apply {
                name = "AegisLocalVpnLoop"
                start()
            }
        } catch (_: Exception) {
            stopVpnSession()
        }
    }

    private fun stopVpnSession() {
        isRunning = false
        workerThread?.interrupt()
        workerThread = null
        try {
            vpnInterface?.close()
        } catch (_: Exception) {
        }
        vpnInterface = null
        stopSelf()
    }

    override fun onDestroy() {
        stopVpnSession()
        super.onDestroy()
    }

    companion object {
        const val ACTION_STOP = "dz.cyberdefense.aegisnexus.STOP_VPN"
        @Volatile
        var isRunning: Boolean = false
            private set
    }
}
