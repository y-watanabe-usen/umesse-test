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

  web_acl_id = aws_waf_web_acl.umesse.id

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
    default_ttl            = 0
    min_ttl                = 0
    max_ttl                = 0
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

resource "aws_waf_geo_match_set" "geo_match_set" {
  name = "geo_match_set"

  geo_match_constraint {
    type  = "Country"
    value = "JP"
  }
}

resource "aws_waf_rule" "waf_rule" {
  depends_on = [
    aws_waf_geo_match_set.geo_match_set
  ]
  name        = "match"
  metric_name = "match"

  predicates {
    data_id = aws_waf_geo_match_set.geo_match_set.id
    negated = false
    type    = "IPMatch"
  }
}

resource "aws_waf_web_acl" "umesse" {
  depends_on  = [aws_waf_rule.waf_rule]
  name        = "allow"
  metric_name = "allow"

  default_action {
    type = "BLOCK"
  }

  rules {
    action {
      type = "ALLOW"
    }

    priority = 1
    rule_id  = aws_waf_rule.waf_rule.id
    type     = "REGULAR"
  }
}
