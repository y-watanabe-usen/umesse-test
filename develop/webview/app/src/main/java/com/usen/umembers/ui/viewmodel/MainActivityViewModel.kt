package com.usen.umembers.ui.viewmodel

import android.content.Intent
import android.util.Log
import android.view.View
import androidx.databinding.ObservableBoolean
import androidx.databinding.ObservableField
import com.usen.umembers.app.UMApplication
import com.usen.umembers.data.Repository
import com.usen.umembers.ui.contract.MainContract
import com.usen.umembers.ui.fragment.web.WebConstants

class MainActivityViewModel(private val mView: MainContract.ActivityView, private val mRepository: Repository): MainContract.ActivityInteractor {
    val TAG = "MainActivityViewModel"
    val shopName = ObservableField<String>("マイページ")
    val shopImageAbsoluteUrl = ObservableField<String>()
    val isHomeChecked = ObservableBoolean(true)
    val isWeatherChecked = ObservableBoolean()
    val isAnalyticsChecked = ObservableBoolean()
    val isCartChecked = ObservableBoolean()
    val isSubsidyChecked = ObservableBoolean()
    val isServiceChecked = ObservableBoolean()
    val isQuestionChecked = ObservableBoolean()
    val isMyPageChecked = ObservableBoolean()

    var selectedMenu = MENU_HOME

    var selectedServiceMenu = SERVICE_NON
    val isShowServiceMenu = ObservableBoolean(false)

    override fun onCreate() {
        mView.showHome()
    }

    override fun onResume() {
    }

    override fun onBackStackChanged(menu: Int, service: Int) {
        changeState(menu, service)
    }
    override fun onMDMIntentReceive(intent: Intent?) {
        //FIXME : intent needs context. but this class shouldn't know context and intent.
        intent ?: return
        val extras = intent.getBundleExtra("extras")
        extras ?: return
        var cd = extras?.getString("unis_customer_cd")
        mRepository.unisCustomerCd = cd.toString()
        mView.updateAuth()
    }

    override fun onGlobalMenuClicked(menu: Int) {
        Log.e(TAG, "##### onGlobalMenuClicked")
        if (menu == MENU_HOME) {
            if (selectedMenu != MENU_HOME) {
                changeState(MENU_HOME, SERVICE_NON)
                mView.showHome()
            }

        } else if (menu == MENU_WEATHER) {
            if (selectedMenu != MENU_WEATHER) {
                changeState(MENU_WEATHER, SERVICE_NON)
                mView.showWeather()
            }
        } else if (menu == MENU_ANALYTICS) {
            if (selectedMenu != MENU_ANALYTICS) {
                changeState(MENU_ANALYTICS, SERVICE_NON)
                mView.showAnalytics(WebConstants.TAB_SUB_INVALID)
            }
        } else if (menu == MENU_CART) {
            if (selectedMenu != MENU_CART) {
                changeState(MENU_CART, SERVICE_NON)
                mView.showCart()
            }
        } else if (menu == MENU_SUBSIDY) {
            if (selectedMenu != MENU_SUBSIDY) {
                changeState(MENU_SUBSIDY, SERVICE_NON)
                mView.showSubsidy()
            }
        } else if (menu == MENU_SERVICE) {
            if (selectedMenu != MENU_SERVICE) {
                changeState(MENU_SUBSIDY, SERVICE_BGM)
                mView.showBGM()
            }
        } else if (menu == MENU_QUESTION) {
            if (selectedMenu != MENU_QUESTION) {
                changeState(MENU_QUESTION, SERVICE_NON)
                mView.showQuestion()
            }
        } else if (menu == MENU_MYPAGE) {
            if (selectedMenu != MENU_MYPAGE) {
                changeState(MENU_MYPAGE, SERVICE_NON)
                mView.showMyPage()
            }
        }
    }

    override fun onClickServiceInfo() {
        if (selectedServiceMenu != SERVICE_INFO) {
            changeState(MENU_SERVICE, SERVICE_INFO)
            mView.showInfo()
        }
    }

