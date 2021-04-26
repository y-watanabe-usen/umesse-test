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

if (!process.argv[2] || !process.argv[3]) {
  console.log(
    "argv error: node create_demo.js [dynamodb table] [unisCustomerCd range 100000000-100000010] [serviceCd U01 or U17]"
  );
  return;
}

const table = process.argv[2];
const range = process.argv[3];
const serviceCd = process.argv[4] || "U01";

const [start, end] = range.split("-");

for (let i = start; i <= end; i++) {
  console.debug(`unisCustomerCd: ${i}`);

  const params = {
    Item: {
      unisCustomerCd: `${i}`,
      contractCd: `N${i}`,
      serviceCd: serviceCd,
      serviceName: serviceCd == "U01" ? `UMUSIC` : `UMESSE(S'sence)`,
      customerName: `USEN ${i}`,
      customerNameKana: `ユーセン ${i}`,
      customerGroupCd: `G${i}`,
      customerGroupName: `USEN GROUP ${i}`,
      contractStatusCd: `2`,
      contractStatusName: `確定`,
      createDate: `2021-04-01T10:00:00+09:00`,
      renewalDate: `2021-04-01T10:00:00+09:00`,
      cm: [],
      recording: [],
      tts: [],
    },
    TableName: table,
  };

  // dynamodb put
  dynamodb.put(params, (err, data) => {
    if (err) console.error(JSON.stringify(err, null, 2));
  });
}

console.debug("end");
