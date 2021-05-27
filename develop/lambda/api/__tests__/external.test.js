"use strict";

process.env.environment = "localstack";

const aws = require("aws-sdk");
const {
  ERROR_CODE,
  BadRequestError,
  NotFoundError,
} = require("umesse-lib/error");
const { constants } = require("umesse-lib/constants");
const { s3Manager } = require("umesse-lib/utils/s3Manager");
const { dynamodbManager } = require("umesse-lib/utils/dynamodbManager");
const { getExternalCm, completeExternalCm } = require("../umesse/external");

// test data
const json = require("./data/external.test.json");
const cmData = json["umesse-users"].map((item) =>
  aws.DynamoDB.Converter.unmarshall(item.PutRequest.Item)
);

console.warn = jest.fn();
console.error = jest.fn();
beforeAll(() => {
  jest.setTimeout(1000 * 30); // 30 sec
});

// 外部連携CMデータ取得
describe("外部連携CMデータ", () => {
  test("[success] 外部連携CMデータ取得", async () => {
    const data = {
      unisCustomers: [
        {
          unisCustomerCd: "060000000",
          cmMetas: [
            {
              dataProcessType: "01",
              cmId: "060000000-c-00000001",
              cmName: "時報A",
              description: "テストCMです",
              cmCommentManuscript: "テストCMです",
              startDatetime: "2020-01-01T12:34:56+09:00",
              endDatetime: "9999-12-31T23:59:59+09:00",
              productionType: "01",
              contentTime: 60,
              sceneCd: "01",
              url: expect.anything(),
              fileName: "060000000-c-00000001.aac",
            },
          ],
        },
        {
          unisCustomerCd: "060000002",
          cmMetas: [
            {
              dataProcessType: "02",
              cmId: "060000002-c-00000001",
              cmName: "時報A",
              cmCommentManuscript: "テストCMです",
            },
          ],
        },
        {
          unisCustomerCd: "060000010",
          cmMetas: [
            {
              dataProcessType: "02",
              cmId: "060000010-c-00000001",
              cmName: "時報A",
              description: "テストCMです",
              sceneCd: "01",
            },
          ],
        },
        {
          unisCustomerCd: "060000020",
          cmMetas: [
            {
              dataProcessType: "03",
              cmId: "060000020-c-00000001",
            },
          ],
        },
        {
          unisCustomerCd: "060000100",
          cmMetas: [
            {
              dataProcessType: "01",
              cmId: "060000100-c-00000001",
              cmName: "時報A",
              description: "テストCMです",
              cmCommentManuscript: "テストCMです",
              startDatetime: "2020-01-01T12:34:56+09:00",
              endDatetime: "9999-12-31T23:59:59+09:00",
              productionType: "01",
              contentTime: 60,
              sceneCd: "01",
              url: expect.anything(),
              fileName: "060000100-c-00000001.aac",
            },
          ],
        },
        {
          unisCustomerCd: "060000110",
          cmMetas: [
            {
              dataProcessType: "02",
              cmId: "060000110-c-00000001",
              cmName: "時報A",
              description: "テストCMです",
              sceneCd: "01",
            },
          ],
        },
        {
          unisCustomerCd: "060000120",
          cmMetas: [
            {
              dataProcessType: "03",
              cmId: "060000120-c-00000001",
            },
          ],
        },
      ],
    };
    await expect(getExternalCm("", "center")).resolves.toEqual(data);
  });

  test("[error] 外部連携CMデータ取得　データ存在しない", async () => {
    await expect(getExternalCm("", "ssence")).rejects.toThrow(
      new NotFoundError(ERROR_CODE.E0000404)
    );
  });

  test("[error] 外部連携CMデータ取得　パラメータチェック", async () => {
    await expect(getExternalCm()).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001001} (E0001001)`)
    );

    await expect(getExternalCm("999999999")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001001} (E0001001)`)
    );

    await expect(getExternalCm("aaaaaaaaaa", "center")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001010} (E0001010)`)
    );

    await expect(getExternalCm("1111", "center")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001010} (E0001010)`)
    );

    await expect(getExternalCm("11111111111", "center")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001010} (E0001010)`)
    );

    await expect(getExternalCm("", "aenter")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001170} (E0001170)`)
    );

    await expect(getExternalCm("", "asence")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001170} (E0001170)`)
    );
  });
});

// 外部連携CMデータ連携完了
describe("外部連携CMデータ連携完了", () => {
  test("[success] 外部連携CMデータ連携完了　作成", async () => {
    const data = {
      dataProcessType: "01",
      cmId: cmData[0].cm[0].cmId,
    };
    await expect(
      completeExternalCm(cmData[0].unisCustomerCd, "center", data)
    ).resolves.toEqual(data);

    let ret;
    // CMステータスの確認
    ret = await dynamodbManager.get(
      constants.dynamoDbTable().users,
      { unisCustomerCd: cmData[0].unisCustomerCd },
      { ProjectionExpression: "cm" }
    );
    expect(ret.Item.cm[0]).toEqual({
      ...cmData[0].cm[0],
      status: "12",
      timestamp: expect.anything(),
    });

    // 外部連携ステータスの確認
    ret = await dynamodbManager.get(
      constants.dynamoDbTable().external,
      { unisCustomerCd: cmData[0].unisCustomerCd },
      {}
    );
    expect(ret).toEqual({});
  });

  test("[success] 外部連携CMデータ連携完了　更新", async () => {
    const data = {
      dataProcessType: "01",
      cmId: cmData[1].cm[0].cmId,
    };
    await expect(
      completeExternalCm(cmData[1].unisCustomerCd, "center", data)
    ).resolves.toEqual(data);

    let ret;
    // CMステータスの確認
    ret = await dynamodbManager.get(
      constants.dynamoDbTable().users,
      { unisCustomerCd: cmData[1].unisCustomerCd },
      { ProjectionExpression: "cm" }
    );
    expect(ret.Item.cm[0]).toEqual({
      ...cmData[1].cm[0],
      status: "12",
      timestamp: expect.anything(),
    });

    // 外部連携ステータスの確認
    ret = await dynamodbManager.get(
      constants.dynamoDbTable().external,
      { unisCustomerCd: cmData[1].unisCustomerCd },
      {}
    );
    expect(ret).toEqual({});
  });

  test("[success] 外部連携CMデータ連携完了　解除", async () => {
    const data = {
      dataProcessType: "01",
      cmId: cmData[2].cm[0].cmId,
    };
    await expect(
      completeExternalCm(cmData[2].unisCustomerCd, "center", data)
    ).resolves.toEqual(data);

    let ret;
    // CMステータスの確認
    ret = await dynamodbManager.get(
      constants.dynamoDbTable().users,
      { unisCustomerCd: cmData[2].unisCustomerCd },
      { ProjectionExpression: "cm" }
    );
    expect(ret.Item.cm[0]).toEqual({
      ...cmData[2].cm[0],
      cmId: expect.stringMatching(
        `^${cmData[2].unisCustomerCd}-c-[0-9a-z]{8}$`
      ),
      uploadSystem: "",
      status: "02",
      timestamp: expect.anything(),
    });
    let cmId = ret.Item.cm[0].cmId;

    // 外部連携ステータスの確認
    ret = await dynamodbManager.get(
      constants.dynamoDbTable().external,
      { unisCustomerCd: cmData[2].unisCustomerCd },
      {}
    );
    expect(ret).toEqual({});

    // s3オブジェクトの確認
    ret = await s3Manager.head(
      constants.s3Bucket().users,
      `users/${cmData[2].unisCustomerCd}/cm/${cmId}.aac`
    );
    expect(ret).toEqual(expect.anything());
  });

  test("[error] 外部連携CMデータ連携完了　作成失敗", async () => {
    const data = {
      dataProcessType: "09",
      cmId: cmData[3].cm[0].cmId,
      errorCode: "E001",
      errorMessage: "CMの追加に失敗しました",
    };
    await expect(
      completeExternalCm(cmData[3].unisCustomerCd, "center", data)
    ).resolves.toEqual(data);

    let ret;
    // CMステータスの確認
    ret = await dynamodbManager.get(
      constants.dynamoDbTable().users,
      { unisCustomerCd: cmData[3].unisCustomerCd },
      { ProjectionExpression: "cm" }
    );
    expect(ret.Item.cm[0]).toEqual({
      ...cmData[3].cm[0],
      uploadError: 1,
      uploadErrorCode: data.errorCode,
      uploadErrorMessage: data.errorMessage,
      status: "02",
      timestamp: expect.anything(),
    });

    // 外部連携ステータスの確認
    ret = await dynamodbManager.get(
      constants.dynamoDbTable().external,
      { unisCustomerCd: cmData[3].unisCustomerCd },
      {}
    );
    expect(ret).toEqual({});
  });

  test("[error] 外部連携CMデータ連携完了　更新失敗", async () => {
    const data = {
      dataProcessType: "09",
      cmId: cmData[4].cm[0].cmId,
      errorCode: "E002",
      errorMessage: "CMの更新に失敗しました",
    };
    await expect(
      completeExternalCm(cmData[4].unisCustomerCd, "center", data)
    ).resolves.toEqual(data);

    let ret;
    // CMステータスの確認
    ret = await dynamodbManager.get(
      constants.dynamoDbTable().users,
      { unisCustomerCd: cmData[4].unisCustomerCd },
      { ProjectionExpression: "cm" }
    );
    expect(ret.Item.cm[0]).toEqual({
      ...cmData[4].cm[0],
      uploadError: 1,
      uploadErrorCode: data.errorCode,
      uploadErrorMessage: data.errorMessage,
      status: "12",
      timestamp: expect.anything(),
    });

    // 外部連携ステータスの確認
    ret = await dynamodbManager.get(
      constants.dynamoDbTable().external,
      { unisCustomerCd: cmData[4].unisCustomerCd },
      {}
    );
    expect(ret).toEqual({});
  });

  test("[error] 外部連携CMデータ連携完了　解除失敗", async () => {
    const data = {
      dataProcessType: "09",
      cmId: cmData[5].cm[0].cmId,
      errorCode: "E003",
      errorMessage: "CMの解除に失敗しました",
    };
    await expect(
      completeExternalCm(cmData[5].unisCustomerCd, "center", data)
    ).resolves.toEqual(data);

    let ret;
    // CMステータスの確認
    ret = await dynamodbManager.get(
      constants.dynamoDbTable().users,
      { unisCustomerCd: cmData[5].unisCustomerCd },
      { ProjectionExpression: "cm" }
    );
    expect(ret.Item.cm[0]).toEqual({
      ...cmData[5].cm[0],
      uploadError: 1,
      uploadErrorCode: data.errorCode,
      uploadErrorMessage: data.errorMessage,
      status: "12",
      timestamp: expect.anything(),
    });

    // 外部連携ステータスの確認
    ret = await dynamodbManager.get(
      constants.dynamoDbTable().external,
      { unisCustomerCd: cmData[4].unisCustomerCd },
      {}
    );
    expect(ret).toEqual({});
  });

  test("[error] 外部連携CMデータ連携完了　データ存在しない", async () => {
    let data;
    data = {
      dataProcessType: "01",
      cmId: "999999999-c-12345678",
    };
    await expect(
      completeExternalCm("999999999", "ssence", data)
    ).resolves.toEqual(data);

    data = {
      dataProcessType: "01",
      cmId: "060000001-c-00000001",
    };
    await expect(
      completeExternalCm("060000000", "ssence", data)
    ).resolves.toEqual(data);

    data = {
      dataProcessType: "01",
      cmId: "060000001-c-00000001",
    };
    await expect(
      completeExternalCm("060000001", "center", data)
    ).resolves.toEqual(data);

    data = {
      dataProcessType: "01",
      cmId: "060000002-c-00000001",
    };
    await expect(
      completeExternalCm("060000002", "center", data)
    ).resolves.toEqual(data);
  });

  test("[error] 外部連携CMデータ連携完了　パラメータチェック", async () => {
    await expect(completeExternalCm()).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001001} (E0001001)`)
    );

    await expect(completeExternalCm("999999999")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001001} (E0001001)`)
    );

    await expect(completeExternalCm("aaaaaaaaaa", "center")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(completeExternalCm("1111", "center")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(completeExternalCm("11111111111", "center")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(completeExternalCm("999999999", "aenter")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001170} (E0001170)`,
        ].join("\n")
      )
    );

    await expect(completeExternalCm("999999999", "asence")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001170} (E0001170)`,
        ].join("\n")
      )
    );

    await expect(
      completeExternalCm("999999999", "center", {
        dataProcessType: "00",
        cmId: "9999999999-c-99999999",
      })
    ).rejects.toThrow(new BadRequestError(`${ERROR_CODE.E0001180} (E0001180)`));

    await expect(
      completeExternalCm("999999999", "center", {
        dataProcessType: "01",
        cmId: "9999999999-c",
      })
    ).rejects.toThrow(new BadRequestError(`${ERROR_CODE.E0001210} (E0001210)`));
  });
});