    override fun onClickServiceBGM() {
        if (selectedServiceMenu != SERVICE_BGM) {
            changeState(MENU_SERVICE, SERVICE_BGM)
            mView.showBGM()
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
    }

    private fun changeState(menu: Int, service: Int) {
        when (menu) {
            MENU_HOME-> {
                selectedMenu = MENU_HOME
                selectedServiceMenu = SERVICE_NON
                isHomeChecked.set(true)
                isWeatherChecked.set(false)
                isAnalyticsChecked.set(false)
                isCartChecked.set(false)
                isSubsidyChecked.set(false)
                isServiceChecked.set(false)
                isQuestionChecked.set(false)
                isMyPageChecked.set(false)
            }
            MENU_WEATHER-> {
                selectedMenu = MENU_WEATHER
                selectedServiceMenu = SERVICE_NON
                isHomeChecked.set(false)
                isWeatherChecked.set(true)
                isAnalyticsChecked.set(false)
                isCartChecked.set(false)
                isSubsidyChecked.set(false)
                isServiceChecked.set(false)
                isQuestionChecked.set(false)
                isMyPageChecked.set(false)
            }
            MENU_ANALYTICS-> {
                selectedMenu = MENU_ANALYTICS
                selectedServiceMenu = SERVICE_NON
                isHomeChecked.set(false)
                isWeatherChecked.set(false)
                isAnalyticsChecked.set(true)
                isCartChecked.set(false)
                isSubsidyChecked.set(false)
                isServiceChecked.set(false)
                isQuestionChecked.set(false)
                isMyPageChecked.set(false)
            }
            MENU_CART-> {
                selectedMenu = MENU_CART
                selectedServiceMenu = SERVICE_NON
                isHomeChecked.set(false)
                isWeatherChecked.set(false)
                isAnalyticsChecked.set(false)
                isCartChecked.set(true)
                isSubsidyChecked.set(false)
                isServiceChecked.set(false)
                isQuestionChecked.set(false)
                isMyPageChecked.set(false)
            }
            MENU_SUBSIDY-> {
                selectedMenu = MENU_SUBSIDY
                selectedServiceMenu = SERVICE_NON
                isHomeChecked.set(false)
                isWeatherChecked.set(false)
                isAnalyticsChecked.set(false)
                isCartChecked.set(false)
                isSubsidyChecked.set(true)
                isServiceChecked.set(false)
                isQuestionChecked.set(false)
                isMyPageChecked.set(false)
            }
            MENU_SERVICE-> {
                selectedMenu = MENU_SERVICE
                when (service) {
                    SERVICE_BGM-> {
                        selectedServiceMenu = SERVICE_BGM
                    }
                    SERVICE_INFO-> {
                        selectedServiceMenu = SERVICE_INFO
                    }
                    else-> {
                        selectedServiceMenu = SERVICE_NON
                    }
                }
                isHomeChecked.set(false)
                isWeatherChecked.set(false)
                isAnalyticsChecked.set(false)
                isCartChecked.set(false)
                isSubsidyChecked.set(false)
                isServiceChecked.set(true)
                isQuestionChecked.set(false)
                isMyPageChecked.set(false)
            }
            MENU_QUESTION-> {
                selectedMenu = MENU_QUESTION
                selectedServiceMenu = SERVICE_NON
                isHomeChecked.set(false)
                isWeatherChecked.set(false)
                isAnalyticsChecked.set(false)
                isCartChecked.set(false)
                isSubsidyChecked.set(false)
                isServiceChecked.set(false)
                isQuestionChecked.set(true)
                isMyPageChecked.set(false)
            }
            MENU_MYPAGE-> {
                selectedMenu = MENU_MYPAGE
                selectedServiceMenu = SERVICE_NON
                isHomeChecked.set(false)
                isWeatherChecked.set(false)
                isAnalyticsChecked.set(false)
                isCartChecked.set(false)
                isSubsidyChecked.set(false)
                isServiceChecked.set(false)
                isQuestionChecked.set(false)
                isMyPageChecked.set(true)
            }
        }
    }
    companion object {
        const val MENU_HOME = 0
        const val MENU_WEATHER = 1
        const val MENU_ANALYTICS = 2
        const val MENU_CART = 3
        const val MENU_SUBSIDY = 4
        const val MENU_SERVICE = 5
        const val MENU_QUESTION = 6
        const val MENU_MYPAGE = 7

        const val SERVICE_NON = -1
        const val SERVICE_INFO = 0
        const val SERVICE_BGM = 1
    }

}