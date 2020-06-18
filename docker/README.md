## docker
```
docker-compose up
```

## lambda
```
endpoint: http://localhost:9000
curl -d '{"Bucket":"[bucket name]", "Key":"[file name]", "Handler":"[get|convert]"}' http://localhost:9001/2015-03-31/functions/index/invocations
```

## s3
```
http://localhost:9000
```

## swagger
```
http://localhost:9002
```
