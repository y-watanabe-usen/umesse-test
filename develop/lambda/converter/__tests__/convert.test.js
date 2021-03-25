"use strict";

process.env.environment = "local";

const aws = require("aws-sdk");
const { ERROR_CODE } = require("umesse-lib/error");
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

console.warn = jest.fn();
console.error = jest.fn();
beforeAll(() => {
  jest.setTimeout(1000 * 30); // 30 sec
});

describe("convert", () => {
  test("[success] 音圧調整/エンコード", async () => {
    const event = {
      Records: [
        {
          body: JSON.stringify({
            MessageBody: JSON.stringify({
              unisCustomerCd: cmData.unisCustomerCd,
              id: cmData.cm[0].cmId,
              category: "cm",
            }),
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
      { unisCustomerCd: cmData.unisCustomerCd },
      { ProjectionExpression: "cm" }
    );
    expect(ret.Item.cm[0]).toEqual({
      ...cmData.cm[0],
      status: "11",
      timestamp: expect.anything(),
    });

    // 外部連携ステータスの確認
    ret = await dynamodbManager.get(
      constants.dynamoDbTable().external,
      { unisCustomerCd: externalData.unisCustomerCd },
      {}
    );
    expect(ret.Item).toEqual({
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
            MessageBody: JSON.stringify({
              unisCustomerCd: "999999999",
              id: cmData.cm[1].cmId,
              category: "cm",
            }),
          }),
        },
      ],
    };
    await expect(handler(event)).resolves.toEqual({
      code: 404,
      message: ERROR_CODE.E0000404,
    });
  });

  test("[error] 音圧調整/エンコード　CMデータ存在しない", async () => {
    const event = {
      Records: [
        {
          body: JSON.stringify({
            MessageBody: JSON.stringify({
              unisCustomerCd: cmData.unisCustomerCd,
              id: "999999999-c-99999999",
              category: "cm",
            }),
          }),
        },
      ],
    };
    await expect(handler(event)).resolves.toEqual({
      code: 404,
      message: ERROR_CODE.E0000404,
    });
  });

  test("[error] 音圧調整/エンコード　CMステータスエラー", async () => {
    const event = {
      Records: [
        {
          body: JSON.stringify({
            MessageBody: JSON.stringify({
              unisCustomerCd: cmData.unisCustomerCd,
              id: cmData.cm[1].cmId,
              category: "cm",
            }),
          }),
        },
      ],
    };
    await expect(handler(event)).resolves.toEqual({
      code: 404,
      message: ERROR_CODE.E0000404,
    });
  });

  test("[error] 音圧調整/エンコード　S3にCMが存在しない", async () => {
    const event = {
      Records: [
        {
          body: JSON.stringify({
            MessageBody: JSON.stringify({
              unisCustomerCd: cmData.unisCustomerCd,
              id: cmData.cm[2].cmId,
              category: "cm",
            }),
          }),
        },
      ],
    };
    await expect(handler(event)).resolves.toEqual({
      code: 500,
      message: "converter failed",
    });
  });

  test("[error] 音圧調整/エンコード　パラメーターチェック", async () => {
    await expect(
      handler({
        Records: [
          {
            body: JSON.stringify({ MessageBody: JSON.stringify({}) }),
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
              MessageBody: JSON.stringify({
                unisCustomerCd: "aaaaaaaaaa",
              }),
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
              MessageBody: JSON.stringify({
                unisCustomerCd: "1111",
              }),
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
              MessageBody: JSON.stringify({
                unisCustomerCd: "11111111111",
              }),
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
              MessageBody: JSON.stringify({
                unisCustomerCd: "9999999999",
                id: "aaaa",
              }),
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
              MessageBody: JSON.stringify({
                unisCustomerCd: "9999999999",
                id: "9999999999-c",
              }),
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
              MessageBody: JSON.stringify({
                unisCustomerCd: "9999999999",
                id: "9999999999-c-99999999",
                category: "none",
              }),
            }),
          },
        ],
      })
    ).resolves.toEqual({
      code: 400,
      message: `${ERROR_CODE.E0001030} (E0001030)`,
    });
  });
});
