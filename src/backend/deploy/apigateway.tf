resource "aws_api_gateway_rest_api" "api" {
  name        = "UMesseAPI"
  description = "U Messe api"
  # body        = data.template_file.swagger.rendered
}

# data "template_file" "swagger" {
#   template = file("swagger.yaml")
# }