"use strict";

const { constants } = require("./constants");
const dynamodb = require("./utils/dynamodbController").controller;

exports.fetch = async (unisCustomerCd) => {
  constants.debuglog(`user fetch unis_customer_cd: ${unisCustomerCd}`);

  try {
    const key = { unis_customer_cd: unisCustomerCd };
    const options = {
      ProjectionExpression:
        "unis_customer_cd," +
        "contract_cd," +
        "service_cd," +
        "service_name," +
        "customer_name," +
        "customer_name_kana," +
        "customer_group_cd," +
        "customer_group_name," +
        "contract_status_cd," +
        "contract_status_name," +
        "create_date," +
        "renewal_date",
    };
    constants.debuglog(
      `key: ${JSON.stringify(key)}, options: ${JSON.stringify(options)}`
    );

    const res = await dynamodb.get(constants.usersTable, key, options);
    if (!res || !res.Item) throw "not found";
    return res.Item;
  } catch (e) {
    // TODO: error handle
    console.log(e);
  }
};
