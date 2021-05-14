package com.usen.umembers.ui.fragment

import com.usen.umembers.app.UMApplication
import com.usen.umembers.ui.activity.BaseActivity
import com.usen.umembers.ui.contract.BaseContract
import com.usen.umembers.ui.util.ApplicationError
import com.usen.umembers.ui.util.DialogUtils
import com.usen.umembers.ui.util.NotificationUtils

abstract class BaseFragment : androidx.fragment.app.Fragment(), BaseContract.FragmentView {
    private var isStateSavedFlg = false

    override fun getActivityModel(): Any? {
        return (activity as BaseActivity).getActivityModel()
    }

    private val isForeground: Boolean
        get() = UMApplication.isApplicationInForeground && isAdded && !isStateSavedFlg

    override fun showErrorDialog(error: ApplicationError, requestCode: Int) {
        if (isForeground) {
            DialogUtils.showErrorDialog(childFragmentManager, error, requestCode)
        } else {
            NotificationUtils.errorNotify(
                UMApplication.context,
                NotificationUtils.CHANNEL_ID_ERROR,
                error.getDescription(),
                requestCode
            )
        }
    }

    override fun showErrorDialog(description: String, requestCode: Int) {
        if (isForeground) {
            DialogUtils.showErrorDialog(childFragmentManager, description, requestCode)
        } else {
            NotificationUtils.errorNotify(
                UMApplication.context,
                NotificationUtils.CHANNEL_ID_ERROR,
                description,
                requestCode
            )
        }
    }

    override fun showProgressDialog() {
        if (activity != null) (activity as BaseActivity).showProgressDialog()
    }
    override fun showModelessProgressDialog() {
        if (activity != null) (activity as BaseActivity).showModelessProgressDialog()
    }

    override fun dismissProgressDialog() {
        if (activity != null) (activity as BaseActivity).dismissProgressDialog()
    }

    override fun dismissModelessProgressDialog() {
        if (activity != null) (activity as BaseActivity).dismissModelessProgressDialog()
    }

    override fun changeAppNativeTab(tab: Int, sub: Int, content: Int) {
        if (activity != null) (activity as BaseActivity).changeAppNativeTab(tab, sub, content)
    }

    override fun onResume() {
        super.onResume()
        isStateSavedFlg = false
    }

    override fun onPause() {
        super.onPause()
        isStateSavedFlg = true
    }
}