#### Cloud Front ####

resource "aws_cloudfront_origin_access_identity" "umesse" {
  for_each = toset(var.name)
  comment  = format("%s-app", each.key)
}

resource "aws_cloudfront_distribution" "umesse" {
  for_each            = toset(var.name)
  enabled             = true
  default_root_object = "index.html"
  price_class         = "PriceClass_200"

  origin {
    domain_name = aws_s3_bucket.webapp[each.key].bucket_regional_domain_name
    origin_id   = aws_s3_bucket.webapp[each.key].id

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.umesse[each.key].cloudfront_access_identity_path
    }
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = aws_s3_bucket.webapp[each.key].id
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
