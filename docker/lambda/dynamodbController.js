'use strict';

const aws = require('aws-sdk');
const dynamo = new aws.DynamoDB({
  region: 'ap-northeast-1',
  endpoint: 'http://docker-dynamodb:8000',
});

exports.controller = {
  get: (table, key) => {
    return dynamo.getItem({
      TableName: table,
      Key: key,
    }).promise();
  },

  put: (table, item) => {
    return dynamo.putItem({
      TableName: table,
      Item: item,
    }).promise();
  },

  listTables: () => {
    return dynamo.listTables({}).promise();
  },

  describeTable: (table) => {
    return dynamo.describeTable({
      TableName: table,
    }).promise();
  },

  createTable: (params) => {
    return dynamo.createTable(params).promise();
  },
};
