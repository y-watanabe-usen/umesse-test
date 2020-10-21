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
  "name" : "Meguro Cafe",
  "id" : 1234
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

