# Lambda File Zip
data "archive_file" "umesse_api_file" {
  type        = "zip"
  source_dir  = "${path.module}/../../develop/lambda/api"
  output_path = "${path.module}/umesse_api_lambda.zip"
}

data "archive_file" "umesse_converter_file" {
  type        = "zip"
  source_dir  = "${path.module}/../../develop/lambda/converter"
  output_path = "${path.module}/umesse_converter_lambda.zip"
}

data "archive_file" "umesse_generate_file" {
  type        = "zip"
  source_dir  = "${path.module}/../../develop/lambda/generate"
  output_path = "${path.module}/umesse_generate_lambda.zip"
}

data "archive_file" "umesse_sync_file" {
  type        = "zip"
  source_dir  = "${path.module}/../../develop/lambda/sync"
  output_path = "${path.module}/umesse_sync_lambda.zip"
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

  environment {
    variables = {
      "debug"                   = true
      "environment"             = "localstack"
      "CONVERTER_SQS_QUEUE_URL" = aws_sqs_queue.umesse_converter_queue.id
      "GENERATE_SQS_QUEUE_URL"  = aws_sqs_queue.umesse_generate_queue.id
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

  environment {
    variables = {
      "debug"       = true
      "environment" = "localstack"
    }
  }

  tags = {
    CreateOwner = "UMesseConverter"
  }
}

resource "aws_lambda_function" "umesse_generate_function" {
  function_name    = "UMesseGenerateFunction"
  handler          = "lambda.handler"
  role             = aws_iam_role.iam_for_lambda.arn
  runtime          = "nodejs12.x"
  filename         = data.archive_file.umesse_generate_file.output_path
  source_code_hash = data.archive_file.umesse_generate_file.output_base64sha256
  memory_size      = "128"
  timeout          = "30"

  environment {
    variables = {
      "debug"       = true
      "environment" = "localstack"
    }
  }

  tags = {
    CreateOwner = "UMesseGenerate"
  }
}

resource "aws_lambda_function" "umesse_sync_function" {
  function_name    = "UMesseSyncFunction"
  handler          = "lambda.handler"
  role             = aws_iam_role.iam_for_lambda.arn
  runtime          = "nodejs12.x"
  filename         = data.archive_file.umesse_sync_file.output_path
  source_code_hash = data.archive_file.umesse_sync_file.output_base64sha256
  memory_size      = "128"
  timeout          = "30"

  # vpc_config {
  #   subnet_ids         = ["subnet-0dd119fa747bab961"]
  #   security_group_ids = ["sg-08c39a651fac3ef3b"]
  # }

  environment {
    variables = {
      "debug"       = true
      "environment" = "localstack"
    }
  }

  tags = {
    CreateOwner = "UMesseSync"
  }
}
