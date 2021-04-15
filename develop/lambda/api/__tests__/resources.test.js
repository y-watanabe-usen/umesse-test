"use strict";

process.env.environment = "localstack";

const fs = require("fs");
const aws = require("aws-sdk");
const {
  ERROR_CODE,
  BadRequestError,
  NotFoundError,
} = require("umesse-lib/error");
const {
  getSignedUrl,
  getResource,
  getUserResource,
  createRecordingResource,
  createTtsResource,
  generateTtsResource,
  updateUserResource,
  deleteUserResource,
} = require("../umesse/resources");

// test data
const json = require("./data/resources.test.json");
const data = aws.DynamoDB.Converter.unmarshall(
  json["umesse-users"][0].PutRequest.Item
);
data.cm.map((item) => {
  if (item.id) return item;
  item.id = item.cmId;
  delete item.cmId;
  item.category = "cm";
  return item;
});
data.recording.map((item) => {
  if (item.id) return item;
  item.id = item.recordingId;
  delete item.recordingId;
  item.category = "recording";
  return item;
});
data.tts.map((item) => {
  if (item.id) return item;
  item.id = item.ttsId;
  delete item.ttsId;
  item.category = "tts";
  return item;
});

let contentsData = [];
json["umesse-contents"].forEach((item) => {
  contentsData.push(aws.DynamoDB.Converter.unmarshall(item.PutRequest.Item));
});
contentsData.map((item) => {
  if (item.id) return item;
  item.id = item.contentsId;
  delete item.contentsId;
  return item;
});

console.warn = jest.fn();
console.error = jest.fn();
beforeAll(() => {
  jest.setTimeout(1000 * 30); // 30 sec
});

// 署名付きデータ取得
describe("署名付きデータ取得", () => {
  test("[success] 署名付きURLデータ取得", async () => {
    await expect(getSignedUrl(data.cm[0].id, "cm")).resolves.toEqual({
      url: expect.anything(),
    });
  });

  test("[error] 署名付きURLデータ取得　パラメーターチェック", async () => {
    await expect(getSignedUrl()).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001001} (E0001001)`)
    );

    await expect(getSignedUrl("aaaaaaaaaa")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001001} (E0001001)`)
    );

    await expect(getSignedUrl("", "cm")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001210} (E0001210)`)
    );

    await expect(getSignedUrl("aaaaaaaaaa", "none")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001030} (E0001030)`)
    );
  });
});

// USEN素材データ取得
describe("USEN素材データ取得", () => {
  test("[success] BGMデータ取得", async () => {
    await expect(
      getResource(
        contentsData[0].category,
        contentsData[0].industry[0].industryCd,
        contentsData[0].scene[0].sceneCd
      )
    ).resolves.toEqual([contentsData[0]]);
  });

  test("[success] ナレーションデータ取得", async () => {
    await expect(
      getResource(
        contentsData[3].category,
        contentsData[3].industry[0].industryCd,
        contentsData[3].scene[0].sceneCd
      )
    ).resolves.toEqual([contentsData[3]]);
  });

  test("[error] USEN素材データ取得　パラメーターチェック", async () => {
    await expect(getResource()).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001001} (E0001001)`)
    );

    await expect(getResource("none")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001030} (E0001030)`)
    );
  });
});

