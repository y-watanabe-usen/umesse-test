data "aws_region" "current" {
}

provider "aws" {
  region     = var.aws_region
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
  skip_credentials_validation = true
  skip_requesting_account_id  = true
  skip_metadata_api_check     = true
  s3_force_path_style         = true

  endpoints {
    apigateway = var.aws_endpoint_url
    lambda     = var.aws_endpoint_url 
    iam        = var.aws_endpoint_url 
    dynamodb   = var.aws_endpoint_url 
    s3         = var.aws_endpoint_url 
  }
}


output "url" {
  value = "${aws_api_gateway_deployment.hello_v1.invoke_url}${aws_api_gateway_resource.hello.path}"
}
