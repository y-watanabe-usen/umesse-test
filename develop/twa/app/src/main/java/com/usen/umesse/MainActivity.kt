package com.usen.umesse

import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import com.usen.umesse.mdm.MdmClient

class MainActivity : AppCompatActivity() {
    private lateinit var mdmClient: MdmClient

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.d("MainActivity", "onCreate.")
        mdmClient= MdmClient(applicationContext).apply {
            registerMdmReceiver()
            requestCustomerInfo()
        }

        // TODO: スプラッシュ画面 MdmIntentReceiver来ない場合のエラー
    }

    override fun onDestroy() {
        mdmClient.unregisterMdmReceiver()
        super.onDestroy()
    }
}
