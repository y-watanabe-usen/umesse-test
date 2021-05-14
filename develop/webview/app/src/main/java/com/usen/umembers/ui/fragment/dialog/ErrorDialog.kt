package com.usen.umembers.ui.fragment.dialog

import android.app.Activity
import android.app.Dialog
import android.app.PendingIntent
import android.content.Intent
import android.media.AudioManager
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import com.usen.umembers.R
import com.usen.umembers.databinding.DialogErrorBinding

class ErrorDialog : BaseDialog() {
    private lateinit var mBinding: DialogErrorBinding

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
    }

    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
        val dialog = super.onCreateDialog(savedInstanceState)
        val args = arguments
        args ?: return dialog
        val requestCode = args.getInt(EXTRA_REQUEST_CODE)
        dialog.setOnKeyListener { _, _, event ->
            val ret = false
            ret
        }

        return dialog
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        mBinding = DataBindingUtil.inflate(inflater, R.layout.dialog_error, container, false)
        val args = arguments
        args ?: return return mBinding.root
        val message = args.getString(EXTRA_MESSAGE)
        mBinding.message.text = message
        mBinding.positiveText.setOnClickListener { _ ->
            val data = Intent()
            sendResult(args.getInt(EXTRA_REQUEST_CODE), RESULT_ERROR, data)
            dismissDialog()
        }
        setAbsoluteSize(DIALPG_TYPE_SMALL)
        return mBinding.root
    }

    private fun sendResult(requestCode: Int, resultCode: Int, data: Intent) {
        // 呼び出し元if:Fragment,else:Activity
        val fragment = targetFragment
        if (fragment != null) {
            fragment.onActivityResult(requestCode, resultCode, data)
        } else {
            val pi = requireActivity().createPendingResult(
                requestCode,
                data,
                PendingIntent.FLAG_ONE_SHOT
            )
            try {
                pi.send(resultCode)
            } catch (e: PendingIntent.CanceledException) {
            }

        }
    }

    override fun dismissDialog() {
        this.dismiss()
    }

    companion object {
        val TAG = "ErrorDialog"
        val EXTRA_REQUEST_CODE = "request_code"
        val EXTRA_TITLE = "title"
        val EXTRA_MESSAGE = "message"

        val RESULT_ERROR = Activity.RESULT_FIRST_USER + 99

        fun newInstance(requestCode: Int, title: String?, message: String): ErrorDialog {
            val fragment = ErrorDialog()
            val args = Bundle()
            args.putString(EXTRA_TITLE, title)
            args.putString(EXTRA_MESSAGE, message)
            args.putInt(EXTRA_REQUEST_CODE, requestCode)
            fragment.arguments = args
            return fragment
        }
    }
}