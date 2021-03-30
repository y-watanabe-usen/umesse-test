"use strict";

const { constants, debuglog } = require("umesse-lib/constants");
const { ERROR_CODE, NotFoundError } = require("umesse-lib/error");
const { dynamodbManager } = require("umesse-lib/utils/dynamodbManager");

module.exports = {
  findByCategory: async function (category) {
    const options = {
      FilterExpression: "category = :category",
      ExpressionAttributeValues: {
        ":category": category,
      },
    };
    debuglog(JSON.stringify({ options: options }));

    let ret = await dynamodbManager.scan(
      constants.dynamoDbTable().contents,
      options
    );
    debuglog(JSON.stringify(ret));
    if (!ret || !ret.Items.length) throw new NotFoundError(ERROR_CODE.E0000404);
    return ret.Items;
  },
};
