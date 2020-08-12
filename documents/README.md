# 構成図
![all-map](https://github.com/openusen/umesse/blob/master/documents/all-map.png)

# 概要
AWS上にブラウザによる機能を搭載し、アプリ側はTWAで表示する  
機能は大きく分けて、CM作成、CM管理、CM発注機能がある  

## CM作成
- ナレーション（コメント） + チャイム（ジングル） + BGM (無料の曲)を選択しMIXさせる
- 構成は、開始チャイム（任意）＋ナレーション（必須・複数可能：多言語を想定）＋終了チャイム（任意）となり、ナレーションの裏にBGM（任意）  
- 各素材は任意にボリューム調整可能
- USENが提供するナレーションだけでなく、自身で録音したデータ、TTSを利用したデータも作成、設定することができる
- MIX時に音圧調整を実施する

## CM管理
- 作成したCMをタブレット上で再生、U-Musicで再生するためセンターアップロード、外部デバイス（フェーズ2.0予定）へ転送管理する
- タブレットへはダウンロードして再生できるようにする
- センターアップロードの形式は要検討

## CM発注
- 企業CMなどUSENへ依頼するCM発注を行う
- 依頼方法は要検討（フェーズ1.5ではメール送信？）

# 機能一覧

## Webアプリ
| 機能 | 説明 |
| ---- | ---- |
| 認証 | TODO |
| マイク録音 | デバイス（タブレット直か外部マイク）を利用して音声を録音し、クラウドへアップロードする |
| TTS | テンプレート一覧（ナレーションのひな型）から店名などのみテキスト編集し、TTSを利用して音声を作成する |
| プロジェクト管理 | CM作成する上で、プロジェクト管理を行う　タイトルやカテゴリなどの属性情報が編集できる |
| CM作成・編集 | プロジェクト単位でナレーション、チャイム（開始/終了）、BGMを一覧から選択する　各素材の音量調整や視聴も可能 |
| CM出力 | 完成したCMをダウンロードして再生、もしくはセンターアップロードし、U-Music上で利用する　センターから削除も可能（プロジェクトと紐づける？） |
| CM再生 | ダウンロードしたCMを直再生か、外部デバイスで再生する |

## lambda
| 機能 | 説明 |
| ---- | ---- |
| 認証 | TODO |
| TOKEN発行 | 有効期限トークンを発行する |
| 素材管理 | ユーザーからの録音、TTS音源、USENが用意する収録音源、TTSで利用するテンプレートを格納、管理する |
| メタマスタ管理 | TODO |
| プロジェクト管理 | CM編集のプロジェクトを管理する |
| CM作成 | ffmpegを利用して音源ファイルを結合する |
| CM管理 | CM作成した音源、センターアップロードしたCMを管理する |

## s3
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

## dynamodb
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
