#!/bin/bash

HERE=$(cd $(dirname $0);pwd)
HOME_DIR=$HERE/..
LOCALSTACK_DIR=$HOME_DIR/localstack
DEPLOY_LOCAL_DIR=$HOME_DIR/deploy/local
LAMBDA_API_DIR=$HOME_DIR/develop/lambda/api
LAMBDA_CONVERTER_DIR=$HOME_DIR/develop/lambda/converter
UMESSE_LIB_DIR=$HOME_DIR/develop/lambda/layer/nodejs/node_modules/umesse-lib
WEBAPP_DIR=$HOME_DIR/develop/webapp

# start localstack
cd $LOCALSTACK_DIR
docker-compose down
docker system prune -af
docker-compose up -d --build

# start terraform
cd $LAMBDA_API_DIR
rm -rf tmp
npm run build

cd $LAMBDA_CONVERTER_DIR
npm run build

cd $DEPLOY_LOCAL_DIR
rm -rf .terraform* terraform.tfstate* umesse_*
terraform init
terraform plan
terraform apply -auto-approve
sh ./init.sh

cd $UMESSE_LIB_DIR
rm -rf node_modules
npm i

cd $LAMBDA_CONVERTER_DIR
rm -rf node_modules
npm i

cd $LAMBDA_API_DIR
rm -rf node_modules
npm i

cd $WEBAPP_DIR
rm -rf node_modules
yarn install
