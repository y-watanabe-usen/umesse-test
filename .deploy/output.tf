
output "local_url" {
  value = "http://localhost:4567/restapis/${aws_api_gateway_deployment.umesse_v1.rest_api_id}/v1/_user_request_${aws_api_gateway_resource.umesse.path}"
}
output "aws_url" {
  value = "${aws_api_gateway_deployment.umesse_v1.invoke_url}${aws_api_gateway_resource.umesse.path}"
}

