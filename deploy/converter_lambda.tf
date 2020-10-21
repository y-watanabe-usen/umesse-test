data "archive_file" "umesse_converter_lambda" {
  type        = "zip"
  source_file = "${path.module}/../develop/lambda/audio_converter_lambda.js"
  output_path = "${path.module}/convert_umesse_lambda.js.zip"
}

resource "aws_lambda_function" "umesse_converter_lambda" {
  function_name = "lambda"
  handler = "lambda.handler"
  role = aws_iam_role.umesse_converter_lambda.arn
  runtime = "nodejs12.x"

  filename = data.archive_file.umesse_converter_lambda.output_path
  source_code_hash = data.archive_file.umesse_converter_lambda.output_base64sha256

  timeout = 30
  memory_size = 128
}
