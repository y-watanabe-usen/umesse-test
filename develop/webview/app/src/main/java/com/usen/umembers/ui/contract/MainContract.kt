package com.usen.umembers.ui.contract

import android.content.Intent
import android.view.View

interface MainContract {
    interface ActivityView: BaseContract.ActivityView {
        fun showHome()
        fun showWeather()
        fun showAnalytics(sub: Int)
        fun showCart()
        fun showSubsidy()
        fun showServiceMenu()
        fun showInfo()
        fun showBGM()
        fun showQuestion()
        fun showMyPage()
        fun reloadWebView()
        fun updateAuth()
        fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?)
    }
    interface ActivityInteractor: BaseContract.ActivityInteractor {
        fun onCreate()
        fun onResume()
        fun onBackStackChanged(menu: Int, service: Int)
        fun onMDMIntentReceive(intent: Intent?)
        fun onGlobalMenuClicked(menu: Int)
        fun onClickServiceInfo()
        fun onClickServiceBGM()
    }
}