# Dynamodb Table
resource "aws_dynamodb_table" "users" {
  name           = "umesse-users"
  billing_mode   = "PROVISIONED"
  read_capacity  = 10
  write_capacity = 10
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }
}

# Dynamodb Item
resource "aws_dynamodb_table_item" "users" {
  table_name = aws_dynamodb_table.users.name
  hash_key   = aws_dynamodb_table.users.hash_key

  item = <<ITEM
{
  "id": {"S": "USER000001"},
  "info": {
    "M": {
      "name": {"S": "テスト店舗000001"},
      "open_time": {"S": "1000"},
      "close_time": {"S": "2200"},
      "group_id": {"S": "GROUP000001"},
      "status": {"BOOL": true},
      "date": {"S": ""}
    }
  },
  "auth": {
    "M": {
      "token": {"S": "TOKEN0000001"},
      "expiration": {"S": "2020-11-01T00:00:00+09:00"}
    }
  },
  "contents": {
    "L": [
      {
        "cm_id": {"S": "CM000001.aac"},
        "start_chime": {
          "M": {
            "id": {"S": "チャイム/se_maoudamashii_chime01.mp3"},
            "volume": {"N": "0.5"}
          }
        },
        "end_chime": {
          "M": {
            "id": {"S": "チャイム/se_maoudamashii_chime02.mp3"},
            "volume": {"N": "0.5"}
          }
        },
        "bgm": {
          "M": {
            "id": {"S": "BGM/11_NSF227-011.mp3"},
            "volume": {"N": "0.5"}
          }
        },
        "narrations": {
          "L": [
            {
              "id": {"S": "ナレーション/NA_001.mp3"},
              "volume": {"N": "3.0"}
            },
            {
              "id": {"S": "ナレーション/NA_002.mp3"},
              "volume": {"N": "3.0"}
            },
            {
              "id": {"S": "ナレーション/NA_003.mp3"},
              "volume": {"N": "3.0"}
            }
          ]
        },
        "share": {"BOOL": false},
        "center": {"BOOL": false},
        "date": {"S": ""}
      }
    ]
  }
}
ITEM
}
