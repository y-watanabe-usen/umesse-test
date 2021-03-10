const { constants, debuglog } = require("umesse-lib/constants");
const ERROR_CODE = require("umesse-lib/error").ERROR_CODE;
const { dynamodbManager } = require("umesse-lib/utils/dynamodbManager");

module.exports = {
  findByCategory: async function (category) {
    const options = {
      FilterExpression: "category = :category",
      ExpressionAttributeValues: {
        ":category": category,
      },
    };
    let res = await dynamodbManager.scan(
      constants.dynamoDbTable().contents,
      options
    );
    if (!res || !res.Items.length) throw new Error("not found");
    return res.Items;
  },
};
