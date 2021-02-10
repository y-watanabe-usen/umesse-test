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
  for_each = toset(var.name)
  bucket   = format("%s-users", each.key)
  acl      = "private"

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "HEAD"]
    allowed_origins = ["*"]
  }
}

resource "aws_s3_bucket_public_access_block" "users" {
  for_each                = toset(var.name)
  bucket                  = format("%s-users", each.key)
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket" "contents" {
  for_each = toset(var.name)
  bucket   = format("%s-contents", each.key)
  acl      = "private"

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "HEAD"]
    allowed_origins = ["*"]
  }
}

resource "aws_s3_bucket_public_access_block" "contents" {
  for_each                = toset(var.name)
  bucket                  = format("%s-contents", each.key)
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket" "webapp" {
  for_each = toset(var.name)
  bucket   = format("%s-webapp", each.key)
  acl      = "private"
}

resource "aws_s3_bucket_public_access_block" "webapp" {
  for_each                = toset(var.name)
  bucket                  = format("%s-webapp", each.key)
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_policy" "webapp" {
  for_each = toset(var.name)
  bucket   = aws_s3_bucket.webapp[each.key].id
  policy   = data.aws_iam_policy_document.webapp[each.key].json
}

data "aws_iam_policy_document" "webapp" {
  for_each = toset(var.name)
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.webapp[each.key].arn}/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.umesse[each.key].iam_arn]
    }
  }
}
