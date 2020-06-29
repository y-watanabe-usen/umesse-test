# draft

## 構成図
![all-map](https://github.com/openusen/umesse/blob/master/documents/all-map.png)

## 機能一覧 (draft)
CM作成 = コメント (ナレーション) + ジングル (チャイム) + BGM (無料の曲)を組み合わせる

### アプリ
| 機能 | 説明 |
| ---- | ---- |
| 認証 | TODO |
| 素材作成 | マイク録音、TTSを利用してオリジナルのコメント素材音源を作成し、アップロードする |
| CM編集 | プロジェクト単位でコメント、ジングル（開始/終了）、BGMを一覧から選択する　各素材の音量調整や視聴も可能 |
| CM出力 | CM編集で作成したCMをダウンロードして再生、センターアップロードする |

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
{
  user_id: {S: xxxxx},
  items: {
    status: {N: 停止/無料/有料},
    timestamp: {N: timestamp},
    auth: {
        token_id: {S: tokenid},
        expiration: {N: timestamp},
    },
    projects: [ // max 10?
        project_id: {N: id},
        comment_id: {N: id},
        jingle_id: {N: id},
        music_id: {N: id},
        mix_id: {N: id},
        timestamp: {N: timestamp},
    ],
    contents:[ // max 10?
        content_id: {N: id},
        timestamp: {N: timestamp},
    ],
  },
}
```

## ユースケース図（U-Messe フェーズ0.5）
![alpha](https://github.com/openusen/umesse/blob/master/documents/u-messe%20version%20alpha.png)

## ユースケース図（U-Messe フェーズ1.0）
![beta](https://github.com/openusen/umesse/blob/master/documents/u-messe%20version%20beta.png)

