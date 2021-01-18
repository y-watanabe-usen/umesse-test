"use strict";

const { constants, debuglog, timestamp } = require("umesse-lib/constants");
const { validation } = require("umesse-lib/validation");
const { dynamodbManager } = require("umesse-lib/utils/dynamodbManager");
const { getCm } = require("./cm");

// 外部連携データ取得（一覧・個別）
exports.getExternalCm = async (unisCustomerCd, external) => {
  debuglog(
    `[getExternalCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      external: external,
    })}`
  );

  try {
    // パラメーターチェック
    const checkParams = validation.checkParams({
      external: external,
    });
    if (checkParams) throw checkParams;

    const options = {
      FilterExpression: "uploadSystem = :uploadSystem AND #status = :status",
      ExpressionAttributeNames: {
        "#status": "status",
      },
      ExpressionAttributeValues: {
        ":uploadSystem": constants.cmUploadSystem[external.toUpperCase()],
        ":status": "1",
      },
    };
    const res = await dynamodbManager.scan(
      constants.dynamoDbTable().external,
      options
    );
    if (!res || !res.Items.length) throw "not found";

    let json = res.Items;
    if (unisCustomerCd) {
      json = json.filter((item) => item.unisCustomerCd === unisCustomerCd)[0];
    }
    if (!json) throw "not found";
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
    return { message: e };
  }
};

// 外部連携完了
exports.completeExternalCm = async (unisCustomerCd, external, body) => {
  debuglog(
    `[completeExternalCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      body: body,
    })}`
  );

  try {
    // パラメーターチェック
    const checkParams = validation.checkParams({
      external: external,
      body: body,
    });
    if (checkParams) throw checkParams;

    // CM一覧から該当CMを取得
    const list = await getCm(unisCustomerCd);
    if (!list || !list.length) throw "not found";
    const index = list.findIndex((item) => item.cmId === body.cmId);
    if (index < 0) throw "not found";
    const cm = list[index];

    // TODO: CMステータス状態によるチェック

    const external = await this.getExternalCm(unisCustomerCd, external);
    if (!external) throw "not found";

    const key = { unisCustomerCd: unisCustomerCd };
    let options = "";
    let res = "";

    if (body.dataProcessType == "01") {
      // 正常完了の場合
      res = await dynamodbManager.delete(
        constants.dynamoDbTable().external,
        key,
        {}
      );
      if (!res) throw "delete failed";

      if (external.dataProcessType == "03") {
        cm.uploadSystem = "";
        cm.status = constants.cmStatus.COMPLETE;
      } else {
        cm.status = constants.cmStatus.EXTERNAL_COMPLETE;
      }
    } else {
      // エラー終了の場合
      options = {
        UpdateExpression:
          "SET #status = :status, errorCode = :errorCode, errorMessage = :errorMessage, #timestamp = :timestamp",
        ExpressionAttributeNames: {
          "#status": "status",
          "#timestamp": "timestamp",
        },
        ExpressionAttributeValues: {
          ":status": "9",
          ":errorCode": body.errorCode,
          ":errorMessage": body.errorMessage,
          ":timestamp": timestamp(),
        },
        ReturnValues: "UPDATED_NEW",
      };
      res = await dynamodbManager.update(
        constants.dynamoDbTable().external,
        key,
        options
      );
      if (!res) throw "update failed";

      cm.status = constants.cmStatus.EXTERNAL_ERROR;
    }

    // DynamoDBのデータ更新
    cm.timestamp = timestamp();
    options = {
      UpdateExpression: `SET cm[${index}] = :cm`,
      ExpressionAttributeValues: {
        ":cm": cm,
      },
      ReturnValues: "UPDATED_NEW",
    };
    debuglog(JSON.stringify({ key: key, options: options }));

    res = await dynamodbManager.update(
      constants.dynamoDbTable().users,
      key,
      options
    );
    if (!res) throw "update failed";

    let json = res.Attributes.cm[index];
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
    return { message: e };
  }
};
