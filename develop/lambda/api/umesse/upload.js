"use strict";

const { constants, debuglog, timestamp, errorlog } = require("umesse-lib/constants");
const { validation } = require("umesse-lib/validation");
const { dynamodbManager } = require("umesse-lib/utils/dynamodbManager");
const { getCm } = require("./cm");
const { BadRequestError, InternalServerError } = require("./error");

// 外部連携データ取得（一覧・個別）
exports.getUploadCm = async (unisCustomerCd, cmId) => {
  debuglog(
    `[getUploadCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      cmId: cmId,
    })}`
  );

  // パラメーターチェック
  const checkParams = validation.checkParams({
    unisCustomerCd: unisCustomerCd,
  });
  if (checkParams) throw new BadRequestError(checkParams);

  const items = await findUploadedCm(unisCustomerCd, cmId);

  return items;
};

async function findUploadedCm(unisCustomerCd, cmId) {

  const options = {
    KeyConditionExpression: "unisCustomerCd = :unisCustomerCd",
    ExpressionAttributeValues: {
      ":unisCustomerCd": unisCustomerCd,
    },
  };
  let res;
  try {
    res = await dynamodbManager.query(
      constants.dynamoDbTable().external,
      options
    );
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(e.message);
  }
  if (!res || !res.Items.length) throw new InternalServerError("not found");

  let json = res.Items;
  if (cmId) {
    json = json.filter((item) => item.cmId === cmId)[0];
  }
  if (!json) throw new InternalServerError("not found");
  return json;
}

// CM外部連携
exports.createUploadCm = async (unisCustomerCd, cmId, body) => {
  debuglog(
    `[createUploadCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      cmId: cmId,
      body: body,
    })}`
  );

  // パラメーターチェック
  const checkParams = validation.checkParams({
    unisCustomerCd: unisCustomerCd,
    cmId: cmId,
    body: body,
  });
  if (checkParams) throw new BadRequestError(checkParams);

  // CM一覧から該当CMを取得
  const list = await getCm(unisCustomerCd);
  if (!list || !list.length) throw new InternalServerError("not found");
  const index = list.findIndex((item) => item.cmId === cmId);
  if (index < 0) throw new InternalServerError("not found");
  const cm = list[index];

  // TODO: CMステータス状態によるチェック

  // 連携用のデータ追加
  const item = {
    unisCustomerCd: unisCustomerCd,
    dataProcessType: "01",
    cmId: cmId,
    cmName: cm.title,
    cmCommentManuscript: cm.description,
    startDatetime: cm.startDate,
    endDatetime: cm.endDate,
    productionType: cm.productionType,
    contentTime: cm.seconds,
    sceneCd: cm.scene.sceneCd,
    uploadSystem: body.uploadSystem,
    status: "1",
    timestamp: timestamp(),
  };

  let res;
  try {
    res = await dynamodbManager.put(
      constants.dynamoDbTable().external,
      item,
      {}
    );
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(e.message);
  }
  if (!res) throw new InternalServerError("put failed");

  // DynamoDBのデータ更新
  cm.uploadSystem = body.uploadSystem;
  cm.status = constants.cmStatus.EXTERNAL_UPLOADING;
  cm.timestamp = timestamp();
  const key = { unisCustomerCd: unisCustomerCd };
  const options = {
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

// CM外部連携解除
exports.deleteUploadCm = async (unisCustomerCd, cmId) => {
  debuglog(
    `[deleteUploadCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      cmId: cmId,
    })}`
  );

  // パラメーターチェック
  const checkParams = validation.checkParams({
    unisCustomerCd: unisCustomerCd,
    cmId: cmId,
    body: body,
  });
  if (checkParams) throw new BadRequestError(checkParams);

  // CM一覧から該当CMを取得
  const list = await getCm(unisCustomerCd);
  if (!list || !list.length) throw new InternalServerError("not found");
  const index = list.findIndex((item) => item.cmId === cmId);
  if (index < 0) throw new InternalServerError("not found");
  const cm = list[index];

  // TODO: CMステータス状態によるチェック

  // 連携用のデータ追加
  const item = {
    unisCustomerCd: unisCustomerCd,
    dataProcessType: "03",
    cmId: cmId,
    endDateTime: timestamp(),
    uploadSystem: cm.uploadSystem,
    status: "1",
    timestamp: timestamp(),
  };
  let res;
  try {
    res = await dynamodbManager.put(
      constants.dynamoDbTable().external,
      item,
      {}
    );
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(e.message);
  }
  if (!res) throw new InternalServerError("put failed");

  // DynamoDBのデータ更新
  cm.status = constants.cmStatus.EXTERNAL_UPLOADING;
  cm.timestamp = timestamp();
  const key = { unisCustomerCd: unisCustomerCd };
  const options = {
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
