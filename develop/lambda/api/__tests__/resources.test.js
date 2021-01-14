"use strict";

const fs = require("fs");

// process.env.debug = true;
process.env.environment = "local";

const aws = require("aws-sdk");
const {
  getSignedUrl,
  getResource,
  getUserResource,
  createUserResource,
  deleteUserResource,
} = require("../umesse/resources");

// test data
const json = require("./data/resources.test.json");
const data = aws.DynamoDB.Converter.unmarshall(
  json["umesse-users"][0].PutRequest.Item
);
const bgmData = {
  id: "bgm/サンプル01",
  title: "サンプル01",
  description: "BGM・サンプル01",
  seconds: 60,
  industry: [
    {
      cd: "01",
      name: "業種01",
    },
  ],
  scene: [
    {
      cd: "01",
      name: "シーン01",
    },
  ],
  timestamp: "2019-09-01T09:00:00+9:00",
};
const narrationData = {
  id: "narration/サンプル05",
  title: "サンプル05",
  description: "ナレーション・サンプル05",
  manuscript: "あいうえお",
  seconds: 60,
  industry: [
    {
      cd: "05",
      name: "業種05",
    },
  ],
  scene: [
    {
      cd: "05",
      name: "シーン05",
    },
  ],
  timestamp: "2019-09-01T09:00:00+9:00",
};

beforeAll(() => {
  jest.setTimeout(1000 * 30); // 30 sec
});

// 署名付きデータ取得
describe("署名付きデータ取得", () => {
  test("[success] 署名付きURLデータ取得", async () => {
    const response = await getSignedUrl(data.cm[0].cmId);
    expect(response).toEqual({ url: expect.anything() });
  });
});

// USEN素材データ取得
describe("USEN素材データ取得", () => {
  test("[success] BGMデータ取得", async () => {
    const response = await getResource(
      "bgm",
      bgmData.industry[0].cd,
      bgmData.scene[0].cd
    );
    expect(response).toEqual([bgmData]);
  });

  test("[success] ナレーションデータ取得", async () => {
    const response = await getResource(
      "narration",
      narrationData.industry[0].cd,
      narrationData.scene[0].cd
    );
    expect(response).toEqual([narrationData]);
  });
});

// ユーザー音声データ取得
describe("ユーザー音声データ取得", () => {
  test("[success] 録音音声データ取得", async () => {
    const response = await getUserResource(
      data.unisCustomerCd,
      "recording",
      data.recording[0].recordingId
    );
    expect(response).toEqual(data.recording[0]);
  });

  test("[success] 合成音声データ取得", async () => {
    const response = await getUserResource(
      data.unisCustomerCd,
      "tts",
      data.tts[2].ttsId
    );
    expect(response).toEqual(data.tts[2]);
  });

  test("[error] ユーザー音声データ取得　データ存在しない", async () => {
    const response = await getUserResource(
      data.unisCustomerCd,
      "recording",
      "999999999"
    );
    expect(response).toEqual({ message: "not found" });
  });

  test("[error] ユーザー音声データ取得　パラメータなし", async () => {
    const response = await getUserResource("");
    expect(response).toEqual({ message: "params failed" });
  });
});

// ユーザー音声作成
describe("ユーザー音声作成", () => {
  test("[success] 録音音声新規登録", async () => {
    const file = fs.readFileSync(
      "../../../sample_data/s3/umesse-users/users/123456789/recording/123456789-r-12345678.mp3"
    );
    const body = {
      recordedFile: file,
      title: "録音テスト04",
      description: "録音テスト04",
    };
    const response = await createUserResource(
      data.unisCustomerCd,
      "recording",
      body
    );
    expect(response).toEqual({
      id: expect.stringMatching(`^${data.unisCustomerCd}-r-[0-9a-z]{8}$`),
      title: body.title,
      description: body.description,
      startDate: expect.anything(),
      timestamp: expect.anything(),
    });
  });

  test("[success] 録音音声データ削除", async () => {
    const response = await deleteUserResource(
      data.unisCustomerCd,
      "recording",
      data.recording[0].recordingId
    );
    expect(response).toEqual([
      data.recording[1],
      data.recording[2],
      {
        id: expect.stringMatching(`^${data.unisCustomerCd}-r-[0-9a-z]{8}$`),
        title: "録音テスト04",
        description: "録音テスト04",
        startDate: expect.anything(),
        timestamp: expect.anything(),
      },
    ]);
  });
});

// FIXME: error test
