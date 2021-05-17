/*
 * Copyright 2020 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.usen.umesse

import android.net.Uri
import android.os.Bundle
import android.util.Log
import com.google.androidbrowserhelper.trusted.LauncherActivity
import com.usen.umesse.data.LocalDataRepository
import com.usen.umesse.data.local.UMesseSharedPreferences
import com.usen.umesse.mdm.MdmClient

class LauncherActivity : LauncherActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.d(TAG, "onCreate.")

        mdmClient = MdmClient(applicationContext).apply {
            registerMdmReceiver()
            if (LocalDataRepository(UMesseSharedPreferences(applicationContext)).unisCustomerCd == null)
                requestCustomerInfo()
        }
    }

    override fun getLaunchingUrl(): Uri {
        val uri = super.getLaunchingUrl()
        Log.d(TAG, "getLaunchingUrl. $uri")

        val unisCustomerCd = Application.localData!!.unisCustomerCd
        Log.d(TAG, "unisCustomerCd = $unisCustomerCd")
        return uri.buildUpon().appendQueryParameter("unisCustomerCd", unisCustomerCd).build()
    }

    override fun onDestroy() {
        Log.d(TAG, "onDestroy.")
        if (mdmClient != null)
            mdmClient.unregisterMdmReceiver()
        super.onDestroy()
    }

    companion object {
        private const val TAG = "LauncherActivity"
        private lateinit var mdmClient: MdmClient
    }
}