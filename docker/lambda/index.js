const aws = require('aws-sdk');
const s3 = new aws.S3({
  endpoint: 'http://docker-s3:9000',
  s3ForcePathStyle: 'true', // docker-lambda only
});

exports.handler = async (event, context, callback) => {
  console.log(JSON.stringify(event));

  try {
    if (!event.Bucket) throw 'Parameter is not a Bucket'
    if (!event.Key) throw 'Parameter is not a Key'

    const params = {
      Bucket: event.Bucket,
      Key: event.Key,
    };
    const ret = await s3.getObject(params).promise();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: ret.Body.toString(),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(error)
    };
  }
};
