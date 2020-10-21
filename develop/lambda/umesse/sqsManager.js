const aws = require('aws-sdk');
const SQS = new aws.SQS({
  region: "ap-northeast-1",
  endpoint:"localhost:4566"});
const QUEUE_URL = 'http://localhost:4566/000000000000/SomeQueue';

exports.sendSQS = (jsonData) => {
  var params = {
    MessageBody: JSON.stringify(jsonData), 
    QueueUrl: QUEUE_URL,
    DelaySeconds: 0
  };

  SQS.sendMessage(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else     console.log(data);
  });

}

