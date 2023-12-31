package com.usen.umesse

import android.Manifest
import android.content.pm.PackageManager
import android.os.Bundle
import android.util.Log
import android.view.View
import android.webkit.*
import android.widget.LinearLayout
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.d(TAG, "onCreate.")

        setContentView(R.layout.activity_main)
        if (BuildConfig.DEBUG) {
            WebView.setWebContentsDebuggingEnabled(true);
        }

        webView = findViewById(R.id.webView)
        webView.also {
            it.settings.javaScriptEnabled = true
            it.settings.domStorageEnabled = true
            it.settings.userAgentString =
                it.settings.userAgentString + "USEN MESSAGE webview"
            it.settings.useWideViewPort = true
            it.settings.loadWithOverviewMode = true
            it.settings.cacheMode = WebSettings.LOAD_NO_CACHE
            it.settings.setAppCacheEnabled(false)
            it.webViewClient = object : WebViewClient() {
                override fun shouldOverrideUrlLoading(webView: WebView?, url: String?): Boolean {
                    return false
                }

                override fun onReceivedError(
                    view: WebView?,
                    errorCode: Int,
                    description: String?,
                    failingUrl: String?
                ) {
                    view?.visibility = View.GONE
                    findViewById<LinearLayout>(R.id.webViewError).visibility = View.VISIBLE
                }
            }
            it.webChromeClient = object : WebChromeClient() {
                override fun onPermissionRequest(request: PermissionRequest) {
                    request.grant(request.resources)
                }
            }
        }

        val url: String =
            BuildConfig.LAUNCH_URL + "?unisCustomerCd=${Application.localData.unisCustomerCd}&contractCd=${Application.localData.contractCd}"
        Log.d(TAG, "launch url: $url")
        webView.loadUrl(url)

        if (ActivityCompat.checkSelfPermission(
                applicationContext,
                Manifest.permission.RECORD_AUDIO
            ) != PackageManager.PERMISSION_GRANTED
        ) {
            requestPermissions(
                arrayOf(Manifest.permission.RECORD_AUDIO),
                REQUEST_CODE_INITIALIZE
            )
            return
        }
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
    }

    override fun onDestroy() {
        Log.d(TAG, "onDestroy.")
        webView.stopLoading()
        webView.webViewClient = null
        webView.webChromeClient = null
        webView.removeAllViews()
        webView.destroy()
        super.onDestroy()
    }

    override fun onBackPressed() {
        if (webView.canGoBack())
            webView.goBack()
        else
            super.onBackPressed()
    }

    companion object {
        private const val TAG = "MainActivity"
        private lateinit var webView: WebView
        private const val REQUEST_CODE_INITIALIZE = 100
    }
}