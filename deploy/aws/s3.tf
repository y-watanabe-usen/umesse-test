resource "aws_s3_bucket" "tfstate" {
  bucket = "umesse-tfstate"
  acl    = "private"

  versioning {
    enabled = true
  }

  lifecycle_rule {
    enabled                                = true
    abort_incomplete_multipart_upload_days = 7

    noncurrent_version_expiration {
      days = 90
    }
  }
}

resource "aws_s3_bucket" "users" {
  for_each = toset(lookup(var.s3_bucket, "users"))
  bucket   = each.key
  acl      = "private"
}

resource "aws_s3_bucket" "contents" {
  for_each = toset(lookup(var.s3_bucket, "contents"))
  bucket   = each.key
  acl      = "private"
}

# resource "aws_s3_bucket" "webapp" {
#   for_each = toset(lookup(var.s3_bucket, "webapp"))
#   bucket   = each.key
#   acl      = "private"
#   policy   = data.aws_iam_policy_document.s3_policy.json

#   website {
#     index_document = "index.html"
#     error_document = "error.html"
#   }
# }

# data "aws_iam_policy_document" "s3_policy" {
#   for_each = toset(lookup(local.s3_bucket, "webapp"))
#   statement {
#     actions = ["s3:GetObject"]
#     effect  = "Allow"
#     principals {
#       type        = "AWS"
#       identifiers = ["*"]
#     }
#     resources = ["arn:aws:s3:::${each.key}/*"]
#     sid       = "PublicReadGetObject"
#   }
# }
