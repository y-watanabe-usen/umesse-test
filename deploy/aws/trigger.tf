resource "aws_lambda_event_source_mapping" "event_source_mapping_converter" {
  batch_size       = 1
  event_source_arn = aws_sqs_queue.umesse_converter_queue.arn
  enabled          = true
  function_name    = aws_lambda_function.umesse_converter_function.arn
}

resource "aws_lambda_event_source_mapping" "event_source_mapping_generate" {
  batch_size       = 1
  event_source_arn = aws_sqs_queue.umesse_generate_queue.arn
  enabled          = true
  function_name    = aws_lambda_function.umesse_generate_function.arn
}
