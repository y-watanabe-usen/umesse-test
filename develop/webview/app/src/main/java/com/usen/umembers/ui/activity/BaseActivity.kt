package com.usen.umembers.ui.activity

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.PersistableBundle
import com.usen.umembers.app.UMApplication
import com.usen.umembers.ui.contract.BaseContract
import com.usen.umembers.ui.fragment.dialog.ModelessProgressDialog
import com.usen.umembers.ui.fragment.dialog.ProgressDialog
import com.usen.umembers.ui.util.ApplicationError
import com.usen.umembers.ui.util.DialogUtils
import com.usen.umembers.ui.util.NotificationUtils

abstract class BaseActivity : AppCompatActivity(), BaseContract.ActivityView {
    private var isStateSavedFlg = false
    var isLoading = false
    private val isForeground: Boolean
        get() = UMApplication.isApplicationInForeground && !isStateSavedFlg

    abstract fun getActivityModel(): Any?

    override fun onCreate(savedInstanceState: Bundle?, persistentState: PersistableBundle?) {
        super.onCreate(savedInstanceState, persistentState)
    }

    override fun showErrorDialog(error: ApplicationError, requestCode: Int) {
        if (isForeground) {
            DialogUtils.showErrorDialog(supportFragmentManager, error, requestCode)
        } else {
            NotificationUtils.errorNotify(
                this,
                NotificationUtils.CHANNEL_ID_ERROR,
                error.getDescription(),
                requestCode
            )
        }
    }

    override fun showErrorDialog(description: String, requestCode: Int) {
        if (isForeground) {
            DialogUtils.showErrorDialog(supportFragmentManager, description, requestCode)
        } else {
            NotificationUtils.errorNotify(
                this,
                NotificationUtils.CHANNEL_ID_ERROR,
                description,
                requestCode
            )
        }
    }

    override fun showModelessProgressDialog() {
        if (isForeground) {
            DialogUtils.showProgressDialog(supportFragmentManager)
        }
    }

    override fun showProgressDialog() {
        if (isForeground) {
            DialogUtils.showProgressDialog(supportFragmentManager)
        }
    }

    override fun dismissProgressDialog() {
        if (!isForeground) return
        val fragment = supportFragmentManager.findFragmentByTag(ProgressDialog.TAG)
        if (fragment != null && fragment is ProgressDialog) {
            fragment.dismissAllowingStateLoss()
            supportFragmentManager.executePendingTransactions()
        }
    }
    override fun dismissModelessProgressDialog() {
        if (isForeground) {
            val fragment = supportFragmentManager.findFragmentByTag(ModelessProgressDialog.TAG)
            if (fragment != null && fragment is ModelessProgressDialog) {
                fragment.dismissAllowingStateLoss()
                supportFragmentManager.executePendingTransactions()
            }
        }
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