"use strict";

process.env.environment = "localstack";

const { constants } = require("umesse-lib/constants");
const { dynamodbManager } = require("umesse-lib/utils/dynamodbManager");

async function deleteTable(table) {
  let ret;
  try {
    ret = await dynamodbManager.scan(table, {});
    if (!ret || ret.Count === 0) {
      console.debug(`not record. ${table}`);
      return;
    }
    for (let item of ret.Items) {
      console.debug(`delete ${table} unisCustomerCd: ${item.unisCustomerCd}`);
      const _ = await dynamodbManager.delete(
        constants.dynamoDbTable().external,
        { unisCustomerCd: item.unisCustomerCd }
      );
    }
  } catch (e) {
    console.error(e);
  }
}

deleteTable(constants.dynamoDbTable().users);
deleteTable(constants.dynamoDbTable().external);
