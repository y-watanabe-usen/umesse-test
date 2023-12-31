"use strict";

const assert = require("assert");
const { respondWithCode } = require("../utils/writer");
const { UMesseError } = require("umesse-lib/error");
const { debuglog } = require("umesse-lib/constants");
const {
  getShareCm,
  createShareCm,
  deleteShareCm,
} = require("../../umesse/share");
const { authToken } = require("../../umesse/user");

/**
 * CM共有追加
 * CMを共有する
 *
 * id String CM ID
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * returns CmItem
 **/
exports.createShareCm = function (id, xUnisCustomerCd, xToken) {
  return new Promise(async function (resolve, reject) {
    try {
      await authToken(xUnisCustomerCd, xToken);
      const json = await createShareCm(xUnisCustomerCd, id);
      debuglog(JSON.stringify(json));
      resolve(json);
    } catch (e) {
      debuglog(JSON.stringify(e));
      assert(e instanceof UMesseError);
      reject(
        respondWithCode(e.statusCode, { code: e.code, message: e.message })
      );
    }
  });
};

/**
 * CM共有削除
 * CMの共有を解除する
 *
 * id String CM ID
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * returns CmItem
 **/
exports.deleteShareCm = function (id, xUnisCustomerCd, xToken) {
  return new Promise(async function (resolve, reject) {
    try {
      await authToken(xUnisCustomerCd, xToken);
      const json = await deleteShareCm(xUnisCustomerCd, id);
      debuglog(JSON.stringify(json));
      resolve(json);
    } catch (e) {
      debuglog(JSON.stringify(e));
      assert(e instanceof UMesseError);
      reject(
        respondWithCode(e.statusCode, { code: e.code, message: e.message })
      );
    }
  });
};

/**
 * 共有CM取得
 * 共有CMの情報を取得
 *
 * id String CM ID
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * returns CmItem
 **/
exports.getShareCm = function (id, xUnisCustomerCd, xToken) {
  return new Promise(async function (resolve, reject) {
    try {
      await authToken(xUnisCustomerCd, xToken);
      const json = await getShareCm(xUnisCustomerCd, id);
      debuglog(JSON.stringify(json));
      resolve(json);
    } catch (e) {
      debuglog(JSON.stringify(e));
      assert(e instanceof UMesseError);
      reject(
        respondWithCode(e.statusCode, { code: e.code, message: e.message })
      );
    }
  });
};

/**
 * 共有CM一覧取得
 * 共有CMの情報を一覧で取得する
 *
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * returns List
 **/
exports.listShareCm = function (xUnisCustomerCd, xToken) {
  return new Promise(async function (resolve, reject) {
    try {
      await authToken(xUnisCustomerCd, xToken);
      const json = await getShareCm(xUnisCustomerCd);
      debuglog(JSON.stringify(json));
      resolve(json);
    } catch (e) {
      debuglog(JSON.stringify(e));
      assert(e instanceof UMesseError);
      reject(
        respondWithCode(e.statusCode, { code: e.code, message: e.message })
      );
    }
  });
};
