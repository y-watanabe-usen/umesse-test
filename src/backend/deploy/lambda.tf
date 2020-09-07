# Local Values
locals {
  name                   = "UMesseFunction"
  tag                    = "UMesse"
}

# Lambda File Zip
data "archive_file" "lambda_file" {
  type        = "zip"
  source_dir  = "/lambda"
  output_path = "lambda_src.zip"
}

# Lambda Function
resource "aws_lambda_function" "lambda" {
  function_name    = local.name
  handler          = "src/index.handler"
  role             = "watever"
  runtime          = "nodejs12.x"
  filename         = data.archive_file.lambda_file.output_path
  source_code_hash = data.archive_file.lambda_file.output_base64sha256
  memory_size      = "128"
  timeout          = "30"

  environment {
    variables = {
      "debug" = true
    }
  }

  tags = {
    CreateOwner = local.tag
  }
}

# # CloudWatch Logs
# resource "aws_cloudwatch_log_group" "log_group" {
#   name              = "/aws/lambda/${local.name}"
#   retention_in_days = "30"

#   tags = {
#     Name        = local.name
#     CreateOwner = local.tag
#   }
# }
