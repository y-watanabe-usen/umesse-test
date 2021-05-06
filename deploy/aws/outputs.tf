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

## FIXME: outputでは、for_eachが利用できないため、個々にoutput
## prod
output "sqs_url_converter_prod" {
  description = "SQS converter prod"
  value       = aws_sqs_queue.umesse_converter_queue["umesse"].id
}

output "sqs_url_generate_prod" {
  description = "SQS generate prod"
  value       = aws_sqs_queue.umesse_generate_queue["umesse"].id
}

output "cloud_front_destribution_domain_name_prod" {
  description = "Cloud Front domain prod"
  value       = aws_cloudfront_distribution.umesse["umesse"].domain_name
}

## stg
output "sqs_url_converter_stg" {
  description = "SQS converter stg"
  value       = aws_sqs_queue.umesse_converter_queue["stg-umesse"].id
}

output "sqs_url_generate_stg" {
  description = "SQS generate stg"
  value       = aws_sqs_queue.umesse_generate_queue["stg-umesse"].id
}

output "cloud_front_destribution_domain_name_stg" {
  description = "Cloud Front domain stg"
  value       = aws_cloudfront_distribution.umesse["stg-umesse"].domain_name
}

## dev
output "sqs_url_converter_dev" {
  description = "SQS converter dev"
  value       = aws_sqs_queue.umesse_converter_queue["dev-umesse"].id
}

output "sqs_url_generate_dev" {
  description = "SQS generate dev"
  value       = aws_sqs_queue.umesse_generate_queue["dev-umesse"].id
}

output "cloud_front_destribution_domain_name_dev" {
  description = "Cloud Front domain dev"
  value       = aws_cloudfront_distribution.umesse["dev-umesse"].domain_name
}
