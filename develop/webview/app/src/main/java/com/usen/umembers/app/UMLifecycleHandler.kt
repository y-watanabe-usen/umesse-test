package com.usen.umembers.app

import android.app.Activity
import android.app.Application
import android.os.Bundle
import java.util.HashSet

class UMLifecycleHandler : Application.ActivityLifecycleCallbacks{
    private val mActivityStack = HashSet<Int>()

    val isApplicationInForeground: Boolean
        get() = 0 < mActivityStack.size

    override fun onActivityCreated(activity: Activity, savedInstanceState: Bundle?) {
    }

    override fun onActivityStarted(activity: Activity) {
        mActivityStack.add(activity.hashCode())
    }

    override fun onActivityResumed(activity: Activity) {
    }

    override fun onActivityPaused(activity: Activity) {
    }

    override fun onActivityStopped(activity: Activity) {
        mActivityStack.remove(activity.hashCode())
    }

    override fun onActivitySaveInstanceState(activity: Activity, outState: Bundle) {}

    override fun onActivityDestroyed(activity: Activity) {}

}