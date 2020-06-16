const aws = require('aws-sdk');

const s3 = new aws.S3({ endpoint: 'http://localstack:4572' });

exports.handler = async (event, context, callback) => {
  try {
    const params = {
      Bucket: 'mybucket',
      Key: event.Key
    };
    console.log(params);
    const ret = await s3.getObject(params).promise();
    context.succeed({
      statusCode: 200,
      body: ret.body,
    });
  } catch (error) {
    console.log(error);
    context.succeed({
      statusCode: 500,
      body: JSON.stringify(error),
    });
  }
};
