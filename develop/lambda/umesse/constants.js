"use strict";

const { randomBytes } = require("crypto");

exports.constants = {
  region: "ap-northeast-1",
  debug: process.env.debug,

  // S3 設定
  // TODO: env local, dev, stg, prod
  s3Config: function () {
    return this.debug
      ? {
          region: this.region,
          endpoint: "localhost:4566",
          signatureVersion: "v4",
          s3ForcePathStyle: "true", // local only
        }
      : {
          region: this.region,
        };
  },
  usersBucket: this.debug ? "umesse-users" : "umesse-users",
  contentsBucket: this.debug ? "umesse-contents" : "umesse-contents",
  centerBucket: this.debug ? "umesse-center" : "umesse-center",

  // DynamoDb 設定
  // TODO: env local, dev, stg, prod
  dynamoDbConfig: function () {
    return this.debug
      ? {
          region: this.region,
          endpoint: "localhost:4566",
        }
      : {
          region: this.region,
        };
  },
  usersTable: this.debug ? "umesse-users" : "umesse-users",
  contentsTable: this.debug ? "umesse-contents" : "umesse-contents",
  centerTable: this.debug ? "umesse-center" : "umesse-center",

  // debug log
  debuglog: function (message) {
    if (this.debug) console.log(`[debug] ${message}`);
  },

  // generate id cm (c), recording (r), tts (t)
  generateId: function (unisCustomerCd, div) {
    const id = randomBytes(8).reduce((p, i) => p + (i % 36).toString(36), "");
    return `${unisCustomerCd}-${div}-${id}`;
  },

  // CMステータス
  cmStatus: {
    DELETE: "00", // CM削除(ユーザーミスによる復活のための定義)
    CREATING: "01", // CM作成中
    COMPLETE: "02", // CM作成完了
    CONVERT: "03", // CMエンコード中
    SHARING: "04", // CM共有中
    ERROR: "09", // CMエラー
    CENTER_UPLOADING: "11", // センターアップロード中
    CENTER_COMPLETE: "12", // センターアップロード完了
    CENTER_ERROR: "19", // センターアップロードエラー
    SSENCE_UPLOADING: "21", // S'senceアップロード中
    SSENCE_COMPLETE: "22", // S'senceアップロード完了
    SSENCE_ERROR: "29", // S'senceアップロードエラー
  },

  // CMタイプ
  cmProductionType: {
    MUSIC: "01", // 音楽系CM
    NONE: "02", // 素ナレCM（BGMなし）
  },

  // CMアップロードシステム
  cmUploadSystem: {
    CENTER: "01",
    SSENCE: "02",
  },

  // TODO: error code
  errorCode: {
    // system
    E000001: "E000001",
    // auth
    E010001: "E010001",
    // cm
    E020001: "E020001",
    // recording
    E030001: "E030001",
    // tts
    E040001: "E040001",
    // shear
    E050001: "E050001",
    // resource
    E060001: "E060001",
    // center
    E070001: "E070001",
  },
};
