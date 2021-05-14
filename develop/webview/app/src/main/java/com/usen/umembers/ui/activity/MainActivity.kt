package com.usen.umembers.ui.activity

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.os.Bundle
import android.util.Log
import androidx.appcompat.widget.PopupMenu
import androidx.databinding.DataBindingUtil
import com.google.gson.Gson
import com.usen.umembers.BuildConfig
import com.usen.umembers.R
import com.usen.umembers.databinding.ActivityMainBinding
import com.usen.umembers.app.UMApplication
import com.usen.umembers.data.remote.ApiResponse
import com.usen.umembers.data.remote.response.TokenAuth
import com.usen.umembers.ui.contract.MainContract
import com.usen.umembers.ui.fragment.BaseFragment
import com.usen.umembers.ui.fragment.HomeFragment
import com.usen.umembers.ui.fragment.web.WebConstants
import com.usen.umembers.ui.fragment.web.WebFragment
import com.usen.umembers.ui.util.FragmentUtils
import com.usen.umembers.ui.viewmodel.MainActivityViewModel
import com.usen.umembers.util.ClickUtils
import kotlinx.android.synthetic.main.activity_main_header.*


class MainActivity : BaseActivity(), MainContract.ActivityView {
    var receiver: BroadcastReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context?, intent: Intent?) {
            intent ?: return
            mModel.onMDMIntentReceive(intent)
        }
    }
    private var mIsReloadFlg = false
    private lateinit var mBinding: ActivityMainBinding
    private lateinit var mModel: MainActivityViewModel
    private lateinit var mActivity: MainActivity
    private var mPopupService: PopupMenu? = null
    private val backStackChangedListener = {
        val fm = supportFragmentManager
        val list = fm.fragments
        if (0 < list.size) {
            val f = list[list.size - 1]
            mModel.onBackStackChanged(getMenuId(f), getServiceId(f))
            if (f is BaseFragment) {
                val contentsF = supportFragmentManager.findFragmentById(mBinding.container.id)
                if (contentsF != null && contentsF is WebFragment && mIsReloadFlg) {
                    contentsF.reloadView()
                    mIsReloadFlg = false
                }
            }
            if (f is HomeFragment) {
                // all fragment stack clear
                supportFragmentManager.popBackStack(
                    null,
                    androidx.fragment.app.FragmentManager.POP_BACK_STACK_INCLUSIVE
                )
            }
        }
    }

    override fun getActivityModel(): Any? {
        return mModel
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        mActivity = this
        mBinding = DataBindingUtil.setContentView(this, R.layout.activity_main)
        mModel = MainActivityViewModel(this, UMApplication.repository)
        mBinding.viewModel = mModel
        mModel.onCreate()
        registerMdmReceiver()
//        if (savedInstanceState == null) {
//            replaceHomeFragment()
//        }
        supportFragmentManager.addOnBackStackChangedListener(backStackChangedListener)
        UMApplication.sendMDMBroadcast()
    }

    override fun onResume() {
        super.onResume()
        mModel.onResume()
    }

    override fun onPause() {
        super.onPause()
    }

    override fun onDestroy() {
        supportFragmentManager.removeOnBackStackChangedListener(backStackChangedListener)
        unregisterMdmReceiver()
        super.onDestroy()
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        val contentsF = supportFragmentManager.findFragmentById(mBinding.container.id)
        mModel.onActivityResult(requestCode, resultCode, data)
    }

    override fun onBackPressed() {
        val contentsF = supportFragmentManager.findFragmentById(mBinding.container.id)
        if (contentsF != null && contentsF is WebFragment) {
            if (!contentsF.onBackPressed()) {
                super.onBackPressed()
            }
        } else if (contentsF != null && 0 < contentsF.childFragmentManager.backStackEntryCount) {
            if (!ClickUtils.isPressTwice) {
                contentsF.childFragmentManager.popBackStack()
            }
        } else {
            if (!ClickUtils.isPressTwice) {
                super.onBackPressed()
            }
        }
    }

    override fun changeAppNativeTab(tab: Int, sub: Int, content: Int) {
        when (tab) {
            WebConstants.TAB_HOME -> {
                showHome()
            }
            WebConstants.TAB_WEATHER -> {
                showWeather()
            }
            WebConstants.TAB_ANALYTICS -> {
                //TODO: check sub, and show fragment
                showAnalytics(sub)
            }
            WebConstants.TAB_CART -> {
                showCart()
            }
            WebConstants.TAB_SUBSIDY -> {
                showSubsidy()
            }
            WebConstants.TAB_SERVICE -> {
                when (content) {
                    WebConstants.TAB_SERVICE_CONTENT_BGM -> {
                        showBGM()
                    }
                    WebConstants.TAB_SERVICE_CONTENT_INFO -> {
                        showInfo()
                    }
                }
            }
            WebConstants.TAB_QUESTION -> {
                showQuestion()
            }
            WebConstants.TAB_MYPAGE -> {
                showMyPage()
            }
        }
    }

    override fun showHome() {
        if (ClickUtils.isPressTwice) return
        replaceHomeFragment()
    }

    override fun showWeather() {
        addFragment(
            WebFragment.newInstance(
                BuildConfig.WEB_URL_UEYES,
                WebConstants.PATH_CALENDER,
                false
            ), WebFragment.TAG_WEATHER
        )
    }

    override fun showAnalytics(sub: Int) {
        addFragment(
            WebFragment.newInstance(
                BuildConfig.WEB_URL_UEYES,
                WebConstants.PATH_ANALYTICS,
                false
            ), WebFragment.TAG_ANALYTICS
        )
    }

    override fun showCart() {
        val unisCustomerCd = UMApplication.repository.unisCustomerCd
            ?: return showErrorDialog("顧客CDが取得できませんでした。\nお手数ですが、アプリを再起動してください。", 400)
        UMApplication.repository.tokenAuth(
            unisCustomerCd, object : ApiResponse<TokenAuth> {
                override fun onSuccess(response: TokenAuth) {
                    kotlin.runCatching {
                        response.token
                    }.onSuccess {
                        addFragment(
                            WebFragment.newInstance(
                                BuildConfig.WEB_URL_UCART,
                                "${WebConstants.PATH_UCART}?token=${it}",
                                false
                            ),
                            WebFragment.TAG_CART
                        )
                    }.onFailure {
                        Log.e(TAG, "onFailure showCart ${it.message}")
                        return showErrorDialog("認証に失敗しました。\nお手数ですが、アプリを再起動してください。", 500)
                    }
                }

                override fun onFailure(t: Throwable) {
                    Log.e(TAG, "onFailure showCart ${t.message}")
                    return showErrorDialog("認証に失敗しました。\nお手数ですが、アプリを再起動してください。", 500)
                }
            }
        )
    }

    override fun showSubsidy() {
        val list = ArrayList<String>()
        list.add(WebConstants.PARAM_USEN)
        addFragment(
            WebFragment.newInstance(
                BuildConfig.WEB_URL_SUBSIDY,
                WebConstants.PATH_SUBSIDY,
                list,
                false
            ), WebFragment.TAG_SUBSIDY
        )
    }

    override fun showServiceMenu() {
        if (mPopupService != null) {
            mPopupService?.dismiss()
            mPopupService = null
        } else {
            val popupMenu = PopupMenu(this, header_button_service)
            popupMenu.menuInflater.inflate(R.menu.popup_service, popupMenu.menu)
            mPopupService = popupMenu
            popupMenu.setOnMenuItemClickListener(PopupMenu.OnMenuItemClickListener { item ->
                mPopupService?.dismiss()
                mPopupService = null
                when (item.itemId) {
                    R.id.infoMenu -> mModel.onClickServiceInfo()
                    R.id.bgmMenu -> mModel.onClickServiceBGM()
                }
                true
            })
            popupMenu.show()
        }
    }

    override fun showInfo() {
        addFragment(
            WebFragment.newInstance(BuildConfig.WEB_URL_IOT, null, false),
            WebFragment.TAG_INFO
        )
    }

    override fun showBGM() {
        addFragment(
            WebFragment.newInstance(BuildConfig.WEB_URL_IOT, WebConstants.PATH_BGM, false),
            WebFragment.TAG_BGM
        )
    }

    override fun showQuestion() {
        val query = HashMap<String, String>()
        query[WebConstants.QUERY_PARAM_SITE_DOMAIN] = WebConstants.QUERY_VALUE_SITE_DOMAIN
        addFragment(
            WebFragment.newInstance(BuildConfig.WEB_URL_SUPPORT, null, query, false),
            WebFragment.TAG_QUESTION
        )
    }

    override fun showMyPage() {
        addFragment(
            WebFragment.newInstance(
                BuildConfig.WEB_URL_UEYES,
                WebConstants.PATH_MYPAGE,
                false
            ), WebFragment.TAG_MYPAGE
        )
    }

    override fun reloadWebView() {
        supportFragmentManager.fragments.forEach() { f ->
            if (f is WebFragment) {
                f.reloadView()
            }
        }
    }

    override fun updateAuth() {
        supportFragmentManager.fragments.forEach() { f ->
            if (f is WebFragment) {
                f.updateAuth()
            }
        }
    }

    private fun replaceHomeFragment() {
        if (mPopupService != null) {
            mPopupService?.dismiss()
            mPopupService = null
        }
        // all fragment stack clear
        supportFragmentManager.popBackStack(
            null,
            androidx.fragment.app.FragmentManager.POP_BACK_STACK_INCLUSIVE
        )
        FragmentUtils.replaceFragmentToArea(
            supportFragmentManager,
            WebFragment.newInstance(BuildConfig.WEB_URL_UEYES, null, false),
            R.id.container
        )
    }

    private fun addFragment(fragment: androidx.fragment.app.Fragment, tag: String) {
        // フラグメントがすでに存在する場合は一度削除して、Fragmentを先頭に移動させる。
        // BackStackは削除されないため、管理に気を付けること
        val f = supportFragmentManager.findFragmentByTag(tag)
        if (f != null) {
            val transaction = supportFragmentManager.beginTransaction()
            transaction.remove(f)
            transaction.commit()
        }
        FragmentUtils.addFragmentToBackStack(
            supportFragmentManager,
            fragment,
            R.id.container,
            tag,
            FragmentUtils.NON
        )
    }

    private fun getMenuId(fragment: androidx.fragment.app.Fragment): Int {
        when (fragment.tag) {
            mBinding.container.id.toString() -> {
                return MainActivityViewModel.MENU_HOME
            }
            WebFragment.TAG_WEATHER -> {
                return MainActivityViewModel.MENU_WEATHER
            }
            WebFragment.TAG_ANALYTICS -> {
                return MainActivityViewModel.MENU_ANALYTICS
            }
            WebFragment.TAG_CART -> {
                return MainActivityViewModel.MENU_CART
            }
            WebFragment.TAG_SUBSIDY -> {
                return MainActivityViewModel.MENU_SUBSIDY
            }
            WebFragment.TAG_BGM, WebFragment.TAG_INFO -> {
                return MainActivityViewModel.MENU_SERVICE
            }
            WebFragment.TAG_QUESTION -> {
                return MainActivityViewModel.MENU_QUESTION
            }
            WebFragment.TAG_MYPAGE -> {
                return MainActivityViewModel.MENU_MYPAGE
            }
            else -> {
                return MainActivityViewModel.MENU_HOME
            }
        }
    }

    private fun getServiceId(fragment: androidx.fragment.app.Fragment): Int {
        when (fragment.tag) {
            WebFragment.TAG_BGM -> {
                return MainActivityViewModel.SERVICE_BGM
            }
            WebFragment.TAG_INFO -> {
                return MainActivityViewModel.SERVICE_INFO
            }
            else -> {
                return MainActivityViewModel.SERVICE_NON
            }
        }
    }

    private fun registerMdmReceiver() {
        val filter = IntentFilter(getString(R.string.custom_action_response_usen_cd))
        registerReceiver(receiver, filter)
    }

    private fun unregisterMdmReceiver() {
        unregisterReceiver(receiver)
    }

    companion object {
        private const val TAG = "MainActivity"
    }
}