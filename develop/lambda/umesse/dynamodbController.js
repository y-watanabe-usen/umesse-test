"use strict";

const aws = require("aws-sdk");
const dynamo = new aws.DynamoDB({
  region: "ap-northeast-1",
  endpoint: "localhost:4566",
});

exports.controller = {
  scan: (table) => {
    return dynamo
      .scan({
        TableName: table,
      })
      .promise();
  },

  get: (table, key) => {
    return dynamo
      .getItem({
        TableName: table,
        Key: key,
      })
      .promise();
  },

  put: (table, item) => {
    return dynamo
      .putItem({
        TableName: table,
        Item: item,
      })
      .promise();
  },

  listTables: () => {
    return dynamo.listTables({}).promise();
  },

  describeTable: (table) => {
    return dynamo
      .describeTable({
        TableName: table,
      })
      .promise();
  },

  createTable: (params) => {
    return dynamo.createTable(params).promise();
  },
};
