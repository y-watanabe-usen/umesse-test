#!/usr/bin/env bash
set -u

export AWS_CLI_FILE_ENCODING=UTF-8

REGION=ap-northeast-1
STAGE=v1
AWSCLI="aws --endpoint-url http://localhost:4566 --region $REGION"
#AWSCLI="awslocal"
API_NAME=umesse

# s3 sample data
$AWSCLI s3 sync ../../sample_data/s3/umesse-users s3://umesse-users/
$AWSCLI s3 sync ../../sample_data/s3/umesse-contents s3://umesse-contents/

# dynamodb sample data
$AWSCLI dynamodb batch-write-item --request-items file://../../sample_data/dynamodb/users.json
$AWSCLI dynamodb batch-write-item --request-items file://../../sample_data/dynamodb/contents_bgm.json
$AWSCLI dynamodb batch-write-item --request-items file://../../sample_data/dynamodb/contents_chime.json
$AWSCLI dynamodb batch-write-item --request-items file://../../sample_data/dynamodb/contents_narration.json
$AWSCLI dynamodb batch-write-item --request-items file://../../sample_data/dynamodb/contents_template.json
$AWSCLI dynamodb batch-write-item --request-items file://../../sample_data/dynamodb/meta.json
