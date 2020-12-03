"use strict";

const { constants } = require("./constants");
const dynamodb = require("./utils/dynamodbController").controller;

exports.fetch = async (id) => {
  constants.debuglog("user: " + id);
  try {
    const key = { unis_customer_cd: id };
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
    let response = await dynamodb.get(constants.usersTable, key, options);
    if (!response || !response.Count) throw "not found";
    return response.Items;
  } catch (e) {
    console.log(e);
  }
};
