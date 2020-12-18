"use strict";

const { constants, debuglog } = require("./constants");
const dynamodb = require("./utils/dynamodbController").controller;

// ユーザーデータ取得
exports.getUser = async (unisCustomerCd) => {
  debuglog(
    `[getUser] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
    })}`
  );

  try {
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

    const res = await dynamodb.get(
      constants.dynamoDbTable().users,
      key,
      options
    );
    if (!res || !res.Item) throw "not found";
    return res.Item;
  } catch (e) {
    // TODO: error handle
    console.log(e);
    return { message: e };
  }
};
