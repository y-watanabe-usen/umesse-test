const aws = require("aws-sdk");
const SQS = new aws.SQS({
  region: "ap-northeast-1",
  endpoint: "localhost:4566",
  accessKeyId: "local",
  secretAccessKey: "local",
});
const QUEUE_URL = "http://localhost:4566/000000000000/umesseConverterQueue";

const params = {
  MessageBody: JSON.stringify({
    unisCustomerCd: "123456789",
    id: "123456789-c-99999999",
    category: "cm",
  }),
  QueueUrl: QUEUE_URL,
  DelaySeconds: 0,
};

try {
  SQS.sendMessage(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });
} catch (e) {
  console.log(e);
}
