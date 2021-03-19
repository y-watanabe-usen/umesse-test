#!/usr/bin/env bash
set -u
HERE=$(cd $(dirname $0);pwd)
REGION=ap-northeast-1
AWSCLI="aws --endpoint-url http://localhost:4566 --region $REGION"

# s3 test data
$AWSCLI s3 cp $HERE/data/110000000-c-00000001.mp3 s3://umesse-users/users/110000000/cm/

# dynamodb test data
$AWSCLI dynamodb batch-write-item --request-items file://$HERE/data/convert.test.json
