const aws = require("aws-sdk");
const s3 = new aws.S3({
    region: "ap-northeast-1",
    endpoint: "host.docker.internal:4566",
    accessKeyId: "local",
    secretAccessKey: "local",
    s3ForcePathStyle: "true", // local only
});
exports.handler = async (event, context, callback) => {
    // TODO implement
    console.log("converter lambda here");
    const response = await s3.putObject({
        Bucket: "umesse-contents",
        Key: "BGM/sampleeeeeee.txt",
        Body: "sampleeeeeee!!!",
        ACL: "private",
    }).promise();
    console.log(response);
    callback(null,'hello'); 
};
