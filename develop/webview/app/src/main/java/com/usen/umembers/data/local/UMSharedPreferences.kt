package com.usen.umembers.data.local

import android.content.Context
import android.content.SharedPreferences

class UMSharedPreferences(private val context: Context) {
    private val prefs: SharedPreferences
        get() = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE)

    private val editor: SharedPreferences.Editor
        get() = prefs.edit()

    var unisCustomerCd: String?
        get() = prefs.getString(UNIS_CUSTOMER_CD, null)
        set(value) = editor.putString(UNIS_CUSTOMER_CD, value).apply()

    companion object {
        private const val PREF_NAME = "UMSharedPreferences"
        private const val UNIS_CUSTOMER_CD = "unisCustomerCd"
    }
}