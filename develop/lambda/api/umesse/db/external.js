const { constants, debuglog } = require("umesse-lib/constants");
const ERROR_CODE = require("umesse-lib/error").ERROR_CODE;
const { dynamodbManager } = require("umesse-lib/utils/dynamodbManager");

module.exports = {
  findAll: async function (unisCustomerCd) {
    const options = {
      KeyConditionExpression: "unisCustomerCd = :unisCustomerCd",
      ExpressionAttributeValues: {
        ":unisCustomerCd": unisCustomerCd,
      },
    };
    let res = await dynamodbManager.query(
      constants.dynamoDbTable().external,
      options
    );
    if (!res || !res.Items.length) throw new Error(ERROR_CODE.E0000404);

    let json = res.Items;
    if (!json) throw new Error(ERROR_CODE.E0000404);
    return json;
  },

  findById: async function (unisCustomerCd, cmId) {
    let json = await this.findAll(unisCustomerCd);
    if (cmId) {
      json = json.filter((item) => item.cmId === cmId)[0];
    }
    if (!json) throw new Error("not found");
    return json;
  },

  add: async function (item) {
    let res = await dynamodbManager.put(
      constants.dynamoDbTable().external,
      item,
      {}
    );
    if (!res) throw new Error("put failed");
    return res;
  },

  findByUploadSystem: async function (uploadSystem) {
    const options = {
      FilterExpression: "uploadSystem = :uploadSystem AND #status = :status",
      ExpressionAttributeNames: {
        "#status": "status",
      },
      ExpressionAttributeValues: {
        ":uploadSystem": uploadSystem,
        ":status": "1",
      },
      ProjectionExpression:
        "unisCustomerCd," +
        "dataProcessType," +
        "cmId," +
        "cmName," +
        "cmCommentManuscript," +
        "startDatetime," +
        "endDatetime," +
        "productionType," +
        "contentTime," +
        "sceneCd",
    };
    let res = await dynamodbManager.scan(
      constants.dynamoDbTable().external,
      options
    );
    if (!res || !res.Items.length) throw new Error("not found");
    return res.Items;
  },

  delete: async function (unisCustomerCd) {
    const key = { unisCustomerCd: unisCustomerCd };
    res = await dynamodbManager.delete(
      constants.dynamoDbTable().external,
      key,
      {}
    );
    if (!res) throw new Error("delete failed");
    return res;
  },

  updateErrorData: async function (unisCustomerCd, data) {
    const key = { unisCustomerCd: unisCustomerCd };
    let options = {
      UpdateExpression:
        "SET #status = :status, errorCode = :errorCode, errorMessage = :errorMessage, #timestamp = :timestamp",
      ExpressionAttributeNames: {
        "#status": "status",
        "#timestamp": "timestamp",
      },
      ExpressionAttributeValues: data,
      ReturnValues: "UPDATED_NEW",
    };
    let res = await dynamodbManager.update(
      constants.dynamoDbTable().external,
      key,
      data
    );
    if (!res) throw new InternalServerError("update failed");
    return res;
  },
};