// ユーザー音声データ取得
describe("ユーザー音声データ取得", () => {
  test("[success] 録音音声データ取得", async () => {
    await expect(
      getUserResource(data.unisCustomerCd, "recording", data.recording[0].id)
    ).resolves.toEqual(data.recording[0]);
  });

  test("[success] 合成音声データ取得", async () => {
    await expect(
      getUserResource(data.unisCustomerCd, "tts", data.tts[2].id)
    ).resolves.toEqual(data.tts[2]);
  });

  test("[error] ユーザー音声データ取得　データ存在しない", async () => {
    await expect(
      getUserResource(data.unisCustomerCd, "recording", "999999999-r-99999999")
    ).rejects.toThrow(new NotFoundError(ERROR_CODE.E0000404));
  });

  test("[error] ユーザー音声データ取得　パラメータチェック", async () => {
    await expect(getUserResource()).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001001} (E0001001)`)
    );

    await expect(getUserResource("aaaaaaaaaa")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(getUserResource("1111")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(getUserResource("11111111111")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(getUserResource("9999999999")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001001} (E0001001)`)
    );

    await expect(getUserResource("9999999999", "none")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001030} (E0001030)`)
    );

    await expect(
      getUserResource("9999999999", "recording", "aaaaaaaaaa")
    ).rejects.toThrow(new BadRequestError(`${ERROR_CODE.E0001220} (E0001220)`));

    await expect(
      getUserResource("9999999999", "recording", "9999999999-t-99999999")
    ).rejects.toThrow(new BadRequestError(`${ERROR_CODE.E0001220} (E0001220)`));

    await expect(
      getUserResource("9999999999", "tts", "aaaaaaaaaa")
    ).rejects.toThrow(new BadRequestError(`${ERROR_CODE.E0001230} (E0001230)`));

    await expect(
      getUserResource("9999999999", "tts", "9999999999-r-99999999")
    ).rejects.toThrow(new BadRequestError(`${ERROR_CODE.E0001230} (E0001230)`));
  });
});

// ユーザー音声作成
describe("録音音声新規登録", () => {
  test("[success] 録音音声新規登録", async () => {
    const file = fs.readFileSync("./__tests__/data/050000000-r-00000003.mp3");
    const body = {
      recordedFile: file,
      title: "録音テスト04",
      description: "録音テスト04",
    };

    await expect(
      createRecordingResource(data.unisCustomerCd, body)
    ).resolves.toEqual({
      id: expect.stringMatching(`^${data.unisCustomerCd}-r-[0-9a-z]{8}$`),
      category: "recording",
      title: body.title,
      description: body.description,
      startDate: expect.anything(),
      timestamp: expect.anything(),
    });
  });

  test("[error] 録音音声新規登録　パラメータチェック", async () => {
    const file = fs.readFileSync("./__tests__/data/050000000-r-00000003.mp3");

    await expect(createRecordingResource()).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001001} (E0001001)`)
    );

    await expect(createRecordingResource("aaaaaaaaaa")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(createRecordingResource("1111")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(createRecordingResource("11111111111")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(
      createRecordingResource("9999999999", {
        title: "test",
        description: "test",
      })
    ).rejects.toThrow(new BadRequestError(`${ERROR_CODE.E0001001} (E0001001)`));

    await expect(
      createRecordingResource("9999999999", {
        recordedFile: file,
        description: "test",
      })
    ).rejects.toThrow(new BadRequestError(`${ERROR_CODE.E0001001} (E0001001)`));

    // FIXME: webappからの録音音声が下記スキームで通らないので、一旦コメント
    // "recordedFile": {
    //   "type": "object",
    //   "contentEncoding": "binary",
    //   "contentMediaType": "audio/mp3",
    //   "errorMessage": "E0001150"
    // },
    // await expect(
    //   createRecordingResource("9999999999", {
    //     recordedFile: "test",
    //     title: "test",
    //     description: "test",
    //   })
    // ).rejects.toThrow(new BadRequestError(`${ERROR_CODE.E0001150} (E0001150)`));

    await expect(
      createRecordingResource("9999999999", {
        recordedFile: file,
        title: "🍎リンゴ",
        description: "🍎リンゴ",
      })
    ).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001051} (E0001051)`,
          `${ERROR_CODE.E0001061} (E0001061)`,
        ].join("\n")
      )
    );

    await expect(
      createRecordingResource("9999999999", {
        recordedFile: file,
        title: "あ".repeat(201),
        description: "あ".repeat(201),
      })
    ).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001052} (E0001052)`,
          `${ERROR_CODE.E0001062} (E0001062)`,
        ].join("\n")
      )
    );
  });
});

