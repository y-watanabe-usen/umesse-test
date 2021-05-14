package com.usen.umembers.ui.fragment.dialog

import android.app.Dialog
import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import android.os.Bundle
import android.view.KeyEvent
import com.usen.umembers.ui.activity.BaseActivity
import com.usen.umembers.ui.contract.BaseContract
import com.usen.umembers.ui.util.ApplicationError
import com.usen.umembers.util.ClickUtils

abstract class BaseDialog : androidx.fragment.app.DialogFragment(), BaseContract.DialogView {
    protected val DIALPG_TYPE_SMALL = 0
    protected val DIALPG_TYPE_LARGE = 1

    protected var widthScaleRatio = 1.1f
    protected var heightScaleRatio = 1.1f

    protected val DIALOG_WIDTH_DP = 280f
    protected val DIALOG_HEIGHT_LARGE_DP = 370.67f
    protected val DIALOG_HEIGHT_SMALL_DP = 250f

    private var width = 0
    private var height = 0

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        if (dialog != null && dialog!!.window != null) {
            // フルスクリーン外枠調整

            // setRatioSize() or setAbsoluteSize() でサイズ指定が必要
            dialog!!.window!!.setLayout(width, height)
            dialog!!.window!!.setBackgroundDrawable(
                ColorDrawable(Color.TRANSPARENT)
            )
        }
    }
    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
        val dialog = super.onCreateDialog(savedInstanceState)
        dialog.setCanceledOnTouchOutside(false)
        dialog.setOnKeyListener { _, _, event ->
            var ret = false
            if (event.action == KeyEvent.ACTION_UP) {
                val key = event.keyCode
                if (key == KeyEvent.KEYCODE_BACK) {
                    if (ClickUtils.isPressTwice) {
                        ret = true
                    }
                }
            }
            ret
        }
        return dialog
    }

    override fun showErrorDialog(error: ApplicationError, requestCode: Int) {
        if (activity != null)
            (activity as BaseActivity).showErrorDialog(error, requestCode)
    }

    override fun showErrorDialog(description: String, requestCode: Int) {
        if (activity != null)
            (activity as BaseActivity).showErrorDialog(description, requestCode)
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
    protected fun setRatioSize(w: Float, h: Float) {
        val metrics = resources.displayMetrics
        width = (metrics.widthPixels * w).toInt()
        height = (metrics.heightPixels * h).toInt()
    }

    protected fun setAbsoluteSize(size: Int) {
        val metrics = resources.displayMetrics
        when (size) {
            DIALPG_TYPE_SMALL -> {
                width = (DIALOG_WIDTH_DP * widthScaleRatio * metrics.density).toInt()
                height = (DIALOG_HEIGHT_SMALL_DP * heightScaleRatio * metrics.density).toInt()
            }
            DIALPG_TYPE_LARGE -> {
                width = (DIALOG_WIDTH_DP * widthScaleRatio * metrics.density).toInt()
                height = (DIALOG_HEIGHT_LARGE_DP * heightScaleRatio * metrics.density).toInt()
            }
        }
    }
}