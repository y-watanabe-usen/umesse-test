package com.usen.umembers.data.remote

interface ApiResponse<T> {
    fun onSuccess(response: T)
    fun onFailure(t: Throwable)
}
