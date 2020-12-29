"use strict";

const { constants } = require("../constants");
const aws = require("aws-sdk");
const DocumentClient = new aws.DynamoDB.DocumentClient(
  constants.dynamoDbConfig()
);

exports.scanDynamoDb = (table, options) =>
  DocumentClient.scan({
    TableName: table,
    ...options,
  }).promise();

exports.getDynamoDb = (table, key, options) =>
  DocumentClient.get({
    TableName: table,
    Key: key,
    ...options,
  }).promise();

exports.putDynamoDb = (table, item, options) =>
  DocumentClient.put({
    TableName: table,
    Item: item,
    ...options,
  }).promise();

exports.updateDynamoDb = (table, key, options) =>
  DocumentClient.update({
    TableName: table,
    Key: key,
    ...options,
  }).promise();

exports.deleteDynamoDb = (table, key, options) =>
  DocumentClient.delete({
    TableName: table,
    Key: key,
    ...options,
  }).promise();

exports.queryDynamoDb = (table, options) =>
  DocumentClient.query({
    TableName: table,
    ...options,
  }).promise();
