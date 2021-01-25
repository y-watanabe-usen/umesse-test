"use strict";

exports.error = Object.freeze({
  status: {
    400: "400",
    401: "401",
    403: "403",
    404: "404",
    500: "500",
  },

  // TODO: error code
  // [Exx]: 区分 [xx]: 機能 [xxx]: コード
  code: {
    // system
    E0000400: "リクエストパラメーターにエラーがあります。",
    E0000401: "認証に失敗しました。",
    E0000403: "アクセス権がありません。",
    E0000404: "データが存在しませんでした。",
    E0000500: "サーバーでエラーが発生しました。",
    // user
    E0100001: "ユーザー情報でエラーが発生しました。",
    // cm
    E0200001: "CM作成でエラーが発生しました。",
    // resource
    E0300001: "音源素材でエラーが発生しました。",
    // external
    E0400001: "外部連携でエラーが発生しました。",
  },

  response: (status, code) => {
    return {
      status: status,
      code: codes,
      message: this.code[code],
    };
  },
});
