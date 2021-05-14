package com.usen.umembers.data

import android.content.Context
import android.util.Log
import com.usen.umembers.BuildConfig
import com.usen.umembers.data.local.UMSharedPreferences
import com.usen.umembers.data.remote.ApiRequest
import com.usen.umembers.data.remote.ApiResponse
import com.usen.umembers.data.remote.response.TokenAuth
import okhttp3.OkHttpClient
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class RepositoryImpl(context: Context) : Repository {

    private val apiRequest: ApiRequest = Retrofit.Builder()
        .baseUrl("https://${BuildConfig.API_HOST}")
        .client(OkHttpClient())
        .addConverterFactory(GsonConverterFactory.create())
        .build().create(ApiRequest::class.java)

    private val localData: UMSharedPreferences = UMSharedPreferences(context)

    override var unisCustomerCd: String?
        get() = localData.unisCustomerCd
        set(value) {
            localData.unisCustomerCd = value
        }

    override fun tokenAuth(
        unisCustomerCd: String,
        apiResponse: ApiResponse<TokenAuth>
    ): Call<*> {
        val call = apiRequest.tokenAuth(BuildConfig.API_KEY, unisCustomerCd)
        call.enqueue(object : Callback<TokenAuth> {
            override fun onResponse(
                call: Call<TokenAuth>,
                response: Response<TokenAuth>
            ) {
                Log.d(TAG, "tokenAuth:onResponse")
                val code = response.code()
                when (response.code()) {
                    200 -> apiResponse.onSuccess(response.body()!!)
                    else -> apiResponse.onFailure(Throwable("code = $code"))
                }
            }

            override fun onFailure(call: Call<TokenAuth>, t: Throwable) {
                Log.e(TAG, "tokenAuth:onFailure")
                apiResponse.onFailure(t)
            }
        })
        return call
    }

    companion object {
        private const val TAG = "RepositoryImpl"
    }
}