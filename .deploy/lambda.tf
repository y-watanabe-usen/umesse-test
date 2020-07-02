
##### Lambda #####

data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../docker/lambda"
  output_path = "umesse.zip"
}
resource "aws_lambda_function" "umesse" {
  function_name    = "umesse"
  filename         = "umesse.zip"
  role             = aws_iam_role.umesse.arn
  handler          = "index.handler"
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  runtime          = "nodejs12.x"
}
resource "aws_iam_role" "umesse" {
  name               = "umesse"
  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": {
    "Action": "sts:AssumeRole",
    "Principal": {
      "Service": "lambda.amazonaws.com"
    },
    "Effect": "Allow"
  }
}
POLICY
}

# permission:   API Gateway ----> Lambda
resource "aws_lambda_permission" "umesse" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.umesse.arn
  principal     = "apigateway.amazonaws.com"
}
