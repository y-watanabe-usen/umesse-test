package com.usen.umembers.ui.fragment.dialog

import android.app.Dialog
import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import android.os.Bundle
import android.view.*
import androidx.databinding.DataBindingUtil
import com.usen.umembers.R
import com.usen.umembers.databinding.FragmentDialogProgressBinding

class ModelessProgressDialog : androidx.fragment.app.DialogFragment() {
    private lateinit var mBinding: FragmentDialogProgressBinding
    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        mBinding = DataBindingUtil.inflate<FragmentDialogProgressBinding>(inflater, R.layout.fragment_dialog_progress, container, false)
        return mBinding.root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        val dialogFragment = dialog
        if (dialogFragment != null) {
            val window = dialogFragment.window!!
            window.setFlags(
                WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL,
                WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL);
        }
    }

    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
        val progress = createProgressDialog()
        return progress
    }

    /**
     * ProgressDialog表示.
     */
    private fun createProgressDialog(): Dialog {
        val dialog = Dialog(requireActivity())
        if (dialog.window != null) dialog.window!!.setBackgroundDrawable(ColorDrawable(Color.TRANSPARENT))
        isCancelable = false
        return dialog
    }

    companion object {
        val TAG = "ModelessProgressDialog"
        fun newInstance(): ModelessProgressDialog {
            val fragment = ModelessProgressDialog()
            val args = Bundle()
            fragment.arguments = args
            return fragment
        }
    }
}