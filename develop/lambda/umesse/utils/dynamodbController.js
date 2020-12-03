"use strict";

const { constants } = require("../constants");
const aws = require("aws-sdk");
const docClient = new aws.DynamoDB.DocumentClient(constants.dynamoDbConfig());

exports.controller = {
  scan: (table, options) =>
    docClient
      .scan({
        TableName: table,
        ...options,
      })
      .promise(),

      get: (table, key, options) =>
    docClient
      .get({
        TableName: table,
        Key: key,
        ...options,
      })
      .promise(),

  put: (table, item, options) =>
    docClient
      .put({
        TableName: table,
        Item: item,
        ...options,
      })
      .promise(),

  update: (table, key, options) =>
    docClient
      .update({
        TableName: table,
        Key: key,
        ...options,
      })
      .promise(),

  delete: (table, key, options) =>
    docClient
      .delete({
        TableName: table,
        Key: key,
        ...options,
      })
      .promise(),

  query: (table, options) =>
    docClient
      .query({
        TableName: table,
        ...options,
      })
      .promise(),
};
