# draft

## 機能一覧

### Webアプリ

| 機能 | 説明 |  備考 |
| ---- | ---- | ---- |
| ユーザーID取得 | MDMからintentでユーザーIDを取得する | TODO: MDMのIntentの仕様 |
| キー認証 | キーを利用して認証を行い、トークンを取得する | |
| トークン認証 | 発行されたトークンを利用して各APIにて認証を行う | |
| マイク録音 | デバイス（タブレット直か外部マイク）を利用して音声を録音し、ブラウザ側でノイズカットし、クラウドへアップロードする | |
| CM再生 | ダウンロードしたCMをストリーム再生（キャッシュ）する | TODO: 再生方法の検討 |

### lambda

| 機能 | 説明 | 備考 |
| ---- | ---- | ---- |
| ユーザー情報取得 | U-DSからユーザー情報を取得する | TODO: U-DSの仕様確認 |
| キー認証 | キーを利用して認証を行い、トークンを発行する | |
| TTS作成 | テンプレート一覧（ナレーションのひな型）から店名などのみテキスト編集し、TTSを利用して音声を作成、管理する | |
| CM作成・編集 | プロジェクト単位でナレーション、チャイム（開始/終了）、BGMを一覧から選択する　各素材の音量調整や視聴も可能 | |
| CM MIX | ffmpegを利用して音源ファイルを結合する | |
| CMセンターアップロード | 完成したCMをセンターアップロードし、U-Music上で利用する　センターから削除も可能 | TODO: センターの仕様確認 |
| CM発注 | 企業CMの依頼を受け、データを送信する | TODO: 方針確認 |

## 定義

### s3

- bucket: umesse-users (private) : ユーザーデータ管理（本番）
- bucket: stg-umesse-users (private) : ユーザーデータ管理（ステージング）

```
users/(ユーザーID)/オリジナル/(タイトル).aac // オリジナル音源（音声録音、TTS録音）
                 /CM/(タイトル).aac // CM音源
share/(グループID)/CM/(タイトル).aac // TODO
```

- bucket: umesse-contents (private) : USEN収録音源管理（本番）
- bucket: stg-umesse-contents (private) : USEN収録音源管理（ステージング）

```
ナレーション/(カテゴリ名)/(タイトル).aac // コナレーション音源
チャイム/(カテゴリ名)/(タイトル).aac  // チャイム音源
BGM/(カテゴリ名)/(タイトル).aac   // BGM音源
```

- bucket: umesse-webapp (private) : 静的コンテンツ管理（本番）
- bucket: stg-umesse-webapp (private) : 静的コンテンツ管理（ステージング）

```
webapp/
```

### dynamodb

- table: umesse-users : ユーザー管理テーブル（本番）
- table: stg-umesse-users : ユーザー管理テーブル（ステージング）

```
{
  user_id: {S: xxxxx},
  items: {
    info: {
      name: {S: 店舗名},
      open_time: {S: Date},
      close_time: {S: Date},
      group_id: {S: xxxxx},
      status: {B: bool},
      date: {S: Date},
    },
    auth: {
      token: {S: トークンID},
      expiration: {S: Date},
    },
    contents: [ // max 30
      {
        cm_id: {S: ファイル名},
        cm_tags: [
          {S: タグ名},
        ],
        start_chime: {
          id: {S: ファイル名},
          volume: {N: double},
        },
        end_chime: {
          id: {S: ファイル名},
          volume: {N: double},
        },
        bgm: {
          id: {S: ファイル名},
          volume: {N: double},
        },
        narrations: [
          {
            id: {S: ファイル名},
            volume: {N: double},
          },
        ],
        date: {S: Date},
      },
    ],
    originals: [ // max 30
      {
        id: {S: ファイル名},
        date: {S: Date},
      },
    ],
    tags: [ // max 30
      {S: タグ名},
    ],
  },
}
```
