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
  externalTable: this.debug ? "umesse-external" : "umesse-external",

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
    // external
    E070001: "E070001",
  },
};

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

// CMステータス状態によるチェック
exports.checkCmStatus = (process, status) => {
  const checkMessages = {
    // CM更新
    updateCm: {
      [this.constants.cmStatus.CREATING]: "", // OK
      [this.constants.cmStatus.COMPLETE]: "", // OK
      [this.constants.cmStatus.CONVERT]: "CMエンコード中のため、更新できません",
      [this.constants.cmStatus.SHARING]: "", // OK
      [this.constants.cmStatus.ERROR]:
        "エラーが発生しているため、更新できません",
      [this.constants.cmStatus.CENTER_UPLOADING]:
        "U MUSICへ連携中のため、更新できません",
      [this.constants.cmStatus.CENTER_COMPLETE]: "", // OK
      [this.constants.cmStatus.CENTER_ERROR]:
        "U MUSICで連携エラーが発生しているため、更新できません",
      [this.constants.cmStatus.SSENCE_UPLOADING]:
        "S'Senceへ連携中のため、更新できません",
      [this.constants.cmStatus.SSENCE_COMPLETE]: "", // OK
      [this.constants.cmStatus.SSENCE_ERROR]:
        "S'Senceで連携エラーが発生しているため、更新できません",
    },
    // CM削除
    deleteCm: {
      [this.constants.cmStatus.CREATING]: "CM作成中のため、削除できません",
      [this.constants.cmStatus.COMPLETE]: "", // OK
      [this.constants.cmStatus.CONVERT]: "CMエンコード中のため、削除できません",
      [this.constants.cmStatus.SHARING]: "CM共有中のため、削除できません",
      [this.constants.cmStatus.ERROR]:
        "エラーが発生しているため、削除できません",
      [this.constants.cmStatus.CENTER_UPLOADING]:
        "U MUSICへ連携中のため、削除できません",
      [this.constants.cmStatus.CENTER_COMPLETE]:
        "U MUSICへ連携済みのため、削除できません",
      [this.constants.cmStatus.CENTER_ERROR]:
        "U MUSICで連携エラーが発生しているため、削除できません",
      [this.constants.cmStatus.SSENCE_UPLOADING]:
        "S'Senceへ連携中のため、削除できません",
      [this.constants.cmStatus.SSENCE_COMPLETE]:
        "S'Senceへ連携済みのため、削除できません",
      [this.constants.cmStatus.SSENCE_ERROR]:
        "S'Senceで連携エラーが発生しているため、削除できません",
    },
    // CM外部連携
    linkCm: {
      [this.constants.cmStatus.CREATING]:
        "CM作成中のため、アップロードできません",
      [this.constants.cmStatus.COMPLETE]: "", // OK
      [this.constants.cmStatus.CONVERT]:
        "CMエンコード中のため、アップロードできません",
      [this.constants.cmStatus.SHARING]:
        "CM共有中のため、アップロードできません",
      [this.constants.cmStatus.ERROR]:
        "エラーが発生しているため、アップロードできません",
      [this.constants.cmStatus.CENTER_UPLOADING]:
        "U MUSICへ連携中のため、アップロードできません",
      [this.constants.cmStatus.CENTER_COMPLETE]:
        "U MUSICへ連携済みのため、アップロードできません",
      [this.constants.cmStatus.CENTER_ERROR]:
        "U MUSICで連携エラーが発生しているため、アップロードできません",
      [this.constants.cmStatus.SSENCE_UPLOADING]:
        "S'Senceへ連携中のため、アップロードできません",
      [this.constants.cmStatus.SSENCE_COMPLETE]:
        "S'Senceへ連携済みのため、アップロードできません",
      [this.constants.cmStatus.SSENCE_ERROR]:
        "S'Senceで連携エラーが発生しているため、アップロードできません",
    },
    // CM外部連携解除
    unlinkCm: {
      [this.constants.cmStatus.CREATING]:
        "CM連携していないため、解除できません",
      [this.constants.cmStatus.COMPLETE]:
        "CM連携していないため、解除できません",
      [this.constants.cmStatus.CONVERT]: "CM連携していないため、解除できません",
      [this.constants.cmStatus.SHARING]: "CM連携していないため、解除できません",
      [this.constants.cmStatus.ERROR]:
        "エラーが発生しているため、解除できません",
      [this.constants.cmStatus.CENTER_UPLOADING]:
        "U MUSICへ連携中のため、解除できません",
      [this.constants.cmStatus.CENTER_COMPLETE]: "", // OK
      [this.constants.cmStatus.CENTER_ERROR]:
        "U MUSICで連携エラーが発生しているため、解除できません",
      [this.constants.cmStatus.SSENCE_UPLOADING]:
        "S'Senceへ連携中のため、解除できません",
      [this.constants.cmStatus.SSENCE_COMPLETE]: "", // OK
      [this.constants.cmStatus.SSENCE_ERROR]:
        "S'Senceで連携エラーが発生しているため、解除できません",
    },
    // CM外部連携完了
    completeExternalCm: {
      [this.constants.cmStatus.CREATING]:
        "CM連携していないため、完了できません",
      [this.constants.cmStatus.COMPLETE]:
        "CM連携していないため、完了できません",
      [this.constants.cmStatus.CONVERT]: "CM連携していないため、完了できません",
      [this.constants.cmStatus.SHARING]: "CM連携していないため、完了できません",
      [this.constants.cmStatus.ERROR]:
        "エラーが発生しているため、完了できません",
      [this.constants.cmStatus.CENTER_UPLOADING]: "", // OK
      [this.constants.cmStatus.CENTER_COMPLETE]:
        "U MUSICへ連携済みのため、完了できません",
      [this.constants.cmStatus.CENTER_ERROR]:
        "U MUSICで連携エラーが発生しているため、完了できません",
      [this.constants.cmStatus.SSENCE_UPLOADING]: "", // OK
      [this.constants.cmStatus.SSENCE_COMPLETE]:
        "S'Senceへ連携済みのため、完了できません",
      [this.constants.cmStatus.SSENCE_ERROR]:
        "S'Senceで連携エラーが発生しているため、完了できません",
    },
  };

  if (!process in checkMessages) return "unknown process";
  if (!status in checkMessages[process]) return "unknown status";
  return checkMessages[process][status];
};
