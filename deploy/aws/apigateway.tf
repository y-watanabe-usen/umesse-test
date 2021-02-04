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
  rest_api_id      = aws_api_gateway_rest_api.umesse.id
  resource_id      = aws_api_gateway_resource.umesse.id
  http_method      = "ANY"
  authorization    = "NONE"
  api_key_required = true
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
# TODO: とりあえずdev環境のみ
## v1
resource "aws_api_gateway_deployment" "umesse_v1" {
  depends_on = [
    aws_api_gateway_integration.umesse,
    aws_api_gateway_integration.umesse_options,
  ]
  rest_api_id = aws_api_gateway_rest_api.umesse.id
  stage_name  = "v1"
}

## permission:   API Gateway ----> Lambda
resource "aws_lambda_permission" "umesse" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.umesse_api_function.function_name
  principal     = "apigateway.amazonaws.com"
}

# API Gateway API Key
resource "aws_api_gateway_api_key" "umesse_key" {
  name    = "umesse_key"
  enabled = true
}

resource "aws_api_gateway_usage_plan" "umesse_plan" {
  name = "umesse_plan"

  api_stages {
    api_id = aws_api_gateway_rest_api.umesse.id
    stage  = aws_api_gateway_deployment.umesse_v1.stage_name
  }
}

resource "aws_api_gateway_usage_plan_key" "umesse_plan_key" {
  key_id        = aws_api_gateway_api_key.umesse_key.id
  key_type      = "API_KEY"
  usage_plan_id = aws_api_gateway_usage_plan.umesse_plan.id
}

# CROS
resource "aws_api_gateway_method" "umesse_options" {
  rest_api_id      = aws_api_gateway_rest_api.umesse.id
  resource_id      = aws_api_gateway_resource.umesse.id
  http_method      = "OPTIONS"
  authorization    = "NONE"
}

resource "aws_api_gateway_integration" "umesse_options" {
  rest_api_id             = aws_api_gateway_rest_api.umesse.id
  resource_id             = aws_api_gateway_resource.umesse.id
  http_method             = aws_api_gateway_method.umesse_options.http_method
  integration_http_method = "OPTIONS"
  type                    = "MOCK"

  request_templates = {
    "application/json" = <<EOF
{
  "statusCode": 200
}
EOF
  }
}

resource "aws_api_gateway_method_response" "umesse_options" {
  rest_api_id = aws_api_gateway_rest_api.umesse.id
  resource_id = aws_api_gateway_resource.umesse.id
  http_method = aws_api_gateway_method.umesse_options.http_method
  status_code = "200"

  response_models = {
    "application/json" = "Empty"
  }

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true,
    "method.response.header.Access-Control-Allow-Methods" = true,
    "method.response.header.Access-Control-Allow-Origin"  = true
  }
}

resource "aws_api_gateway_integration_response" "umesse_options" {
  rest_api_id = aws_api_gateway_rest_api.umesse.id
  resource_id = aws_api_gateway_resource.umesse.id
  http_method = aws_api_gateway_method.umesse_options.http_method
  status_code = aws_api_gateway_method_response.umesse_options.status_code

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
    "method.response.header.Access-Control-Allow-Methods" = "'GET,OPTIONS,POST,PUT,DELETE'",
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }
}
