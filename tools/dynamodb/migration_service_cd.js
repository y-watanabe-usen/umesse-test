"use strict";

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
    "argv error: node migration_service_cd.js [dynamodb table] [target service cd U01] [migration service cd U19]"
  );
  return;
}

const table = process.argv[2];
const target = process.argv[3] || "U01";
const migration = process.argv[4] || "U19";

let customers = [];
dynamodb.scan({ TableName: table }, (err, data) => {
  if (err) {
    console.error(JSON.stringify(err, null, 2));
    return;
  }

  customers.push(
    ...data.Items.filter((v) => v.serviceCd === target).map(
      (v) => v.unisCustomerCd
    )
  );

  for (let customer of customers) {
    console.debug(`target customer: ${customer}`);

    dynamodb.update(
      {
        TableName: table,
        Key: { unisCustomerCd: customer },
        UpdateExpression: `SET serviceCd = :serviceCd`,
        ExpressionAttributeValues: { ":serviceCd": migration },
        ReturnValues: "UPDATED_NEW",
      },
      (err, data) => {
        if (err) console.error(JSON.stringify(err, null, 2));
      }
    );
  }
});

console.debug("end");
