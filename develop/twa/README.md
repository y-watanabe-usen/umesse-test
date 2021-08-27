# twa

## genetate

- [Trusted Web Activities Quick Start Guide](https://developers.google.com/web/android/trusted-web-activity/quick-start)
- [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap)
- [Bubblewrap CLI](https://github.com/GoogleChromeLabs/bubblewrap/tree/master/packages/cli)

```bash
docker run -d --rm -p 80:80 -v $(pwd)/webmanifest:/usr/share/nginx/html nginx:alpine
bubblewrap init --manifest http://localhost/manifest.json

? Domain: umesse.usen.com
? URL path: /
? Application name: U MESSAGE
? Short name: U MESSAGE
? Application ID: com.usen.umesse
? Starting version code for the new app version: 1
? Display mode: fullscreen
? Orientation: landscape
? Status bar color: #39A0D2
? Splash screen color: #FFFFFF
? Icon URL: http://localhost/512x512.png
? Maskable icon URL:
? Monochrome icon URL:
? Include support for Play Billing (this relies on alpha dependencies)? No
? Key store location: ./android.keystore
? Key name: android
? Do you want to create one now? No
```

### ローカル環境でのTWA
vuejsのIPが192.168.10.6の場合

1. webapp(vuejs)の自分のPCのIPを許可設定する
```
adb shell "echo '_ --disable-digital-asset-link-verification-for-url=\"http://192.168.10.6:8080\"' > /data/local/tmp/chrome-command-line"
```
2. 端末のchormeを立ち上げ下記URLにアクセスしEnabledに変更する

chrome://flags/#enable-command-line-on-non-rooted-devices

3.下記にvuejsのアドレスを許可するように追加
chrome://flags/#unsafely-treat-insecure-origin-as-secure

- enabledに変更
- http://192.168.10.6:8080を追加

4. Chromeの下の方にrelaunchが出てるので押下
5. Chromeを強制停止する

6. twa/app/build.gradeのhostnameを編集する
```
hostName: '192.168.10.6:8080'
```

7. run vuejs server
8. run twa android app.

