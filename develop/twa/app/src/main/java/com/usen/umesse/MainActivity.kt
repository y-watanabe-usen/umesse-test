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

    override fun getLaunchingUrl(): Uri {
        val url = intent.getStringExtra("url")
        if (url != null) {
            Log.d("getLaunchingUrl", url)
            return Uri.parse(url)
        }
        return super.getLaunchingUrl()
    }
}
