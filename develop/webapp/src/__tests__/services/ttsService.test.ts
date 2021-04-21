import { Convert } from "@/models/generateUserTtsRequestItem";
import { UMesseError } from "@/models/umesseError";
import axios from "@/repository/api/axiosInstance";
import { TtsCache } from "@/repository/cache/ttsCache";
import { useTtsService } from "@/services/ttsService";
import { ERROR_CODE, ERROR_PATTERN } from "@/utils/constants";
import * as umesseapi from "umesseapi";

const ttsRepository = new umesseapi.TtsApi(undefined, "", axios);
const ttsCache = new TtsCache();
const ttsService = useTtsService(ttsRepository, ttsCache);

describe("fetchのテスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test(`正常終了の場合、TtsItem[]が返ること`, async () => {
    const responseJson = [
      {
        id: "サンプル01",
        category: "tts",
        title: "サンプル01",
        description: "tts・サンプル01",
        startDate: "2019-09-01T00:00:00.000Z",
        timestamp: "2019-09-01T09:00:00+09:00",
      },
      {
        id: "サンプル02",
        category: "tts",
        title: "サンプル02",
        description: "tts・サンプル02",
        startDate: "2019-09-01T00:00:00.000Z",
        timestamp: "2019-09-01T09:00:00+09:00",
      },
    ];
    jest.spyOn(axios, "request").mockResolvedValue({ data: responseJson });

    const response = await ttsService.fetch("token");

    expect(response.length).toBe(2);
    expect(response[0].id).toBe("サンプル01");
    expect(response[1].id).toBe("サンプル02");
  });

  test(`想定外の値が返却された場合、UMesseErrorがthrowされること`, async () => {
    const responseJson = "aaaaaaaaaaaaaa";
    const expoectedError = new UMesseError(
      ERROR_CODE.A0001,
      ERROR_PATTERN.A0001,
      ""
    );

    jest.spyOn(axios, "request").mockRejectedValue({ data: responseJson });

    await expect(ttsService.fetch("token")).rejects.toThrowError(
      expoectedError
    );
  });

  test(`エラーの場合、UMesseErrorがthrowされること`, async () => {
    const expoectedError = new UMesseError(
      ERROR_CODE.A3999,
      ERROR_PATTERN.A3999,
      ""
    );

    jest
      .spyOn(axios, "request")
      .mockRejectedValue({ response: { status: 500 } });

    await expect(ttsService.fetch("token")).rejects.toThrowError(
      expoectedError
    );
  });
});

