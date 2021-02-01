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

resource "aws_s3_bucket_public_access_block" "users_access" {
  for_each                = toset(lookup(var.s3_bucket, "users"))
  bucket                  = each.key
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket" "contents" {
  for_each = toset(lookup(var.s3_bucket, "contents"))
  bucket   = each.key
  acl      = "private"
}

resource "aws_s3_bucket_public_access_block" "contents_access" {
  for_each                = toset(lookup(var.s3_bucket, "contents"))
  bucket                  = each.key
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket" "webapp" {
  for_each = toset(lookup(var.s3_bucket, "webapp"))
  bucket   = each.key
  acl      = "private"
}

resource "aws_s3_bucket_public_access_block" "webapp_access" {
  for_each                = toset(lookup(var.s3_bucket, "webapp"))
  bucket                  = each.key
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_policy" "webapp_policy" {
  for_each = toset(lookup(var.s3_bucket, "webapp"))
  bucket   = aws_s3_bucket.webapp[each.key].id
  policy   = file("umesse_webapp_policy.json")
}
