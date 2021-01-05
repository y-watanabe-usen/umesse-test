"use strict";

const { constants, debuglog } = require("umesse-lib/constants");
const { dynamodbManager } = require("umesse-lib/utils/dynamodbManager");
const { validation } = require("./validation");

// ユーザーデータ取得
exports.getUser = async (unisCustomerCd) => {
  debuglog(
    `[getUser] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
    })}`
  );

  try {
    // パラメーターチェック
    const checkParams = validation.checkParams("getUser", unisCustomerCd);
    if (checkParams) throw checkParams;

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

    const res = await dynamodbManager.get(
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