describe("generateのテスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    ttsCache.removeAll();
  });

  test(`正常終了の場合、GenerateTtsItemが返ること`, async () => {
    const responseJson = {
      id: "サンプル01",
      category: "tts",
      details: [
        {
          url: "https://example.com",
          lang: "ja",
        },
        {
          url: "https://example.com",
          lang: "en",
        },
      ],
    };
    jest.spyOn(axios, "request").mockResolvedValue({ data: responseJson });

    const response = await ttsService.generate("token", {
      id: "サンプル01",
      category: "tts",
      details: [
        {
          text:
            "本日は{customerName}へご来店頂きまして、誠にありがとうございます。",
          speaker: "0",
          lang: "ja",
        },
        {
          text:
            "本日は{customerName}へご来店頂きまして、誠にありがとうございます。",
          speaker: "0",
          lang: "en",
        },
      ],
    });

    expect(response.id).toBe("サンプル01");
    expect(response.details.length).toBe(2);
  });

  test(`キャッシュがある場合、キャッシュの中身が返ること`, async () => {
    const responseJson = {
      id: "サンプル01",
      category: "tts",
      details: [
        {
          url: "https://example.com",
          lang: "ja",
        },
        {
          url: "https://example.com",
          lang: "en",
        },
      ],
    };

    const requestModel = {
      id: "サンプル01",
      category: "tts",
      details: [
        {
          text:
            "本日は{customerName}へご来店頂きまして、誠にありがとうございます。",
          speaker: "0",
          lang: "ja",
        },
        {
          text:
            "本日は{customerName}へご来店頂きまして、誠にありがとうございます。",
          speaker: "0",
          lang: "en",
        },
      ],
    };

    const cacheKey = Convert.generateUserTtsRequestItemToJson(requestModel);
    ttsCache.set(cacheKey, responseJson);

    const response = await ttsService.generate("token", requestModel);

    expect(response.id).toBe("サンプル01");
    expect(response.details.length).toBe(2);
  });

  test(`想定外の値が返却された場合、UMesseErrorがthrowされること`, async () => {
    const responseJson = "aaaaaaaaaaaaaa";
    const expoectedError = new UMesseError(
      ERROR_CODE.A0001,
      ERROR_PATTERN.A0001,
      ""
    );

    jest.spyOn(axios, "request").mockRejectedValue({ data: responseJson });

    await expect(
      ttsService.generate("token", {
        id: "サンプル01",
        category: "tts",
        details: [
          {
            text:
              "本日は{customerName}へご来店頂きまして、誠にありがとうございます。",
            speaker: "0",
            lang: "ja",
          },
          {
            text:
              "本日は{customerName}へご来店頂きまして、誠にありがとうございます。",
            speaker: "0",
            lang: "en",
          },
        ],
      })
    ).rejects.toThrowError(expoectedError);
  });

  test(`エラーの場合、UMesseErrorがthrowされること`, async () => {
    const expoectedError = new UMesseError(
      ERROR_CODE.A3999,
      ERROR_PATTERN.A3999,
      ""
    );

    jest
      .spyOn(axios, "request")
      .mockRejectedValue({ response: { status: 500 } });

    await expect(
      ttsService.generate("token", {
        id: "サンプル01",
        category: "tts",
        details: [
          {
            text:
              "本日は{customerName}へご来店頂きまして、誠にありがとうございます。",
            speaker: "0",
            lang: "ja",
          },
          {
            text:
              "本日は{customerName}へご来店頂きまして、誠にありがとうございます。",
            speaker: "0",
            lang: "en",
          },
        ],
      })
    ).rejects.toThrowError(expoectedError);
  });
});

describe("createのテスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test(`正常終了の場合、TtsItem[]が返ること`, async () => {
    const responseJson = [
      {
        id: "サンプル01",
        category: "tts",
        title: "サンプル01",
        description: "tts・サンプル01",
        startDate: "2019-09-01T00:00:00.000Z",
        timestamp: "2019-09-01T09:00:00+09:00",
      },
      {
        id: "サンプル02",
        category: "tts",
        title: "サンプル02",
        description: "tts・サンプル02",
        startDate: "2019-09-01T00:00:00.000Z",
        timestamp: "2019-09-01T09:00:00+09:00",
      },
    ];
    jest.spyOn(axios, "request").mockResolvedValue({ data: responseJson });

    const response = await ttsService.create("token", {
      id: "サンプル01",
      category: "tts",
      details: [
        {
          title: "サンプル01",
          description: "tts・サンプル01",
          lang: "ja",
        },
        {
          title: "サンプル02",
          description: "tts・サンプル02",
          lang: "en",
        },
      ],
    });

    expect(response.length).toBe(2);
    expect(response[0].id).toBe("サンプル01");
    expect(response[1].id).toBe("サンプル02");
  });

  test(`想定外の値が返却された場合、UMesseErrorがthrowされること`, async () => {
    const responseJson = "aaaaaaaaaaaaaa";
    const expoectedError = new UMesseError(
      ERROR_CODE.A0001,
      ERROR_PATTERN.A0001,
      ""
    );

    jest.spyOn(axios, "request").mockRejectedValue({ data: responseJson });

    await expect(
      ttsService.create("token", {
        id: "サンプル01",
        category: "tts",
        details: [
          {
            title: "サンプル01",
            description: "tts・サンプル01",
            lang: "ja",
          },
          {
            title: "サンプル02",
            description: "tts・サンプル02",
            lang: "en",
          },
        ],
      })
    ).rejects.toThrowError(expoectedError);
  });

  test(`エラーの場合、UMesseErrorがthrowされること`, async () => {
    const expoectedError = new UMesseError(
      ERROR_CODE.A3999,
      ERROR_PATTERN.A3999,
      ""
    );

    jest
      .spyOn(axios, "request")
      .mockRejectedValue({ response: { status: 500 } });

    await expect(
      ttsService.create("token", {
        id: "サンプル01",
        category: "tts",
        details: [
          {
            title: "サンプル01",
            description: "tts・サンプル01",
            lang: "ja",
          },
          {
            title: "サンプル02",
            description: "tts・サンプル02",
            lang: "en",
          },
        ],
      })
    ).rejects.toThrowError(expoectedError);
  });
});

