#!/usr/bin/env bash
set -u

REGION=ap-northeast-1
STAGE=v1
AWSCLI="aws --endpoint-url http://localhost:4566 --region $REGION"
#AWSCLI="awslocal"
API_NAME=umesse


API_ID=$($AWSCLI apigateway get-rest-apis --query "items[?name==\`${API_NAME}\`].id" --output text)
if [ -z $API_ID ]
	then
		echo "Not Found $API_NAME"
	else
		ENDPOINT=http://localhost:4567/restapis/${API_ID}/${STAGE}/_user_request_/api
		echo "${ENDPOINT}"
		curl  ${ENDPOINT} $@
		curl  ${ENDPOINT}/auth $@
		curl  ${ENDPOINT}/token $@
		curl  ${ENDPOINT}/material $@
		curl  ${ENDPOINT}/material/chime $@
		curl  ${ENDPOINT}/material/chime/1 $@
		curl  ${ENDPOINT}/project $@
		curl  ${ENDPOINT}/cm $@
fi
