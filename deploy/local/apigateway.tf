#### API Gateway ####

resource "aws_api_gateway_rest_api" "umesse" {
  name = "umesse"
}

### Set Path
resource "aws_api_gateway_resource" "umesse" {
  rest_api_id = aws_api_gateway_rest_api.umesse.id
  parent_id   = aws_api_gateway_rest_api.umesse.root_resource_id
  path_part   = "{proxy+}"
}

# Internet -----> API Gateway
resource "aws_api_gateway_method" "umesse" {
  rest_api_id   = aws_api_gateway_rest_api.umesse.id
  resource_id   = aws_api_gateway_resource.umesse.id
  http_method   = "ANY"
  authorization = "NONE"
}

# API Gateway ------> Lambda
resource "aws_api_gateway_integration" "umesse" {
  rest_api_id             = aws_api_gateway_rest_api.umesse.id
  resource_id             = aws_api_gateway_resource.umesse.id
  http_method             = aws_api_gateway_method.umesse.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.umesse_api_function.invoke_arn
}

# deploy
## v1
resource "aws_api_gateway_deployment" "umesse_v1" {
  depends_on = [
    aws_api_gateway_integration.umesse
  ]
  rest_api_id = aws_api_gateway_rest_api.umesse.id
  stage_name  = "v1"
}

## permission:   API Gateway ----> Lambda
resource "aws_lambda_permission" "umesse" {
  statement_id = "AllowExecutionFromAPIGateway"
  #  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.umesse_api_function.function_name
  principal     = "apigateway.amazonaws.com"
}
