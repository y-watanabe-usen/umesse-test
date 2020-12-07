"use strict";

const { execSync } = require("child_process");
const fs = require("fs");
const { constants } = require("./constants");
const dynamodb = require("./utils/dynamodbController").controller;
const s3 = require("./utils/s3Controller").controller;

// CM取得（一覧・個別）
exports.fetch = async (unisCustomerCd, cmId) => {
  constants.debuglog(
    `cm fetch unis_customer_cd: ${unisCustomerCd}, cm_id: ${cmId}`
  );

  try {
    const key = { unis_customer_cd: unisCustomerCd };
    const options = {
      ProjectionExpression: "cm",
    };
    constants.debuglog(
      `key: ${JSON.stringify(key)}, options: ${JSON.stringify(options)}`
    );

    const res = await dynamodb.get(constants.usersTable, key, options);
    if (!res || !res.Item) throw "not found";

    let json = res.Item.cm;
    if (cmId) {
      json = json.filter((item) => item.id === cmId).pop();
    }
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
  }
};

// CM新規作成（結合処理）
exports.create = async (unisCustomerCd, body) => {
  constants.debuglog(
    `cm create unis_customer_cd: ${unisCustomerCd}, body: ${JSON.stringify(
      body
    )}`
  );

  try {
    // TODO: body validation check
    if (!body) throw "body parameter failed";

    // ID作成
    const id = constants.generateId(unisCustomerCd, "c");

    // CM結合、S3へPUT
    const seconds = await generateCm(unisCustomerCd, id, body);
    if (!seconds) throw "generate cm failed";

    // 署名付きURLの発行
    const url = await s3.getSignedUrl(
      constants.usersBucket,
      `users/${unisCustomerCd}/cm/${id}.mp3`
    );
    if (!url) throw "getSignedUrl failed";

    // DynamoDBのデータ更新
    const data = {
      id: id,
      materials: body.materials,
      production_type:
        "bgm" in body.materials
          ? constants.cmProductionType.MUSIC
          : constants.cmProductionType.NONE,
      seconds: seconds,
      status: constants.cmStatus.CREATING,
      timestamp: new Date().toISOString(),
    };
    const key = { unis_customer_cd: unisCustomerCd };
    const options = {
      UpdateExpression: "SET cm = list_append(cm, :cm)",
      ExpressionAttributeValues: {
        ":cm": [data],
      },
      ReturnValues: "UPDATED_NEW",
    };
    constants.debuglog(
      `key: ${JSON.stringify(key)}, options: ${JSON.stringify(options)}`
    );

    const res = await dynamodb.update(constants.usersTable, key, options);
    if (!res || !res.Attributes) throw "update failed";

    let json = res.Attributes.cm.pop();
    json["url"] = url;
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
  }
};

// CM確定・更新
exports.update = async (unisCustomerCd, cmId, body) => {
  constants.debuglog(
    `cm update unis_customer_cd: ${unisCustomerCd}, cmId: ${cmId}, body: ${JSON.stringify(
      body
    )}`
  );

  try {
    // TODO: body validation check
    if (!body) throw "body parameter failed";

    // CM一覧から該当CMを取得
    const list = await this.fetch(unisCustomerCd);
    if (!list) throw "not found";
    const cm = list
      .map((data, index) => {
        if (data.id === cmId) return { data, index };
      })
      .pop();

    // CMステータス状態によるチェック（アップロード中は更新しない）
    switch (cm.data.status) {
      case constants.cmStatus.CONVERT:
        throw "CMエンコード中のため、更新できません";
      case constants.cmStatus.CENTER_UPLOADING:
        throw "U MUSICへの連携が完了していないため、更新できません";
      case constants.cmStatus.SSENCE_UPLOADING:
        throw "S'Senceへの連携が完了していないため、更新できません";
      case constants.cmStatus.ERROR:
      case constants.cmStatus.CENTER_ERROR:
      case constants.cmStatus.SSENCE_ERROR:
        throw "エラーが発生しているため、更新できません";
    }

    // CM作成中の場合
    if (cm.data.status == constants.cmStatus.CREATING) {
      // TODO: add sqs
      cm.data.status = constants.cmStatus.CONVERT;
    }

    // CMアップロード
    if (body.upload == constants.cmUploadSystem.CENTER) {
      // センターアップロードの場合
      // TODO:
      cm.data.status = constants.cmStatus.CENTER_UPLOADING;
    } else if (body.upload == constants.cmUploadSystem.SSENCE) {
      // S'senceアップロードの場合
      // TODO:
      cm.data.status = constants.cmStatus.SSENCE_UPLOADING;
    }

    // DynamoDBのデータ更新
    cm.data.title = body.title;
    cm.data.description = body.description;
    cm.data.startDate = body.startDate;
    cm.data.endDate = body.endDate;
    cm.data.industry = body.industry;
    cm.data.scene = body.scene;
    cm.data.timestamp = new Date().toISOString();
    const key = { unis_customer_cd: unisCustomerCd };
    const options = {
      UpdateExpression: `SET cm[${cm.index}] = :cm`,
      ExpressionAttributeValues: {
        ":cm": cm.data,
      },
      ReturnValues: "UPDATED_NEW",
    };
    constants.debuglog(
      `key: ${JSON.stringify(key)}, options: ${JSON.stringify(options)}`
    );

    const res = await dynamodb.update(constants.usersTable, key, options);
    if (!res || !res.Attributes) throw "update failed";

    let json = res.Attributes.cm;
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
  }
};

