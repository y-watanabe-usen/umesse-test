## terraform deployemnts


## LocalStackの立ち上げ
.envにて設定変更する
```
cd localstack
dokcer-compose up -d

```

## LocalStackへのdeploy
```
$ cd docker/lambda
$ npm install
$ cd ../..
$ cd deploy
$ terraform init
$ terraform plan
var.access_key
  Enter a value: local

var.secret_key
  Enter a value: local

$ terraform apply
$ init.sh  // s3のデータ転送
```


## call lambda api via apigateway
```
./curl_lambda.sh
```

### send SQS
```
aws --endpoint-url http://localhost:4566 --region ap-northeast-1 sqs send-message --queue-url $(terraform output sqs_url) --message-body "hello"
```

