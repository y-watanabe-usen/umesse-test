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
| CM発注 | 企業CMの依頼を受け、データを送信する |  |
| オリジナル音声一覧 | ユーザーが作成した音声録音、TTS音源を一覧で表示する<br>ソート（タイトル、更新日時）を行えるようにする | |
| 音声録音 | デバイス（タブレット直か外部マイク）を利用して音声を録音し、ブラウザ側でノイズカットし、クラウドへアップロードする | |
| TTS作成 | フリー入力、もしくはテンプレート一覧からコピーしテキスト編集し、外部APIを利用して音声を作成する | |
| オリジナル音声再生 | 作成したオリジナルをストリーム再生する | |
| オリジナル音声削除 | 作成したオリジナルを削除する | |

### lambda

※swaggerに記載

## データ定義

コンテンツはs3で管理する  
ユーザー認証、ユーザー情報、CM作成情報はdynamodbで管理する  

### メタデータ

- USEN提供素材

| 区分 | タイトル名 | 説明文 | 原稿 | 秒数 | 業種（カテゴリ第一階層） | シーン（カテゴリ第二階層） |
| --- | --- | --- | --- | --- | --- | --- |
| ナレーション | 〇 | 〇 | 〇 | 〇 | 〇 | 〇 |
| チャイム | 〇 | 〇 | - | 〇 | - | - |
| BGM | 〇 | 〇 | - | 〇 | 〇 | - |
| TTSテンプレート | 〇 | 〇 | 〇 | - | 〇 | 〇 |

※freeの原稿はナレーションを利用
※拡張子：mp3
※掲載開始、終了日時不要

- ユーザー作成素材

| 区分 | タイトル名 | 説明文 | 原稿 | 秒数 | 業種（カテゴリ第一階層） | シーン（カテゴリ第二階層） |
| --- | --- | --- | --- | --- | --- | --- |
| CM | 〇 | 〇（任意） | - | 〇 | 〇（固定） | 〇 |
| 録音音声 | 〇 | 〇（任意） | - | 〇 | - | - |
| 合成音声 | 〇 | 〇（任意） | - | 〇 | - | - |

### 各IDのルール

- CMのID、録音のIDなどは下記ルールで実施
- [顧客コード]-[区分]-[ランダム小文字英数8桁] ※ランダムは作成時に発行する
- CMの場合：0999999999-c-1a2b3c4d（ファイル名：0999999999-c-1a2b3c4d.aac）
- 音声の場合：0999999999-r-1a2b3c4d（ファイル名：0999999999-r-1a2b3c4d.mp3）
- TTSの場合：0999999999-t-1a2b3c4d（ファイル名：0999999999-t-1a2b3c4d.mp3）

### CMのステータス管理

- CMの状態を管理する

| 区分 | 内容 | 詳細 |
| --- | --- | --- |
| 00 | CM削除 | CMを削除した状態（情報は保持している状態、論理削除） |
| 01 | CM作成中 | CMを結合している状態 |
| 02 | CM作成完了 | CM作成が完了した状態（再生やセンターアップロードができる状態） |
| 03 | CMエンコード中 | CMを音圧調整している状態 |
| 04 | CM共有中 | 顧客グループでCMを共有している状態 |
| 05 | CM生成中 | CMを生成している状態 |
| 09 | CM作成エラー | 音圧調整が失敗などCM作成時に何らかエラーがあり完了していない状態 |
| 11 | 外部システムアップロード中 | CMを外部システム連携中の状態（追加・更新・削除連携時） |
| 12 | 外部システムアップロード完了 | 外部システム連携完了した状態 |
| 19 | 外部システムアップロードエラー | 外部システム連携で何らかのエラーがあり完了していない状態 |

※外部システムはuploadSystemで01=センター、02=S'senceと管理する

### s3

- ユーザー作成音源、CMを管理
- bucket: umesse-users (private) : ユーザーデータ管理（本番）
- bucket: stg-umesse-users (private) : ユーザーデータ管理（ステージング）
- bucket: dev-umesse-users (private) : ユーザーデータ管理（開発）

```none
users/(UNIS顧客CD)/cm/(id).aac // CM
                  /recording/(id).mp3 // 録音音声
                  /tts/(id).mp3 // TTS音声
group/(グループCD)/cm/(id).aac // 共有CM
```

- USEN収録音源を管理
- bucket: umesse-contents (private) : USEN収録音源管理（本番）
- bucket: stg-umesse-contents (private) : USEN収録音源管理（ステージング）
- bucket: dev-umesse-contents (private) : USEN収録音源管理（開発）

```none
narration/(id).mp3 // ナレーション音源
chime/(id).mp3  // チャイム音源
bgm/(id).mp3   // BGM音源
```

- Webアプリを管理
- bucket: umesse-webapp (private) : 静的コンテンツ管理（本番）
- bucket: stg-umesse-webapp (private) : 静的コンテンツ管理（ステージング）
- bucket: dev-umesse-webapp (private) : 静的コンテンツ管理（開発）

```none
webapp/
```

### dynamodb

- ユーザー情報を管理(UDS APIからデータ取得)
- table: umesse-users : ユーザー管理テーブル（本番）
- table: stg-umesse-users : ユーザー管理テーブル（ステージング）
- table: dev-umesse-users : ユーザー管理テーブル（開発）

