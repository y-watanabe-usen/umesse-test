package com.usen.umesse

import android.net.Uri
import android.os.Bundle
import android.util.Log
import com.google.androidbrowserhelper.trusted.LauncherActivity

class MainActivity : LauncherActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onDestroy() {
        super.onDestroy()
    }

    private fun getDynamicParameterValue(): String {
        return (Math.random() * 1000).toInt().toString()
    }

    override fun getLaunchingUrl(): Uri {
        val uri = super.getLaunchingUrl()
        Log.e("MainActivity", uri.toString())
        return uri.buildUpon().appendQueryParameter("token", getDynamicParameterValue()).build()
    }
}
