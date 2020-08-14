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

- bucket: umesse-users (private) : ユーザーデータ

```
users/(user_id)/contents/(id).aac // 録音音源、TTS音源 
               /projects/(id).aac // CM音源
share/(group_id)/ // TODO
```

- bucket: umesse-contents (private) : 収録音源

```
narration/(カテゴリ)/*.aac // コナレーション音源
chime/(カテゴリ)/*.aac  // チャイム音源
bgm/(カテゴリ)/*.aac   // BGM音源
```

- bucket: umesse-webapp (private) : 静的コンテンツ

### dynamodb

- table: umesse-users : ユーザー管理テーブル

```
{
  user_id: {S: xxxxx},
  items: {
    status: {N: 有効/無効},
    timestamp: {N: timestamp},
    group_id: {S: xxxxx},
    auth: {
      token_id: {S: tokenid},
      expiration: {N: timestamp},
    },
    projects: [ // max 10?
      {
        project_id: {N: id},
        project_title: {S: title},
        status: {N: 有効/無効}
        start_chime: {
          id: {S: (chime_id or file_name)},
          volume: {N: int},
        },
        end_chime: {
          id: {S: (chime_id or file_name)},
          volume: {N: int},
        },
        bgm: {
          id: {S: (bgm_id or file_name)},
          volume: {N: int},
        },
        narrations: [
          {
            id: {S: (narration_id or file_name)},
            volume: {N: int},
          },
        ],
        mix: {S: (mix_id or file_name)},
        timestamp: {N: timestamp},
      },
    ],
    originals:[ // max 10?
      {
        id: {S: (original_id or file_name)},
        timestamp: {N: timestamp},
      },
    ],
  },
}
```
