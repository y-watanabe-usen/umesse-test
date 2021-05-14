package com.usen.umembers.ui.util

import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import androidx.core.app.TaskStackBuilder
import com.usen.umembers.BuildConfig
import com.usen.umembers.R
import com.usen.umembers.ui.activity.MainActivity

object NotificationUtils {
    val NOTIFICATION_ID = R.drawable.umembers_icon_rect
    val NOTIFICATION_PERMANENT_ID = 0

    val CHANNEL_ID = BuildConfig.APPLICATION_ID + ".notification.channel"
    val CHANNEL_ID_ERROR = BuildConfig.APPLICATION_ID + ".notification.channel.error"
    private val TAG = "Notification"
    private val REQUEST_CODE = 501
    fun errorNotify(context: Context, channelId: String, message: String, code: Int) {
        val builder = NotificationCompat.Builder(context, channelId)
            .setSmallIcon(R.drawable.status_mdpi)
            .setContentTitle(context.getString(R.string.app_name))
            .setContentText(message)
        val stackBuilder = TaskStackBuilder.create(context).addNextIntent(Intent(context, MainActivity::class.java))
        builder.setContentIntent(stackBuilder.getPendingIntent(code, PendingIntent.FLAG_UPDATE_CURRENT))
        val manager = NotificationManagerCompat.from(context)
        manager.notify(code, builder.build())
    }
}