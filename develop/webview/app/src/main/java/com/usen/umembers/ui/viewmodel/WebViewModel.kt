package com.usen.umembers.ui.viewmodel

import androidx.databinding.ObservableBoolean
import com.usen.umembers.data.Repository
import com.usen.umembers.ui.contract.WebContract

class WebViewModel(private val mView: WebContract.FragmentView, private val mRepository: Repository): WebContract.FragmentInteractor {
    val isShowWebView = ObservableBoolean(true)
    val isResponseError = ObservableBoolean(true)
    var currentUrl = ""
    override fun onClickReload() {
        mView.reloadView()
    }

    override fun onUpdateAuth() {
        //TODO:
        // ここの実装が必要なケースで
        // onPageFinished()が先にコールされている場合、
        // Web側には、既に空か保存済みのデータがいってしまう。
        // Web側で考慮するか、loadUrlコールする前にunisCustomerCdが取得済みの必要がある。
        // 現状MDMの方が取得完了が早いため問題ないが、シーケンス上は問題あり

        // ブロードキャストレシーバー受け取った時
        // mView.updateCustomerCd(mRepository.unisCustomerCd)
    }

    override fun onPageFinished() {
        //TODO:
        // ページ読み込み完了時で統一しないとWeb側でのハンドリングが出来ない
        mView.updateCustomerCd(mRepository.unisCustomerCd)
    }
}