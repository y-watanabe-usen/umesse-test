package com.usen.umesse

import android.net.Uri
import android.os.Bundle
import android.util.Log
import com.google.androidbrowserhelper.trusted.LauncherActivity
import com.usen.umesse.mdm.MdmClient
import com.usen.umesse.mdm.UsenCustomer

class CustomLauncherActivity : LauncherActivity() {
    override fun getLaunchingUrl(): Uri {
        val custCd = intent.getStringExtra("custCd")
        Log.d("CustomLauncherActivity", "custCd = $custCd")

        if (custCd.isNullOrEmpty()) {
            // TODO: エラーページへ遷移
        }

        val uri = super.getLaunchingUrl()
        return uri.buildUpon().appendQueryParameter("custCd", custCd).build()
    }
}
