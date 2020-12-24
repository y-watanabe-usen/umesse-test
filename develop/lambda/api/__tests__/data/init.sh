#!/usr/bin/env bash
set -u
HERE=$(cd $(dirname $0);pwd)
REGION=ap-northeast-1
AWSCLI="aws --endpoint-url http://localhost:4566 --region $REGION"

# dynamodb test data
$AWSCLI dynamodb batch-write-item --request-items file://$HERE/test01.json
$AWSCLI dynamodb batch-write-item --request-items file://$HERE/test02.json
$AWSCLI dynamodb batch-write-item --request-items file://$HERE/test03.json
$AWSCLI dynamodb batch-write-item --request-items file://$HERE/test04.json
