'use strict';

const handler = require('./handler');

exports.handler = async (event, context, callback) => {
  console.log(JSON.stringify(event));

  try {
    if (!event.Handler || typeof handler[event.Handler] !== 'function')
      throw 'Parameter is not a Handler'
    return handler[event.Handler](event);
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(e)
    };
  }
};
