"use strict";

const { constants, debuglog } = require("umesse-lib/constants");
const { ERROR_CODE, NotFoundError } = require("umesse-lib/error");
const { dynamodbManager } = require("umesse-lib/utils/dynamodbManager");

module.exports = {
  findAll: async function (unisCustomerCd) {
    const options = {
      KeyConditionExpression: "unisCustomerCd = :unisCustomerCd",
      ExpressionAttributeValues: {
        ":unisCustomerCd": unisCustomerCd,
      },
    };
    debuglog(JSON.stringify({ options: options }));

    let res = await dynamodbManager.query(
      constants.dynamoDbTable().external,
      options
    );
    if (!res || !res.Items.length) throw new NotFoundError(ERROR_CODE.E0000404);
    return res.Items;
  },

  findById: async function (unisCustomerCd, cmId) {
    let res = await this.findAll(unisCustomerCd);
    res = res.filter((item) => item.cmId === cmId).pop();
    if (!res) throw new NotFoundError(ERROR_CODE.E0000404);
    return res;
  },

  add: async function (item) {
    let res = await dynamodbManager.put(
      constants.dynamoDbTable().external,
      item,
      {}
    );
    if (!res) throw new Error(ERROR_CODE.E0000500);
    return res;
  },

  findByUploadSystem: async function (uploadSystem) {
    const options = {
      FilterExpression: "uploadSystem = :uploadSystem AND #status = :status",
      ExpressionAttributeNames: {
        "#status": "status",
      },
      ExpressionAttributeValues: {
        ":uploadSystem": uploadSystem,
        ":status": "1",
      },
      ProjectionExpression:
        "unisCustomerCd," +
        "dataProcessType," +
        "cmId," +
        "cmName," +
        "cmCommentManuscript," +
        "startDatetime," +
        "endDatetime," +
        "productionType," +
        "contentTime," +
        "sceneCd",
    };
    debuglog(JSON.stringify({ options: options }));

    let res = await dynamodbManager.scan(
      constants.dynamoDbTable().external,
      options
    );
    if (!res || !res.Items.length) throw new NotFoundError(ERROR_CODE.E0000404);
    return res.Items;
  },

  delete: async function (unisCustomerCd) {
    const key = { unisCustomerCd: unisCustomerCd };
    debuglog(JSON.stringify({ key: key }));

    let res = await dynamodbManager.delete(
      constants.dynamoDbTable().external,
      key,
      {}
    );
    if (!res) throw new Error(ERROR_CODE.E0000500);
    return res;
  },

  updateErrorData: async function (unisCustomerCd, data) {
    const key = { unisCustomerCd: unisCustomerCd };
    const options = {
      UpdateExpression:
        "SET #status = :status, errorCode = :errorCode, errorMessage = :errorMessage, #timestamp = :timestamp",
      ExpressionAttributeNames: {
        "#status": "status",
        "#timestamp": "timestamp",
      },
      ExpressionAttributeValues: data,
      ReturnValues: "UPDATED_NEW",
    };
    debuglog(JSON.stringify({ key: key, options: options }));

    let res = await dynamodbManager.update(
      constants.dynamoDbTable().external,
      key,
      options
    );
    if (!res) throw new Error(ERROR_CODE.E0000500);
    return res;
  },
};
