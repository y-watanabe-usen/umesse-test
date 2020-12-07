"use strict";

const { constants } = require("./constants");
const dynamodb = require("./utils/dynamodbController").controller;
const { controller } = require("./utils/s3Controller") 

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
    if (!res || !res.Items) throw "not found";

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

exports.userRecording = {
	getAll: () => {
		return controller.list("umesse-contents","user_recording_data");
	},
	get : (id) => {},
	put: (params) => {
		console.log(params);
		controller.put("umesse-contents", "user_recording_data/" + params['filename'], params['resources']);
		return "ok";
	}
}