// CM削除
exports.remove = async (unisCustomerCd, cmId) => {
  constants.debuglog(
    `cm remove unis_customer_cd: ${unisCustomerCd}, cm_id: ${cmId}`
  );

  try {
    // CM一覧から該当CMを取得
    const list = await this.fetch(unisCustomerCd);
    if (!list) throw "not found";
    const cm = list
      .map((data, index) => {
        if (data.id === cmId) return { data, index };
      })
      .pop();

    // CMステータス状態によるチェック（作成中や共有、アップロード中は削除しない）
    switch (cm.data.status) {
      case constants.cmStatus.CREATING:
        throw "CM作成中のため、削除できません";
      case constants.cmStatus.CONVERT:
        throw "CMエンコード中のため、削除できません";
      case constants.cmStatus.SHARING:
        throw "CM共有中のため、削除できません";
      case constants.cmStatus.CENTER_UPLOADING:
      case constants.cmStatus.CENTER_COMPLETE:
        throw "U MUSICへ連携中のため、削除できません";
      case constants.cmStatus.SSENCE_UPLOADING:
      case constants.cmStatus.SSENCE_COMPLETE:
        throw "S'Senceへ連携中のため、削除できません";
      case constants.cmStatus.ERROR:
      case constants.cmStatus.CENTER_ERROR:
      case constants.cmStatus.SSENCE_ERROR:
        throw "エラーが発生しているため、削除できません";
    }

    // S3上のCMを削除（エラーは検知しなくてよいかも）
    await s3.delete(
      constants.usersBucket,
      `users/${unisCustomerCd}/cm/${cmId}.mp3`
    );

    // DynamoDBのデータ更新
    cm.data.status = constants.cmStatus.DELETE;
    cm.data.timestamp = new Date().toISOString();
    const key = { unis_customer_cd: unisCustomerCd };
    const options = {
      UpdateExpression: `SET cm[${cm.index}] = :cm`,
      ExpressionAttributeValues: {
        ":cm": cm.data,
      },
      ReturnValues: "UPDATED_NEW",
    };
    constants.debuglog(
      `key: ${JSON.stringify(key)}, options: ${JSON.stringify(options)}`
    );

    const res = await dynamodb.update(constants.usersTable, key, options);
    if (!res || !res.Attributes) throw "update failed";

    let json = res.Attributes.cm;
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
  }
};

// CM結合処理
function generateCm(unisCustomerCd, id, materials) {
  return new Promise(async function (resolve, reject) {
    // FIXME: materials 一旦仮
    const list = [
      "chime/サンプル01.mp3",
      "chime/サンプル02.mp3",
      "bgm/サンプル01.mp3",
      "narration/サンプル01.mp3",
      "narration/サンプル02.mp3",
      "narration/サンプル03.mp3",
    ];
    const workDir = `/tmp/${unisCustomerCd}`;

    try {
      execSync(`mkdir -p ${workDir} && rm -rf ${workDir}/*.mp3`);

      let paths = "";
      for (const [key, value] of list.entries()) {
        constants.debuglog(`key: ${key}, value: ${value}`);
        const res = await s3.get(constants.contentsBucket, value);
        if (!res || !res.Body) throw "getObject failed";
        fs.writeFileSync(`${workDir}/${key}.mp3`, res.Body);
        paths += `-i ${workDir}/${key}.mp3 `;
      }

      // FIXME: ffmpeg path 相対パスでもよいか、各パラメーターをチューニング
      const command = `./umesse/bin/ffmpeg -hide_banner ${paths} \
        -filter_complex ' \
          [0:a]volume=0.5[start_chime]; \
          [1:a]volume=0.5,adelay=3s|3s[end_chime]; \
          [2:a]volume=0.5,aloop=2:2.14748e+009[bgm]; \
          [3:a]volume=3.0,adelay=3s|3s[narration1]; \
          [4:a]volume=3.0,adelay=3s|3s[narration2]; \
          [5:a]volume=3.0,adelay=3s|3s,apad=pad_dur=5[narration3]; \
          [narration1][narration2][narration3]concat=n=3:v=0:a=1[join]; \
          [join][bgm]amix=duration=shortest[mix]; \
          [mix][end_chime]acrossfade=d=3[last]; \
          [start_chime][last]concat=n=2:v=0:a=1 \
        ' -y ${workDir}/${id}.mp3`;
      constants.debuglog(command);
      execSync(command);

      // FIXME: get seconds... 他に方法があるか
      const seconds = execSync(
        `./umesse/bin/ffmpeg -hide_banner -i ${workDir}/${id}.mp3 2>&1 | \
          grep 'Duration' | cut -d ' ' -f 4 | cut -d '.' -f 1`
      )
        .toString()
        .replace(/\n/g, "");
      constants.debuglog(`seconds: ${seconds}`);

      const fileStream = fs.createReadStream(`${workDir}/${id}.mp3`);
      fileStream.on("error", (e) => {
        throw e;
      });
      await s3.put(
        constants.usersBucket,
        `users/${unisCustomerCd}/cm/${id}.mp3`,
        fileStream
      );
      constants.debuglog("generate complete");
      resolve(seconds);
    } catch (e) {
      console.log(e);
      reject();
    }
  });
}
