resource "aws_lambda_event_source_mapping" "event_source_mapping_converter" {
  for_each         = toset(var.name)
  batch_size       = 1
  event_source_arn = aws_sqs_queue.umesse_converter_queue[each.key].arn
  enabled          = true
  function_name    = aws_lambda_alias.umesse_converter_alias[each.key].arn
}

resource "aws_lambda_event_source_mapping" "event_source_mapping_generate" {
  for_each         = toset(var.name)
  batch_size       = 1
  event_source_arn = aws_sqs_queue.umesse_generate_queue[each.key].arn
  enabled          = true
  function_name    = aws_lambda_alias.umesse_generate_alias[each.key].arn
}
