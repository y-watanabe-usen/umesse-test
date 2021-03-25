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
    dev-umesse ="dev.umesse.usen.com",
    stg-umesse ="stg.umesse.usen.com",
    umesse ="umesse.usen.com",
  }
}

variable "mock" {
  type = list(string)
  default = [
    "stg-umesse",
    "umesse",
  ]
}
