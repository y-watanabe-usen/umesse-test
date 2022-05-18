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

  # attribute {
  #   name = "cmId"
  #   type = "S"
  # }

  # attribute {
  #   name = "recordingId"
  #   type = "S"
  # }

  # attribute {
  #   name = "ttsId"
  #   type = "S"
  # }

  # global_secondary_index {
  #   name               = "UsersCmIdIndex"
  #   hash_key           = "cmId"
  #   write_capacity     = 10
  #   read_capacity      = 10
  #   projection_type    = "INCLUDE"
  #   non_key_attributes = ["status"]
  # }

  # global_secondary_index {
  #   name               = "UsersRecordingIdIndex"
  #   hash_key           = "recordingId"
  #   write_capacity     = 10
  #   read_capacity      = 10
  #   projection_type    = "KEYS_ONLY"
  # }

  # global_secondary_index {
  #   name               = "UsersTtsIdIndex"
  #   hash_key           = "ttsId"
  #   write_capacity     = 10
  #   read_capacity      = 10
  #   projection_type    = "KEYS_ONLY"
  # }
}

# Dynamodb Table umesse-contents
resource "aws_dynamodb_table" "contents" {
  name           = "umesse-contents"
  billing_mode   = "PROVISIONED"
  read_capacity  = 10
  write_capacity = 10
  hash_key       = "contentsId"
  range_key      = "category"

  attribute {
    name = "contentsId"
    type = "S"
  }

  attribute {
    name = "category"
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

  # attribute {
  #   name = "cmId"
  #   type = "S"
  # }

  # global_secondary_index {
  #   name               = "ExternalCmIdIndex"
  #   hash_key           = "cmId"
  #   write_capacity     = 10
  #   read_capacity      = 10
  #   projection_type    = "INCLUDE"
  #   non_key_attributes = ["status"]
  # }
}

# Dynamodb Table umesse-meta
resource "aws_dynamodb_table" "meta" {
  name           = "umesse-meta"
  billing_mode   = "PROVISIONED"
  read_capacity  = 10
  write_capacity = 10
  hash_key       = "cmId"
  range_key      = "targetDate"

  attribute {
    name = "cmId"
    type = "S"
  }

  attribute {
    name = "targetDate"
    type = "S"
  }
}
