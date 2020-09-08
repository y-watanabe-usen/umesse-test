## terraform deployemnts


## LocalStackの立ち上げ
.envにて設定変更する
```
cd localstack
dokcer-compose up -d

```

## LocalStackへのdeploy
```
$ cd deploy
$ terraform init
$ terraform plan
var.access_key
  Enter a value: local

var.secret_key
  Enter a value: local

$ terraform apply
```


## call lambda api via apigateway
```
./curl_lambda.sh
```

