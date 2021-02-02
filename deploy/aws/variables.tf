variable "dynamodb_table" {
  type = map(list(string))
  default = {
    users = [
      "dev-umesse-users",
      "stg-umesse-users",
      "umesse-users",
    ]
    contents = [
      "dev-umesse-contents",
      "stg-umesse-contents",
      "umesse-contents",
    ]
    external = [
      "dev-umesse-external",
      "stg-umesse-external",
      "umesse-external",
    ]
  }
}

variable "s3_bucket" {
  type = map(list(string))
  default = {
    users = [
      "dev-umesse-users",
      "stg-umesse-users",
      "umesse-users",
    ]
    contents = [
      "dev-umesse-contents",
      "stg-umesse-contents",
      "umesse-contents",
    ]
    webapp = [
      "dev-umesse-webapp",
      "stg-umesse-webapp",
      "umesse-webapp",
    ]
  }
}

variable "api_domain" {
  type = list(string)
  default = [
    "dev-api-umesse.usen.com",
    "stg-api-umesse.usen.com",
    "api-umesse.usen.com",
  ]
}

variable "site_domain" {
  type = list(string)
  default = [
    "dev-app-umesse.usen.com",
    "stg-app-umesse.usen.com",
    "app-umesse.usen.com",
  ]
}
