package com.usen.umesse.mdm

import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.util.Log

class MdmClient(val context: Context) {

    private lateinit var receiver: MdmBroadcastReceiver
    fun registerMdmReceiver() {
        receiver = MdmBroadcastReceiver()
        val filter = IntentFilter("com.usen.umesse.custom_action_response_usen_cd")
        context.registerReceiver(receiver, filter)
    }

    fun unregisterMdmReceiver() {
        context.unregisterReceiver(receiver)
    }

    // request MDMInfo
    fun requestCustomerInfo() {
        Log.d("MdmClient", "## requestCustomerInfo()")
        val intent = Intent("custom_action_request_usen_cd")
        intent.setClassName("com.neoidm.mdmclient", "com.neoidm.mdmclient.usen.CdRequestReceiver")
        intent.putExtra("caller", "U MESSE")
        context.sendBroadcast(intent)
    }

    companion object {
        fun sendBroadcast(context: Context, item: UsenCustomer) {
            context.sendBroadcast(
                Intent("com.usen.umesse.custom_action_response_usen_cd").apply {
                    putExtra("extras", item)
                })
        }
    }
}