package com.usen.umembers.ui.util

import com.usen.umembers.ui.fragment.dialog.ErrorDialog
import com.usen.umembers.ui.fragment.dialog.ModelessProgressDialog
import com.usen.umembers.ui.fragment.dialog.ProgressDialog

object DialogUtils {
    fun showErrorDialog(
        fragmentManager: androidx.fragment.app.FragmentManager,
        error: ApplicationError,
        requestCode: Int
    ) {
        showErrorDialog(fragmentManager, null, null, error.getDescription(), requestCode)
    }

    fun showErrorDialog(
        fragmentManager: androidx.fragment.app.FragmentManager,
        description: String,
        requestCode: Int
    ) {
        showErrorDialog(fragmentManager, null, null, description, requestCode)
    }

    private fun showErrorDialog(
        fragmentManager: androidx.fragment.app.FragmentManager,
        fragment: androidx.fragment.app.Fragment?,
        title: String?,
        description: String,
        requestCode: Int
    ) {
        if (fragmentManager.findFragmentByTag(ErrorDialog.TAG) != null) return
        val dialog = ErrorDialog.newInstance(requestCode, title, description)
        if (fragment != null) dialog.setTargetFragment(fragment, requestCode)
        showDialog(fragmentManager, dialog, ErrorDialog.TAG)
    }

    fun showProgressDialog(fragmentManager: androidx.fragment.app.FragmentManager) {
        showProgressDialog(fragmentManager, ProgressDialog.TAG)
    }

    fun showModelessProgressDialog(fragmentManager: androidx.fragment.app.FragmentManager) {
        val tag = ModelessProgressDialog.TAG
        if ((fragmentManager.findFragmentByTag(tag) != null) || (fragmentManager.findFragmentByTag(
                ProgressDialog.TAG
            ) != null)
        ) return
        val dialog = ModelessProgressDialog.newInstance()
        showDialog(fragmentManager, dialog, tag)
    }

    private fun showProgressDialog(
        fragmentManager: androidx.fragment.app.FragmentManager,
        tag: String
    ) {
        if ((fragmentManager.findFragmentByTag(tag) != null) || (fragmentManager.findFragmentByTag(
                ModelessProgressDialog.TAG
            ) != null)
        ) return
        val dialog = ProgressDialog.newInstance()
        showDialog(fragmentManager, dialog, tag)
    }

    private fun showDialog(
        fragmentManager: androidx.fragment.app.FragmentManager,
        dialog: androidx.fragment.app.DialogFragment,
        tag: String
    ) {
        dialog.show(fragmentManager, tag)
    }
}