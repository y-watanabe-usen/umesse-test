package com.usen.umembers.ui.contract

import android.content.Intent
import com.usen.umembers.ui.util.ApplicationError

interface BaseContract {
    interface BaseView {
        /**
         * エラーダイアログ表示（ローカル用）
         *
         * @param error       エラー
         * @param requestCode PositiveButton押下後の処理を振り分けたいときに利用/onActivityResultで処理を行うこと
         */
        fun showErrorDialog(error: ApplicationError, requestCode: Int)

        /**
         * エラーダイアログ表示（サーバー用）
         *
         * @param description エラー内容
         * @param requestCode PositiveButton押下後の処理を振り分けたいときに利用/onActivityResultで処理を行うこと
         */
        fun showErrorDialog(description: String, requestCode: Int)

        fun showProgressDialog()

        fun showModelessProgressDialog()

        fun dismissProgressDialog()

        fun dismissModelessProgressDialog()

        fun changeAppNativeTab(tab: Int, sub: Int, content: Int)
    }

    interface ActivityView : BaseView {
    }

    interface ActivityInteractor {
        fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?)
    }

    interface FragmentView : BaseView {
        fun getActivityModel(): Any?
    }

    interface DialogView : BaseView {
        fun dismissDialog()
    }

    interface DialogInteractor {
        fun onClickClose()
    }
}