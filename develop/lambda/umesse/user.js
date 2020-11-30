"use strict";

const { constants } = require("./constants");
const dynamodb = require("./utils/dynamodbController").controller;

exports.fetch = async (id) => {
  constants.debuglog("getUser: " + id);
  try {
    let response = await dynamodb.get(
      constants.usersTable,
      {
        unis_customer_cd: { S: id },
      },
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
        "renewal_date"
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};
