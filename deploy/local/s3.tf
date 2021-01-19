resource "aws_s3_bucket" "users" {
  bucket        = "umesse-users"
  acl           = "private"
  force_destroy = true
  versioning {
    enabled = true
  }
}

resource "aws_s3_bucket" "contents" {
  bucket        = "umesse-contents"
  acl           = "private"
  force_destroy = true
  versioning {
    enabled = true
  }
}
