# 概要

AWS上にブラウザによる機能を搭載し、アプリ側はTWAで表示する  
https://developers.google.com/web/android/trusted-web-activity  
機能は大きく分けて、CM作成、CM管理、オリジナル管理、CM発注機能がある  

## 構成図

![architecture](uml/architecture.png)

## 機能概要

### 認証

- タブレットに搭載されているMDMからintentにてユーザーIDを取得する
- AWSキーを用いてキー認証を行い、有効期限トークンを取得する
- 各APIへのアクセスはトークン＋ユーザーIDにてアクセスする

### CM作成

- ナレーション（コメント） + チャイム（ジングル） + BGM (ロイヤリティフリー)を選択しMIXさせる
- 構成は、開始チャイム（任意）＋ナレーション（必須・複数可能(MIN:1 MAX:4)・多言語を想定）＋終了チャイム（任意）となり、ナレーションにBGM（任意）をつける  
- 各素材は任意にボリューム調整可能
- USENが提供するナレーションだけでなく、自身で録音したデータ(MAX:120秒)、TTSを利用したデータ(MAX:120秒)も作成、選択することができる
- MIXにはffmpegを使用し、音圧・ラウンドネス調整・エンコードを実施する（閾値はESからもらう想定）

### CM管理

- 作成したCMを編集、再生、削除、共有、センターアップロード、拡張デバイス割り当て（フェーズ2.0予定）を行う
- センターアップロードの形式は要検討
- 共有はU-DSからのグループ内でCMを利用できるようにする

### オリジナル管理

- オリジナルはユーザー自身で音声録音とTTS録音を行い、ナレーションとして利用する
- 新規作成、作成したオリジナルを再生、削除を行う
- 音声録音はユーザー側のマイクを利用して録音する
- TTS録音はあらかじめコメントが記載されているテンプレートから選択し、一部入力（店名、開店時間など）をユーザーが行い、外部APIを利用する

### CM発注（TODO）

- 企業CMなどUSENへ依頼するCM発注を行う
- リンクで依頼フォームへ飛ばす方針で検討中

## 詳細

- [画面一覧](SCREEN_LIST.md)
- [機能一覧](FEATURE_LIST.md)
- [シーケンス一覧](SEQUENCE_LIST.md)
- APIはswaggerで管理予定

## 外部連携

### MDM

- TODO: 仕様待ち
- intentによりユーザーIDを取得する

### TTS

- TODO: 先方調整中
- Hoya社のReadSpeakerを利用
- [webapi](https://cloud.voicetext.jp/webapi)
- サンプル
```
#!/bin/bash

url=https://api.voicetext.jp/v1/tts
key=esukobytdjetv1en

speakers="
hikari
takeru
"

text="
本日も、ご来店いただき、誠にありがとうございます。
お客様にお知らせいたします。
当店では、新型コロナウイルスの感染予防対策を推進しております。
ご来店の際は、出来る限りマスク着用の上、入店前には店頭備え付けのアルコール消毒液のご使用をお願いいたします。
ご不明な点がございましたら、お近くのスタッフまでお申し付けください。
"

for speaker in $speakers; do
  echo $speaker
  curl "$url" -o "$speaker.mp3" -u "$key:" -d "text=$text" -d "speaker=$speaker" -d "emotion=happiness" -d "emotion_level=1" -d "pitch=90" -d "speed=100"
  echo
  sleep 1
done

exit
```

### U-DS

- TODO: 仕様待ち
- U-DSからユーザー情報を取得する or ユーザーIDをキーにAPIへアクセスする

### センター・ES

- TODO: 仕様待ち
- 作成したCMをアップロードする
- U-MusicのCMカテゴリに合わせてメタ情報を設定する必要がある

### 拡張デバイス（フェーズ2.0）

- TODO: 仕様待ち
- フェーズ2.0対応予定

## アプリの配布

- U-Musicと同様にU-IDMから配布する
- 今後ユーザーのスマホからの利用も可能性としてあり（Google Play、Apple Storeへの公開）

## AWSのエラー検知

- TODO: U-Musicでどのようなエスかフローを構築するか確認中
- LambdaのログをCloudWatchへ飛ばし、CloudWatchからアラートログをSlackへ飛ばす方式を検討中(もしくはIM課へエスカレーション)

## 聴取ログ・利用動向レポート

- TODO: CP確認中
- オリジナルCMをローカル再生する場合などに聴取ログが必要か
- USEN提供の音源をどれくらい利用されているかレポートも必要か
- U-Musicの聴取ログ・レポートと合わせて確認中
