package com.usen.umesse

import android.app.Activity
import android.os.Bundle
import android.os.Handler
import android.util.Log
import android.view.animation.AnimationUtils
import android.widget.ImageView

class SplashScreen : Activity() {
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
            Application.mdm.requestCustomerInfo()
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