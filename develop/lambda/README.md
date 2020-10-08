## umesse-lambda



### swagger editor
```
docker run -itd --name swagger-editor -v ${PWD}/openapi.yaml:/openapi.yaml -e SWAGGER_FILE=/openapi.yaml -p 8080:8080 swaggerapi/swagger-editor
```

### swagger ui
```
docker run -itd --name swagger-ui -v ${PWD}/openapi.yaml:/openapi.yaml -e SWAGGER_JSON=/openapi.yaml -p 8080:8080 swaggerapi/swagger-ui
```

### swagger fileからcode生成
```
docker run --rm -it \
	-v ${PWD}:/local swaggerapi/swagger-codegen-cli-v3 generate \
	-i /local/openapi.yaml  \
	-l nodejs-server -o /local/src
```

### swagger fileからtypescript-axios code 生成
```
docker run --rm -it \
	-v ${PWD}:/local swaggerapi/swagger-codegen-cli-v3 generate \
	-i /local/openapi.yaml  \
	-l typescript-axios -o /local/umesseapi
```
