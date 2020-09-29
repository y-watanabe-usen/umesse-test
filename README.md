# U MESSE

- [Index](#Index)
- [環境構築](#環境構築)
  - [準備](#準備)
  - [ローカル環境](#ローカル環境)
- [検討](#検討)

## Index

- U MESSE 簡易CM作成アプリ
- ナレーション、チャイム、BGMから任意に素材を選択してCMを作成する
- 作成したCMは再生、グループ共有、センターアップロード後U MUSICで再生する
- 参考資料(https://docs.google.com/presentation/d/1plloUJstdpIdemTB1MyP4VQUClir-DfiCY6seTF-Xgs/edit#slide=id.p)

## プロジェクト構成

```bash
├── [deploy] (*デプロイ)
├── [develop] (*開発)
├── [localstack] (*ローカルAWS)
├── [sample_data] (*サンプル音源素材)
└── [documents](https://github.com/openusen/umesse/documents)
    ├── design *デザイン
    │   └── aws.wsd
    └── docker
```

## 環境構築

### 準備

下記をインストールする

- [aws cli](https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/install-cliv2.html)
- [npm](https://nodejs.org/ja/download/)
- [yarn](https://classic.yarnpkg.com/ja/docs/install/#windows-stable)
- [terraform](https://www.terraform.io/downloads.html)

### ローカル環境

#### AWS

```bash
cd localstack
docker-compose up -d
cd ../develop/lambda
npm install
cd ../../deploy
terraform init
terraform plan
terraform apply
./curl_lambda.sh
```

#### Lambda

```bash
cd develop/lambda
node ./src/app.local.js
```

#### VueJs

```bash
cd develop/lambda
node ./src/app.local.js

cd develop/webapp
# develop
yarn serve

# production
yarn serve:production
```

## Swagger
