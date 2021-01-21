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
