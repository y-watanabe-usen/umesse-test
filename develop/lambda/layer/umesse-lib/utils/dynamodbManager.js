"use strict";

const { constants } = require("../constants");
const aws = require("aws-sdk");
const DocumentClient = new aws.DynamoDB.DocumentClient(
  constants.dynamoDbConfig()
);

exports.dynamodbManager = {
  scan: (table, options) =>
    DocumentClient.scan({
      TableName: table,
      ...options,
    }).promise(),

  get: (table, key, options) =>
    DocumentClient.get({
      TableName: table,
      Key: key,
      ...options,
    }).promise(),

  put: (table, item, options) =>
    DocumentClient.put({
      TableName: table,
      Item: item,
      ...options,
    }).promise(),

  update: (table, key, options) =>
    DocumentClient.update({
      TableName: table,
      Key: key,
      ...options,
    }).promise(),

  delete: (table, key, options) =>
    DocumentClient.delete({
      TableName: table,
      Key: key,
      ...options,
    }).promise(),

  query: (table, options) =>
    DocumentClient.query({
      TableName: table,
      ...options,
    }).promise(),
};
