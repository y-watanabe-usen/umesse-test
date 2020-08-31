# draft

## 機能一覧

### Webアプリ

| 機能 | 説明 |  備考 |
| ---- | ---- | ---- |
| ユーザーID取得 | MDMからintentでユーザーIDを取得する | TODO: MDMのIntentの仕様 |
| キー認証 | キーを利用して認証を行い、トークンを取得する | |
| トークン認証 | 発行されたトークンを利用して各APIにて認証を行う | |
| 音声録音 | デバイス（タブレット直か外部マイク）を利用して音声を録音し、ブラウザ側でノイズカットし、クラウドへアップロードする | |
| TTS作成 | テンプレート一覧（ナレーションのひな型）から店名などのみテキスト編集し、TTSを利用して音声を作成、管理する | |
| CM作成・編集 | ナレーション、チャイム（開始/終了）、BGMを一覧から選択する　各素材の音量調整や視聴も可能 | |
| CM MIX | ffmpegを利用して音源ファイルを結合する | |
| CM再生 | 作成したCMをストリーム再生する | |
| CM削除 | 作成したCMを削除する | |
| CMセンターアップロード | 完成したCMをセンターアップロードし、U-Music上で利用する　センターから削除も可能 | TODO: センターの仕様確認 |
| CM発注 | 企業CMの依頼を受け、データを送信する | TODO: 方針確認 |

### lambda

| 機能 | 説明 | 備考 |
| ---- | ---- | ---- |
| ユーザー情報取得 | U-DSからユーザー情報を取得する | TODO: U-DSの仕様確認 |
| キー認証 | キーを利用して認証を行い、トークンを発行する | |

## API
| 機能 | 説明 | 備考 |
| ---- | ---- | ---- |
| ユーザー情報取得 | U-DSからユーザー情報を取得する | TODO: U-DSの仕様確認 |
| キー認証 | キーを利用して認証を行い、有効期限トークンを発行する | |
| 一覧取得 | 作成したCM、オリジナル音源を一覧で取得する<br>オブジェクトのタグ（CMのみ）も取得し、ソート（タイトル、更新日時）、絞り込み（タグ）を行えるようにする | |
| 詳細取得・更新 | 作成したCM、オリジナル音源の詳細を取得、削除を行う | | |
| 署名URL取得 | CM再生や音声アップロードで署名付きURLの発行を行う | |
| データ削除 | バケットおよびテーブルから該当データを削除する | |
| CMセンターアップロード | | TODO |
| CM共有・解除 | 作成したCMをグループ内に共有・解除する | |
| 音源結合 | ffmpegを利用して音源ファイルを結合する | |
| TTS作成 | 外部APIを利用してTTS音源を作成する | |

## 定義

コンテンツは基本的にs3で管理する  
ユーザー認証、ユーザー情報、CM作成情報はdynamodbで管理する  

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
TTS/(カテゴリ名)/(タイトル).txt // TTSテンプレート
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
      status: {BOOL: boolean},
      date: {S: Date},
    },
    auth: {
      token: {S: トークンID},
      expiration: {S: Date},
    },
    contents: [ // max 30
      {
        cm_id: {S: ファイル名},
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
        share: {BOOL: boolean},
        date: {S: Date},
      },
    ],
  },
}
```