// 録音音声データ更新
describe("録音音声データ更新", () => {
  test("[success] 録音音声データ更新", async () => {
    const body = {
      title: "test",
      description: "test",
    };
    await expect(
      updateUserResource(
        data.unisCustomerCd,
        "recording",
        data.recording[0].id,
        body
      )
    ).resolves.toEqual({
      ...data.recording[0],
      ...body,
      timestamp: expect.anything(),
    });
  });

  test("[error] 録音音声データ更新　データ存在しない", async () => {
    await expect(
      updateUserResource(
        data.unisCustomerCd,
        "recording",
        "999999999-r-99999999",
        {
          title: "test",
        }
      )
    ).rejects.toThrow(new NotFoundError(ERROR_CODE.E0000404));
  });

  test("[error] 録音音声データ更新　パラメータチェック", async () => {
    await expect(updateUserResource()).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001001} (E0001001)`)
    );

    await expect(updateUserResource("aaaaaaaaaa")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(updateUserResource("1111")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(updateUserResource("11111111111")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(updateUserResource("9999999999")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001001} (E0001001)`)
    );

    await expect(updateUserResource("9999999999", "none")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001030} (E0001030)`,
        ].join("\n")
      )
    );

    await expect(
      updateUserResource("9999999999", "recording", "aaaaaaaaaa")
    ).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001220} (E0001220)`,
        ].join("\n")
      )
    );

    await expect(
      updateUserResource("9999999999", "recording", "9999999999-r")
    ).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001220} (E0001220)`,
        ].join("\n")
      )
    );

    await expect(
      updateUserResource("9999999999", "recording", "9999999999-r-99999999", {
        title: "🍎リンゴ",
        description: "🍎リンゴ",
      })
    ).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001051} (E0001051)`,
          `${ERROR_CODE.E0001061} (E0001061)`,
        ].join("\n")
      )
    );

    await expect(
      updateUserResource("9999999999", "recording", "9999999999-r-99999999", {
        title: "あ".repeat(201),
        description: "あ".repeat(201),
      })
    ).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001052} (E0001052)`,
          `${ERROR_CODE.E0001062} (E0001062)`,
        ].join("\n")
      )
    );
  });
});

// 録音音声データ削除
describe("録音音声データ削除", () => {
  test("[success] 録音音声データ削除", async () => {
    await expect(
      deleteUserResource(data.unisCustomerCd, "recording", data.recording[0].id)
    ).resolves.toEqual([
      data.recording[1],
      data.recording[2],
      {
        id: expect.stringMatching(`^${data.unisCustomerCd}-r-[0-9a-z]{8}$`),
        category: "recording",
        title: "録音テスト04",
        description: "録音テスト04",
        startDate: expect.anything(),
        timestamp: expect.anything(),
      },
    ]);
  });

  test("[error] 録音音声データ削除　CMで利用されている", async () => {
    await expect(
      deleteUserResource(data.unisCustomerCd, "recording", data.recording[1].id)
    ).rejects.toThrow(new BadRequestError(ERROR_CODE.E0300010));
  });

  test("[error] 録音音声データ削除　データ存在しない", async () => {
    await expect(
      deleteUserResource(
        data.unisCustomerCd,
        "recording",
        "999999999-r-99999999"
      )
    ).rejects.toThrow(new NotFoundError(ERROR_CODE.E0000404));
  });

  test("[error] 録音音声データ削除　パラメータチェック", async () => {
    await expect(deleteUserResource()).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001001} (E0001001)`)
    );

    await expect(deleteUserResource("aaaaaaaaaa")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(deleteUserResource("1111")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(deleteUserResource("11111111111")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(deleteUserResource("9999999999")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001001} (E0001001)`)
    );

    await expect(deleteUserResource("9999999999", "none")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001030} (E0001030)`)
    );

    await expect(
      deleteUserResource("9999999999", "recording", "aaaaaaaaaa")
    ).rejects.toThrow(new BadRequestError(`${ERROR_CODE.E0001220} (E0001220)`));

    await expect(
      deleteUserResource("9999999999", "recording", "9999999999-r")
    ).rejects.toThrow(new BadRequestError(`${ERROR_CODE.E0001220} (E0001220)`));
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
    // FIXME: TTS APIへリクエストしてしまうので、mockを利用したいが、どうも上手くできないので後回し
    // await expect(
    //   generateTtsResource(data.unisCustomerCd, body)
    // ).resolves.toEqual({
    //   id: "サンプル01",
    //   category: "template",
    //   details: [
    //     {
    //       url: expect.anything(),
    //       lang: "ja",
    //     },
    //     {
    //       url: expect.anything(),
    //       lang: "en",
    //     },
    //     {
    //       url: expect.anything(),
    //       lang: "zh",
    //     },
    //   ],
    // });
  });

  test("[error] TTS音声新規生成　パラメータチェック", async () => {
    await expect(generateTtsResource()).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001001} (E0001001)`)
    );

    await expect(generateTtsResource("aaaaaaaaaa")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(generateTtsResource("1111")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(generateTtsResource("11111111111")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(generateTtsResource("9999999999")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001001} (E0001001)`)
    );

    await expect(
      generateTtsResource("9999999999", {
        id: "id",
        category: "none",
      })
    ).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001030} (E0001030)`,
        ].join("\n")
      )
    );

    await expect(
      generateTtsResource("9999999999", {
        id: "id",
        category: "template",
      })
    ).rejects.toThrow(new BadRequestError(`${ERROR_CODE.E0001001} (E0001001)`));

    await expect(
      generateTtsResource("9999999999", {
        id: "id",
        category: "template",
        details: [
          {
            text: "test",
            speaker: "9",
            lang: "jp",
            id: "id",
            category: "none",
          },
        ],
      })
    ).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001030} (E0001030)`,
          `${ERROR_CODE.E0001270} (E0001270)`,
          `${ERROR_CODE.E0001280} (E0001280)`,
        ].join("\n")
      )
    );

    await expect(
      generateTtsResource("9999999999", {
        id: "id",
        category: "template",
        details: [
          {
            text: "🍎リンゴ",
            speaker: "0",
            lang: "ja",
          },
        ],
      })
    ).rejects.toThrow(new BadRequestError(`${ERROR_CODE.E0001261} (E0001261)`));

    await expect(
      generateTtsResource("9999999999", {
        id: "id",
        category: "template",
        details: [
          {
            text: "あ".repeat(501),
            speaker: "0",
            lang: "ja",
          },
        ],
      })
    ).rejects.toThrow(new BadRequestError(`${ERROR_CODE.E0001262} (E0001262)`));
  });
});

