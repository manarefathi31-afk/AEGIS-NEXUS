package dz.cyberdefense.aegisnexus

import android.Manifest
import android.annotation.SuppressLint
import android.app.Activity
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.net.VpnService
import android.os.Build
import android.os.Bundle
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.OnBackPressedCallback
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.biometric.BiometricManager
import androidx.biometric.BiometricPrompt
import androidx.core.content.ContextCompat
import androidx.webkit.WebViewAssetLoader
import org.json.JSONObject

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView
    private lateinit var securityManager: SecurityManager
    private var webFileChooserCallback: ValueCallback<Array<Uri>>? = null

    private val notificationPermLauncher = registerForActivityResult(
        ActivityResultContracts.RequestPermission()
    ) { _ -> }

    private val vpnPrepareLauncher = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) { result ->
        if (result.resultCode == Activity.RESULT_OK) {
            startService(Intent(this, AegisVpnService::class.java))
            securityManager.repository.logEvent("INFORMATIONAL", "NEXUS_NETWORK", "Local VPN Started", "User authorized local VPN shield.")
        }
        runOnUiThread {
            webView.evaluateJavascript("if (typeof checkNetwork === 'function') checkNetwork();", null)
        }
    }

    private val nativeFileScanLauncher = registerForActivityResult(
        ActivityResultContracts.OpenDocument()
    ) { uri ->
        if (uri != null) {
            Thread {
                val resultJson = securityManager.threatDetector.scanUri(uri).toString()
                val escaped = JSONObject.quote(resultJson)
                runOnUiThread {
                    webView.evaluateJavascript("window.onAegisNativeFileScanResult && window.onAegisNativeFileScanResult($escaped);", null)
                }
            }.start()
        }
    }

    private val webChooserLauncher = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) { result ->
        val callback = webFileChooserCallback
        webFileChooserCallback = null
        if (callback == null) return@registerForActivityResult
        val uris = WebChromeClient.FileChooserParams.parseResult(result.resultCode, result.data)
        callback.onReceiveValue(uris)
    }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        requestNotificationPermissionIfNeeded()

        webView = WebView(this)
        setContentView(webView)

        securityManager = SecurityManager(
            context = this,
            onVpnToggleRequested = { enable -> runOnUiThread { handleVpnToggle(enable) } },
            onFilePickerRequested = { runOnUiThread { nativeFileScanLauncher.launch(arrayOf("*/*")) } },
            onBiometricRequested = { runOnUiThread { launchBiometricPrompt() } }
        )

        val assetLoader = WebViewAssetLoader.Builder()
            .addPathHandler("/assets/", WebViewAssetLoader.AssetsPathHandler(this))
            .build()

        webView.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            allowFileAccess = false
            allowContentAccess = false
            mixedContentMode = WebSettings.MIXED_CONTENT_NEVER_ALLOW
            setSupportMultipleWindows(false)
            builtInZoomControls = false
            displayZoomControls = false
        }

        webView.webViewClient = object : WebViewClient() {
            override fun shouldInterceptRequest(
                view: WebView,
                request: WebResourceRequest
            ): WebResourceResponse? {
                return if (request.url.host == "appassets.androidplatform.net") {
                    assetLoader.shouldInterceptRequest(request.url)
                } else {
                    null
                }
            }

            override fun shouldOverrideUrlLoading(
                view: WebView,
                request: WebResourceRequest
            ): Boolean {
                // Block external untrusted navigation inside security WebView
                return request.url.host != "appassets.androidplatform.net"
            }
        }

        webView.webChromeClient = object : WebChromeClient() {
            override fun onShowFileChooser(
                webView: WebView,
                filePathCallback: ValueCallback<Array<Uri>>,
                fileChooserParams: FileChooserParams
            ): Boolean {
                webFileChooserCallback?.onReceiveValue(null)
                webFileChooserCallback = filePathCallback
                return try {
                    webChooserLauncher.launch(fileChooserParams.createIntent())
                    true
                } catch (_: Exception) {
                    webFileChooserCallback = null
                    false
                }
            }
        }

        webView.addJavascriptInterface(securityManager, "AegisNative")
        webView.loadUrl("https://appassets.androidplatform.net/assets/index.html")

        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (webView.canGoBack()) webView.goBack() else finish()
            }
        })
    }

    private fun handleVpnToggle(enable: Boolean) {
        if (!enable) {
            val stopIntent = Intent(this, AegisVpnService::class.java).apply {
                action = AegisVpnService.ACTION_STOP
            }
            startService(stopIntent)
            webView.evaluateJavascript("if (typeof checkNetwork === 'function') checkNetwork();", null)
            return
        }
        val prepareIntent = VpnService.prepare(this)
        if (prepareIntent != null) {
            vpnPrepareLauncher.launch(prepareIntent)
        } else {
            startService(Intent(this, AegisVpnService::class.java))
            webView.evaluateJavascript("if (typeof checkNetwork === 'function') checkNetwork();", null)
        }
    }

    private fun launchBiometricPrompt() {
        val authenticators = BiometricManager.Authenticators.BIOMETRIC_WEAK or
            BiometricManager.Authenticators.DEVICE_CREDENTIAL

        val canAuth = BiometricManager.from(this).canAuthenticate(authenticators)
        if (canAuth != BiometricManager.BIOMETRIC_SUCCESS) {
            sendBiometricResult(false, "Biometric / device credential unavailable on this device.")
            return
        }

        val executor = ContextCompat.getMainExecutor(this)
        val prompt = BiometricPrompt(
            this,
            executor,
            object : BiometricPrompt.AuthenticationCallback() {
                override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) {
                    sendBiometricResult(true, "Identity verified via Android BiometricPrompt.")
                }

                override fun onAuthenticationError(errorCode: Int, errString: CharSequence) {
                    sendBiometricResult(false, errString.toString())
                }

                override fun onAuthenticationFailed() {
                    sendBiometricResult(false, "Biometric verification failed.")
                }
            }
        )

        val info = BiometricPrompt.PromptInfo.Builder()
            .setTitle("AEGIS NEXUS")
            .setSubtitle("Algerian Cyber Defense — Identity Verification")
            .setAllowedAuthenticators(authenticators)
            .build()

        prompt.authenticate(info)
    }

    private fun sendBiometricResult(success: Boolean, message: String) {
        val quoted = JSONObject.quote(message)
        runOnUiThread {
            webView.evaluateJavascript("window.onAegisBiometricResult && window.onAegisBiometricResult($success, $quoted);", null)
        }
    }

    private fun requestNotificationPermissionIfNeeded() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            val granted = ContextCompat.checkSelfPermission(
                this,
                Manifest.permission.POST_NOTIFICATIONS
            ) == PackageManager.PERMISSION_GRANTED
            if (!granted) {
                notificationPermLauncher.launch(Manifest.permission.POST_NOTIFICATIONS)
            }
        }
    }
}
