#!/bin/bash

HERE=$(cd $(dirname $0);pwd)
HOME_DIR=$HERE/..
LOCALSTACK_DIR=$HOME_DIR/localsatck
DEPLOY_LOCAL_DIR=$HOME_DIR/deploy/local
LAMBDA_API_DIR=$HOME_DIR/develop/lambda/api
LAMBDA_CONVERTER_DIR=$HOME_DIR/develop/lambda/converter
UMESSE_LIB_DIR=$HOME_DIR/develop/lambda/layer/nodejs/node_modules/umesse-lib

# start localstack
cd $LOCALSTACK_DIR
docker-compose down
docker system prune -af
docker-compose up -d --build

# start terraform
cd $LAMBDA_API_DIR
npm pack ../layer/nodejs/node_modules/umesse-lib/ && npm install --no-save umesse-lib-0.0.1.tgz

cd $LAMBDA_CONVERTER_DIR
npm pack ../layer/nodejs/node_modules/umesse-lib/ && npm install --no-save umesse-lib-0.0.1.tgz

cd $DEPLOY_LOCAL_DIR
rm -rf .terraform* terraform.tfstate* umesse_*
terraform init
terraform plan
terraform apply -auto-approve 
sh ./init.sh

cd $UMESSE_LIB_DIR
npm i

cd $LAMBDA_CONVERTER_DIR
npm i

cd $LAMBDA_API_DIR
npm i
