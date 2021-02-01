# TODO: とりあえずdev環境のみ
resource "aws_cloudfront_distribution" "umesse_webapp" {
  # for_each = toset(lookup(var.s3_bucket, "webapp"))

  origin {
    domain_name = aws_s3_bucket.webapp["dev-umesse-webapp"].bucket_regional_domain_name
    origin_id   = aws_s3_bucket.webapp["dev-umesse-webapp"].id
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = aws_s3_bucket.webapp["dev-umesse-webapp"].id
    compress         = true

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    default_ttl            = 3600
    min_ttl                = 0
    max_ttl                = 86400
    viewer_protocol_policy = "redirect-to-https"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}
