'use strict';


/**
 * ユーザー情報取得
 * ユーザーの情報を取得する
 *
 * xUnisCustomerCd String UNIS顧客CD
 * returns User
 **/
exports.getUser = function(xUnisCustomerCd) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "contractStatusName" : "確定",
  "contractStatusCd" : "2",
  "customerGroupName" : "CAFÉ USENグループ",
  "contractCd" : "N01234567890123456789",
  "unisCustomerCd" : "123456789",
  "customerNameKana" : "カフェユーセン",
  "serviceCd" : "U01",
  "renewalDate" : "2019-09-01T09:00:00+9:00",
  "serviceName" : "U∞MUSIC",
  "customerName" : "カフェUSEN",
  "customerGroupCd" : "1234567",
  "createDate" : "2019-09-01T09:00:00+9:00"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

