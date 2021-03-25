variable "name" {
  type = list(string)
  default = [
    "dev-umesse",
    "stg-umesse",
    "umesse",
  ]
}

variable "domain" {
  type = map(string)
  default = {
    dev-umesse ="web-dev.umesse.usen.com",
    stg-umesse ="web-stg.umesse.usen.com",
    umesse ="web.umesse.usen.com",
  }
}

variable "mock" {
  type = list(string)
  default = [
    "stg-umesse",
    "umesse",
  ]
}
