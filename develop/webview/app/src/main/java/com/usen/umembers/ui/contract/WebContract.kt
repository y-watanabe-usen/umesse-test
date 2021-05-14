package com.usen.umembers.ui.contract

interface WebContract {
    interface FragmentView : BaseContract.FragmentView {
        fun reloadView()
        fun setResult()
        fun updateAuth()
        fun updateCustomerCd(cd: String?)
    }
    interface FragmentInteractor {
        fun onClickReload()
        fun onUpdateAuth()
        fun onPageFinished()
    }
}