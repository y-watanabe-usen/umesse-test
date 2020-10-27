
#!/usr/bin/env bash
set -u

REGION=ap-northeast-1
STAGE=v1
AWSCLI="aws --endpoint-url http://localhost:4566 --region $REGION"
#AWSCLI="awslocal"
API_NAME=umesse

$AWSCLI s3 sync ../sample_data s3://umesse-contents/
