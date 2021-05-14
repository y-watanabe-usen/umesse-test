package com.usen.umesse

import android.os.Bundle
import android.webkit.WebView
import androidx.appcompat.app.AppCompatActivity

class LauncherActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val webView: WebView = findViewById(R.id.webView)
        webView.loadUrl(R.string.launchUrl.toString())
    }

    override fun onDestroy() {
        super.onDestroy()
    }
}