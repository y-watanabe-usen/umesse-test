#!/usr/bin/env bash
set -u
HERE=$(cd $(dirname $0);pwd)
REGION=ap-northeast-1
AWSCLI="aws --endpoint-url http://localhost:4566 --region $REGION"

# dynamodb test data
$AWSCLI dynamodb batch-write-item --request-items file://$HERE/data/convert.test.json
