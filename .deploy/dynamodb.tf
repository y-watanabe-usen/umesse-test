resource "aws_dynamodb_table" "umesse-users" {
  name           = "umesse-users"
   billing_mode   = "PROVISIONED"
  read_capacity  = 10
  write_capacity = 10
  hash_key       = "user_id"
  range_key      = "items"

  attribute {
    name = "user_id"
    type = "S"
  }

  attribute {
    name = "items"
    type = "S"
  }
}

