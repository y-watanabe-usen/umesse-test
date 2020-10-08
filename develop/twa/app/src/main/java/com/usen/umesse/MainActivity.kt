package com.usen.umesse

import android.net.Uri
import android.util.Log
import com.google.androidbrowserhelper.trusted.LauncherActivity

class MainActivity : LauncherActivity() {
    override fun getLaunchingUrl(): Uri {
        val uri = super.getLaunchingUrl()
        Log.e("MainActivity", uri.toString())
        return uri.buildUpon().appendQueryParameter("custCd", "Dummy").build()
    }

    private fun getDynamicParameterValue(): String {
        return (Math.random() * 1000).toInt().toString()
    }
}
