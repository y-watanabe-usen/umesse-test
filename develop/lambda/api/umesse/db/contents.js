"use strict";

const { constants, debuglog } = require("umesse-lib/constants");
const { ERROR_CODE, NotFoundError } = require("umesse-lib/error");
const { dynamodbManager } = require("umesse-lib/utils/dynamodbManager");

module.exports = {
  findByCategory: async function (category) {
    let options = {
      FilterExpression: "category = :category",
      ExpressionAttributeValues: {
        ":category": category,
      },
    };
    debuglog(JSON.stringify({ options: options }));

    let ret = [];

    const scan = async () => {
      const data = await dynamodbManager.scan(
        constants.dynamoDbTable().contents,
        options
      );
      ret.push(...data.Items);

      // continue scanning if we have more movies, because
      // scan can retrieve a maximum of 1MB of data
      if (typeof data.LastEvaluatedKey != "undefined") {
        options.ExclusiveStartKey = data.LastEvaluatedKey;
        await scan();
      }
    };
    await scan();

    debuglog(JSON.stringify(ret));
    if (!ret || !ret.length) throw new NotFoundError(ERROR_CODE.E0000404);
    return ret;
  },

  findByCategoryLang: async function (category, lang) {
    let options = {
      FilterExpression: "category = :category AND contains(contentsId, :lang)",
      ExpressionAttributeValues: {
        ":category": category,
        ":lang": lang,
      },
    };
    debuglog(JSON.stringify({ options: options }));

    let ret = [];

    const scan = async () => {
      const data = await dynamodbManager.scan(
        constants.dynamoDbTable().contents,
        options
      );
      ret.push(...data.Items);

      // continue scanning if we have more movies, because
      // scan can retrieve a maximum of 1MB of data
      if (typeof data.LastEvaluatedKey != "undefined") {
        options.ExclusiveStartKey = data.LastEvaluatedKey;
        await scan();
      }
    };
    await scan();

    debuglog(JSON.stringify(ret));
    if (!ret || !ret.length) throw new NotFoundError(ERROR_CODE.E0000404);
    return ret;
  },
};
