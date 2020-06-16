const aws = require('aws-sdk');

exports.handler = async (event, context) => {
  context.succeed({
    statusCode: 200,
    body      : JSON.stringify('hallo world!'),
  });
};
