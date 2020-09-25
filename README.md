# umesse




- [Index](#Index)
- [Design](#design)
- [各種Package](#packages)
- [環境構築](#環境構築)
  - [docker-composeでの起動](#docker-composeでの起動)
  - [開発環境](#開発環境)
    - [Install terraform](https://terraform.com)
    - [backend](#backend)
    - [frontend](#client)
    - [ローカル環境](#ローカル環境)
  - [検討](#検討)

## Index
- U-Messe 簡易CM作成アプリ
- 参考資料(https://docs.google.com/presentation/d/1plloUJstdpIdemTB1MyP4VQUClir-DfiCY6seTF-Xgs/edit#slide=id.p)

## Prerequired
### aws cli

https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/install-cliv2.html

### npm or yarn

https://classic.yarnpkg.com/ja/docs/install/#debian-stable

### terraform

https://www.terraform.io/downloads.html
https://hub.docker.com/r/hashicorp/terraform/

## プロジェクト構成
```
github.com
└── umesse 
    ├── [deploy](https://github.com/openusen/umesse/deploy)
    ├── [design](https://github.com/openusen/umesse/design)
    ├── [develop](https://github.com/openusen/umesse/develop)
    ├── [localstack](https://github.com/openusen/umesse/develop)
    ├── [sample_data](https://github.com/openusen/umesse/develop)
    └── [documents](https://github.com/openusen/umesse/documents)
        ├── design *デザインとか
        │   └── aws.wsd
        └── docker
```

## 環境構築

### 開発環境
- Install terraform
- backend
- frontend
- ローカル環境

## 検討
