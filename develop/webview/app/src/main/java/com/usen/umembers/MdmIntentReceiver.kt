package com.usen.umembers

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.os.Bundle


open class MdmIntentReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context?, intent: Intent?) {
        context ?: return
        intent ?: return
        val extras = intent.extras
        extras ?: return
        val bundle = Bundle()
        bundle.putString(context.getString(R.string.contract_cd), extras.getString(context.getString(R.string.contract_cd),""))
        bundle.putString(context.getString(R.string.unis_customer_cd), extras.getString(context.getString(R.string.unis_customer_cd),""))
        bundle.putString(context.getString(R.string.customer_name), extras.getString(context.getString(R.string.customer_name),""))
        bundle.putString(context.getString(R.string.customer_zip_cd), extras.getString(context.getString(R.string.customer_zip_cd),""))
        bundle.putString(context.getString(R.string.customer_state_name), extras.getString(context.getString(R.string.customer_state_name),""))
        bundle.putString(context.getString(R.string.customer_address1), extras.getString(context.getString(R.string.customer_address1),""))
        bundle.putString(context.getString(R.string.customer_address2), extras.getString(context.getString(R.string.customer_address2),""))
        bundle.putString(context.getString(R.string.customer_address3), extras.getString(context.getString(R.string.customer_address3),""))
        bundle.putString(context.getString(R.string.umembers_key), extras.getString(context.getString(R.string.umembers_key),""))
        bundle.putString(context.getString(R.string.create_date), extras.getString(context.getString(R.string.create_date),""))
        bundle.putString(context.getString(R.string.renewal_date), extras.getString(context.getString(R.string.renewal_date), ""))

        val sender = Intent(context.getString(R.string.custom_action_response_usen_cd))
//        sender.setClassName("com.usen.umembers", "com.usen.umembers.receiver.UMMDMIntentResponseReceiver")
        sender.putExtra("extras", bundle)
        context.sendBroadcast(sender)
    }
}