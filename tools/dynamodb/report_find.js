"use strict";

/// all data
/// node report_find.js [dynamodb table] > ./output.json
/// node report_output.js ./output.json
///
/// unisCustomerCd
/// node report_find.js [dynamodb table] [unisCustomerCd] > ./output.json
/// cat ./output.json | jq -r '.cm[]|[.cmId,.title,.description,.manuscript,.scene.sceneName,.status,.timestamp,.uploadSystem,.materials.startChime.id,.materials.startChime.title,.materials.startChime.description,.materials.narrations[0].id,.materials.narrations[0].title,.materials.narrations[0].description,.materials.narrations[1].id,.materials.narrations[1].title,.materials.narrations[1].description,.materials.narrations[2].id,.materials.narrations[2].title,.materials.narrations[2].description,.materials.narrations[3].id,.materials.narrations[3].title,.materials.narrations[3].description,.materials.endChime.id,.materials.endChime.title,.materials.endChime.description]'
///
const aws = require("aws-sdk");
aws.config.update({
  region: "ap-northeast-1",
  // aws
  credentials: new aws.SharedIniFileCredentials({
    profile: "umesse",
  }),
  // localstack
  // endpoint: "http://localhost:4566",
});
const dynamodb = new aws.DynamoDB.DocumentClient();

if (!process.argv[2]) {
  console.log(
    "argv error: node report_find.js [dynamodb table] [unisCustomerCd]"
  );
  return;
}

const table = process.argv[2];
const target = process.argv[3] || "";

if (target) {
  dynamodb.get(
    { TableName: table, Key: { unisCustomerCd: target } },
    (err, data) => {
      if (err) {
        console.error(JSON.stringify(err, null, 2));
        return;
      }
      console.log(JSON.stringify(data.Item));
    }
  );
} else {
  dynamodb.scan({ TableName: table }, (err, data) => {
    if (err) {
      console.error(JSON.stringify(err, null, 2));
      return;
    }
    console.log(JSON.stringify(data.Items));
  });
}
