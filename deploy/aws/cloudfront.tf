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

  web_acl_id = aws_wafv2_web_acl.umesse_webapp.arn

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

    lambda_function_association {
      event_type   = "viewer-request"
      lambda_arn   = aws_lambda_function.umesse_webapp_function.qualified_arn
      include_body = false
    }
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

#### WAF2 ####
resource "aws_wafv2_web_acl" "umesse_webapp" {
  name     = "umesse_webapp"
  scope    = "CLOUDFRONT"
  provider = aws.us_east_1

  default_action {
    block {}
  }
  visibility_config {
    cloudwatch_metrics_enabled = false
    metric_name                = "umesse_webapp"
    sampled_requests_enabled   = false
  }

  rule {
    name     = "allow-geo-match-jp"
    priority = 10

    action {
      allow {}
    }
    visibility_config {
      cloudwatch_metrics_enabled = false
      metric_name                = "allow-geo-match-jp"
      sampled_requests_enabled   = false
    }
    statement {
      geo_match_statement {
        country_codes = ["JP"]
      }
    }
  }
}

#### Lambda@Edge ####
data "archive_file" "umesse_webapp_file" {
  type        = "zip"
  source_file = "${path.module}/../../develop/lambda/auth/webapp.js"
  output_path = "${path.module}/umesse_webapp_lambda.zip"
}

resource "aws_lambda_function" "umesse_webapp_function" {
  function_name    = "UMesseWebAppBasicAuthFunction"
  handler          = "webapp.handler"
  role             = aws_iam_role.umesse_webapp_lambda_role.arn
  runtime          = "nodejs12.x"
  filename         = data.archive_file.umesse_webapp_file.output_path
  source_code_hash = data.archive_file.umesse_webapp_file.output_base64sha256
  memory_size      = "128"
  timeout          = "5"
  provider         = aws.us_east_1
  # 毎回TAG付されてしまうので、更新があった場合のみ実施
  # publish          = true
}

resource "aws_iam_role" "umesse_webapp_lambda_role" {
  name               = "umesse_webapp_lambda_role"
  assume_role_policy = file("iam_role_policy.json")
}

resource "aws_iam_role_policy_attachment" "umesse_webapp_lambda" {
  role       = aws_iam_role.umesse_webapp_lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}
