# terraform

## terraform deployemnts

## LocalStackの立ち上げ

.envにて設定変更する

```bash
cd localstack
dokcer-compose up -d
```

## LocalStackへのdeploy

```bash
cd ../develop/lambda/api
npm run build
cd ../converter
npm run build

cd ../../../deploy/local
terraform init
terraform plan
terraform apply
init.sh  // s3のデータ転送
```

## call lambda api via apigateway

```bash
./curl_lambda.sh
```

### send SQS

```bash
aws --endpoint-url http://localhost:4566 --region ap-northeast-1 sqs send-message --queue-url $(terraform output sqs_url) --message-body "hello"
```

## awsへのdeploy(default=dev)

```bash
cd ../develop/lambda/api
rm -rf node_modules/
npm run build:prod
cd ../converter
rm -rf node_modules/
npm run build:prod

cd ../../../deploy/aws
terraform init
terraform plan
terraform apply
```

## workspaceの管理

```bash
terraform workspace new [dev / stg / prod ]
terraform workspace select [ default / dev / stg / prod ]
terraform init
terraform plan
```
