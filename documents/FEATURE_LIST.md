# 機能

## 機能一覧

### Nativeアプリ（TWA）

| 機能 | 説明 |  備考 |
| ---- | ---- | ---- |
| UNIS顧客CD取得 | MDMからintentでUNIS顧客CDを取得する | |
| パラメータ | Vuejsとの繋ぎこみ<br>/?unisCustomerCd=XXXX | |

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
| CMセンターアップロード | 作成したCMをセンターアップロードし、U-Music上で利用する　センターから削除も可能 | |
| CM共有 | 同一グループユーザーへ作成したCMを共有する<br>CM共有したユーザーのみがCM共有解除ができる | |
| CM発注 | 企業CMの依頼を受け、データを送信する | TODO: 方針確認中（リンクで飛ばすだけ） |
| オリジナル音声一覧 | ユーザーが作成した音声録音、TTS音源を一覧で表示する<br>ソート（タイトル、更新日時）を行えるようにする | |
| 音声録音 | デバイス（タブレット直か外部マイク）を利用して音声を録音し、ブラウザ側でノイズカットし、クラウドへアップロードする | |
| TTS作成 | テンプレート一覧（ナレーションのひな型）から店名などのみテキスト編集し、外部APIを利用して音声を作成する | |
| オリジナル音声再生 | 作成したオリジナルをストリーム再生する | |
| オリジナル音声削除 | 作成したオリジナルを削除する | |

### lambda

※swaggerに記載

## データ定義

コンテンツはs3で管理する  
ユーザー認証、ユーザー情報、CM作成情報はdynamodbで管理する  

### メタデータ

- USEN提供素材

| 区分 | タイトル名 | 説明文 | 原稿 | 秒数 | カテゴリ第一階層（業種） | カテゴリ第二階層（シーン） |
| --- | --- | --- | --- | --- | --- | --- |
| ナレーション | 〇 | 〇 | 〇 | 〇 | 〇 | 〇 |
| チャイム | 〇 | 〇 | - | 〇 | 〇 | 〇 |
| BGM | 〇 | 〇 | - | 〇 | 〇 | 〇 |
| TTSテンプレート | 〇 | 〇 | 〇 | - | 〇 | 〇 |

- ユーザー作成素材

| 区分 | タイトル名 | 説明文 | 原稿 | 秒数 | カテゴリ第一階層（業種） | カテゴリ第二階層（シーン） |
| --- | --- | --- | --- | --- | --- | --- |
| CM | 〇 | 〇（任意） | - | 〇 | 〇（固定） | 〇（固定） |
| 録音音声 | 〇 | 〇（任意） | - | 〇 | 〇（固定） | 〇（固定） |
| 合成音声 | 〇 | 〇（任意） | - | 〇 | 〇（固定） | 〇（固定） |

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
  UnisCustomerCd: {S: '顧客CD'},
  Auth: {
    Token: {S: トークンID}
    Expiration: {S: Date},
  },
  Cm: [
    {
      Id: {S, 'ファイル名'},
      Title: {S, 'タイトル名'},
      Description: {S, '説明文'},
      Seconds: {I, '秒数'},
      StartDate: {S, '2014-10-10T13:50:40+09:00'},
      EndDate: {S, '9999-12-31T23:59:59+09:00'},
      ProductionType: {S, '01: 音楽系, 02: 素ナレ'},
      Category1: {S: '業種名'},
      Category2: {S: 'シーン名'},
      Materials: {
        Narrations: [
          {
            Id: {S, 'ファイル名'},
            Volume: {I, 'ボリューム値'},
          }
        ],
        StartChime: {
          Id: {S, 'ファイル名'},
          Volume: {I, 'ボリューム値'},
        },
        EndChime: {
          Id: {S, 'ファイル名'},
          Volume: {I, 'ボリューム値'},
        },
        Bgm: {
          Id: {S, 'ファイル名'},
          Volume: {I, 'ボリューム値'},
        },
      },
      CenterShear: {B, false},
      GroupShear: {B, false},
      TimeStamp: {S, '2014-10-10T13:50:40+09:00'}
    }
  ],
  Recording: [
    {
      Id: {S, 'ファイル名'},
      Title: {S, 'タイトル名'},
      Description: {S, '説明文'},
      Category1: {S: '業種名'},
      Category2: {S: 'シーン名'},
      StartDate: {S, '2014-10-10T13:50:40+09:00'},
      TimeStamp: {S, '2014-10-10T13:50:40+09:00'}
    }
  ],
  tts: [
    {
      Id: {S, 'ファイル名'},
      Title: {S, 'タイトル名'},
      Description: {S, '説明文'},
      Category1: {S: '業種名'},
      Category2: {S: 'シーン名'},
      StartDate: {S, '2014-10-10T13:50:40+09:00'},
      TimeStamp: {S, '2014-10-10T13:50:40+09:00'}
    },
  ],
}
```

- USEN収録音源のメタ情報管理
- table: umesse-contents : コンテンツ管理テーブル（本番）
- table: stg-umesse-contents : コンテンツ管理テーブル（ステージング）

```none
{
  Id: {S: 'ファイル名'},
  Title: {S: 'タイトル名'},
  Description: {S: '説明文'},
  Manuscript: {S: '原稿'},
  Seconds: {I: '秒数'},
  Category1: {S: '業種名'},
  Category2: {S: 'シーン名'},
  TimeStamp: {S, '2014-10-10T13:50:40+09:00'}
}
```

- センター連携管理
- table: umesse-center : センター連携管理テーブル（本番）
- table: stg-umesse-center : センター連携管理テーブル（ステージング）

```none
{
  UnisCustomerCd: {S, '顧客CD'},
  DataProcessType: {S, '01: 追加, 02: 変更, 03: 削除'}
  Id: {S, 'ファイル名'},
  Title: {S, 'タイトル名'},
  Description: {S, '説明文'},
  Seconds: {I, '秒数'},
  StartDate: {S, '2014-10-10T13:50:40+09:00'},
  EndDate: {S, '9999-12-31T23:59:59+09:00'},
  ProductionType: {S, '01: 音楽系, 02: 素ナレ'},
  Category1: {S: '業種名'},
  Category2: {S: 'シーン名'},
  Status: {I, '0: 連携準備中, 1: 連携可能'}
  TimeStamp: {S, '2014-10-10T13:50:40+09:00'}
}
```
