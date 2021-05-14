package com.usen.umembers.ui.util

import android.graphics.drawable.BitmapDrawable
import android.graphics.drawable.Drawable
import android.text.TextUtils
import android.view.View
import android.widget.CheckBox
import android.widget.ImageView
import androidx.databinding.BindingAdapter
import com.squareup.picasso.Picasso

object UMBindingAdapter {
    @JvmStatic
    @BindingAdapter("isShowWebView")
    fun setWebViewState(view: View, isShowWebView: Boolean) {
        if (isShowWebView) {
            view.visibility = View.VISIBLE
        } else {
            view.visibility = View.GONE
        }
    }
    @JvmStatic
    @BindingAdapter("imageUrl", "error")
    fun loadImage(view: CheckBox, absoluteUrl: String?, error: Drawable) {

        if (TextUtils.isEmpty(absoluteUrl)) {
            view.setCompoundDrawablesRelativeWithIntrinsicBounds(error, null, null, null)
        } else {
            var bitmap = Picasso.get().load(absoluteUrl).error(error).get()
            var drawable = BitmapDrawable(view.context.resources, bitmap)
            //TODO: 受け取った画像がレクトであればここでroundに整形してください
            view.setCompoundDrawablesRelativeWithIntrinsicBounds(drawable, null, null, null)
        }
    }
}