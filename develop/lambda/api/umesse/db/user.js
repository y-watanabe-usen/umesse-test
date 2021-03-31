"use strict";

const { constants, debuglog } = require("umesse-lib/constants");
const { ERROR_CODE, NotFoundError } = require("umesse-lib/error");
const { dynamodbManager } = require("umesse-lib/utils/dynamodbManager");

module.exports = {
  find: async function (unisCustomerCd) {
    const key = { unisCustomerCd: unisCustomerCd };
    const options = {
      ProjectionExpression:
        "unisCustomerCd," +
        "contractCd," +
        "serviceCd," +
        "serviceName," +
        "customerName," +
        "customerNameKana," +
        "customerGroupCd," +
        "customerGroupName," +
        "contractStatusCd," +
        "contractStatusName," +
        "createDate," +
        "renewalDate",
    };
    debuglog(JSON.stringify({ key: key, options: options }));

    let ret = await dynamodbManager.get(
      constants.dynamoDbTable().users,
      key,
      options
    );
    debuglog(JSON.stringify(ret));
    if (!ret || !ret.Item) throw new NotFoundError(ERROR_CODE.E0000404);
    return ret.Item;
  },

  findCm: async function (unisCustomerCd) {
    const key = { unisCustomerCd: unisCustomerCd };
    const options = {
      ProjectionExpression: "cm",
    };
    debuglog(JSON.stringify({ key: key, options: options }));

    let ret = await dynamodbManager.get(
      constants.dynamoDbTable().users,
      key,
      options
    );
    debuglog(JSON.stringify(ret));
    if (!ret || !ret.Item) throw new NotFoundError(ERROR_CODE.E0000404);
    ret = ret.Item.cm.filter(
      (item) => item.status !== constants.cmStatus.DELETE
    );
    return ret;
  },

  findCmIndex: async function (unisCustomerCd, id) {
    let ret = await this.findCm(unisCustomerCd);
    debuglog(JSON.stringify(ret));
    const index = ret.findIndex((item) => item.cmId === id);
    if (index < 0) throw new NotFoundError(ERROR_CODE.E0000404);
    return [ret[index], index];
  },

  findResource: async function (unisCustomerCd, category) {
    const key = { unisCustomerCd: unisCustomerCd };
    const options = {
      ProjectionExpression: category,
    };
    debuglog(JSON.stringify({ key: key, options: options }));

    let ret = await dynamodbManager.get(
      constants.dynamoDbTable().users,
      key,
      options
    );
    debuglog(JSON.stringify(ret));
    if (!ret || !ret.Item) throw new NotFoundError(ERROR_CODE.E0000404);
    return ret.Item[category];
  },

  findResourceIndex: async function (unisCustomerCd, category, id) {
    let ret = await this.findResource(unisCustomerCd, category);
    debuglog(JSON.stringify(ret));
    const index = ret.findIndex((item) => item[`${category}Id`] === id);
    if (index < 0) throw new NotFoundError(ERROR_CODE.E0000404);
    return [ret[index], index];
  },

  addCm: async function (unisCustomerCd, data) {
    const key = { unisCustomerCd: unisCustomerCd };
    const options = {
      UpdateExpression: "SET cm = list_append(cm, :cm)",
      ExpressionAttributeValues: {
        ":cm": [data],
      },
      ReturnValues: "UPDATED_NEW",
    };
    debuglog(JSON.stringify({ key: key, options: options }));

    let ret = await dynamodbManager.update(
      constants.dynamoDbTable().users,
      key,
      options
    );
    debuglog(JSON.stringify(ret));
    if (!ret) throw new Error(ERROR_CODE.E0000500);
    return ret.Attributes.cm.pop();
  },

  addResource: async function (unisCustomerCd, category, data) {
    const key = { unisCustomerCd: unisCustomerCd };
    const options = {
      UpdateExpression: "SET #category = list_append(#category, :data)",
      ExpressionAttributeNames: {
        "#category": category,
      },
      ExpressionAttributeValues: {
        ":data": [data],
      },
      ReturnValues: "UPDATED_NEW",
    };
    debuglog(JSON.stringify({ key: key, options: options }));

    let ret = await dynamodbManager.update(
      constants.dynamoDbTable().users,
      key,
      options
    );
    debuglog(JSON.stringify(ret));
    if (!ret) throw new Error(ERROR_CODE.E0000500);
    return ret.Attributes[category].pop();
  },

  updateCm: async function (unisCustomerCd, index, cm) {
    const key = { unisCustomerCd: unisCustomerCd };
    const options = {
      UpdateExpression: `SET cm[${index}] = :cm`,
      ExpressionAttributeValues: {
        ":cm": cm,
      },
      ReturnValues: "UPDATED_NEW",
    };
    debuglog(JSON.stringify({ key: key, options: options }));

    let ret = await dynamodbManager.update(
      constants.dynamoDbTable().users,
      key,
      options
    );
    debuglog(JSON.stringify(ret));
    if (!ret) throw new Error(ERROR_CODE.E0000500);

    // localstack だとReturnValues: "UPDATED_NEW"が動かないので下記分岐
    if (ret.Attributes.cm[index]) return ret.Attributes.cm[index];
    return ret.Attributes.cm.pop();
  },

  updateResource: async function (unisCustomerCd, category, index, resource) {
    const key = { unisCustomerCd: unisCustomerCd };
    const options = {
      UpdateExpression: `SET #category[${index}] = :resource`,
      ExpressionAttributeNames: {
        "#category": category,
      },
      ExpressionAttributeValues: {
        ":resource": resource,
      },
      ReturnValues: "UPDATED_NEW",
    };
    debuglog(JSON.stringify({ key: key, options: options }));

    let ret = await dynamodbManager.update(
      constants.dynamoDbTable().users,
      key,
      options
    );
    debuglog(JSON.stringify(ret));
    if (!ret) throw new Error(ERROR_CODE.E0000500);

    // localstack だとReturnValues: "UPDATED_NEW"が動かないので下記分岐
    if (ret.Attributes[category][index]) return ret.Attributes[category][index];
    return ret.Attributes[category].pop();
  },

  deleteFromCategory: async function (unisCustomerCd, category, index) {
    const key = { unisCustomerCd: unisCustomerCd };
    const options = {
      UpdateExpression: `REMOVE #category[${index}]`,
      ExpressionAttributeNames: {
        "#category": category,
      },
      ReturnValues: "UPDATED_NEW",
    };
    debuglog(JSON.stringify({ key: key, options: options }));

    let ret = await dynamodbManager.update(
      constants.dynamoDbTable().users,
      key,
      options
    );
    debuglog(JSON.stringify(ret));
    if (!ret) throw new Error(ERROR_CODE.E0000500);
    return ret.Attributes[category];
  },
};
