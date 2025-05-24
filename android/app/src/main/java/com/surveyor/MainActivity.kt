package com.surveyor
import android.content.Context
import android.os.Bundle

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

import com.zoontek.rnbootsplash.RNBootSplash


import java.io.File


class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "Surveyor"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  override fun onCreate(savedInstanceState: Bundle?) {
    RNBootSplash.init(this, R.style.BootTheme)
    deleteCache()
    super.onCreate(null) // or super.onCreate(null) with react-native-screens
  }

  private fun deleteCache() {
    try {
        val context: Context = applicationContext
        val dir: File? = context.cacheDir
        if (dir != null) {
            deleteDir(dir)
        }
    } catch (e: Exception) {
        e.printStackTrace()
    }
  }

  private fun deleteDir(dir: File): Boolean {
    return if (dir.isDirectory) {
        val children: Array<String>? = dir.list()
        children?.forEach { child ->
            val success = deleteDir(File(dir, child))
            if (!success) {
                return false
            }
        }
        dir.delete()
    } else {
        dir.delete()
    }
  }
}
