package com.usen.umembers.ui.util

import android.text.TextUtils

enum class ApplicationError private constructor(// エラーメッセージ(プレイリスト登録上限)
    val code: String, private val description: String) {
    ERROR_DEFAULT("A00001", "エラーが発生しました。"), // エラーメッセージ(デフォルト)
    FAILED_LOGIN("A00002", "ログインIDとパスワードをご確認の上、再度入力してください。"), // エラーメッセージ(ID/PASS未入力)
    UNDER_MAINTENANCE("A00003", "メンテナンス中です。しばらくお待ちください。"), // エラーメッセージ(メンテナンス中)
    BAD_COMMUNICATION("A00004", "通信エラーが発生しました。通信状態の良好なところで再度お試しください。"); // エラーメッセージ(通信エラー)
    fun getDescription(): String {
        return "$description（$code）"
    }
    companion object {

        fun getDescription(code: String): String? {
            val enumConsts = ApplicationError.values()
            for (error in enumConsts) {
                if (TextUtils.equals(code, error.code)) return error.getDescription()
            }
            return null
        }

        const val  ERROR_DEFAULT_CODE = "A00001"
        const val  FAILED_LOGIN_CODE = "A00002"
        const val  UNDER_MAINTENANCE_CODE = "A00003"
        const val  BAD_COMMUNICATION_CODE = "A00004"
    }
}