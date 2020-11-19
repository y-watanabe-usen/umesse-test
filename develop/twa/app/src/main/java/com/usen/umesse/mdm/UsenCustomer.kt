package com.usen.umesse.mdm

import android.os.Parcelable
import kotlinx.android.parcel.Parcelize

@Parcelize
data class UsenCustomer(
        var serial_cd: String,
        var contract_cd : String,
        var unis_customer_cd: String,
        var customer_name: String,
        var customer_zip_cd: String,
        var customer_state_name :String,
        var customer_address1 : String,
        var customer_address2 : String,
        var customer_address3 : String,
        var umembers_key : String,
        var create_date : String,
        var renewal_date : String
) : Parcelable
