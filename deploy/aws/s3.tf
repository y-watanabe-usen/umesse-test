locals {
  s3_target = lookup(var.env, terraform.workspace)
  s3_bucket = lookup(var.s3_bucket, local.s3_target)
}

resource "aws_s3_bucket" "users" {
  bucket        = lookup(local.s3_bucket, "users")
  acl           = "private"
  force_destroy = true
}

resource "aws_s3_bucket" "contents" {
  bucket        = lookup(local.s3_bucket, "contents")
  acl           = "private"
  force_destroy = true
}

resource "aws_s3_bucket" "webapp" {
  bucket        = lookup(local.s3_bucket, "webapp")
  acl           = "private"
  force_destroy = true
  policy        = data.aws_iam_policy_document.s3_policy.json

  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}

data "aws_iam_policy_document" "s3_policy" {
  statement {
    actions = ["s3:GetObject"]
    effect  = "Allow"
    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
    resources = ["arn:aws:s3:::${lookup(local.s3_bucket, "webapp")}/*"]
    sid       = "PublicReadGetObject"
  }
}
