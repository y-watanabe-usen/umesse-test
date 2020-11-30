"use strict";

const { constants } = require("../constants");
const aws = require("aws-sdk");
const dynamo = new aws.DynamoDB(constants.dynamoDbConfig());

exports.controller = {
  scan: (table) =>
    dynamo
      .scan({
        TableName: table,
      })
      .promise(),

  get: (table, key, projection) =>
    dynamo
      .getItem({
        TableName: table,
        Key: key,
        ProjectionExpression: projection,
      })
      .promise(),

  put: (table, item) =>
    dynamo
      .putItem({
        TableName: table,
        Item: item,
      })
      .promise(),

  query: (table, keyCondition, filter, attributeName, attributeValue) =>
    dynamo
      .query({
        TableName: table,
        KeyConditionExpression: keyCondition,
        FilterExpression: filter,
        ExpressionAttributeNames: attributeName,
        ExpressionAttributeValues: attributeValue,
      })
      .promise(),
};
