# TODO: とりあえずdev環境のみ
resource "aws_cloudfront_origin_access_identity" "umesse_webapp" {
  comment = "dev-app-umesse.usen.com"
}

resource "aws_cloudfront_distribution" "umesse_webapp" {
  enabled             = true
  # is_ipv6_enabled     = true
  default_root_object = "index.html"
  price_class         = "PriceClass_200"

  origin {
    domain_name = aws_s3_bucket.webapp["dev-umesse-webapp"].bucket_regional_domain_name
    origin_id   = aws_s3_bucket.webapp["dev-umesse-webapp"].id

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.umesse_webapp.cloudfront_access_identity_path
    }
  }

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

    viewer_protocol_policy = "redirect-to-https"
    default_ttl            = 3600
    min_ttl                = 0
    max_ttl                = 86400
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
