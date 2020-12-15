"use strict";

const { randomBytes } = require("crypto");

exports.constants = Object.freeze({
  region: "ap-northeast-1",
  debug: process.env.debug,
  environment: process.env.environment,

  // S3 設定
  s3Config: function () {
    switch (this.environment) {
      case "local":
        return {
          region: this.region,
          endpoint: "localhost:4566",
          signatureVersion: "v4",
          s3ForcePathStyle: "true", // local only
        };
      case "dev":
      case "stg":
      case "prod":
      default:
        return {
          region: this.region,
        };
    }
  },
  // S3 バケット
  s3Bucket: function () {
    switch (this.environment) {
      case "local":
        return {
          users: "umesse-users",
          contents: "umesse-contents",
        };
      case "dev":
        return {
          users: "dev-umesse-users",
          contents: "dev-umesse-contents",
        };
      case "stg":
        return {
          users: "stg-umesse-users",
          contents: "stg-umesse-contents",
        };
      case "prod":
      default:
        return {
          users: "umesse-users",
          contents: "umesse-contents",
        };
    }
  },

  // DynamoDB 設定
  dynamoDbConfig: function () {
    switch (this.environment) {
      case "local":
        return {
          region: this.region,
          endpoint: "localhost:4566",
        };
      case "dev":
      case "stg":
      case "prod":
      default:
        return {
          region: this.region,
        };
    }
  },
  // DynamoDB テーブル
  dynamoDbTable: function () {
    switch (this.environment) {
      case "local":
        return {
          users: "umesse-users",
          contents: "umesse-contents",
          external: "umesse-external",
        };
      case "dev":
        return {
          users: "dev-umesse-users",
          contents: "dev-umesse-contents",
          external: "dev-umesse-external",
        };
      case "stg":
        return {
          users: "stg-umesse-users",
          contents: "stg-umesse-contents",
          external: "stg-umesse-external",
        };
      case "prod":
      default:
        return {
          users: "umesse-users",
          contents: "umesse-contents",
          external: "umesse-external",
        };
    }
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

  // CMアップロードシステム区分
  cmUploadSystem: {
    CENTER: "01",
    SSENCE: "02",
  },

  // ユーザー作成の音声区分
  userResource: {
    RECORDING: "recording",
    TTS: "tts",
  },
});

// debug log
exports.debuglog = (message) => {
  if (this.constants.debug) console.log(`[debug] ${message}`);
};

// timestamp
exports.timestamp = () => {
  const time = new Date();
  time.setHours(time.getHours() + 9);
  return time.toISOString().split("Z")[0] + "+09:00";
};

// generate id cm (c), recording (r), tts (t)
exports.generateId = (unisCustomerCd, div) => {
  const id = randomBytes(8).reduce((p, i) => p + (i % 36).toString(36), "");
  return `${unisCustomerCd}-${div}-${id}`;
};
