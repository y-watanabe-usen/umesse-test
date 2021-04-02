resource "aws_sqs_queue" "umesse_converter_queue" {
  name = "UMesseConverterQueue"
}

resource "aws_sqs_queue" "umesse_generate_queue" {
  name = "UMesseGenerateQueue"
}
