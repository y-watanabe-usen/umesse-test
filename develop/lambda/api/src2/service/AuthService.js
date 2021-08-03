'use strict';


/**
 * 端末認証
 *
 * body Object 認証リクエストBody (optional)
 * returns Auth
 **/
exports.auth = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "expiration" : "2019-09-01T09:00:00+9:00",
  "agree" : true,
  "token" : "1234567890"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

