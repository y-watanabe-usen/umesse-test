package com.usen.umembers.ui.fragment.web

import android.webkit.JavascriptInterface
import android.webkit.WebView

interface WebCallback {
    // WebViewClient
    fun onPageFinished(view: WebView, url: String)

    fun onPageStarted(url: String)

    fun onReceivedError(url: String, errorCode: Int)

    // JavascriptInterface
    fun showAppErrorMessage(code: String)

    fun showErrorMessage(code: String, message: String)

    fun reconnect()

    fun changeAppNativeTab(tab: Int, sub: Int, content: Int)

}