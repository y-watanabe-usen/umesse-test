package com.usen.umembers.util

import android.os.Handler

object ClickUtils {
    private val DEFAULT_MILLIS = 700L
    private var isEnabled = true

    @JvmStatic
    val isPressTwice: Boolean
        get() = isPressTwice(DEFAULT_MILLIS)

    @JvmStatic
    fun isPressTwice(millis: Long): Boolean {
        if (!isEnabled) {
            return true
        } else {
            isEnabled = false
            Handler().postDelayed({ isEnabled = true }, millis)
            return false
        }
    }
}