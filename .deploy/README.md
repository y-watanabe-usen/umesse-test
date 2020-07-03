## dev 

```
cd docker/lambda
npm install

AWS_DYNAMO_ENDPOINT='http://localhost:4566' AWS_S3_ENDPOINT='http://localhost:4566' node app.local.js
curl localhost:3000/api/material/chime/1
```

### aws deploy
```
terraform init
terraform plan
terraform apply
```


### local deploy
```
### variables.tfにendpoint設定
variable "aws_endpoint_url" {
  type    = string
  default = "http://localhost:4566"
}

## main.tfにendpoint設定
  endpoints {
    apigateway = var.aws_endpoint_url
    lambda     = var.aws_endpoint_url
    iam        = var.aws_endpoint_url
    dynamodb =var.aws_endpoint_url 
    s3       =var.aws_endpoint_url 
  }
```

deploy to localenv 
```
terraform init
terraform plan
terraform apply
## curl to local
./curl_lambda.sh
## s3 sync
./init.sh
```
