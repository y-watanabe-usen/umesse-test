variable "name" {
  type = list(string)
  default = [
    "dev-umesse",
    "stg-umesse",
    "umesse",
  ]
}

variable "mock" {
  type = list(string)
  default = [
    "stg-umesse",
    "umesse",
  ]
}
