#!/usr/bin/env bash
set -u

HERE=$(cd $(dirname $0);pwd)
REGION=ap-northeast-1
STAGE=v1
AWSCLI="aws --endpoint-url http://localhost:4566 --region $REGION"
API_NAME=umesse

LAMBDA_LAYER_DIR=${HERE}/../develop/lambda/layer
DOCKER_LAMBDA_API=localstack_lambda_arn_aws_lambda_ap-northeast-1_000000000000_function_UMesseApiFunction
DOCKER_LAMBDA_CONVERTER=localstack_lambda_arn_aws_lambda_ap-northeast-1_000000000000_function_UMesseConverterFunction

# TODO: localstack lambda layer（共通処理）
# localstack freeではLambdaレイヤーが利用できないため、
# localstack LAMBDA_EXECUTOR=docker-reuse にして、コンテナを起動し続け、
# 共通処理を docker cp して各Lambda Functionで利用する
# 実際のLambdaレイヤーと配置が異なるが、一旦PATHが通っている箇所にffmpegを配置し利用する

# docker container start pi
API_ID=$($AWSCLI apigateway get-rest-apis --query "items[?name==\`${API_NAME}\`].id" --output text)
if [ -z $API_ID ]
  then
    echo "Not Found $API_NAME"
  else
    ENDPOINT=http://localhost:4566/restapis/${API_ID}/${STAGE}/_user_request_/api
    echo "${ENDPOINT}"
    curl  ${ENDPOINT}/ping $@
fi

# docker container start converter
$AWSCLI sqs send-message --queue-url http://localhost:4566/000000000000/umesseConverterQueue --message-body "hello"

sleep 1

# ffmpeg cp
docker cp ${LAMBDA_LAYER_DIR}/bin ${DOCKER_LAMBDA_API}:/opt/bin
docker cp ${LAMBDA_LAYER_DIR}/bin ${DOCKER_LAMBDA_CONVERTER}:/opt/bin

