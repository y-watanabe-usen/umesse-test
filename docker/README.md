## docker
```
docker-compose up
```

## lambda
```
curl -d '{"Bucket":"[bucket name]", "Key":"[file name]", "Method":"[get|convert]"}' http://localhost:9001/2015-03-31/functions/index/invocations
```

## s3
```
http://localhost:9000
```
