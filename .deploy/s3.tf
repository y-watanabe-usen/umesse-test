resource "aws_s3_bucket" "presetdata" {
  bucket        = "presetdata"
  acl           = "public-read"
  force_destroy = true
}
resource "aws_s3_bucket" "userbucket" {
  bucket        = "userbucket"
  acl           = "public-read"
  force_destroy = true
}
