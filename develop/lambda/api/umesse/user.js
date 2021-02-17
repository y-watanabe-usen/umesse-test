"use strict";

const { constants, debuglog, errorlog } = require("umesse-lib/constants");
const { validation } = require("umesse-lib/validation");
const { dynamodbManager } = require("umesse-lib/utils/dynamodbManager");
const { BadRequestError, InternalServerError } = require("./error");

// ユーザーデータ取得
exports.getUser = async (unisCustomerCd) => {
  debuglog(
    `[getUser] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
    })}`
  );

  // パラメーターチェック
  const checkParams = validation.checkParams({
    unisCustomerCd: unisCustomerCd,
  });
  if (checkParams) throw new BadRequestError(checkParams);

  const user = await findUserByCd(unisCustomerCd);

  return user;
};


async function findUserByCd(unisCustomerCd) {
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
  let res;
  try {
    res = await dynamodbManager.get(constants.dynamoDbTable().users, key, options);
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(e.message);
  }

  if (!res || !res.Item) throw new InternalServerError("not found");
  return res.Item;
}
