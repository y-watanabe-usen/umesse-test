locals {
  name                   = "UMesseFunction"
  tag                    = "UMesse"
}

# Lambda File Zip
data "archive_file" "lambda_file" {
  type        = "zip"
  source_dir  = "${path.module}/../develop/lambda"
  output_path = "lambda_src.zip"
}

resource "aws_iam_role" "iam_for_lambda" {
  name = "iam_for_lambda"
  assume_role_policy = file("iam_role_policy.json")
}
# Lambda Function
resource "aws_lambda_function" "lambda" {
  function_name    = local.name
  handler          = "lambda.handler"
#  role             = "watever"
  role          = aws_iam_role.iam_for_lambda.arn
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

## # CloudWatch Logs
#resource "aws_cloudwatch_log_group" "lambda_log_group" {
#  name              = "/aws/lambda/${local.name}"
#  retention_in_days = 30
##   tags = {
##     Name        = local.name
##     CreateOwner = local.tag
##   }
#}
