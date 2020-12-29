"use strict";

const { constants } = require("../constants");
const aws = require("aws-sdk");
const SQS = new aws.SQS(constants.sqsConfig());
const QUEUE_URL = constants.sqsQueueUrl();

exports.sendSQS = (body) =>
  SQS.sendMessage({
    MessageBody: JSON.stringify(body),
    QueueUrl: QUEUE_URL,
    DelaySeconds: 0,
  }).promise();
