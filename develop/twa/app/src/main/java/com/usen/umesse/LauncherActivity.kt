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
import android.util.Log
import com.google.androidbrowserhelper.trusted.LauncherActivity
import com.usen.umesse.MdmIntentReceiver.Companion.UNIS_CUSTOMER_CD

class LauncherActivity : LauncherActivity() {
    override fun getLaunchingUrl(): Uri {
        val unisCustomerCd = intent.getStringExtra(UNIS_CUSTOMER_CD)
        Log.d("CustomLauncherActivity", "unisCustomerCd = $unisCustomerCd")

        if (unisCustomerCd.isNullOrEmpty()) {
            // TODO: エラーページへ遷移
        }

        val uri = super.getLaunchingUrl()
        return uri.buildUpon().appendQueryParameter("unisCustomerCd", unisCustomerCd).build()
    }
}