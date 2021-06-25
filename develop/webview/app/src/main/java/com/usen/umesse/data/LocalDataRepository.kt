package com.usen.umesse.data

import com.usen.umesse.data.local.UMesseSharedPreferences

class LocalDataRepository(private val uMessePrefs: UMesseSharedPreferences) {

    var unisCustomerCd: String?
        get() = uMessePrefs.unisCustomerCd
        set(value) {
            uMessePrefs.unisCustomerCd = value
        }

    var contractCd: String?
        get() = uMessePrefs.contractCd
        set(value) {
            uMessePrefs.contractCd = value
        }
}