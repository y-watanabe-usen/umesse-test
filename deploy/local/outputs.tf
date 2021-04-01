output "sqs_url_converter" {
  value = aws_sqs_queue.umesse_converter_queue.id
}

output "sqs_url_generate" {
  value = aws_sqs_queue.umesse_generate_queue.id
}

output "rest_api_id" {
  description = "REST API id"
  value       = aws_api_gateway_rest_api.umesse.id
}

output "deployment_id" {
  description = "Deployment id"
  value       = aws_api_gateway_deployment.umesse_v1.id
}

output "deployment_invoke_url" {
  description = "Deployment invoke url"
  value       = aws_api_gateway_deployment.umesse_v1.invoke_url
}

output "deployment_execution_arn" {
  description = "Deployment execution ARN"
  value       = aws_api_gateway_deployment.umesse_v1.execution_arn
}

output "local_url" {
  description = "Serverless invoke url"
  value       = "http://localhost:4566/restapis/${aws_api_gateway_rest_api.umesse.id}/v1/_user_request_/api"
}
