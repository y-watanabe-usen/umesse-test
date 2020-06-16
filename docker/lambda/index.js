const aws = require('aws-sdk');
const s3 = new aws.S3({
  endpoint: 'http://localstack:4572',
  s3ForcePathStyle: 'true',
});

exports.handler = async (event, context, callback) => {
  try {
    const params = {
      Bucket: 'mybucket',
      Key: event.Key,
    };
    console.log(params);
    const ret = await s3.getObject(params).promise();
    context.statusCode = 200;
    return ret.Body.toString();
  } catch (error) {
    console.log(error);
    context.statusCode = 500;
    return JSON.stringify(error);
  }
};
