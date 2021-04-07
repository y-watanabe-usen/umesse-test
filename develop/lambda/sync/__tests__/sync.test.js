"use strict";

process.env.debug = true;
process.env.environment = "dev";

const aws = require("aws-sdk");
const { ERROR_CODE } = require("umesse-lib/error");
const { constants } = require("umesse-lib/constants");
const { dynamodbManager } = require("umesse-lib/utils/dynamodbManager");
const { handler } = require("../lambda");

beforeAll(() => {
  jest.setTimeout(1000 * 30); // 30 sec
});

describe("sync", () => {
  test("[success] sync", async () => {
    await expect(handler()).resolves.toEqual({
      code: "200",
      message: "complete",
    });
  });
});
