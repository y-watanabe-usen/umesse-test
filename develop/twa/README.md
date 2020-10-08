# twa

## genetate

- [Trusted Web Activities Quick Start Guide](https://developers.google.com/web/android/trusted-web-activity/quick-start)
- [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap)
- [Bubblewrap CLI](https://github.com/GoogleChromeLabs/bubblewrap/tree/master/packages/cli)

```bash
docker run -d --rm -p 80:80 -v $(pwd)/webmanifest:/usr/share/nginx/html nginx:alpine
bubblewrap init --manifest http://localhost/manifest.json

? Domain: localhost ## Update later
? URL path: /
? Application name: U MESSE
? Short name: U MESSE
? Application ID: com.usen.umesse
? Display mode: standalone
? Status bar color: #39A0D2
? Splash screen color: #FFFFFF
? Icon URL: http://localhost/512x512.png
? Maskable icon URL:
? Monochrome icon URL:
? Key store location: ./android.keystore
? Key name: android
? Do you want to create one now? No
```
