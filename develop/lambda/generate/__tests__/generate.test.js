"use strict";

process.env.environment = "localstack";

const aws = require("aws-sdk");
const { ERROR_CODE } = require("umesse-lib/error");
const { constants } = require("umesse-lib/constants");
const { s3Manager } = require("umesse-lib/utils/s3Manager");
const { dynamodbManager } = require("umesse-lib/utils/dynamodbManager");
const { handler } = require("../lambda");

// test data
const json = require("./data/generate.test.json");
const data = aws.DynamoDB.Converter.unmarshall(
  json["umesse-users"][0].PutRequest.Item
);

console.warn = jest.fn();
console.error = jest.fn();
beforeAll(() => {
  jest.setTimeout(1000 * 30); // 30 sec
});

describe("convert", () => {
  test("[success] CM生成", async () => {
    const event = {
      Records: [
        {
          body: JSON.stringify({
            unisCustomerCd: data.unisCustomerCd,
            id: data.cm[0].cmId,
            category: "cm",
            materials: {
              narrations: [
                { id: "サンプル03", category: "narration", volume: 100 },
              ],
              startChime: { id: "サンプル01", category: "chime", volume: 50 },
              endChime: { id: "サンプル02", category: "chime", volume: 50 },
              bgm: { id: "サンプル01", category: "bgm", volume: 50 },
            },
          }),
        },
      ],
    };
    await expect(handler(event)).resolves.toEqual({
      code: "200",
      message: "complete",
    });

    let ret = "";
    // CMステータスの確認
    ret = await dynamodbManager.get(
      constants.dynamoDbTable().users,
      { unisCustomerCd: data.unisCustomerCd },
      { ProjectionExpression: "cm" }
    );
    expect(ret.Item.cm[0]).toEqual({
      ...data.cm[0],
      seconds: expect.anything(),
      status: "01",
      timestamp: expect.anything(),
    });

    // s3オブジェクトの確認
    ret = await s3Manager.head(
      constants.s3Bucket().users,
      `users/${data.unisCustomerCd}/cm/${data.cm[0].cmId}.mp3`
    );
    expect(ret).toEqual(expect.anything());
  });

  test("[error] CM生成　顧客データ存在しない", async () => {
    const event = {
      Records: [
        {
          body: JSON.stringify({
            unisCustomerCd: "999999999",
            id: data.cm[1].cmId,
            category: "cm",
            materials: {
              narrations: [
                { id: "サンプル03", category: "narration", volume: 300 },
              ],
              startChime: { id: "サンプル01", category: "chime", volume: 50 },
              endChime: { id: "サンプル02", category: "chime", volume: 50 },
            },
          }),
        },
      ],
    };
    await expect(handler(event)).resolves.toEqual({
      code: 404,
      message: ERROR_CODE.E0000404,
    });
  });

  test("[error] CM生成　CMデータ存在しない", async () => {
    const event = {
      Records: [
        {
          body: JSON.stringify({
            unisCustomerCd: data.unisCustomerCd,
            id: "999999999-c-99999999",
            category: "cm",
            materials: {
              narrations: [
                { id: "サンプル03", category: "narration", volume: 300 },
              ],
              startChime: { id: "サンプル01", category: "chime", volume: 50 },
              endChime: { id: "サンプル02", category: "chime", volume: 50 },
            },
          }),
        },
      ],
    };
    await expect(handler(event)).resolves.toEqual({
      code: 404,
      message: ERROR_CODE.E0000404,
    });
  });

  test("[error] CM生成　CMステータスエラー", async () => {
    const event = {
      Records: [
        {
          body: JSON.stringify({
            unisCustomerCd: data.unisCustomerCd,
            id: data.cm[1].cmId,
            category: "cm",
            materials: {
              narrations: [
                { id: "サンプル03", category: "narration", volume: 300 },
              ],
              startChime: { id: "サンプル01", category: "chime", volume: 50 },
              endChime: { id: "サンプル02", category: "chime", volume: 50 },
            },
          }),
        },
      ],
    };
    await expect(handler(event)).resolves.toEqual({
      code: 404,
      message: ERROR_CODE.E0000404,
    });
  });

  test("[error] CM生成　パラメーターチェック", async () => {
    await expect(
      handler({
        Records: [
          {
            body: JSON.stringify({}),
          },
        ],
      })
    ).resolves.toEqual({
      code: 400,
      message: `${ERROR_CODE.E0001001} (E0001001)`,
    });

    await expect(
      handler({
        Records: [
          {
            body: JSON.stringify({
              unisCustomerCd: "aaaaaaaaaa",
            }),
          },
        ],
      })
    ).resolves.toEqual({
      code: 400,
      message: [
        `${ERROR_CODE.E0001001} (E0001001)`,
        `${ERROR_CODE.E0001010} (E0001010)`,
      ].join("\n"),
    });

    await expect(
      handler({
        Records: [
          {
            body: JSON.stringify({
              unisCustomerCd: "1111",
            }),
          },
        ],
      })
    ).resolves.toEqual({
      code: 400,
      message: [
        `${ERROR_CODE.E0001001} (E0001001)`,
        `${ERROR_CODE.E0001010} (E0001010)`,
      ].join("\n"),
    });

    await expect(
      handler({
        Records: [
          {
            body: JSON.stringify({
              unisCustomerCd: "11111111111",
            }),
          },
        ],
      })
    ).resolves.toEqual({
      code: 400,
      message: [
        `${ERROR_CODE.E0001001} (E0001001)`,
        `${ERROR_CODE.E0001010} (E0001010)`,
      ].join("\n"),
    });

    await expect(
      handler({
        Records: [
          {
            body: JSON.stringify({
              unisCustomerCd: "9999999999",
              id: "aaaa",
            }),
          },
        ],
      })
    ).resolves.toEqual({
      code: 400,
      message: [
        `${ERROR_CODE.E0001001} (E0001001)`,
        `${ERROR_CODE.E0001210} (E0001210)`,
      ].join("\n"),
    });

    await expect(
      handler({
        Records: [
          {
            body: JSON.stringify({
              unisCustomerCd: "9999999999",
              id: "9999999999-c",
            }),
          },
        ],
      })
    ).resolves.toEqual({
      code: 400,
      message: [
        `${ERROR_CODE.E0001001} (E0001001)`,
        `${ERROR_CODE.E0001210} (E0001210)`,
      ].join("\n"),
    });

    await expect(
      handler({
        Records: [
          {
            body: JSON.stringify({
              unisCustomerCd: "9999999999",
              id: "9999999999-c-99999999",
              category: "none",
            }),
          },
        ],
      })
    ).resolves.toEqual({
      code: 400,
      message: [
        `${ERROR_CODE.E0001001} (E0001001)`,
        `${ERROR_CODE.E0001030} (E0001030)`,
      ].join("\n"),
    });
  });
});