```none
{
  "unisCustomerCd": {"S": "UNIS顧客CD"},
  "contractCd": {"S": "NeOS契約CD"},
  "serviceCd": {"S": "サービスCD"},
  "serviceName": {"S": "サービス名"},
  "customerName": {"S": "顧客設置先名称"},
  "customerNameKana": {"S": "顧客設置先名称カナ"},
  "customerGroupCd": {"S": "顧客グループCD"},
  "customerGroupName": {"S": "顧客グループ名"},
  "contractStatusCd": {"S": "契約ステータスCD"},
  "contractStatusName": {"S": "契約ステータス名"},
  "createDate": {"S": "2019-09-01T09:00:00+9:00"},
  "renewalDate": {"S": "2019-09-01T09:00:00+9:00"},
  "cm": {
    "L": [
      {
        "M": {
          "id": {"S": "ファイル名"},
          "title": {"S": "タイトル名"},
          "description": {"S": "説明文"},
          "seconds": {"N": "秒数"},
          "startDate": {"S": "2019-09-01T09:00:00+9:00"},
          "endDate": {"S": "9999-12-31T23:59:59+09:00"},
          "productionType": {"S": "01: 音楽系, 02: 素ナレ"},
          "industry": {
            "M": {
              "industryCd": {"S": "01"},
              "industryName": {"S": "全業種"}
            }
          },
          "scene": {
            "M": {
              "sceneCd": {"S": "01"},
              "sceneName": {"S": "全シーン"}
            }
          },
          "materials": {
            "M": {
              "narrations": {
                "L": [
                  {
                    "M": {
                      "id": {"S": "ファイル名"},
                      "volume": {"N": "ボリューム値"}
                    }
                  },
                  {
                    "M": {
                      "id": {"S": "ファイル名"},
                      "volume": {"N": "ボリューム値"}
                    }
                  },
                  {
                    "M": {
                      "id": {"S": "ファイル名"},
                      "volume": {"N": "ボリューム値"}
                    }
                  },
                  {
                    "M": {
                      "id": {"S": "ファイル名"},
                      "volume": {"N": "ボリューム値"}
                    }
                  }
                ]
              },
              "startChime": {
                "M": {
                  "id": {"S": "ファイル名"},
                  "volume": {"N": "ボリューム値"}
                }
              },
              "endChime": {
                "M": {
                  "id": {"S": "ファイル名"},
                  "volume": {"N": "ボリューム値"}
                }
              },
              "bgm": {
                "M": {
                  "id": {"S": "ファイル名"},
                  "volume": {"N": "ボリューム値"}
                }
              }
            }
          },
          "uploadSystem": {"S": "01: センター, 02: S'sence"},
          "status": {"S": "00: CM削除, 01: CM作成中, 02: CM作成完了, 03: CMエンコード中, 04: CM共有中, 05, CM生成中, 09: CM作成エラー, 11: 外部システムアップロード中, 12: 外部システムアップロード完了, 19: 外部システムアップロードエラー"},
          "timestamp": {"S": "2019-09-01T09:00:00+9:00"}
        }
      }
    ]  
  },
  recording: [
    {
      id: {S, 'ファイル名'},
      title: {S, 'タイトル名'},
      description: {S, '説明文'},
      startDate: {S, '2014-10-10T13:50:40+09:00'},
      timestamp: {S, '2014-10-10T13:50:40+09:00'}
    }
  ],
  tts: [
    {
      id: {S, 'ファイル名'},
      title: {S, 'タイトル名'},
      description: {S, '説明文'},
      startDate: {S, '2014-10-10T13:50:40+09:00'},
      timestamp: {S, '2014-10-10T13:50:40+09:00'}
    }
  ],
}
```

- USEN収録音源のメタ情報管理
- table: umesse-contents : コンテンツ管理テーブル（本番）
- table: stg-umesse-contents : コンテンツ管理テーブル（ステージング）
- table: dev-umesse-contents : コンテンツ管理テーブル（開発）

```none
{
  "id": {"S": "ファイル名"},
  "category": {"S": "カテゴリー"},
  "title": {"S": "タイトル名"},
  "description": {"S": "説明文"},
  "manuscript": {"S": "原稿"},
  "seconds": {"N": "秒数"},
  "industry": {
    "L": [
      {
        "M": {
          "cd": {"S": "業種CD"},
          "name": {"S": "業種名"}
        }
      }
    ]
  },
  "scenes": {
    "L": [
      {
        "M": {
          "cd": {"S": "シーンCD"},
          "name": {"S": "シーン名"}
        }
      }
    ]
  },
  "timestamp": {"S": "2019-09-01T09:00:00+9:00"}
}
```

- 外部連携管理
- table: umesse-external : 外部連携管理テーブル（本番）
- table: stg-umesse-external : 外部連携管理テーブル（ステージング）
- table: dev-umesse-external : 外部連携管理テーブル（開発）

```none
{
  "unisCustomerCd": {"S": "顧客CD"},
  "dataProcessType": {"S": "01: 追加, 02: 変更, 03: 削除"}
  "cmId": {"S": "ファイル名"},
  "cmName": {"S": "タイトル名"},
  "cmCommentManuscript": {"S": "説明文"},
  "startDatetime": {"S", "2014-10-10T13:50:40+09:00"},
  "endDatetime": {"S", "9999-12-31T23:59:59+09:00"},
  "productionType": {"S", "01: 音楽系, 02: 素ナレ"},
  "contentTime": {"N", "秒数"},
  "sceneCd": {"S": "シーンCD"},
  "uploadSystem": {"S": "01: センター, 02: S'sence"},
  "status": {"S": "0: 連携準備中, 1: 連携可能, 9: 連携エラー"},
  "errorCode": {"S": "エラーコード"},
  "errorMessage": {"S": "エラーメッセージ"},
  "timestamp: {"S": "2014-10-10T13:50:40+09:00"}
}
```
