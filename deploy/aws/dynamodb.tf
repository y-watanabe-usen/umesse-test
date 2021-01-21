resource "aws_dynamodb_table" "tfstate" {
  name           = "umesse-tfstate"
  billing_mode   = "PROVISIONED"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }
}

resource "aws_dynamodb_table" "users" {
  for_each       = toset(lookup(var.dynamodb_table, "users"))
  name           = each.key
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

resource "aws_dynamodb_table" "contents" {
  for_each       = toset(lookup(var.dynamodb_table, "contents"))
  name           = each.key
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

resource "aws_dynamodb_table" "external" {
  for_each       = toset(lookup(var.dynamodb_table, "external"))
  name           = each.key
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
