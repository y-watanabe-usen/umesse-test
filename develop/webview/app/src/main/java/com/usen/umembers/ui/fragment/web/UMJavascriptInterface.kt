package com.usen.umembers.ui.fragment.web

import android.webkit.JavascriptInterface

class UMJavascriptInterface(private val mCallback: WebCallback) {
    @JavascriptInterface
    fun showAppErrorMessage(code: String) {
        mCallback.showAppErrorMessage(code)
    }

    @JavascriptInterface
    fun showErrorMessage(code: String, Message: String) {
        mCallback.showErrorMessage(code, Message)
    }

    @JavascriptInterface
    fun reconnect() {
        mCallback.reconnect()
    }

    @JavascriptInterface
    fun changeAppNativeTab(tab: Int, sub: Int, content: Int) {
        mCallback.changeAppNativeTab(tab, sub, content)
    }
}