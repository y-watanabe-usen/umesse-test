terraform {
  backend "s3" {
    region                      = "ap-northeast-1"
    profile                     = "umesse"
    shared_credentials_file     = "~/.aws/credentials"
    skip_credentials_validation = true
    skip_metadata_api_check     = true

    bucket           = "umesse-tfstate"
    key              = "terraform.tfstate"
    encrypt          = true
    force_path_style = true
    dynamodb_table   = "umesse-tfstate"
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "3.22.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "2.0.0"
    }
  }
}

provider "aws" {
  region                      = "ap-northeast-1"
  profile                     = "umesse"
  shared_credentials_file     = "~/.aws/credentials"
  skip_credentials_validation = true
  skip_requesting_account_id  = true
  skip_metadata_api_check     = true
  s3_force_path_style         = true
}
