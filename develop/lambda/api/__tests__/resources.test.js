"use strict";

const fs = require("fs");

// process.env.debug = true;
process.env.environment = "local";

const {
  getSignedUrl,
  getResource,
  getUserResource,
  createUserResource,
} = require("../umesse/resources");

beforeAll(() => {
  jest.setTimeout(1000 * 30); // 30 sec
});

// TODO: draft
describe("resources", () => {
  test("getSignedUrl success", async () => {
    const response = await getSignedUrl("020000000-c-00000001");
    expect(response).toEqual({ url: expect.anything() });
  });

  test("getResource bgm success", async () => {
    const response = await getResource(
      "bgm",
      bgmData.industry[0].cd,
      bgmData.scene[0].cd
    );
    expect(response).toEqual([bgmData]);
  });

  test("getResource narration success", async () => {
    const response = await getResource(
      "narration",
      narrationData.industry[0].cd,
      narrationData.scene[0].cd
    );
    expect(response).toEqual([narrationData]);
  });

  test("getUserResource recording success", async () => {
    const response = await getUserResource(
      recordingData.unisCustomerCd,
      "recording",
      recordingData.data.id
    );
    expect(response).toEqual(recordingData.data);
  });

  test("getUserResource tts success", async () => {
    const response = await getUserResource(
      ttsData.unisCustomerCd,
      "tts",
      ttsData.data.id
    );
    expect(response).toEqual(ttsData.data);
  });

  test("getUserResource not found", async () => {
    const response = await getUserResource("999999999");
    expect(response).toEqual({ message: "not found" });
  });

  test("getUserResource not params", async () => {
    const response = await getUserResource("");
    expect(response).toEqual({ message: "params failed" });
  });

  test("createUserResource recording success", async () => {
    const file = fs.readFileSync(
      "../../../sample_data/s3/umesse-users/users/123456789/recording/123456789-r-12345678.mp3"
    );
    const body = {
      recordedFile: file,
    };
    const response = await createUserResource(
      recordingData.unisCustomerCd,
      "recording",
      body
    );
    expect(response).toEqual({
      id: expect.stringMatching(
        `^${recordingData.unisCustomerCd}-r-[0-9a-z]{8}$`
      ),
      startDate: expect.anything(),
      timestamp: expect.anything(),
    });
  });
});

// FIXME: error test

// test data
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

const recordingData = {
  unisCustomerCd: "020000000",
  data: {
    id: "020000000-r-00000001",
    title: "録音テスト01",
    description: "録音テスト01",
    startDate: "2019-09-01T09:00:00+9:00",
    timestamp: "2019-09-01T09:00:00+9:00",
  },
};

const ttsData = {
  unisCustomerCd: "020000000",
  data: {
    id: "020000000-t-00000003",
    title: "合成音声テスト03",
    description: "合成音声テスト03",
    startDate: "2019-09-01T09:00:00+9:00",
    timestamp: "2019-09-01T09:00:00+9:00",
  },
};
