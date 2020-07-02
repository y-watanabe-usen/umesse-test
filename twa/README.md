# Trusted Web Activity

https://github.com/GoogleChrome/android-browser-helper
https://github.com/GoogleChromeLabs/svgomg-twa.git 
https://codelabs.developers.google.com/codelabs/getting-started-with-twas/index.html#1

### Debug
```
# `chrome://flags`. Search for a setting called `Enable commmand line on non-rooted devices` and change it to 'Enabled'
adb shell "echo '_ --disable-digital-asset-link-verification-for-url=\"https://[target url]\"' > /data/local/tmp/chrome-command-line"
```

