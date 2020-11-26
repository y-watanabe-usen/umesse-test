
#!/usr/bin/env bash
set -u

REGION=ap-northeast-1
STAGE=v1
AWSCLI="aws --endpoint-url http://localhost:4566 --region $REGION"
#AWSCLI="awslocal"
API_NAME=umesse

# s3 sample data
$AWSCLI s3 sync ../sample_data/s3/users s3://umesse-users/
$AWSCLI s3 sync ../sample_data/s3/contents s3://umesse-contents/

# dynamodb sample data
$AWSCLI dynamodb batch-write-item --request-items file://../sample_data/dynamodb/users.json
$AWSCLI dynamodb batch-write-item --request-items file://../sample_data/dynamodb/contents_bgm.json
$AWSCLI dynamodb batch-write-item --request-items file://../sample_data/dynamodb/contents_chime.json
$AWSCLI dynamodb batch-write-item --request-items file://../sample_data/dynamodb/contents_narration.json
$AWSCLI dynamodb batch-write-item --request-items file://../sample_data/dynamodb/contents_tts.json

# sample scan
# $AWSCLI dynamodb scan --table-name umesse-contents --filter-expression 'contains(id, :id)' --expression-attribute-values '{":id": {"S":"bgm"}}'