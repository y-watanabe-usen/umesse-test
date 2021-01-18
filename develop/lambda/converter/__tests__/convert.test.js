"use strict";

// process.env.debug = true;
process.env.environment = "local";

const aws = require("aws-sdk");
const { constants } = require("umesse-lib/constants");
const { dynamodbManager } = require("umesse-lib/utils/dynamodbManager");
const { handler } = require("../lambda");

// test data
const json = require("./data/convert.test.json");
const cmData = aws.DynamoDB.Converter.unmarshall(
  json["umesse-users"][0].PutRequest.Item
);
const externalData = aws.DynamoDB.Converter.unmarshall(
  json["umesse-external"][0].PutRequest.Item
);

beforeAll(() => {
  jest.setTimeout(1000 * 30); // 30 sec
});

// TODO: draft
describe("convert", () => {
  test("[success] 音圧調整/エンコード", async () => {
    const event = {
      Records: [
        {
          body: JSON.stringify({
            unisCustomerCd: cmData.unisCustomerCd,
            cmId: cmData.cm[0].cmId,
          }),
        },
      ],
    };
    const response = await handler(event);
    expect(response).toEqual({ message: "complete" });

    let res = "";
    // CMステータスの確認
    res = await dynamodbManager.get(
      constants.dynamoDbTable().users,
      { unisCustomerCd: cmData.unisCustomerCd },
      { ProjectionExpression: "cm" }
    );
    expect(res.Item.cm[0]).toEqual({
      ...cmData.cm[0],
      status: "02",
      timestamp: expect.anything(),
    });

    // 外部連携ステータスの確認
    res = await dynamodbManager.get(
      constants.dynamoDbTable().external,
      { unisCustomerCd: externalData.unisCustomerCd },
      {}
    );
    expect(res.Item).toEqual({
      ...externalData,
      status: "1",
      timestamp: expect.anything(),
    });
  });

  test("[error] 音圧調整/エンコード　顧客データ存在しない", async () => {
    const event = {
      Records: [
        {
          body: JSON.stringify({
            unisCustomerCd: "999999999",
            cmId: cmData.cm[1].cmId,
          }),
        },
      ],
    };
    const response = await handler(event);
    expect(response).toEqual({ message: "not found" });
  });

  test("[error] 音圧調整/エンコード　CMデータ存在しない", async () => {
    const event = {
      Records: [
        {
          body: JSON.stringify({
            unisCustomerCd: cmData.unisCustomerCd,
            cmId: "999999999",
          }),
        },
      ],
    };
    const response = await handler(event);
    expect(response).toEqual({ message: "not found" });
  });

  test("[error] 音圧調整/エンコード　CMステータスエラー", async () => {
    const event = {
      Records: [
        {
          body: JSON.stringify({
            unisCustomerCd: cmData.unisCustomerCd,
            cmId: cmData.cm[1].cmId,
          }),
        },
      ],
    };
    const response = await handler(event);
    expect(response).toEqual({ message: "音圧調整/エンコードができません" });
  });

  test("[error] 音圧調整/エンコード　S3にCMが存在しない", async () => {
    const event = {
      Records: [
        {
          body: JSON.stringify({
            unisCustomerCd: cmData.unisCustomerCd,
            cmId: cmData.cm[2].cmId,
          }),
        },
      ],
    };
    const response = await handler(event);
    expect(response).toEqual({ message: "converter failed" });
  });
});

// FIXME: error test
