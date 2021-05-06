resource "aws_sqs_queue" "umesse_converter_queue" {
  for_each                   = toset(var.name)
  name                       = format("UMesseConverterQueue%s", lookup(var.alias, each.key))
  visibility_timeout_seconds = 300
  message_retention_seconds  = 86400
}

resource "aws_sqs_queue" "umesse_generate_queue" {
  for_each                   = toset(var.name)
  name                       = format("UMesseGenerateQueue%s", lookup(var.alias, each.key))
  visibility_timeout_seconds = 300
  message_retention_seconds  = 86400
}
