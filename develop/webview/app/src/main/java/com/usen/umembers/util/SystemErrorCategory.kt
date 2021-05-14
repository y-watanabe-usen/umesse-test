package com.usen.umembers.util

enum class SystemErrorCategory private constructor(val category: Int) {
    ERROR_NON(0),
    ERROR_NORMAL(1),
    ERROR_LOGOUT(2),
    ERROR_UPDATE_APP(3),
    ERROR_SHOW_BROWSER(4)
}