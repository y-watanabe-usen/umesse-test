'use strict';

const handler = require('./handler');

exports.handler = async (event, context) => {
  console.log(JSON.stringify(event));

  try {
    if (
      !event.pathParameters.handler ||
      typeof handler[event.pathParameters.handler] !== 'function'
    )
      throw {
        status: 400,
        message: 'Parameter is not a handler',
      };
    let body = await handler[event.pathParameters.handler](event.body);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      },
      body: JSON.stringify(body),
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: e.status ? e.status : 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      },
      body: JSON.stringify(e.message),
    };
  }
};
