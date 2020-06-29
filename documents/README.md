# draft

## 機能一覧 (draft)
CM = コメント (comment) + ジングル (jingle) + BGM (music)

### app
- 認証
- 音源作成：録音・TTS・再生・アップロード (max 10?)
- 音源組立：プロジェクト作成・編集・削除 (max 10?)
- MIX音源ダウンロード・再生・センターアップロード (max 10?)

### lambda
- token発行
- コンテンツ管理 (contents)
- プロジェクト管理 (projects)
- 音源一覧 (comment/jingle/music/user contents)
- アカウント連携 (stbaccount or umembers key?)

### s3
- bucket: umesse-users (private) : ユーザーデータ
```
users/(user_id)/contents/(id).aac // 録音音源、TTS音源 
               /projects/(id).aac // CM音源
share/(group_id)/ // TODO
```
- bucket: umesse-contents (private) : 収録音源
```
comment/*.aac // コメント音源
jingle/*.aac  // ジングル音源（チャイムなど）
music/*.aac   // BGM音源
```

### dynamodb
- table: umesse-users : ユーザー管理テーブル
```
user_id:
  status:
  timestamp:
  auth:
    token_id:
    expiration:
  projects:[ // max 10?
    project_id:
      jingle_id:
      comment_id:
      music_id:
      mix_id:
      timestamp:
  ]
  contents:[ // max 10?
    content_id:
    timestamp:
  ]
```
## 構成図
![all-map](https://github.com/openusen/umesse/blob/master/documents/all-map.png)

## ユースケース図（U-Messe フェーズ0.5）
![alpha](https://github.com/openusen/umesse/blob/master/documents/u-messe%20version%20alpha.png)

## ユースケース図（U-Messe フェーズ1.0）
![beta](https://github.com/openusen/umesse/blob/master/documents/u-messe%20version%20beta.png)

