"use strict";

const { constants } = require("./constants");
const dynamodb = require("./utils/dynamodbController").controller;

exports.fetch = async (filter, industryId, sceneId) => {
  constants.debuglog(
    "filter: " + filter + ", industryId: " + industryId + ", sceneId:" + sceneId
  );
  const options = {
    FilterExpression: "contains(id, :id)",
    ExpressionAttributeValues: {
      ":id": filter,
    },
  };
  try {
    const res = await dynamodb.scan(constants.contentsTable, options);
    if (!res || !res.Count) throw "not found";

    let json = res.Items;
    if (industryId) {
      json = json.filter((item) => item.industry.some((el) => el.id === industryId));
    }
    if (sceneId) {
      json = json.filter((item) => item.scenes.some((el) => el.id === sceneId));
    }
    return json;
  } catch (e) {
    console.log(e);
  }
};
