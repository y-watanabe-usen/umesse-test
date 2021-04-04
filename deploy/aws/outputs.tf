output "sqs_url_converter" {
  value = aws_sqs_queue.umesse_converter_queue.id
}

output "sqs_url_generate" {
  value = aws_sqs_queue.umesse_generate_queue.id
}

output "rest_api_id" {
  description = "REST API id"
  value       = aws_api_gateway_rest_api.umesse["dev-umesse"].id
}

output "rest_api_key" {
  description = "REST API key"
  value       = aws_api_gateway_api_key.umesse_key.value
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

output "cloud_front_destribution_domain_name" {
  description = "Cloud Front domain"
  value       = aws_cloudfront_distribution.umesse["dev-umesse"].domain_name
}
