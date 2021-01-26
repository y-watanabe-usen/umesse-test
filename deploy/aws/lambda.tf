# Lambda File Zip
data "archive_file" "umesse_api_file" {
  type        = "zip"
  source_dir  = "${path.module}/../../develop/lambda/api"
  output_path = "${path.module}/umesse_api_lambda.zip"
  excludes = [
    "__tests__",
    "app.local.js",
  ]
}

data "archive_file" "umesse_converter_file" {
  type        = "zip"
  source_dir  = "${path.module}/../../develop/lambda/converter"
  output_path = "${path.module}/umesse_converter_lambda.zip"
  excludes = [
    "__tests__",
    "sqsRequest.js",
  ]
}

data "archive_file" "umesse_layer_file" {
  type        = "zip"
  source_dir  = "${path.module}/../../develop/lambda/layer"
  output_path = "${path.module}/umesse_layer_lambda.zip"
}

### attach policy.
resource "aws_iam_role_policy_attachment" "pollicy-attachment" {
  role       = aws_iam_role.iam_for_lambda.name
  policy_arn = aws_iam_policy.policy.arn
}

resource "aws_iam_policy" "policy" {
  name        = "lambda-policy"
  description = "policy"
  policy      = file("policy.json")
}

resource "aws_iam_role" "iam_for_lambda" {
  name               = "iam_for_lambda"
  assume_role_policy = file("iam_role_policy.json")
}

# Lambda Function
resource "aws_lambda_function" "umesse_api_function" {
  function_name    = "UMesseApiFunction"
  handler          = "lambda.handler"
  role             = aws_iam_role.iam_for_lambda.arn
  runtime          = "nodejs12.x"
  filename         = data.archive_file.umesse_api_file.output_path
  source_code_hash = data.archive_file.umesse_api_file.output_base64sha256
  memory_size      = "128"
  timeout          = "30"
  layers           = [aws_lambda_layer_version.umesse_layer.arn]

  environment {
    variables = {
      "debug"                   = true
      "environment"             = "dev"
      "CONVERTER_SQS_QUEUE_URL" = aws_sqs_queue.umesse_converter_queue.id
    }
  }

  tags = {
    CreateOwner = "UMesseApi"
  }
}

resource "aws_lambda_function" "umesse_converter_function" {
  function_name    = "UMesseConverterFunction"
  handler          = "lambda.handler"
  role             = aws_iam_role.iam_for_lambda.arn
  runtime          = "nodejs12.x"
  filename         = data.archive_file.umesse_converter_file.output_path
  source_code_hash = data.archive_file.umesse_converter_file.output_base64sha256
  memory_size      = "128"
  timeout          = "30"
  layers           = [aws_lambda_layer_version.umesse_layer.arn]

  environment {
    variables = {
      "debug"       = true
      "environment" = "dev"
    }
  }

  tags = {
    CreateOwner = "UMesseConverter"
  }
}

# Lambda Layers
resource "aws_lambda_layer_version" "umesse_layer" {
  layer_name          = "UMesseLayer"
  filename            = data.archive_file.umesse_layer_file.output_path
  source_code_hash    = data.archive_file.umesse_layer_file.output_base64sha256
  compatible_runtimes = ["nodejs12.x"]
}

# # Lambda Aliace
# resource "aws_lambda_alias" "umesse_api_dev" {
#   name             = "UMesseApiAliaceDev"
#   description      = "umesse api development aliace"
#   function_name    = aws_lambda_function.umesse_api_function.arn
#   function_version = "LATEST"
# }

# resource "aws_lambda_alias" "umesse_api_stg" {
#   name             = "UMesseApiAliaceStg"
#   description      = "umesse api staging aliace"
#   function_name    = aws_lambda_function.umesse_api_function.arn
#   function_version = "LATEST"
# }

# resource "aws_lambda_alias" "umesse_converter_dev" {
#   name             = "UMesseConverterAliaceDev"
#   description      = "umesse converter development aliace"
#   function_name    = aws_lambda_function.umesse_converter_function.arn
#   function_version = "LATEST"
# }

# resource "aws_lambda_alias" "umesse_converter_staging" {
#   name             = "UMesseConverterAliaceStg"
#   description      = "umesse converter staging aliace"
#   function_name    = aws_lambda_function.umesse_converter_function.arn
#   function_version = "LATEST"
# }
