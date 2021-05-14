package com.usen.umembers.app

import android.app.Application
import android.content.Context
import android.content.Intent
import com.usen.umembers.R
import com.usen.umembers.data.Repository
import com.usen.umembers.data.RepositoryImpl

class UMApplication : Application() {

    override fun onCreate() {
        super.onCreate()
        context = applicationContext
        repository = RepositoryImpl(context)
        handler = UMLifecycleHandler()
        registerActivityLifecycleCallbacks(handler)
    }
    companion object {
        @JvmStatic
        lateinit var context: Context
            private set
        lateinit var repository: Repository
            private set
        private var handler: UMLifecycleHandler? = null
        @JvmStatic
        val isApplicationInForeground: Boolean
            get() = handler!!.isApplicationInForeground
        fun sendMDMBroadcast() {
            val intent =  Intent( context.getString(R.string.action_custom_cd));
            intent.setClassName(context.getString(R.string.package_name_mdm), context.getString(R.string.class_name_mdm_cd_broadcast));
            intent.putExtra(context.getString(R.string.broadcast_key_caller), context.getString(R.string.broadcast_value_caller));
            context.sendBroadcast(intent);
        }
    }
}