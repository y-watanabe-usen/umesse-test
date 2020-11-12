## umesse-lambda




### swagger編集用のUIをdokcerで立ち上げる
```
docker run -itd --name swagger-editor -v ${PWD}/openapi.yaml:/openapi.yaml -e SWAGGER_FILE=/openapi.yaml -p 8080:8080 swaggerapi/swagger-editor
```

### swaggerのviewer
```
docker run -itd --name swagger-ui -v ${PWD}/openapi.yaml:/openapi.yaml -e SWAGGER_JSON=/openapi.yaml -p 8080:8080 swaggerapi/swagger-ui
```

## Code生成について
openapi.yamlを修正したらlamda側,webapp側のコードを再生成する

### Lambda側のcode生成
develop/lambda/src配下にコード生成を行う
```
docker run --rm -it \
	-v ${PWD}:/local swaggerapi/swagger-codegen-cli-v3 generate \
	-i /local/openapi.yaml  \
	-l nodejs-server -o /local/src
```

### Webapp側のコード生成
develop/webapp/umesseapiに生成する
```
docker run --rm -it \
	-v ${PWD}:/local swaggerapi/swagger-codegen-cli-v3 generate \
	-i /local/openapi.yaml  \
	-l typescript-axios -o /local/umesseapi
```


### 実装について
* develop/lambda/src/service 配下の関数を実装する
* develop/lambda/src/service以外のファイルはswaggerからコード生成した状態にしておく事
* develop/lambda/umesse/　配下に上記serviceからコールする実体を置く

### LambdaのLog
aws --endpoint-url=http://localhost:4566 --region ap-northeast-1 --profile local logs tail /aws/lambda/lambda --follow
* 一度SQSにSendするとログ取れるようになる
