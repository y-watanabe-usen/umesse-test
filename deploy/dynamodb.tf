# Dynamodb Table umesse-users
resource "aws_dynamodb_table" "users" {
  name           = "umesse-users"
  billing_mode   = "PROVISIONED"
  read_capacity  = 10
  write_capacity = 10
  hash_key       = "unisCustomerCd"

  attribute {
    name = "unisCustomerCd"
    type = "S"
  }
}

# Dynamodb Table umesse-contents
resource "aws_dynamodb_table" "contents" {
  name           = "umesse-contents"
  billing_mode   = "PROVISIONED"
  read_capacity  = 10
  write_capacity = 10
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }
}

# Dynamodb Table umesse-external
resource "aws_dynamodb_table" "external" {
  name           = "umesse-external"
  billing_mode   = "PROVISIONED"
  read_capacity  = 10
  write_capacity = 10
  hash_key       = "unisCustomerCd"

  attribute {
    name = "unisCustomerCd"
    type = "S"
  }
}
