'use strict';


/**
 * User情報取得
 *
 * returns User
 **/
exports.userGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "customerGroupName" : "USEN",
  "unisCustomerCd" : "1234567890",
  "customerName" : "Meguro Cafe",
  "customerGroupCd" : "1234567890"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

