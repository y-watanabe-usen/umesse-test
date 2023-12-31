#!/usr/bin/env bash
set -u
HERE=$(cd $(dirname $0);pwd)
REGION=ap-northeast-1
AWSCLI="aws --endpoint-url http://localhost:4566 --region $REGION"

# s3 test data
$AWSCLI s3 cp $HERE/data/040000000-c-00000002.aac s3://umesse-users/users/040000000/cm/
$AWSCLI s3 cp $HERE/data/050000000-r-00000004.wav s3://umesse-users/users/050000000/recording/
$AWSCLI s3 cp $HERE/data/060000020-c-00000001.aac s3://umesse-users/users/060000020/cm/
$AWSCLI s3 cp $HERE/data/ja.mp3 s3://umesse-users/users/050000000/tts/
$AWSCLI s3 cp $HERE/data/en.mp3 s3://umesse-users/users/050000000/tts/

# dynamodb external table clear
node $HERE/clear.js

# dynamodb test data
$AWSCLI dynamodb batch-write-item --request-items file://$HERE/data/user.test.json
$AWSCLI dynamodb batch-write-item --request-items file://$HERE/data/cm.test.json
$AWSCLI dynamodb batch-write-item --request-items file://$HERE/data/upload.test.json
$AWSCLI dynamodb batch-write-item --request-items file://$HERE/data/share.test.json
$AWSCLI dynamodb batch-write-item --request-items file://$HERE/data/resources.test.json
$AWSCLI dynamodb batch-write-item --request-items file://$HERE/data/external.test.json
$AWSCLI dynamodb batch-write-item --request-items file://$HERE/data/meta.test.json
