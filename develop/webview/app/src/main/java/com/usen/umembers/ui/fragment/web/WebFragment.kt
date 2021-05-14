package com.usen.umembers.ui.fragment.web

import android.annotation.SuppressLint
import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.text.TextUtils
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.webkit.WebSettings
import android.webkit.WebView
import androidx.databinding.DataBindingUtil
import androidx.databinding.ViewDataBinding
import com.usen.umembers.BuildConfig
import com.usen.umembers.R
import com.usen.umembers.app.UMApplication
import com.usen.umembers.databinding.FragmentWebBinding
import com.usen.umembers.ui.activity.BaseActivity
import com.usen.umembers.ui.activity.MainActivity
import com.usen.umembers.ui.contract.WebContract
import com.usen.umembers.ui.fragment.BaseFragment
import com.usen.umembers.ui.util.ApplicationError
import com.usen.umembers.ui.viewmodel.WebViewModel
import com.usen.umembers.util.SystemErrorCategory

class WebFragment : BaseFragment(), WebCallback, WebContract.FragmentView {
    private val mHandler = Handler(Looper.getMainLooper())

    private lateinit var mBinding: FragmentWebBinding
    private lateinit var mModel: WebViewModel

    var mIsReloadClose = false

    private val DISCONEECT_ERROR_HTML = "file:///android_asset/html/disconnecterror.html"

