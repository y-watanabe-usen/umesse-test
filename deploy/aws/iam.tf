## iam umesse api lambda
resource "aws_iam_role" "umesse_api_lambda_role" {
  name               = "umesse_api_lambda_role"
  assume_role_policy = file("iam_role_policy.json")
}

resource "aws_iam_policy" "umesse_api_lambda_policy" {
  name   = "umesse_api_lambda_policy"
  policy = file("umesse_api_policy.json")
}

resource "aws_iam_role_policy_attachment" "umesse_api_lambda" {
  role       = aws_iam_role.umesse_api_lambda_role.name
  policy_arn = aws_iam_policy.umesse_api_lambda_policy.arn
}

## iam umesse converter lambda
resource "aws_iam_role" "umesse_converter_lambda_role" {
  name               = "umesse_converter_lambda_role"
  assume_role_policy = file("iam_role_policy.json")
}

resource "aws_iam_policy" "umesse_converter_lambda_policy" {
  name   = "umesse_converter_lambda_policy"
  policy = file("umesse_converter_policy.json")
}

resource "aws_iam_role_policy_attachment" "umesse_converter_lambda" {
  role       = aws_iam_role.umesse_converter_lambda_role.name
  policy_arn = aws_iam_policy.umesse_converter_lambda_policy.arn
}

## iam umesse generate lambda
resource "aws_iam_role" "umesse_generate_lambda_role" {
  name               = "umesse_generate_lambda_role"
  assume_role_policy = file("iam_role_policy.json")
}

resource "aws_iam_policy" "umesse_generate_lambda_policy" {
  name   = "umesse_generate_lambda_policy"
  policy = file("umesse_generate_policy.json")
}

resource "aws_iam_role_policy_attachment" "umesse_generate_lambda" {
  role       = aws_iam_role.umesse_generate_lambda_role.name
  policy_arn = aws_iam_policy.umesse_generate_lambda_policy.arn
}

## iam umesse sync lambda
resource "aws_iam_role" "umesse_sync_lambda_role" {
  name               = "umesse_sync_lambda_role"
  assume_role_policy = file("iam_role_policy.json")
}

resource "aws_iam_policy" "umesse_sync_lambda_policy" {
  name   = "umesse_sync_lambda_policy"
  policy = file("umesse_sync_policy.json")
}

resource "aws_iam_role_policy_attachment" "umesse_sync_lambda" {
  role       = aws_iam_role.umesse_sync_lambda_role.name
  policy_arn = aws_iam_policy.umesse_sync_lambda_policy.arn
}
