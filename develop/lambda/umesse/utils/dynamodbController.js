"use strict";

const { constants } = require("../constants");
const aws = require("aws-sdk");
const docClient = new aws.DynamoDB.DocumentClient(constants.dynamoDbConfig());

exports.controller = {
  scan: (table) =>
    docClient
      .scan({
        TableName: table,
      })
      .promise(),

  get: (table, key, expression) =>
    docClient
      .get({
        TableName: table,
        Key: key,
        ProjectionExpression: expression,
      })
      .promise(),

  put: (table, item) =>
    docClient
      .put({
        TableName: table,
        Item: item,
      })
      .promise(),

  update: (table, key, expression, attributeValue) =>
    docClient
      .update({
        TableName: table,
        Key: key,
        UpdateExpression: expression,
        ExpressionAttributeValues: attributeValue,
      })
      .promise(),

  delete: (table, key) =>
    docClient
      .delete({
        TableName: table,
        Key: key,
      })
      .promise(),

  query: (table, keyCondition, expression, attributeName, attributeValue) =>
    docClient
      .query({
        TableName: table,
        KeyConditionExpression: keyCondition,
        FilterExpression: expression,
        ExpressionAttributeNames: attributeName,
        ExpressionAttributeValues: attributeValue,
      })
      .promise(),
};
