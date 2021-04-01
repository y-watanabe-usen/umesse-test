resource "aws_iam_role" "umesse_converter_lambda" {
  assume_role_policy = file("iam_role_policy.json")
}

resource "aws_iam_role_policy_attachment" "umesse_converter_lambda" {
  policy_arn = aws_iam_policy.umesse_converter_lambda.arn
  role       = aws_iam_role.umesse_converter_lambda.name
}

resource "aws_iam_policy" "umesse_converter_lambda" {
  policy = data.aws_iam_policy_document.umesse_lambda.json
}

resource "aws_iam_role" "umesse_generate_lambda" {
  assume_role_policy = file("iam_role_policy.json")
}

resource "aws_iam_role_policy_attachment" "umesse_generate_lambda" {
  policy_arn = aws_iam_policy.umesse_generate_lambda.arn
  role       = aws_iam_role.umesse_generate_lambda.name
}

resource "aws_iam_policy" "umesse_generate_lambda" {
  policy = data.aws_iam_policy_document.umesse_lambda.json
}

data "aws_iam_policy_document" "umesse_lambda" {
  statement {
    sid       = "AllowSQSPermissions"
    effect    = "Allow"
    resources = ["arn:aws:sqs:*"]

    actions = [
      "sqs:ChangeMessageVisibility",
      "sqs:DeleteMessage",
      "sqs:GetQueueAttributes",
      "sqs:ReceiveMessage",
    ]
  }

  statement {
    sid       = "AllowInvokingLambdas"
    effect    = "Allow"
    resources = ["arn:aws:lambda:ap-southeast-1:*:function:*"]
    actions   = ["lambda:InvokeFunction"]
  }

  statement {
    sid       = "AllowCreatingLogGroups"
    effect    = "Allow"
    resources = ["arn:aws:logs:ap-southeast-1:*:*"]
    actions   = ["logs:CreateLogGroup"]
  }
  statement {
    sid       = "AllowWritingLogs"
    effect    = "Allow"
    resources = ["arn:aws:logs:ap-southeast-1:*:log-group:/aws/lambda/*:*"]

    actions = [
      "logs:CreateLogStream",
      "logs:PutLogEvents",
    ]
  }
}
