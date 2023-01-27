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

///
/// node cmes_data_import.js dev-umesse-meta ./output.json
///
if (!process.argv[2] || !process.argv[3]) {
  console.log(
    "argv error: node cmes_data_import.js [table name] [json file path]"
  );
  process.exit();
}

const table = process.argv[2];
const json = require(process.argv[3]);

json.forEach((items) => {
  if (items.cm.length > 0) {
    items.cm.forEach((item) => {
      if (item.status == "12") {
        const d = new Date(item.startDate ?? item.timestamp);
        const date =
          d.getFullYear() +
          (d.getMonth() + 1).toString().padStart(2, "0") +
          d.getDate().toString().padStart(2, "0");
        let params = {
          Item: {
            targetDate: `${date}`,
            id: `${date}-${item.cmId}`,
            unisCustomerCd: items.unisCustomerCd,
            customerName: items.customerName,
            customerNameKana: items.customerNameKana,
            serviceCd: items.serviceCd,
            serviceName: items.serviceName,
            cmId: item.cmId,
            cmName: item.title,
            cmDescription: item.description?.replace(/\r?\n/g, " "), // 改行削除
            cmCommentManuscript: item.manuscript,
            cmContentTime: item.seconds * 1000, // millisecond
            cmProductionType: item.productionType,
            sceneCd: item.scene?.sceneCd,
            sceneName: item.scene?.sceneName,
          },
          TableName: table,
        };
        console.log(params);
      }
    });

    // dynamodb put
    dynamodb.put(params, (err, data) => {
      if (err) console.error(JSON.stringify(err, null, 2));
    });
  }
});
