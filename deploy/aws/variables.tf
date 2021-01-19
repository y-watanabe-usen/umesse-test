variable "aws_region" {
  type    = string
  default = "ap-northeast-1"
}

variable "aws_endpoint_url" {
  type    = string
  default = "http://localhost:4566"
}

// https://drive.google.com/drive/u/1/folders/1SmKPw6CF5oObov4DtkTvGa2uOJI4ePo7
variable "access_key" {}
variable "secret_key" {}

variable "env" {
  type = map(string)
  default = {
    defalut = "dev"
    dev     = "dev"
    stg     = "stg"
    prod    = "prod"
  }
}

variable "dynamodb_table" {
  type = map(object({
    users    = string
    contents = string
    external = string
  }))
  default = {
    dev = {
      users    = "dev-umesse-users"
      contents = "dev-umesse-contents"
      external = "dev-umesse-external"
    }
    stg = {
      users    = "stg-umesse-users"
      contents = "stg-umesse-contents"
      external = "stg-umesse-external"
    }
    prod = {
      users    = "umesse-users"
      contents = "umesse-contents"
      external = "umesse-external"
    }
  }
}

variable "s3_bucket" {
  type = map(object({
    users    = string
    contents = string
    webapp   = string
  }))
  default = {
    dev = {
      users    = "dev-umesse-users"
      contents = "dev-umesse-contents"
      webapp   = "dev-umesse-webapp"
    }
    stg = {
      users    = "stg-umesse-users"
      contents = "stg-umesse-contents"
      webapp   = "stg-umesse-webapp"
    }
    prod = {
      users    = "umesse-users"
      contents = "umesse-contents"
      webapp   = "umesse-webapp"
    }
  }
}
