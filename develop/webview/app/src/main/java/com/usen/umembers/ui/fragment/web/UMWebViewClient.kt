package com.usen.umembers.ui.fragment.web

import android.graphics.Bitmap
import android.webkit.*
import java.util.HashMap

class UMWebViewClient(private val mCallback: WebCallback) : WebViewClient() {
    override fun onReceivedHttpAuthRequest(view: WebView, handler: HttpAuthHandler, host: String, realm: String) {
        when {
            host.contains(WebConstants.URL_STG_IOT) -> {
                handler.proceed(WebConstants.BASIC_IOT_USER_NAME, WebConstants.BASIC_IOT_USER_PASSWD)
            }
            host.contains(WebConstants.URL_STG_UCART) -> {
                handler.proceed(WebConstants.BASIC_UCART_USER_NAME, WebConstants.BASIC_UCART_USER_PASSWD)
            }
            else -> {
                handler.proceed(WebConstants.BASIC_USER_NAME, WebConstants.BASIC_PASSWORD)
            }
        }
    }

    override fun onReceivedError(
        view: WebView?,
        request: WebResourceRequest?,
        error: WebResourceError?
    ) {
        request ?: return
        error ?: return
        if (request.isForMainFrame) {
            mCallback.onReceivedError(request.url.toString(), error.errorCode)
        }
    }

    override fun onPageFinished(view: WebView?, url: String?) {
        view ?: return
        url ?: return
        mCallback.onPageFinished(view, url)
    }

    override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
        url ?: return
        mCallback.onPageStarted(url)
    }

    override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
        view ?: return super.shouldOverrideUrlLoading(view, request)
        request ?: return super.shouldOverrideUrlLoading(view, request)
        view.loadUrl(request.url.toString(), createHeader(view))
        return false
    }
    private fun createHeader(view: WebView): Map<String, String> {
        val list = view.copyBackForwardList()
        val builder = HashMap<String, String>()
        return builder

    }
}