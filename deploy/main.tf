terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "3.21.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "2.0.0"
    }
  }
}

provider "aws" {
  region                      = var.aws_region
  access_key                  = var.access_key
  secret_key                  = var.secret_key
  skip_credentials_validation = true
  skip_requesting_account_id  = true
  skip_metadata_api_check     = true
  s3_force_path_style         = true
  endpoints {
    apigateway = var.aws_endpoint_url
    # cloudformation = "http://localhost:4581"
    cloudwatch = var.aws_endpoint_url
    dynamodb   = var.aws_endpoint_url
    # es             = "http://localhost:4578"
    # firehose       = "http://localhost:4573"
    iam = var.aws_endpoint_url
    # kinesis        = "http://localhost:4568"
    lambda = var.aws_endpoint_url
    # route53        = "http://localhost:4580"
    # redshift       = "http://localhost:4577"
    s3 = var.aws_endpoint_url
    # secretsmanager = "http://localhost:4584"
    # ses            = "http://localhost:4579"
    # sns            = "http://localhost:4575"
    sqs = var.aws_endpoint_url
    # ssm            = "http://localhost:4583"
    # stepfunctions  = "http://localhost:4585"
    # sts            = "http://localhost:4592"
  }
}

