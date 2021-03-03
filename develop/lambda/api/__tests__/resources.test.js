"use strict";

const fs = require("fs");

// process.env.debug = true;
process.env.environment = "local";

const aws = require("aws-sdk");
const {
  getSignedUrl,
  getResource,
  getUserResource,
  createRecordingResource,
  createTtsResource,
  generateTtsResource,
  deleteUserResource,
} = require("../umesse/resources");
const { BadRequestError, InternalServerError } = require("umesse-lib/error");

// test data
const json = require("./data/resources.test.json");
const data = aws.DynamoDB.Converter.unmarshall(
  json["umesse-users"][0].PutRequest.Item
);
const bgmData = {
  contentsId: "サンプル01",
  category: "bgm",
  title: "サンプル01",
  description: "BGM・サンプル01",
  seconds: 60,
  industry: [
    {
      industryCd: "01",
      industryName: "業種01",
    },
  ],
  scene: [
    {
      sceneCd: "01",
      sceneName: "シーン01",
    },
  ],
  timestamp: "2019-09-01T09:00:00+09:00",
};
const narrationData = {
  contentsId: "サンプル05",
  category: "narration",
  title: "サンプル05",
  description: "ナレーション・サンプル05",
  manuscript: "あいうえお",
  seconds: 60,
  industry: [
    {
      industryCd: "05",
      industryName: "業種05",
    },
  ],
  scene: [
    {
      sceneCd: "05",
      sceneName: "シーン05",
    },
  ],
  timestamp: "2019-09-01T09:00:00+09:00",
};

console.error = jest.fn();
beforeAll(() => {
  jest.setTimeout(1000 * 30); // 30 sec
});

// 署名付きデータ取得
describe("署名付きデータ取得", () => {
  test("[success] 署名付きURLデータ取得", async () => {
    const response = await getSignedUrl(data.cm[0].cmId, "cm");
    expect(response).toEqual({ url: expect.anything() });
  });

  test("[error] 署名付きURLデータ取得　データ存在しない", async () => {
    await expect(getSignedUrl(data.cm[0].cmId, "none")).rejects.toThrow(
      new InternalServerError("unknown category")
    );
  });

  test("[error] 署名付きURLデータ取得　データ存在しない", async () => {
    await expect(getSignedUrl("", "cm")).rejects.toThrow(
      new BadRequestError("params failed")
    );
  });
});

// USEN素材データ取得
describe("USEN素材データ取得", () => {
  test("[success] BGMデータ取得", async () => {
    const response = await getResource(
      "bgm",
      bgmData.industry[0].industryCd,
      bgmData.scene[0].sceneCd
    );
    expect(response).toEqual([bgmData]);
  });

  test("[success] ナレーションデータ取得", async () => {
    const response = await getResource(
      "narration",
      narrationData.industry[0].industryCd,
      narrationData.scene[0].sceneCd
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
    await expect(
      getUserResource(data.unisCustomerCd, "recording", "999999999")
    ).rejects.toThrow(new InternalServerError("not found"));
  });

  test("[error] ユーザー音声データ取得　パラメータなし", async () => {
    await expect(getUserResource("")).rejects.toThrow(
      new BadRequestError("params failed")
    );
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
    const response = await createRecordingResource(data.unisCustomerCd, body);
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

// TTS音声作成
describe("TTS音声作成", () => {
  test("[success] TTS音声新規生成", async () => {
    const body = {
      id: "サンプル01",
      category: "template",
      details: [
        {
          text: "こんにちは",
          speaker: "1",
          lang: "ja",
        },
        {
          text: "hello",
          speaker: "0",
          lang: "en",
        },
        {
          text: "test",
          speaker: "0",
          lang: "zh",
          id: "サンプル01",
          category: "narration",
        },
      ],
    };
    const response = await generateTtsResource(data.unisCustomerCd, body);
    expect(response).toEqual({
      id: "サンプル01",
      category: "template",
      details: [
        {
          url: expect.anything(),
          lang: "ja",
        },
        {
          url: expect.anything(),
          lang: "en",
        },
        {
          url: expect.anything(),
          lang: "zh",
        },
      ],
    });
  });

  test("[success] TTS音声新規登録", async () => {
    const body = {
      id: "サンプル01",
      category: "template",
      details: [
        {
          title: "TTSテスト",
          description: "TTSテスト",
          lang: "ja",
        },
        {
          title: "TTSテスト",
          description: "TTテスト",
          lang: "en",
        },
        {
          title: "TTSテスト",
          description: "TTテスト",
          lang: "zh",
          id: "サンプル01",
          category: "narration",
        },
      ],
    };
    const response = await createTtsResource(data.unisCustomerCd, body);
    expect(response).toEqual([
      {
        id: expect.stringMatching(`^${data.unisCustomerCd}-t-[0-9a-z]{8}$`),
        category: "tts",
        title: `${body.details[0].title}(${body.details[0].lang})`,
        description: body.details[0].description,
        startDate: expect.anything(),
        timestamp: expect.anything(),
      },
      {
        id: expect.stringMatching(`^${data.unisCustomerCd}-t-[0-9a-z]{8}$`),
        category: "tts",
        title: `${body.details[1].title}(${body.details[1].lang})`,
        description: body.details[1].description,
        startDate: expect.anything(),
        timestamp: expect.anything(),
      },
      {
        id: body.details[2].id,
        category: body.details[2].category,
      },
    ]);
  });
});
// FIXME: error test
