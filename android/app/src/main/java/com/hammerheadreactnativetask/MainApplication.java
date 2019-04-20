package com.hammerheadreactnativetask;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import se.bonniernews.rntweet.RNTweetPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import org.pgsqlite.SQLitePluginPackage;
import com.twitter.sdk.android.core.TwitterAuthConfig;
import com.twitter.sdk.android.core.TwitterConfig;
import com.twitter.sdk.android.core.Twitter;
import com.twitter.sdk.android.core.DefaultLogger;


import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNTweetPackage(),
            new AsyncStoragePackage(),
          new SQLitePluginPackage(),
            new RNGestureHandlerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
TwitterConfig config = new TwitterConfig.Builder(this)
                                 .logger(new DefaultLogger(Log.DEBUG))
                                 .twitterAuthConfig(new TwitterAuthConfig("FITE9zSuKL6zmx2GARCWIgLub", "XXKlTWqkIvRrIShDbHt0c8VQfH8UC2wxdN7DFY4USEYCnnKhMA"))
                                 .debug(true)
                                 .build();
                               Twitter.initialize(config);
    }
}
