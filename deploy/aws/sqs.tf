resource "aws_sqs_queue" "umesse_converter_queue" {
  name                       = "UMesseConverterQueue"
  visibility_timeout_seconds = 180
}

resource "aws_sqs_queue" "umesse_generate_queue" {
  name                       = "UMesseGenerateQueue"
  visibility_timeout_seconds = 180
}
