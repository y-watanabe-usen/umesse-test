package com.usen.umesse.mdm

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log

class MdmBroadcastReceiver : BroadcastReceiver(){
    override fun onReceive(context: Context?, intent: Intent?) {
        Log.d("MdmBroadcastReceiver","##Test LocalBroadcast onReceive")
        intent ?: return
    }
}