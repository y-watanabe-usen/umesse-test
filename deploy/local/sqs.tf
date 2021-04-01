resource "aws_sqs_queue" "umesse_converter_queue" {
  name = "umesseConverterQueue"
}

resource "aws_sqs_queue" "umesse_generate_queue" {
  name = "umesseGenerateQueue"
}
