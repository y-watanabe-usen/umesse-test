"use strict";

const { constants, debuglog } = require("umesse-lib/constants");
const { ERROR_CODE, NotFoundError } = require("umesse-lib/error");
const { dynamodbManager } = require("umesse-lib/utils/dynamodbManager");

module.exports = {
  find: async function (targetDate, id) {
    const key = { targetDate: targetDate, id: id,};
    debuglog(JSON.stringify({ key: key }));

    let ret = await dynamodbManager.get(
      constants.dynamoDbTable().meta,
      key,
      {}
    );
    debuglog(JSON.stringify(ret));
    if (!ret || !ret.Item) return;
    if (ret.Item.status === "9") return;
    return ret.Item;
  },

  findAll: async function (targetDate) {
    const options = {
      KeyConditionExpression: 'targetDate = :targetDate and id Like :id',
      ExpressionAttributeValues: {
        ":targetDate": targetDate,
        ":id": targetDate + '-%'
      },
    };
    debuglog(JSON.stringify({ options: options }));

    let ret = await dynamodbManager.query(
      constants.dynamoDbTable().meta,
      options
    );
    debuglog(JSON.stringify(ret));
    if (!ret) throw new NotFoundError(ERROR_CODE.E0000404);
    return ret.Items;
  },

  add: async function (item) {
    let ret = await dynamodbManager.put(
      constants.dynamoDbTable().meta,
      item,
      {}
    );
    debuglog(JSON.stringify(ret));
    if (!ret) throw new Error(ERROR_CODE.E0000500);
    return ret;
  },

  delete: async function (targetDate, id) {
    const key = { targetDate: targetDate, id: id};
    debuglog(JSON.stringify({ key: key }));

    let ret = await dynamodbManager.delete(
      constants.dynamoDbTable().meta,
      key,
      {}
    );
    debuglog(JSON.stringify(ret));
    if (!ret) throw new Error(ERROR_CODE.E0000500);
    return ret;
  },

};
