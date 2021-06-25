package com.usen.umesse.data.local

import android.content.Context
import android.content.SharedPreferences

class UMesseSharedPreferences(private val context: Context) {

    private val prefs: SharedPreferences
        get() = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE)

    private val editor: SharedPreferences.Editor
        get() = prefs.edit()

    var unisCustomerCd: String?
        get() = prefs.getString(UNIS_CUSTOMER_CD, null)
        set(value) = editor.putString(UNIS_CUSTOMER_CD, value).apply()

    var contractCd: String?
        get() = prefs.getString(CONTRACT_CD, null)
        set(value) = editor.putString(CONTRACT_CD, value).apply()

    companion object {
        private const val PREF_NAME = "UMesseSharedPreferences"
        private const val UNIS_CUSTOMER_CD = "umesse.unisCustomerCd"
        private const val CONTRACT_CD = "umesse.contractCd"
    }
}