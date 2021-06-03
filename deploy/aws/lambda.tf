# Lambda File Zip
data "archive_file" "umesse_api_file" {
  type        = "zip"
  source_dir  = "${path.module}/../../develop/lambda/api"
  output_path = "${path.module}/umesse_api_lambda.zip"
  excludes = [
    "__tests__",
    "coverage",
    "node_modules/umesse-lib",
    "app.local.js",
  ]
}

data "archive_file" "umesse_converter_file" {
  type        = "zip"
  source_dir  = "${path.module}/../../develop/lambda/converter"
  output_path = "${path.module}/umesse_converter_lambda.zip"
  excludes = [
    "__tests__",
    "coverage",
    "node_modules/umesse-lib",
    "sqsRequest.js",
  ]
}

data "archive_file" "umesse_generate_file" {
  type        = "zip"
  source_dir  = "${path.module}/../../develop/lambda/generate"
  output_path = "${path.module}/umesse_generate_lambda.zip"
  excludes = [
    "__tests__",
    "coverage",
    "node_modules/umesse-lib",
    "sqsRequest.js",
  ]
}

data "archive_file" "umesse_sync_file" {
  type        = "zip"
  source_dir  = "${path.module}/../../develop/lambda/sync"
  output_path = "${path.module}/umesse_sync_lambda.zip"
  excludes = [
    "__tests__",
    "coverage",
    "node_modules/umesse-lib",
  ]
}

data "archive_file" "umesse_layer_file" {
  type        = "zip"
  source_dir  = "${path.module}/../../develop/lambda/layer"
  output_path = "${path.module}/umesse_layer_lambda.zip"
}

# Lambda Function
resource "aws_lambda_function" "umesse_api_function" {
  function_name    = "UMesseApiFunction"
  handler          = "lambda.handler"
  role             = aws_iam_role.umesse_api_lambda_role.arn
  runtime          = "nodejs12.x"
  filename         = data.archive_file.umesse_api_file.output_path
  source_code_hash = data.archive_file.umesse_api_file.output_base64sha256
  memory_size      = "512"
  timeout          = "30"
  layers           = [aws_lambda_layer_version.umesse_layer.arn]

  # FIXME: prod, stgはgithub actionsのtagで設定する
  environment {
    variables = {
      "debug"                   = true
      "environment"             = "dev"
      "CONVERTER_SQS_QUEUE_URL" = aws_sqs_queue.umesse_converter_queue["dev-umesse"].id
      "GENERATE_SQS_QUEUE_URL"  = aws_sqs_queue.umesse_generate_queue["dev-umesse"].id
    }
  }

  tags = {
    CreateOwner = "UMesseApi"
  }
}

resource "aws_lambda_function" "umesse_converter_function" {
  function_name    = "UMesseConverterFunction"
  handler          = "lambda.handler"
  role             = aws_iam_role.umesse_converter_lambda_role.arn
  runtime          = "nodejs12.x"
  filename         = data.archive_file.umesse_converter_file.output_path
  source_code_hash = data.archive_file.umesse_converter_file.output_base64sha256
  memory_size      = "1024"
  timeout          = "300"
  layers           = [aws_lambda_layer_version.umesse_layer.arn]

  # FIXME: prod, stgはgithub actionsのtagで設定する
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

resource "aws_lambda_function" "umesse_generate_function" {
  function_name    = "UMesseGenerateFunction"
  handler          = "lambda.handler"
  role             = aws_iam_role.umesse_generate_lambda_role.arn
  runtime          = "nodejs12.x"
  filename         = data.archive_file.umesse_generate_file.output_path
  source_code_hash = data.archive_file.umesse_generate_file.output_base64sha256
  memory_size      = "1024"
  timeout          = "300"
  layers           = [aws_lambda_layer_version.umesse_layer.arn]

  # FIXME: prod, stgはgithub actionsのtagで設定する
  environment {
    variables = {
      "debug"       = true
      "environment" = "dev"
    }
  }

  tags = {
    CreateOwner = "UMesseGenerate"
  }
}

resource "aws_lambda_function" "umesse_sync_function" {
  function_name    = "UMesseSyncFunction"
  handler          = "lambda.handler"
  role             = aws_iam_role.umesse_sync_lambda_role.arn
  runtime          = "nodejs12.x"
  filename         = data.archive_file.umesse_sync_file.output_path
  source_code_hash = data.archive_file.umesse_sync_file.output_base64sha256
  memory_size      = "512"
  timeout          = "300"
  layers           = [aws_lambda_layer_version.umesse_layer.arn]

  vpc_config {
    subnet_ids         = ["subnet-0dd119fa747bab961"]
    security_group_ids = ["sg-08c39a651fac3ef3b"]
  }

  # FIXME: prod, stgはgithub actionsのtagで設定する
  environment {
    variables = {
      "debug"       = true
      "environment" = "dev"
    }
  }

  tags = {
    CreateOwner = "UMesseSync"
  }
}

# Lambda Layers
resource "aws_lambda_layer_version" "umesse_layer" {
  layer_name          = "UMesseLayer"
  filename            = data.archive_file.umesse_layer_file.output_path
  source_code_hash    = data.archive_file.umesse_layer_file.output_base64sha256
  compatible_runtimes = ["nodejs12.x"]
}

# Lambda Aliace
resource "aws_lambda_alias" "umesse_api_alias" {
  for_each         = toset(var.name)
  name             = lookup(var.alias, each.key)
  description      = format("umesse api %s aliace", lookup(var.alias, each.key))
  function_name    = aws_lambda_function.umesse_api_function.arn
  function_version = "$LATEST"

  lifecycle {
    ignore_changes = [function_version]
  }
}

resource "aws_lambda_alias" "umesse_converter_alias" {
  for_each         = toset(var.name)
  name             = lookup(var.alias, each.key)
  description      = format("umesse converter %s aliace", lookup(var.alias, each.key))
  function_name    = aws_lambda_function.umesse_converter_function.arn
  function_version = "$LATEST"

  lifecycle {
    ignore_changes = [function_version]
  }
}

resource "aws_lambda_alias" "umesse_generate_alias" {
  for_each         = toset(var.name)
  name             = lookup(var.alias, each.key)
  description      = format("umesse generate %s aliace", lookup(var.alias, each.key))
  function_name    = aws_lambda_function.umesse_generate_function.arn
  function_version = "$LATEST"

  lifecycle {
    ignore_changes = [function_version]
  }
}

resource "aws_lambda_alias" "umesse_sync_alias" {
  for_each         = toset(var.name)
  name             = lookup(var.alias, each.key)
  description      = format("umesse sync %s aliace", lookup(var.alias, each.key))
  function_name    = aws_lambda_function.umesse_sync_function.arn
  function_version = "$LATEST"

  lifecycle {
    ignore_changes = [function_version]
  }
}
