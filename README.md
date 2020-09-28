# umesse

- [Index](#Index)
- [環境構築](#環境構築)
  - [準備](#準備)
  - [ローカル環境](#ローカル環境)
- [検討](#検討)

## Index
- U-Messe 簡易CM作成アプリ
- 参考資料(https://docs.google.com/presentation/d/1plloUJstdpIdemTB1MyP4VQUClir-DfiCY6seTF-Xgs/edit#slide=id.p)


## プロジェクト構成
```
├── [deploy]
├── [design] (*設計資料)
├── [develop] (*開発)
├── [localstack] (*ローカルAWS)
├── [sample_data]
└── [documents](https://github.com/openusen/umesse/documents)
    ├── design *デザインとか
    │   └── aws.wsd
    └── docker
```

## 環境構築
### 準備
下記をインストールする
- [aws cli](https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/install-cliv2.html)
- [npm](https://nodejs.org/ja/download/)
- [terraform](https://www.terraform.io/downloads.html)
### ローカル環境

#### AWS
```
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
```
cd develop/lambda
node ./src/app.local.js
```
#### VueJs
```
cd develop/lambda
node ./src/app.local.js

cd develop/webapp
yarn dev
```


## Swagger