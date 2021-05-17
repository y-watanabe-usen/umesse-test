package com.usen.umesse

import android.graphics.Bitmap
import android.os.Bundle
import android.util.Log
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity

class LauncherActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.d(TAG, "onCreate.")
        setContentView(R.layout.activity_main)

        val webView: WebView = findViewById(R.id.webView)
        if (BuildConfig.DEBUG) {
            WebView.setWebContentsDebuggingEnabled(true);
        }

        webView.settings.also {
            it.javaScriptEnabled = true
            it.javaScriptCanOpenWindowsAutomatically = true
            it.userAgentString =
                "${it.userAgentString} ${BuildConfig.APPLICATION_ID} ${BuildConfig.VERSION_NAME}"
            it.useWideViewPort = true
            it.loadWithOverviewMode = true
            it.textZoom = 100
            it.cacheMode = WebSettings.LOAD_NO_CACHE
        }

        object : WebViewClient() {
            override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
                Log.e(TAG, "onPageStarted.")
                Log.e(TAG, url)
                super.onPageStarted(view, url, favicon)
            }

            override fun onPageFinished(view: WebView?, url: String?) {
                Log.e(TAG, "onPageFinished.")
                Log.e(TAG, url)
                super.onPageFinished(view, url)
            }
        }.also { webView.webViewClient = it }

        webView.also {
            it.clearHistory()
            it.clearCache(true)
        }
        webView.loadUrl(BuildConfig.LAUNCH_URL + "?unisCustomerCd=${Application.localData!!.unisCustomerCd}")
    }

    override fun onDestroy() {
        Log.d(TAG, "onDestroy.")
        super.onDestroy()
    }

    companion object {
        private const val TAG = "LauncherActivity"
    }
}
