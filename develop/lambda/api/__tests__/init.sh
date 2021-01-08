#!/usr/bin/env bash
set -u
HERE=$(cd $(dirname $0);pwd)
REGION=ap-northeast-1
AWSCLI="aws --endpoint-url http://localhost:4566 --region $REGION"

# dynamodb test data
$AWSCLI dynamodb batch-write-item --request-items file://$HERE/data/user.test.json
$AWSCLI dynamodb batch-write-item --request-items file://$HERE/data/cm.test.json
$AWSCLI dynamodb batch-write-item --request-items file://$HERE/data/upload.test.json
$AWSCLI dynamodb batch-write-item --request-items file://$HERE/data/share.test.json
$AWSCLI dynamodb batch-write-item --request-items file://$HERE/data/resources.test.json
$AWSCLI dynamodb batch-write-item --request-items file://$HERE/data/external.test.json
