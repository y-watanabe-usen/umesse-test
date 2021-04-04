"use strict";

process.env.environment = "localstack";

const { constants } = require("umesse-lib/constants");
const { dynamodbManager } = require("umesse-lib/utils/dynamodbManager");

async function main() {
  let ret;
  try {
    ret = await dynamodbManager.scan(constants.dynamoDbTable().external, {});
    if (!ret || ret.Count === 0) {
      console.debug("not record.");
      return;
    }
    for (let item of ret.Items) {
      console.debug(`delete unisCustomerCd: ${item.unisCustomerCd}`);
      const _ = await dynamodbManager.delete(
        constants.dynamoDbTable().external,
        { unisCustomerCd: item.unisCustomerCd }
      );
    }
  } catch (e) {
    console.error(e);
  }
}

main();
