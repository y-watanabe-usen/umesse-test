# U MESSE

[![dev-dry-run-deploy](https://github.com/openusen/umesse/actions/workflows/dev-dry-run-deploy.yml/badge.svg)](https://github.com/openusen/umesse/actions/workflows/dev-dry-run-deploy.yml)
[![dev-deploy](https://github.com/openusen/umesse/actions/workflows/dev-deploy.yml/badge.svg)](https://github.com/openusen/umesse/actions/workflows/dev-deploy.yml)
[![stg-deploy](https://github.com/openusen/umesse/actions/workflows/stg-deploy.yml/badge.svg)](https://github.com/openusen/umesse/actions/workflows/stg-deploy.yml)
[![prod-deploy](https://github.com/openusen/umesse/actions/workflows/prod-deploy.yml/badge.svg)](https://github.com/openusen/umesse/actions/workflows/prod-deploy.yml)

- [U MESSE](#u-messe)
  - [Index](#index)
  - [プロジェクト構成](#プロジェクト構成)
  - [環境構築](#環境構築)
    - [準備](#準備)
    - [ローカル環境](#ローカル環境)
      - [AWS](#aws)
      - [Lambda](#lambda)
      - [VueJs](#vuejs)
  - [Swagger](#swagger)

## Index

- U MESSE 簡易CM作成アプリ
- ナレーション、チャイム、BGMから任意に素材を選択してCMを作成する
- 作成したCMは再生、グループ共有、センターアップロード後U MUSICで再生する
- 参考資料(https://docs.google.com/presentation/d/1plloUJstdpIdemTB1MyP4VQUClir-DfiCY6seTF-Xgs/edit#slide=id.p)

## プロジェクト構成

```bash
├── [deploy] (*デプロイ)
├── [develop] (*開発)
    ├── [lambda](https://github.com/openusen/umesse/blob/master/develop/lambda/README.md)
    ├── [twa]
    └── [webapp](https://github.com/openusen/umesse/blob/master/develop/webapp/README.md)
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
- [ffmpeg](https://ffmpeg.org/)

### ローカル環境

#### AWS

```bash
cd localstack
docker-compose up -d
cd ../develop/lambda/api
npm run build
cd ../develop/lambda/converter
npm run build
cd ../../../deploy/local
terraform init
terraform plan
terraform apply
./init.sh
```

#### Lambda

```bash
cd develop/lambda/api
npm install
npm run start:local
```

#### VueJs

```bash
cd develop/lambda/webapp
yarn install

# local
yarn serve:local

# develop
yarn serve

# production
yarn serve:production
```

## Swagger
