"use strict";

const { constants, debuglog, timestamp } = require("umesse-lib/constants");
const { validation } = require("umesse-lib/validation");
const { dynamodbManager } = require("umesse-lib/utils/dynamodbManager");
const { getCm } = require("./cm");
const { BadRequestError, InternalServerError } = require("./error");

// 外部連携データ取得（一覧・個別）
exports.getExternalCm = async (unisCustomerCd, external) => {
  debuglog(
    `[getExternalCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      external: external,
    })}`
  );

  // パラメーターチェック
  const checkParams = validation.checkParams({
    external: external,
  });
  if (checkParams) throw new BadRequestError(checkParams);

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
  let res;
  try {
    res = await dynamodbManager.scan(
      constants.dynamoDbTable().external,
      options
    );
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(e.message);
  }
  if (!res || !res.Items.length) throw new InternalServerError("not found");

  let json = res.Items;
  if (unisCustomerCd) {
    json = json.filter((item) => item.unisCustomerCd === unisCustomerCd)[0];
  }
  if (!json) throw new InternalServerError("not found");
  return json;
};

// 外部連携完了
exports.completeExternalCm = async (unisCustomerCd, external, body) => {
  debuglog(
    `[completeExternalCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      body: body,
    })}`
  );

  // パラメーターチェック
  const checkParams = validation.checkParams({
    external: external,
    body: body,
  });
  if (checkParams) throw new BadRequestError(checkParams);

  // CM一覧から該当CMを取得
  const list = await getCm(unisCustomerCd);
  if (!list || !list.length) throw new InternalServerError("not found");
  const index = list.findIndex((item) => item.cmId === body.cmId);
  if (index < 0) throw new InternalServerError("not found");
  const cm = list[index];

  // TODO: CMステータス状態によるチェック

  const ret = await this.getExternalCm(unisCustomerCd, external);
  if (!ret) throw new InternalServerError("not found");

  const key = { unisCustomerCd: unisCustomerCd };
  let options = "";
  let res = "";

  if (body.dataProcessType == "01") {
    // 正常完了の場合
    try {
      res = await dynamodbManager.delete(
        constants.dynamoDbTable().external,
        key,
        {}
      );
    } catch (e) {
      errorlog(JSON.stringify(e));
      throw InternalServerError(e.message);
    }
    if (!res) throw new InternalServerError("delete failed");

    if (ret.dataProcessType == "03") {
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
    try {
      res = await dynamodbManager.update(
        constants.dynamoDbTable().external,
        key,
        options
      );
    } catch (e) {
      errorlog(JSON.stringify(e));
      throw new InternalServerError(e.message);

    }
    if (!res) throw new InternalServerError("update failed");

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

  try {
    res = await dynamodbManager.update(
      constants.dynamoDbTable().users,
      key,
      options
    );
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(e.message);
  }
  if (!res) throw new InternalServerError("update failed");

  let json = res.Attributes.cm[index];
  return json;
};
