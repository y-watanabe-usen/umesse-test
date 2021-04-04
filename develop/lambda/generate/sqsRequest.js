const aws = require("aws-sdk");
const SQS = new aws.SQS({
  region: "ap-northeast-1",
  endpoint: "localhost:4566",
  accessKeyId: "local",
  secretAccessKey: "local",
});
const QUEUE_URL = "http://localhost:4566/000000000000/umesseGenerateQueue";

const params = {
  MessageBody: JSON.stringify({
    unisCustomerCd: "123456789",
    id: "123456789-c-88888888",
    category: "cm",
    materials: {
      narrations: [{ id: "サンプル03", category: "narration", volume: 300 }],
      startChime: { id: "サンプル01", category: "chime", volume: 50 },
      endChime: { id: "サンプル02", category: "chime", volume: 50 },
    },
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
