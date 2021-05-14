package com.usen.umembers.ui.util

import androidx.annotation.IntDef
import com.usen.umembers.R

object FragmentUtils {
    const val NON = 0
    const val UP = 1
    const val DOWN = 2
    const val RIGHT = 3
    const val LEFT = 4

    @IntDef(NON, UP, DOWN, RIGHT, LEFT)
    @Retention(AnnotationRetention.SOURCE)
    internal annotation class AnimationDirection

    fun replaceFragmentToArea(fragmentManager: androidx.fragment.app.FragmentManager, fragment: androidx.fragment.app.Fragment, fragmentId: Int) {
        val transaction = fragmentManager.beginTransaction()
        transaction.replace(fragmentId, fragment)
        transaction.commit()
    }

    fun replaceFragmentToArea(fragmentManager: androidx.fragment.app.FragmentManager, fragment: androidx.fragment.app.Fragment, fragmentId: Int, @AnimationDirection animDire: Int) {
        val transaction = fragmentManager.beginTransaction()
        setFragmentAnimation(transaction, animDire)
        transaction.replace(fragmentId, fragment)
        transaction.commit()
    }
    fun addFragmentToBackStack(fragmentManager: androidx.fragment.app.FragmentManager, fragment: androidx.fragment.app.Fragment, fragmentId: Int, fragmentTag: String, @AnimationDirection animDire: Int) {
        val transaction = fragmentManager.beginTransaction()
        setFragmentAnimation(transaction, animDire)
        transaction.add(fragmentId, fragment, fragmentTag)
        transaction.addToBackStack(fragmentTag)
        transaction.commit()
    }
    private fun setFragmentAnimation(transaction: androidx.fragment.app.FragmentTransaction, @AnimationDirection animDire: Int) {
        when (animDire) {
            UP -> transaction.setCustomAnimations(R.anim.slide_in_up, R.anim.slide_out_up, R.anim.slide_in_up, R.anim.slide_out_up)
            DOWN -> transaction.setCustomAnimations(R.anim.slide_in_down, R.anim.slide_out_down, R.anim.slide_in_down, R.anim.slide_out_down)
            RIGHT -> transaction.setCustomAnimations(R.anim.slide_in_right, R.anim.slide_out_right, R.anim.slide_in_right, R.anim.slide_out_right)
            LEFT -> transaction.setCustomAnimations(R.anim.slide_in_left, android.R.anim.slide_out_right, android.R.anim.slide_in_left, android.R.anim.slide_out_right)
        }
    }
}