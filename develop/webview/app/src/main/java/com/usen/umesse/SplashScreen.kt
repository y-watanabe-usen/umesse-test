package com.usen.umesse

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.util.Log
import android.view.View
import android.view.animation.AnimationUtils
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class SplashScreen : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.d(TAG, "onCreate.")
        setContentView(R.layout.splash_screen)
        findViewById<ImageView>(R.id.logo).startAnimation(
            AnimationUtils.loadAnimation(
                this,
                R.anim.fade_in
            )
        )

        Handler().postDelayed(Runnable {
            if (Application.localData.unisCustomerCd != null) {
                val intent = Intent(applicationContext, MainActivity::class.java)
                intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
                startActivity(intent, null)
                overridePendingTransition(0, 0)
                this@SplashScreen.finish()
            } else {
                findViewById<TextView>(R.id.splashError).visibility = View.VISIBLE
            }
        }, 3000)
    }

    override fun onDestroy() {
        Log.d(TAG, "onDestroy.")
        super.onDestroy()
    }

    companion object {
        private const val TAG = "SplashScreen"
    }
}