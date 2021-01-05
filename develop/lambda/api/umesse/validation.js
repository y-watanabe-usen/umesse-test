"use strict";

const { constants } = require("umesse-lib/constants");

exports.validation = {
  checkParams: (process, params) => {
    // TODO:
    if (!params) return "params failed";
  },

  checkCmStatus: (process, status) => {
    if (!process in cmStatusMessage) return "unknown process";
    if (!status in cmStatusMessage[process]) return "unknown status";
    return cmStatusMessage[process][status];
  },
};

const cmStatusMessage = Object.freeze({
  // CM更新
  updateCm: {
    [constants.cmStatus.CREATING]: "", // OK
    [constants.cmStatus.COMPLETE]: "", // OK
    [constants.cmStatus.CONVERT]: "CMエンコード中のため、更新できません",
    [constants.cmStatus.SHARING]: "", // OK
    [constants.cmStatus.ERROR]: "エラーが発生しているため、更新できません",
    [constants.cmStatus.CENTER_UPLOADING]:
      "U MUSICへ連携中のため、更新できません",
    [constants.cmStatus.CENTER_COMPLETE]: "", // OK
    [constants.cmStatus.CENTER_ERROR]:
      "U MUSICで連携エラーが発生しているため、更新できません",
    [constants.cmStatus.SSENCE_UPLOADING]:
      "S'Senceへ連携中のため、更新できません",
    [constants.cmStatus.SSENCE_COMPLETE]: "", // OK
    [constants.cmStatus.SSENCE_ERROR]:
      "S'Senceで連携エラーが発生しているため、更新できません",
  },
  // CM削除
  deleteCm: {
    [constants.cmStatus.CREATING]: "CM作成中のため、削除できません",
    [constants.cmStatus.COMPLETE]: "", // OK
    [constants.cmStatus.CONVERT]: "CMエンコード中のため、削除できません",
    [constants.cmStatus.SHARING]: "CM共有中のため、削除できません",
    [constants.cmStatus.ERROR]: "エラーが発生しているため、削除できません",
    [constants.cmStatus.CENTER_UPLOADING]:
      "U MUSICへ連携中のため、削除できません",
    [constants.cmStatus.CENTER_COMPLETE]:
      "U MUSICへ連携済みのため、削除できません",
    [constants.cmStatus.CENTER_ERROR]:
      "U MUSICで連携エラーが発生しているため、削除できません",
    [constants.cmStatus.SSENCE_UPLOADING]:
      "S'Senceへ連携中のため、削除できません",
    [constants.cmStatus.SSENCE_COMPLETE]:
      "S'Senceへ連携済みのため、削除できません",
    [constants.cmStatus.SSENCE_ERROR]:
      "S'Senceで連携エラーが発生しているため、削除できません",
  },
  // CM外部連携
  createUploadCm: {
    [constants.cmStatus.CREATING]: "CM作成中のため、アップロードできません",
    [constants.cmStatus.COMPLETE]: "", // OK
    [constants.cmStatus.CONVERT]:
      "CMエンコード中のため、アップロードできません",
    [constants.cmStatus.SHARING]: "CM共有中のため、アップロードできません",
    [constants.cmStatus.ERROR]:
      "エラーが発生しているため、アップロードできません",
    [constants.cmStatus.CENTER_UPLOADING]:
      "U MUSICへ連携中のため、アップロードできません",
    [constants.cmStatus.CENTER_COMPLETE]:
      "U MUSICへ連携済みのため、アップロードできません",
    [constants.cmStatus.CENTER_ERROR]:
      "U MUSICで連携エラーが発生しているため、アップロードできません",
    [constants.cmStatus.SSENCE_UPLOADING]:
      "S'Senceへ連携中のため、アップロードできません",
    [constants.cmStatus.SSENCE_COMPLETE]:
      "S'Senceへ連携済みのため、アップロードできません",
    [constants.cmStatus.SSENCE_ERROR]:
      "S'Senceで連携エラーが発生しているため、アップロードできません",
  },
  // CM外部連携解除
  deleteUploadCm: {
    [constants.cmStatus.CREATING]: "CM連携していないため、解除できません",
    [constants.cmStatus.COMPLETE]: "CM連携していないため、解除できません",
    [constants.cmStatus.CONVERT]: "CM連携していないため、解除できません",
    [constants.cmStatus.SHARING]: "CM連携していないため、解除できません",
    [constants.cmStatus.ERROR]: "エラーが発生しているため、解除できません",
    [constants.cmStatus.CENTER_UPLOADING]:
      "U MUSICへ連携中のため、解除できません",
    [constants.cmStatus.CENTER_COMPLETE]: "", // OK
    [constants.cmStatus.CENTER_ERROR]:
      "U MUSICで連携エラーが発生しているため、解除できません",
    [constants.cmStatus.SSENCE_UPLOADING]:
      "S'Senceへ連携中のため、解除できません",
    [constants.cmStatus.SSENCE_COMPLETE]: "", // OK
    [constants.cmStatus.SSENCE_ERROR]:
      "S'Senceで連携エラーが発生しているため、解除できません",
  },
  // CM外部連携完了
  completeExternalCm: {
    [constants.cmStatus.CREATING]: "CM連携していないため、完了できません",
    [constants.cmStatus.COMPLETE]: "CM連携していないため、完了できません",
    [constants.cmStatus.CONVERT]: "CM連携していないため、完了できません",
    [constants.cmStatus.SHARING]: "CM連携していないため、完了できません",
    [constants.cmStatus.ERROR]: "エラーが発生しているため、完了できません",
    [constants.cmStatus.CENTER_UPLOADING]: "", // OK
    [constants.cmStatus.CENTER_COMPLETE]:
      "U MUSICへ連携済みのため、完了できません",
    [constants.cmStatus.CENTER_ERROR]:
      "U MUSICで連携エラーが発生しているため、完了できません",
    [constants.cmStatus.SSENCE_UPLOADING]: "", // OK
    [constants.cmStatus.SSENCE_COMPLETE]:
      "S'Senceへ連携済みのため、完了できません",
    [constants.cmStatus.SSENCE_ERROR]:
      "S'Senceで連携エラーが発生しているため、完了できません",
  },
  // 共有CM追加
  createShareCm: {
    [constants.cmStatus.CREATING]: "CM作成中のため、共有できません",
    [constants.cmStatus.COMPLETE]: "", // OK
    [constants.cmStatus.CONVERT]: "CMエンコード中のため、共有できません",
    [constants.cmStatus.SHARING]: "CM共有中のため、共有できません",
    [constants.cmStatus.ERROR]: "エラーが発生しているため、共有できません",
    [constants.cmStatus.CENTER_UPLOADING]:
      "U MUSICへ連携中のため、共有できません",
    [constants.cmStatus.CENTER_COMPLETE]:
      "U MUSICへ連携済みのため、共有できません",
    [constants.cmStatus.CENTER_ERROR]:
      "U MUSICで連携エラーが発生しているため、共有できません",
    [constants.cmStatus.SSENCE_UPLOADING]:
      "S'Senceへ連携中のため、共有できません",
    [constants.cmStatus.SSENCE_COMPLETE]:
      "S'Senceへ連携済みのため、共有できません",
    [constants.cmStatus.SSENCE_ERROR]:
      "S'Senceで連携エラーが発生しているため、共有できません",
  },
  // 共有CM解除
  deleteShareCm: {
    [constants.cmStatus.CREATING]: "CM作成中のため、共有できません",
    [constants.cmStatus.COMPLETE]: "", // OK
    [constants.cmStatus.CONVERT]: "CMエンコード中のため、共有できません",
    [constants.cmStatus.SHARING]: "CM共有中のため、共有できません",
    [constants.cmStatus.ERROR]: "エラーが発生しているため、共有できません",
    [constants.cmStatus.CENTER_UPLOADING]:
      "U MUSICへ連携中のため、共有できません",
    [constants.cmStatus.CENTER_COMPLETE]:
      "U MUSICへ連携済みのため、共有できません",
    [constants.cmStatus.CENTER_ERROR]:
      "U MUSICで連携エラーが発生しているため、共有できません",
    [constants.cmStatus.SSENCE_UPLOADING]:
      "S'Senceへ連携中のため、共有できません",
    [constants.cmStatus.SSENCE_COMPLETE]:
      "S'Senceへ連携済みのため、共有できません",
    [constants.cmStatus.SSENCE_ERROR]:
      "S'Senceで連携エラーが発生しているため、共有できません",
  },
});
