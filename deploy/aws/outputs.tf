## FIXME: outputでは、for_eachが利用できないため、個々にoutput
## prod
output "rest_api_id_prod" {
  description = "REST API id prod"
  value       = aws_api_gateway_rest_api.umesse["umesse"].id
}

output "deployment_id_prod" {
  description = "Deployment id prod"
  value       = aws_api_gateway_deployment.umesse_v1["umesse"].id
}

output "deployment_invoke_url_prod" {
  description = "Deployment invoke url prod"
  value       = aws_api_gateway_deployment.umesse_v1["umesse"].invoke_url
}

output "deployment_execution_arn_prod" {
  description = "Deployment execution ARN prod"
  value       = aws_api_gateway_deployment.umesse_v1["umesse"].execution_arn
}

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
output "rest_api_id_stg" {
  description = "REST API id stg"
  value       = aws_api_gateway_rest_api.umesse["stg-umesse"].id
}

output "deployment_id_stg" {
  description = "Deployment id stg"
  value       = aws_api_gateway_deployment.umesse_v1["stg-umesse"].id
}

output "deployment_invoke_url_stg" {
  description = "Deployment invoke url stg"
  value       = aws_api_gateway_deployment.umesse_v1["stg-umesse"].invoke_url
}

output "deployment_execution_arn_stg" {
  description = "Deployment execution ARN stg"
  value       = aws_api_gateway_deployment.umesse_v1["stg-umesse"].execution_arn
}

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
output "rest_api_id_dev" {
  description = "REST API id dev"
  value       = aws_api_gateway_rest_api.umesse["dev-umesse"].id
}

output "deployment_id_dev" {
  description = "Deployment id dev"
  value       = aws_api_gateway_deployment.umesse_v1["dev-umesse"].id
}

output "deployment_invoke_url_dev" {
  description = "Deployment invoke url dev"
  value       = aws_api_gateway_deployment.umesse_v1["dev-umesse"].invoke_url
}

output "deployment_execution_arn_dev" {
  description = "Deployment execution ARN dev"
  value       = aws_api_gateway_deployment.umesse_v1["dev-umesse"].execution_arn
}

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
