package com.usen.umembers.data.remote

import com.usen.umembers.data.remote.response.TokenAuth
import retrofit2.Call
import retrofit2.http.Header
import retrofit2.http.Headers
import retrofit2.http.POST

interface ApiRequest {
    /**token auth**/
    @Headers(
        USER_AGENT
    )
    @POST(REQUEST_URL)
    fun tokenAuth(
        @Header(API_KEY) apiKey: String,
        @Header(UNIS_CD) unisCustomerCd: String
    ): Call<TokenAuth>

    companion object {
        const val REQUEST_URL = "/ucart/auth"
        const val USER_AGENT = "User-Agent: U-Members/1.0"
        const val API_KEY = "x-api-key"
        const val UNIS_CD = "x-unis-cd"
    }
}
