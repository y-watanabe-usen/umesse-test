"use strict";

const fs = require("fs");
const csv = require("csv");
const path = require("path");
const randomBytes = require("crypto").randomBytes;
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
const S3 = new aws.S3();

if (!process.argv[2] || !process.argv[3] || !process.argv[4]) {
  console.error(
    "argv error: node sse_put.js [target] [unisCustomerCd] [contents data dir]"
  );
  return;
}

const target = process.argv[2];
const unisCustomerCd = process.argv[3];
const dir = process.argv[4];
const file = path.join(dir, `${unisCustomerCd}.csv`);

console.error(
  `target: ${target}, unisCustomerCd: ${unisCustomerCd}, dir: ${dir}`
);

// csv file exists
if (!fs.existsSync(file)) {
  console.error(`file error: not exists csv file: ${file}`);
  return;
}

main();

async function main() {
  let users;
  // dynamodb check
  try {
    users = await dynamodb
      .get({
        TableName: target,
        Key: { unisCustomerCd: unisCustomerCd },
      })
      .promise();
  } catch (e) {
    console.error(e);
    return;
  }
  if (!users || !users.Item) {
    console.error(
      `dynamoDb error: not exists unisCustomerCd: ${unisCustomerCd}`
    );
    return;
  }

  const parser = csv.parse({ columns: true, trim: true });
  const readStream = fs.createReadStream(file, {
    encoding: "utf-8",
  });
  readStream.pipe(parser);

  parser.on("readable", async () => {
    const recordingId = generateId(unisCustomerCd);

    let data;
    while ((data = parser.read())) {
      console.log(
        `title: ${data.title}, description: ${data.description}, file: ${data.file}`
      );

      let result;

      // s3 put
      let key = `users/${unisCustomerCd}/recording/${recordingId}.mp3`;
      let binary;
      try {
        binary = fs.readFileSync(path.join(dir, data.file));
      } catch (e) {
        console.error(e);
        return;
      }
      console.log("put s3 key:", key);
      try {
        result = await S3.putObject({
          Bucket: target,
          Key: key,
          Body: binary,
          ACL: "private",
        }).promise();
      } catch (e) {
        console.error(e);
        return;
      }
      if (!result) {
        console.error(`s3 error: put failed key: ${key}`);
        return;
      }

      // dynamodb update
      let item = {
        recordingId: recordingId,
        title: data.title,
        description: data.description,
        startDate: timestamp(),
        timestamp: timestamp(),
      };
      console.log("update dynamodb item:", item);
      try {
        result = await dynamodb
          .update({
            TableName: target,
            Key: { unisCustomerCd: unisCustomerCd },
            UpdateExpression: "SET recording = list_append(recording, :item)",
            ExpressionAttributeValues: {
              ":item": [item],
            },
            ReturnValues: "UPDATED_NEW",
          })
          .promise();
      } catch (e) {
        console.error(e);
        return;
      }
      if (!result || !result.Attributes["recording"]) {
        console.error(`dynamoDb error: update failed item: ${item}`);
        return;
      }
    }
  });

  parser.on("error", (e) => {
    console.error(e);
  });

  parser.on("end", () => {
    console.log("\nend");
  });
}

function timestamp(interval = 9) {
  const date = new Date();
  date.setHours(date.getHours() + interval);
  return date.toISOString().split("Z")[0] + "+09:00";
}

function generateId(unisCustomerCd) {
  const id = randomBytes(8).reduce((p, i) => p + (i % 36).toString(36), "");
  return `${unisCustomerCd}-r-${id}`;
}
