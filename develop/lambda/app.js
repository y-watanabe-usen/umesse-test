'use strict';
const bodyParser = require('body-parser')
const cors = require('cors')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

var path = require('path');
var oas3Tools = require('oas3-tools');

// swaggerRouter configuration
var options = {
    controllers: path.join(__dirname, './src/controllers')
};

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'src/api/openapi.yaml'), options);
expressAppConfig.addValidator();
var app = expressAppConfig.getApp();

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(awsServerlessExpressMiddleware.eventContext())
module.exports = app
