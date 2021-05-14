package com.usen.umembers.data.remote.response

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

class TokenAuth {
    @SerializedName("result_cd")
    @Expose
    var resultCd: String? = null

    @SerializedName("token")
    @Expose
    var token: String? = null

    @SerializedName("token_expire")
    @Expose
    var tokenExpire: String? = null
}
