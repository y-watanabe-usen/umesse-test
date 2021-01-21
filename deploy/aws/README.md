# AWS Terraform

## AWS Keys

- https://drive.google.com/drive/u/1/folders/1SmKPw6CF5oObov4DtkTvGa2uOJI4ePo7

## run

- state を s3 上で管理する
- https://www.terraform.io/docs/backends/types/s3.html

```bash
aws configure --profile umesse
AWS Access Key ID [None]: [Access Key]
AWS Secret Access Key [None]: [Secret Key]
Default region name [None]: ap-northeast-1
Default output format [None]: json

terraform init
terraform plan
terraform apply
```
