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

import android.app.Application
import android.util.Log
import com.usen.umesse.data.LocalDataRepository
import com.usen.umesse.data.local.UMesseSharedPreferences
import com.usen.umesse.mdm.MdmClient

class Application : Application() {

    override fun onCreate() {
        super.onCreate()
        Log.d(TAG, "onCreate.")
        localDataRepository = LocalDataRepository(UMesseSharedPreferences(applicationContext))
        mdmClient = MdmClient(applicationContext).apply {
            registerMdmReceiver()
        }
    }


    override fun onTerminate() {
        Log.d(TAG, "onTerminate.")
        mdmClient.unregisterMdmReceiver()
        super.onTerminate()
    }

    companion object {
        private const val TAG = "Application"
        private lateinit var localDataRepository: LocalDataRepository
        val localData: LocalDataRepository
            get() = localDataRepository
        private lateinit var mdmClient: MdmClient
        val mdm: MdmClient
            get() = mdmClient
    }
}