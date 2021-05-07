#### API Gateway
resource "aws_api_gateway_rest_api" "umesse" {
  for_each = toset(var.name)
  name     = format("%s-api", each.key)

  binary_media_types = [
    "multipart/form-data",
  ]
}

### Set Path
resource "aws_api_gateway_resource" "umesse" {
  for_each    = toset(var.name)
  rest_api_id = aws_api_gateway_rest_api.umesse[each.key].id
  parent_id   = aws_api_gateway_rest_api.umesse[each.key].root_resource_id
  path_part   = "{proxy+}"
}

# Internet -----> API Gateway
resource "aws_api_gateway_method" "umesse" {
  for_each         = toset(var.name)
  rest_api_id      = aws_api_gateway_rest_api.umesse[each.key].id
  resource_id      = aws_api_gateway_resource.umesse[each.key].id
  http_method      = "ANY"
  authorization    = "NONE"
  api_key_required = true
}

# API Gateway ------> Lambda
resource "aws_api_gateway_integration" "umesse" {
  for_each                = toset(var.name)
  rest_api_id             = aws_api_gateway_rest_api.umesse[each.key].id
  resource_id             = aws_api_gateway_resource.umesse[each.key].id
  http_method             = aws_api_gateway_method.umesse[each.key].http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_alias.umesse_api_alias[each.key].invoke_arn
}

# deploy
## v1
resource "aws_api_gateway_deployment" "umesse_v1" {
  for_each    = toset(var.name)
  rest_api_id = aws_api_gateway_rest_api.umesse[each.key].id
  depends_on = [
    aws_api_gateway_integration.umesse
  ]
  stage_name = "v1"
}

## permission:   API Gateway ----> Lambda
resource "aws_lambda_permission" "umesse" {
  for_each      = toset(var.name)
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.umesse_api_function.function_name
  principal     = "apigateway.amazonaws.com"
  qualifier     = aws_lambda_alias.umesse_api_alias[each.key].name
}

# API Gateway API Key
resource "aws_api_gateway_api_key" "umesse_key" {
  for_each = toset(var.name)
  name     = format("%s-key", each.key)
  enabled  = true
}

resource "aws_api_gateway_usage_plan" "umesse_plan" {
  for_each = toset(var.name)
  name     = format("%s-plan", each.key)

  api_stages {
    api_id = aws_api_gateway_rest_api.umesse[each.key].id
    stage  = aws_api_gateway_deployment.umesse_v1[each.key].stage_name
  }
}

resource "aws_api_gateway_usage_plan_key" "umesse_plan_key" {
  for_each      = toset(var.name)
  key_id        = aws_api_gateway_api_key.umesse_key[each.key].id
  key_type      = "API_KEY"
  usage_plan_id = aws_api_gateway_usage_plan.umesse_plan[each.key].id
}

# CROS
# FIXME: deployする時に上手くいかないことがあるため、一旦AWSコンソール上で設定する
# resource "aws_api_gateway_method" "umesse_options" {
#   for_each      = toset(var.name)
#   rest_api_id   = aws_api_gateway_rest_api.umesse[each.key].id
#   resource_id   = aws_api_gateway_resource.umesse[each.key].id
#   http_method   = "OPTIONS"
#   authorization = "NONE"
# }

# resource "aws_api_gateway_integration" "umesse_options" {
#   for_each                = toset(var.name)
#   rest_api_id             = aws_api_gateway_rest_api.umesse[each.key].id
#   resource_id             = aws_api_gateway_resource.umesse[each.key].id
#   http_method             = aws_api_gateway_method.umesse_options[each.key].http_method
#   integration_http_method = "OPTIONS"
#   type                    = "MOCK"

#   request_templates = {
#     "application/json" = <<EOF
# {
#   "statusCode": 200
# }
# EOF
#   }
# }

# resource "aws_api_gateway_method_response" "umesse_options" {
#   rest_api_id = aws_api_gateway_rest_api.umesse[each.key].id
#   resource_id = aws_api_gateway_resource.umesse[each.key].id
#   http_method = aws_api_gateway_method.umesse_options[each.key].http_method
#   status_code = "200"

#   response_models = {
#     "application/json" = "Empty"
#   }

#   response_parameters = {
#     "method.response.header.Access-Control-Allow-Headers" = true,
#     "method.response.header.Access-Control-Allow-Methods" = true,
#     "method.response.header.Access-Control-Allow-Origin"  = true
#   }
# }

# resource "aws_api_gateway_integration_response" "umesse_options" {
#   rest_api_id = aws_api_gateway_rest_api.umesse[each.key].id
#   resource_id = aws_api_gateway_resource.umesse[each.key].id
#   http_method = aws_api_gateway_method.umesse_options[each.key].http_method
#   status_code = aws_api_gateway_method_response.umesse_options[each.key].status_code

#   response_parameters = {
#     "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Unis-Customer-Cd'",
#     "method.response.header.Access-Control-Allow-Methods" = "'GET,OPTIONS,POST,PUT,DELETE'",
#     "method.response.header.Access-Control-Allow-Origin"  = "'*'"
#   }
# }