// TTS音声新規登録
describe("TTS音声新規登録", () => {
  test("[success] TTS音声新規登録", async () => {
    const body = {
      id: "サンプル01",
      category: "template",
      details: [
        {
          title: "TTSテスト",
          description: "TTSテスト",
          manuscript: "TTSテスト",
          lang: "ja",
        },
        {
          title: "TTSテスト",
          description: "TTテスト",
          manuscript: "TTSテスト",
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
    await expect(createTtsResource(data.unisCustomerCd, body)).resolves.toEqual(
      [
        {
          id: expect.stringMatching(`^${data.unisCustomerCd}-t-[0-9a-z]{8}$`),
          category: "tts",
          title: `${body.details[0].title}`,
          description: body.details[0].description,
          manuscript: body.details[0].manuscript,
          startDate: expect.anything(),
          timestamp: expect.anything(),
        },
        {
          id: expect.stringMatching(`^${data.unisCustomerCd}-t-[0-9a-z]{8}$`),
          category: "tts",
          title: `${body.details[1].title} (英語)`,
          description: body.details[1].description,
          manuscript: body.details[1].manuscript,
          startDate: expect.anything(),
          timestamp: expect.anything(),
        },
        {
          id: body.details[2].id,
          category: body.details[2].category,
        },
      ]
    );
  });

  test("[error] TTS音声新規登録　パラメータチェック", async () => {
    await expect(createTtsResource()).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001001} (E0001001)`)
    );

    await expect(createTtsResource("aaaaaaaaaa")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(createTtsResource("1111")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(createTtsResource("11111111111")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(createTtsResource("9999999999")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001001} (E0001001)`)
    );

    await expect(
      createTtsResource("9999999999", {
        id: "id",
        category: "none",
      })
    ).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001030} (E0001030)`,
        ].join("\n")
      )
    );

    await expect(
      createTtsResource("9999999999", {
        id: "id",
        category: "template",
      })
    ).rejects.toThrow(new BadRequestError(`${ERROR_CODE.E0001001} (E0001001)`));

    await expect(
      createTtsResource("9999999999", {
        id: "id",
        category: "template",
        details: [
          {
            title: "test",
            description: "test",
            lang: "jp",
            id: "id",
            category: "none",
          },
        ],
      })
    ).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001030} (E0001030)`,
          `${ERROR_CODE.E0001280} (E0001280)`,
        ].join("\n")
      )
    );

    await expect(
      createTtsResource("9999999999", {
        id: "id",
        category: "template",
        details: [
          {
            title: "🍎リンゴ",
            description: "🍎リンゴ",
            manuscript: "🍎リンゴ",
            lang: "ja",
            id: "id",
            category: "tts",
          },
        ],
      })
    ).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001051} (E0001051)`,
          `${ERROR_CODE.E0001061} (E0001061)`,
          `${ERROR_CODE.E0001291} (E0001291)`,
        ].join("\n")
      )
    );

    await expect(
      createTtsResource("9999999999", {
        id: "id",
        category: "template",
        details: [
          {
            title: "あ".repeat(201),
            description: "あ".repeat(201),
            manuscript: "あ".repeat(2001),
            lang: "ja",
            id: "id",
            category: "tts",
          },
        ],
      })
    ).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001052} (E0001052)`,
          `${ERROR_CODE.E0001062} (E0001062)`,
          `${ERROR_CODE.E0001292} (E0001292)`,
        ].join("\n")
      )
    );
  });
});
