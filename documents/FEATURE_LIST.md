# 機能

## 機能一覧

### Nativeアプリ（TWA）

| 機能 | 説明 |  備考 |
| ---- | ---- | ---- |
| UNIS顧客CD取得 | MDMからintentでUNIS顧客CDを取得する | |
| パラメータ | Vuejsとの繋ぎこみ<br>/?custCd=XXXX | |

### Webアプリ（Vue）

| 機能 | 説明 |  備考 |
| ---- | ---- | ---- |
| キー認証 | キーを利用して認証を行い、トークンを取得する | |
| トークン認証 | 発行されたトークンを利用して各APIにアクセスする | |
| CM一覧 | ユーザーが作成したCMを一覧で表示する<br>ソート（タイトル、更新日時）を行えるようにする | |
| CM作成・編集 | ナレーション、チャイム（開始/終了）、BGMを一覧から選択する　各素材の音量調整や視聴も可能 | |
| CM MIX | ffmpegを利用して音源ファイルを結合する | |
| CM再生 | 作成したCMをストリーム再生する | |
| CM削除 | 作成したCMを削除する | |
| CMセンターアップロード | 作成したCMをセンターアップロードし、U-Music上で利用する　センターから削除も可能 | TODO: センターの仕様確認 |
| CM共有 | 同一グループユーザーへ作成したCMを共有する<br>CM共有したユーザーのみがCM共有解除ができる | |
| CM発注 | 企業CMの依頼を受け、データを送信する | TODO: 方針確認中（リンクで飛ばすだけ） |
| オリジナル音声一覧 | ユーザーが作成した音声録音、TTS音源を一覧で表示する<br>ソート（タイトル、更新日時）を行えるようにする | |
| 音声録音 | デバイス（タブレット直か外部マイク）を利用して音声を録音し、ブラウザ側でノイズカットし、クラウドへアップロードする | |
| TTS作成 | テンプレート一覧（ナレーションのひな型）から店名などのみテキスト編集し、外部APIを利用して音声を作成する | |
| オリジナル音声再生 | 作成したオリジナルをストリーム再生する | |
| オリジナル音声削除 | 作成したオリジナルを削除する | |

### lambda

| 機能 | protocol | path |
| ---- | ---- | ---- |
| 認証 | get | /auth |

| 機能 | protocol | path |
| ---- | ---- | ---- |
| ユーザー情報取得 | get | /user |
| CM一覧取得（ユーザー作成） | get | /user/cm |
| 録音音声一覧取得（ユーザー作成） | get | /user/recording |
| TTS音声一覧取得（ユーザー作成） | get | /user/tts |
| CM作成情報取得（ユーザー作成） | get/post | /user/cm/{cmid} |
| 録音音声作成情報取得（ユーザー作成） | get/post | /user/recording/{recordingid} |
| TTS音声作成情報取得（ユーザー作成） | get/post | /user/tts/{ttsid} |
| チャイム一覧取得（USEN提供素材） | get | /chime |
| BGM一覧取得（USEN提供素材） | get | /bgm |
| ナレーション一覧取得（USEN提供素材） | get | /narration |
| TTSテンプレート一覧取得（USEN提供素材） | get | /tts |

| 機能 | protocol | path |
| ---- | ---- | ---- |
| 試聴 | get | /listen |

## データ定義

コンテンツは基本的にs3で管理する  
ユーザー認証、ユーザー情報、CM作成情報はdynamodbで管理する  

### USEN提供素材

USENが提供する音源素材は下記

- ナレーション
- チャイム
- BGM
- TTSテンプレート

メタ情報は下記
| 区分 | タイトル名 | 説明文 | 原稿 | 秒数 | カテゴリ第一階層（業種） | カテゴリ第二階層（シーン） |
| --- | --- | --- | --- | --- | --- | --- |
| ナレーション | 〇 | 〇 | 〇 | 〇 | 〇 | 〇 |
| チャイム | 〇 | 〇 | - | 〇 | 〇 | 〇 |
| BGM | 〇 | 〇 | - | 〇 | 〇 | 〇 |
| TTSテンプレート | 〇 | 〇 | 〇 | - | 〇 | 〇 |

### オリジナル音源

ユーザーが作成できる音源は下記

- CM
- 録音音声
- 合成音声（TTS）

メタ情報は下記
| 区分 | タイトル名 | 説明文 | 秒数 | カテゴリ（シーン） | 作成日 | 更新日 |
| --- | --- | --- | --- | --- | --- | --- |
| CM | 〇 | 〇(任意) | 〇 | 〇 | 〇 | 〇 |
| 録音音声 | 〇 | 〇(任意) | 〇 | - | 〇 | 〇 |
| 合成音声 | 〇 | 〇(任意) | 〇 | - | 〇 | 〇 |

### s3

- ユーザー作成音源、CMを管理
- bucket: umesse-users (private) : ユーザーデータ管理（本番）
- bucket: stg-umesse-users (private) : ユーザーデータ管理（ステージング）

```none
users/(unis_customer_cd)/cm/(id).aac // CM
                        /recording/(id).opus // 録音音声
                        /tts/(id).mp3 // TTS音声
share/(group_cd)/cm/(cm_id).aac
```

- USEN収録音源、TTSテンプレートを管理
- bucket: umesse-contents (private) : USEN収録音源管理（本番）
- bucket: stg-umesse-contents (private) : USEN収録音源管理（ステージング）

```none
narration/(id).mp3 // ナレーション音源
chime/(id).mp3  // チャイム音源
bgm/(id).mp3   // BGM音源
tts/(id).txt // TTSテンプレート
```

- Webアプリを管理
- bucket: umesse-webapp (private) : 静的コンテンツ管理（本番）
- bucket: stg-umesse-webapp (private) : 静的コンテンツ管理（ステージング）

```none
webapp/
```

### dynamodb

- ユーザーの認証情報、CM情報を管理
- table: umesse-users : ユーザー管理テーブル（本番）
- table: stg-umesse-users : ユーザー管理テーブル（ステージング）

```none
{
  Id: {S: xxxxx},
  Auth: {
    Token: {S: トークンID}
    Expiration: {S: Date},
  },
  Cm: [
    {
      id: {S, XXXX},
      ファイル名
      タイトル
      説明文
      素材
      値
      センター
      共有
    },
    {
      id: {S, XXXXX},
      タイトル
      説明文
      素材
      値
      センター
      共有
    },
  ],
  recording: [
    {
      id: {S, XXXXX},
      タイトル
      説明文
    },
    {
      id: {S, XXXXX},
      タイトル
      説明文
    },
  ],
  tts: [
    {
      id: {S, XXXXX},
      タイトル
      説明文
      TTSテンプレート
    },
    {
      id: {S, XXXXX},
      タイトル
      説明文
      TTSテンプレート
    },
  ],
}
```

- USEN収録音源のメタ情報管理
- table: umesse-contents : コンテンツ管理テーブル（本番）
- table: stg-umesse-contents : コンテンツ管理テーブル（ステージング）

```none
{
  Id: {S: xxxxx},
  Title: {S: タイトル名},
  Description: {S: 説明文},
  Manuscript: {S: 原稿},
  Seconds: {I: 秒数},
  Category1: {S: 業種名},
  Category2: {S: シーン名},
}
```

- センター連携管理
- table: umesse-center : センター連携管理テーブル（本番）
- table: stg-umesse-center : センター連携管理テーブル（ステージング）

```none
{
  Id: {S: xxxxx},
  Title: {S: タイトル名},
  Description: {S: 説明文},
  Seconds: {I: 秒数},
  Category1: {S: 業種名},
  Category2: {S: シーン名},
}
```
