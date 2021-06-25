package com.usen.umesse

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log
import com.usen.umesse.mdm.MdmClient
import com.usen.umesse.mdm.UsenCustomer

open class MdmIntentReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context?, intent: Intent?) {
        context ?: return
        intent ?: return
        val extras = intent.extras
        extras ?: return

        val usenCustomer = UsenCustomer(
            extras.getString(SERIAL_CD, ""),
            extras.getString(CONTRACT_CD, ""),
            extras.getString(UNIS_CUSTOMER_CD, ""),
            extras.getString(CUSTOMER_NAME, ""),
            extras.getString(CUSTOMER_ZIP_CD, ""),
            extras.getString(CUSTOMER_STATE_NAME, ""),
            extras.getString(CUSTOMER_ADDRESS1, ""),
            extras.getString(CUSTOMER_ADDRESS2, ""),
            extras.getString(CUSTOMER_ADDRESS3, ""),
            extras.getString(UMEMBERS_KEY, ""),
            extras.getString(CREATE_DATE, ""),
            extras.getString(RENEWAL_DATE, "")
        )

        Log.d(
            "MdmIntentReceiver", "\n" + "serial_cd= ${usenCustomer.serial_cd} \n " +
                    "contract_cd = ${usenCustomer.contract_cd} \n " +
                    "unis_customer_cd = ${usenCustomer.unis_customer_cd} \n" +
                    "customer_name = ${usenCustomer.customer_name} \n" +
                    "customer_zip_cd = ${usenCustomer.customer_zip_cd} \n" +
                    "customer_state_name= ${usenCustomer.customer_state_name} \n" +
                    "customer_address1 = ${usenCustomer.customer_address1} \n" +
                    "customer_address2 = ${usenCustomer.customer_address2} \n" +
                    "customer_address3 = ${usenCustomer.customer_address3} \n" +
                    "umembers_key = ${usenCustomer.umembers_key} \n" +
                    "create_date = ${usenCustomer.create_date} \n" +
                    "renewal_date = ${usenCustomer.renewal_date} \n" +
                    ""
        )

        MdmClient.sendBroadcast(context, usenCustomer)
        Application.localData!!.unisCustomerCd = usenCustomer.unis_customer_cd
        Application.localData!!.contractCd = usenCustomer.contract_cd
    }

    companion object {
        const val SERIAL_CD = "serial_cd"
        const val CONTRACT_CD = "contract_cd"
        const val UNIS_CUSTOMER_CD = "unis_customer_cd"
        const val CUSTOMER_NAME = "customer_name"
        const val CUSTOMER_ZIP_CD = "customer_zip_cd"
        const val CUSTOMER_STATE_NAME = "customer_state_name"
        const val CUSTOMER_ADDRESS1 = "customer_address1"
        const val CUSTOMER_ADDRESS2 = "customer_address2"
        const val CUSTOMER_ADDRESS3 = "customer_address3"
        const val UMEMBERS_KEY = "umembers_key"
        const val CREATE_DATE = "create_date"
        const val RENEWAL_DATE = "renewal_date"
    }
}