    override fun getActivityModel(): Any? {
        return null
    }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        mBinding = DataBindingUtil.inflate(inflater, R.layout.fragment_web, container, false)
        // TODO デバッグ用  chrome://inspect
        if (BuildConfig.DEBUG) {
            WebView.setWebContentsDebuggingEnabled(true);
        }
        mBinding.webView.settings.javaScriptEnabled = true
        mBinding.webView.settings.userAgentString =
            mBinding.webView.settings.userAgentString + USERAGENT
        mBinding.webView.settings.useWideViewPort = true
        mBinding.webView.settings.loadWithOverviewMode = true
        mBinding.webView.settings.textZoom = 100
        mBinding.webView.addJavascriptInterface(UMJavascriptInterface(this), JAVASCRIPT_NAME)
        mBinding.webView.setInitialScale(1)
        mBinding.webView.webViewClient = UMWebViewClient(this)
        mBinding.errorWebView.settings.javaScriptEnabled = true
        mBinding.errorWebView.settings.useWideViewPort = true
        mBinding.errorWebView.settings.loadWithOverviewMode = true
        mBinding.errorWebView.addJavascriptInterface(UMJavascriptInterface(this), JAVASCRIPT_NAME)
        mBinding.errorWebView.setInitialScale(1)
        mBinding.errorWebView.webViewClient = UMWebViewClient(this)
        mModel = WebViewModel(this, UMApplication.repository)
        if (arguments != null) {
            // argumentsからデータを取得しモデルに設定する
        }
        mModel.isResponseError.set(false)
        mBinding.viewModel = mModel
        mBinding.webView.settings.cacheMode = WebSettings.LOAD_NO_CACHE
        mBinding.webView.clearHistory()
        mBinding.webView.clearCache(true)
        return (mBinding as ViewDataBinding).root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        val args = arguments
        args ?: return
        val host = args.getString(ARG_HOST)
        val path = args.getString(ARG_PATH)
        val query = HashMap<String, String>()
        val list = args.getStringArrayList(ARG_LIST)
        host ?: return
        val url: String
        //FIXME
        if (list != null && list.isNotEmpty()) {
            url = createUri(host, path, list)
        } else {
            if (args.keySet().size > 0) {
                for (key in args.keySet()) {
                    if (ARG_HOST != key && ARG_PATH != key && ARG_IS_AUTH != key && ARG_LIST != key) {
                        query[key] = args.getString(key, "")
                    }
                }
            }
            url = createUri(host, path, query).toString()
        }
        mBinding.webView.loadUrl(url, createHeader())
        mBinding.errorWebView.loadUrl(DISCONEECT_ERROR_HTML);
        //TODO:argsから必要な値を取得してmModelに設定
        mBinding.viewModel?.isShowWebView?.set(true)
        mBinding.viewModel?.isResponseError?.set(false)
    }
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (Activity.RESULT_OK == resultCode) {
            when (requestCode) {
            }
        } else if (Activity.RESULT_CANCELED == resultCode) {
            when (requestCode) {
            }
        } else if (RESULT_CODE_RELOAD == resultCode) {
            when (requestCode) {
                else -> {
                    mIsReloadClose = true
                }
            }
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        (activity as BaseActivity).isLoading = false
        mBinding.webView.stopLoading()
        mBinding.webView.webViewClient = null
        mBinding.webView.webChromeClient = null
        mBinding.webView.removeAllViews()
        mBinding.webView.destroy()
        mBinding.errorWebView.stopLoading()
        mBinding.errorWebView.removeAllViews()
        mBinding.errorWebView.destroy()
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        // 前回の情報を保存しておく場合ここで保存
//        outState.putInt(xxx, xxx)
    }
    @Synchronized
    override fun onPageFinished(view: WebView, url: String) {
        mModel.isShowWebView.set(!mModel.isResponseError.get())
        mModel.currentUrl = url

        (activity as BaseActivity).isLoading = false

        mModel.onPageFinished()

        dismissProgressDialog()

        if (mIsReloadClose) {
            (activity as MainActivity).supportFragmentManager.popBackStack()
            mIsReloadClose = false
        }
    }

    @Synchronized
    override fun onPageStarted(url: String) {
        if (TextUtils.equals(DISCONEECT_ERROR_HTML, url)) return
        mModel.isResponseError.set(false)
        showModelessProgressDialog()
        if (activity is BaseActivity) {
            (activity as BaseActivity).isLoading = true
        }
    }

    override fun onReceivedError(url: String, errorCode: Int) {
        mModel.isResponseError.set(true)
        dismissProgressDialog()
        if (activity is BaseActivity) {
            (activity as BaseActivity).isLoading = false
        }

        if (mIsReloadClose) {
            (activity as MainActivity).supportFragmentManager.popBackStack()
            mIsReloadClose = false
        }
    }

    override fun reloadView() {
        val args = arguments
        args ?: return
        val host = args.getString(ARG_HOST)
        val path = args.getString(ARG_PATH)
        val query = HashMap<String, String>()
        val list = args.getStringArrayList(ARG_LIST)
        host ?: return
        val url: String
        //FIXME
        if (list != null && list.isNotEmpty()) {
            url = createUri(host, path, list)
        } else {
            if (args.keySet().size > 0) {
                for (key in args.keySet()) {
                    if (ARG_HOST != key && ARG_PATH != key && ARG_IS_AUTH != key && ARG_LIST != key) {
                        query[key] = args.getString(key, "")
                    }
                }
            }
            url = createUri(host, path, query).toString()
        }
        mBinding.webView.loadUrl(url, createHeader())
        mBinding.errorWebView.loadUrl(DISCONEECT_ERROR_HTML);
        //TODO:argsから必要な値を取得してmModelに設定
        mBinding.viewModel?.isShowWebView?.set(true)
        mBinding.viewModel?.isResponseError?.set(false)
    }

    override fun setResult() {
        TODO("Not yet implemented")
    }

    override fun showAppErrorMessage(code: String) {
        val error = ApplicationError.ERROR_DEFAULT
        this.showErrorDialog(error, SystemErrorCategory.ERROR_NORMAL.category)
    }

    override fun showErrorMessage(code: String, message: String) {
        val description = UMApplication.context.getString(R.string.error_message, message, code)
        showErrorDialog(description, SystemErrorCategory.ERROR_NORMAL.category)
    }

    override fun reconnect() {
        mHandler.post {
            reloadView()
        }
    }
    override fun updateAuth() {
        mModel.onUpdateAuth()
    }

    override fun updateCustomerCd(cd: String?) {
        if (activity != null && !(activity as BaseActivity).isLoading) {
            if (mModel.currentUrl.contains(BuildConfig.WEB_URL_UEYES)) {
                mBinding.webView.loadUrl("javascript:setParams(${cd ?: ""});")
            }
        }
    }
    fun onBackPressed(): Boolean {
        if (mBinding.webView.canGoBack()) {
            mBinding.webView.goBack()
            return true
        } else {
            return false
        }
    }
    private fun createUri(host: String, path: String?, query: HashMap<String, String>?): Uri.Builder {
        val builder = getPageUrl(host, path, query)
        //TODO argumentからデータを取得して設定
        return builder
    }
    private fun createUri(host: String, path: String?, params: ArrayList<String>?): String {
        val builder = getPageUrl(host, path, null)
        var uri = builder.toString()
        params ?: return uri
        if (params.isNotEmpty()) {
            uri += "?"
        }
        for (p in params) {
            //FIXME :
            uri += p
            if (p != params.last()) {
                uri += "&"
            }
        }
        //TODO argumentからデータを取得して設定するなど
        return uri
    }
    private fun createHeader(): Map<String, String> {
        val builder = HashMap<String, String>()
        builder[HEADER_KEY_SV] = "umembersaccess20200821"
        //TODO:SharedPreference
        return builder
    }

    private fun getPageUrl(host: String, path: String?, query: HashMap<String, String>?): Uri.Builder {
        val protocol = if (host.contains(WebConstants.URL_STG_UCART)) HTTP_PROTOCOL else HTTPS_PROTOCOL
        val builder = Uri.Builder().scheme(protocol).authority(host).path(path)
        query?.let { q->
            q.forEach { (k, v) ->
                builder.appendQueryParameter(k, v)
            }
        }
        Log.e(TAG, builder.toString())
        return builder
    }
    companion object {
        private val ARG_PATH = "path"
        private val ARG_HOST = "host"
        private val ARG_LIST = "list"
        private val ARG_IS_AUTH = "is_auth"
//        private val ARG_IS_NOT_EXECUTABLE_GO_BACK = "not_executable_go_back"
        val TAG = "WebFragment"
        val TAG_WEATHER = "tag_weather"
        val TAG_ANALYTICS = "tag_analytics"
        val TAG_CART = "tag_cart"
        val TAG_SUBSIDY = "tag_subsidy"
        val TAG_BGM = "tag_bgm"
        val TAG_INFO = "tag_info"
        val TAG_QUESTION = "tag_question"
        val TAG_MYPAGE = "tag_mypage"

        // Webに組み込むJSのスキーマ
        private val JAVASCRIPT_NAME = "UMNative"

        private val HTTP_PROTOCOL = "http"
        private val HTTPS_PROTOCOL = "https"
        private val USERAGENT = "umembers request"
        private val RESULT_CODE_RELOAD = 3
        private val HEADER_KEY_SV = "x-umembers-sv"
        fun newInstance(host: String, path: String?, isAuth: Boolean): WebFragment {
            val fragment = WebFragment()
            val args = Bundle()
            args.putString(ARG_HOST, host)
            args.putString(ARG_PATH, path)
            args.putBoolean(ARG_IS_AUTH, isAuth)
            fragment.arguments = args
            return fragment
        }

        fun newInstance(host: String, path: String?, query: HashMap<String, String>, isAuth: Boolean): WebFragment {
            val fragment = WebFragment()
            val args = Bundle()
            args.putString(ARG_HOST, host)
            args.putString(ARG_PATH, path)
            query.forEach() { k, v ->
                args.putString(k, v)
            }
            args.putBoolean(ARG_IS_AUTH, isAuth)
            fragment.arguments = args
            return fragment
        }
        fun newInstance(host: String, path: String?, params: ArrayList<String>, isAuth: Boolean): WebFragment {
            val fragment = WebFragment()
            val args = Bundle()
            args.putString(ARG_HOST, host)
            args.putString(ARG_PATH, path)
            args.putStringArrayList(ARG_LIST, params)
            args.putBoolean(ARG_IS_AUTH, isAuth)
            fragment.arguments = args
            return fragment
        }
    }
}