describe("updateのテスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test(`正常終了の場合、TtsItemが返ること`, async () => {
    const responseJson = {
      id: "サンプル01",
      category: "tts",
      title: "サンプル01",
      description: "tts・サンプル01",
      startDate: "2019-09-01T00:00:00.000Z",
      timestamp: "2019-09-01T09:00:00+09:00",
    };
    jest.spyOn(axios, "request").mockResolvedValue({ data: responseJson });

    const response = await ttsService.update(
      "token",
      "001",
      "サンプル",
      "説明"
    );

    expect(response.id).toBe("サンプル01");
  });

  test(`想定外の値が返却された場合、UMesseErrorがthrowされること`, async () => {
    const responseJson = "aaaaaaaaaaaaaa";
    const expoectedError = new UMesseError(
      ERROR_CODE.A0001,
      ERROR_PATTERN.A0001,
      ""
    );

    jest.spyOn(axios, "request").mockRejectedValue({ data: responseJson });

    await expect(
      ttsService.update("token", "001", "サンプル", "説明")
    ).rejects.toThrowError(expoectedError);
  });

  test(`エラーの場合、UMesseErrorがthrowされること`, async () => {
    const expoectedError = new UMesseError(
      ERROR_CODE.A3999,
      ERROR_PATTERN.A3999,
      ""
    );

    jest
      .spyOn(axios, "request")
      .mockRejectedValue({ response: { status: 500 } });

    await expect(
      ttsService.update("token", "001", "サンプル", "説明")
    ).rejects.toThrowError(expoectedError);
  });
});

describe("removeのテスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test(`正常終了の場合、TtsItemが返ること`, async () => {
    const responseJson = {
      id: "サンプル01",
      category: "tts",
      title: "サンプル01",
      description: "tts・サンプル01",
      startDate: "2019-09-01T00:00:00.000Z",
      timestamp: "2019-09-01T09:00:00+09:00",
    };
    jest.spyOn(axios, "request").mockResolvedValue({ data: responseJson });

    const response = await ttsService.remove("token", "001");

    expect(response.id).toBe("サンプル01");
  });

  test(`想定外の値が返却された場合、UMesseErrorがthrowされること`, async () => {
    const responseJson = "aaaaaaaaaaaaaa";
    const expoectedError = new UMesseError(
      ERROR_CODE.A0001,
      ERROR_PATTERN.A0001,
      ""
    );

    jest.spyOn(axios, "request").mockRejectedValue({ data: responseJson });

    await expect(ttsService.remove("token", "001")).rejects.toThrowError(
      expoectedError
    );
  });

  test(`エラーの場合、UMesseErrorがthrowされること`, async () => {
    const expoectedError = new UMesseError(
      ERROR_CODE.A3999,
      ERROR_PATTERN.A3999,
      ""
    );

    jest
      .spyOn(axios, "request")
      .mockRejectedValue({ response: { status: 500 } });

    await expect(ttsService.remove("token", "001")).rejects.toThrowError(
      expoectedError
    );
  });
});
