"use strict";

const { constants, debuglog, timestamp } = require("umesse-lib/constants");
const { validation } = require("umesse-lib/validation");
const { dynamodbManager } = require("umesse-lib/utils/dynamodbManager");
const { getCm } = require("./cm");

// 外部連携データ取得（一覧・個別）
exports.getUploadCm = async (unisCustomerCd, cmId) => {
  debuglog(
    `[getUploadCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      cmId: cmId,
    })}`
  );

  try {
    // パラメーターチェック
    const checkParams = validation.checkParams({
      unisCustomerCd: unisCustomerCd,
    });
    if (checkParams) throw checkParams;

    const options = {
      KeyConditionExpression: "unisCustomerCd = :unisCustomerCd",
      ExpressionAttributeValues: {
        ":unisCustomerCd": unisCustomerCd,
      },
    };
    const res = await dynamodbManager.query(
      constants.dynamoDbTable().external,
      options
    );
    if (!res || !res.Items.length) throw "not found";

    let json = res.Items;
    if (cmId) {
      json = json.filter((item) => item.cmId === cmId)[0];
    }
    if (!json) throw "not found";
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
    return { message: e };
  }
};

// CM外部連携
exports.createUploadCm = async (unisCustomerCd, cmId, body) => {
  debuglog(
    `[createUploadCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      cmId: cmId,
      body: body,
    })}`
  );

  try {
    // パラメーターチェック
    const checkParams = validation.checkParams({
      unisCustomerCd: unisCustomerCd,
      cmId: cmId,
      body: body,
    });
    if (checkParams) throw checkParams;

    // CM一覧から該当CMを取得
    const list = await getCm(unisCustomerCd);
    if (!list || !list.length) throw "not found";
    const index = list.findIndex((item) => item.cmId === cmId);
    if (index < 0) throw "not found";
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

    let res = await dynamodbManager.put(
      constants.dynamoDbTable().external,
      item,
      {}
    );
    if (!res) throw "put failed";

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

// CM外部連携解除
exports.deleteUploadCm = async (unisCustomerCd, cmId, body) => {
  debuglog(
    `[deleteUploadCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      cmId: cmId,
    })}`
  );

  try {
    // パラメーターチェック
    const checkParams = validation.checkParams({
      unisCustomerCd: unisCustomerCd,
      cmId: cmId,
      body: body,
    });
    if (checkParams) throw checkParams;

    // CM一覧から該当CMを取得
    const list = await getCm(unisCustomerCd);
    if (!list || !list.length) throw "not found";
    const index = list.findIndex((item) => item.cmId === cmId);
    if (index < 0) throw "not found";
    const cm = list[index];

    // TODO: CMステータス状態によるチェック

    // 連携用のデータ追加
    const item = {
      unisCustomerCd: unisCustomerCd,
      dataProcessType: "03",
      cmId: cmId,
      endDateTime: body.endDate,
      uploadSystem: cm.uploadSystem,
      status: "1",
      timestamp: timestamp(),
    };

    let res = await dynamodbManager.put(
      constants.dynamoDbTable().external,
      item,
      {}
    );
    if (!res) throw "put failed";

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
