resource "aws_s3_bucket" "umesse-users" {
  bucket        = "umesse-users"
  acl           = "public-read"
  force_destroy = true
}
resource "aws_s3_bucket" "umesse-contents" {
  bucket        = "umesse-contents"
  acl           = "public-read"
  force_destroy = true
}
