## docker
```
docker-compose up
```

## lambda
```
endpoint: http://localhost:9000
curl -d '{"bucket":"[bucket name]", "key":"[file name]", "handler":"[get|convert]"}' http://localhost:9001/2015-03-31/functions/index/invocations
```

## s3
```
http://localhost:9000
```

## dynamodb
```
http://localhost:8000/shell/
```

## swagger
```
http://localhost:8080
TODO: CORS
https://github.com/lambci/docker-lambda/issues/256
```
