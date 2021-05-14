package com.usen.umembers.data

import com.usen.umembers.data.remote.ApiResponse
import com.usen.umembers.data.remote.response.TokenAuth
import retrofit2.Call

interface Repository {
    var unisCustomerCd: String?
    fun tokenAuth(
        unisCustomerCd: String,
        apiResponse: ApiResponse<TokenAuth>
    ): Call<*>
}
