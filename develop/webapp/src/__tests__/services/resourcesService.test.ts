import { UMesseError } from "@/models/UMesseError";
import axios from "@/repository/api/axiosInstance";
import { useResourcesService } from "@/services/resourcesService";
import { ERROR_CODE, ERROR_PATTERN } from "@/utils/Constants";
import * as umesseapi from "umesseapi";

describe("fetchNarrationのテスト", () => {
  test(`正常終了の場合、NarrationItem[]が返ること`, async () => {
    const responseJson = [
      {
        id: "サンプル01",
        category: "narration",
        title: "サンプル01",
        description: "ナレーション・サンプル01",
        manuscript: "あいうえお",
        seconds: 60,
        industry: [{ industryCd: "01", industryName: "業種01" }],
        scene: [{ sceneCd: "001", sceneName: "シーン001" }],
        timestamp: "2019-09-01T09:00:00+09:00",
      },
      {
        id: "サンプル02",
        category: "narration",
        title: "サンプル02",
        description: "ナレーション・サンプル02",
        manuscript: "あいうえお",
        seconds: 60,
        industry: [{ industryCd: "01", industryName: "業種01" }],
        scene: [{ sceneCd: "001", sceneName: "シーン001" }],
        timestamp: "2019-09-01T09:00:00+09:00",
      },
    ];
    jest.spyOn(axios, "request").mockResolvedValue({ data: responseJson });
    const resourcesRepository = new umesseapi.ResourcesApi(
      undefined,
      "",
      axios
    );
    const recordingRepository = new umesseapi.RecordingApi(
      undefined,
      "",
      axios
    );
    const ttsRepository = new umesseapi.TtsApi(undefined, "", axios);
    const resourcesService = useResourcesService(
      resourcesRepository,
      recordingRepository,
      ttsRepository
    );

    const response = await resourcesService.fetchNarration(
      "authToken",
      "01",
      "901",
      1
    );

    expect(response.length).toBe(2);
    expect(response[0].id).toBe("サンプル01");
    expect(response[1].id).toBe("サンプル02");
  });

  test(`正常終了(録音)の場合、NarrationItem[]が返ること`, async () => {
    const responseJson = [
      {
        id: "サンプル録音01",
        category: "narration",
        title: "サンプル01",
        description: "ナレーション・サンプル01",
        manuscript: "あいうえお",
        seconds: 60,
        industry: [{ industryCd: "02", industryName: "業種02" }],
        scene: [{ sceneCd: "002", sceneName: "シーン002" }],
        timestamp: "2019-09-01T09:00:00+09:00",
      },
      {
        id: "サンプル録音02",
        category: "narration",
        title: "サンプル02",
        description: "ナレーション・サンプル02",
        manuscript: "あいうえお",
        seconds: 60,
        industry: [{ industryCd: "02", industryName: "業種02" }],
        scene: [{ sceneCd: "002", sceneName: "シーン002" }],
        timestamp: "2019-09-01T09:00:00+09:00",
      },
    ];
    jest.spyOn(axios, "request").mockResolvedValue({ data: responseJson });
    const resourcesRepository = new umesseapi.ResourcesApi(
      undefined,
      "",
      axios
    );
    const recordingRepository = new umesseapi.RecordingApi(
      undefined,
      "",
      axios
    );
    const ttsRepository = new umesseapi.TtsApi(undefined, "", axios);
    const resourcesService = useResourcesService(
      resourcesRepository,
      recordingRepository,
      ttsRepository
    );

    const response = await resourcesService.fetchNarration(
      "authToken",
      "02",
      "901",
      1
    );

    expect(response.length).toBe(2);
    expect(response[0].id).toBe("サンプル録音01");
    expect(response[1].id).toBe("サンプル録音02");
  });

  test(`正常終了(音声合成)の場合、NarrationItem[]が返ること`, async () => {
    const responseJson = [
      {
        id: "サンプル音声合成01",
        category: "narration",
        title: "サンプル01",
        description: "ナレーション・サンプル01",
        manuscript: "あいうえお",
        seconds: 60,
        industry: [{ industryCd: "02", industryName: "業種02" }],
        scene: [{ sceneCd: "002", sceneName: "シーン002" }],
        timestamp: "2019-09-01T09:00:00+09:00",
      },
      {
        id: "サンプル音声合成02",
        category: "narration",
        title: "サンプル02",
        description: "ナレーション・サンプル02",
        manuscript: "あいうえお",
        seconds: 60,
        industry: [{ industryCd: "02", industryName: "業種02" }],
        scene: [{ sceneCd: "002", sceneName: "シーン002" }],
        timestamp: "2019-09-01T09:00:00+09:00",
      },
    ];
    jest.spyOn(axios, "request").mockResolvedValue({ data: responseJson });
    const resourcesRepository = new umesseapi.ResourcesApi(
      undefined,
      "",
      axios
    );
    const recordingRepository = new umesseapi.RecordingApi(
      undefined,
      "",
      axios
    );
    const ttsRepository = new umesseapi.TtsApi(undefined, "", axios);
    const resourcesService = useResourcesService(
      resourcesRepository,
      recordingRepository,
      ttsRepository
    );

    const response = await resourcesService.fetchNarration(
      "authToken",
      "02",
      "902",
      1
    );

    expect(response.length).toBe(2);
    expect(response[0].id).toBe("サンプル音声合成01");
    expect(response[1].id).toBe("サンプル音声合成02");
  });

  test(`想定外の値が返却された場合、UMesseErrorがthrowされること`, async () => {
    const responseJson = "aaaaaaaaaaaaaa";
    const expoectedError = new UMesseError(
      ERROR_CODE.A0001,
      ERROR_PATTERN.A0001,
      ""
    );

    jest.spyOn(axios, "request").mockRejectedValue({ data: responseJson });
    const resourcesRepository = new umesseapi.ResourcesApi(
      undefined,
      "",
      axios
    );
    const recordingRepository = new umesseapi.RecordingApi(
      undefined,
      "",
      axios
    );
    const ttsRepository = new umesseapi.TtsApi(undefined, "", axios);
    const resourcesService = useResourcesService(
      resourcesRepository,
      recordingRepository,
      ttsRepository
    );

    await expect(
      resourcesService.fetchNarration("authToken", "01", "901", 1)
    ).rejects.toThrowError(expoectedError);
  });

  test(`想定外の値が返却された(録音)場合、UMesseErrorがthrowされること`, async () => {
    const responseJson = "aaaaaaaaaaaaaa";
    const expoectedError = new UMesseError(
      ERROR_CODE.A0001,
      ERROR_PATTERN.A0001,
      ""
    );

    jest.spyOn(axios, "request").mockRejectedValue({ data: responseJson });
    const resourcesRepository = new umesseapi.ResourcesApi(
      undefined,
      "",
      axios
    );
    const recordingRepository = new umesseapi.RecordingApi(
      undefined,
      "",
      axios
    );
    const ttsRepository = new umesseapi.TtsApi(undefined, "", axios);
    const resourcesService = useResourcesService(
      resourcesRepository,
      recordingRepository,
      ttsRepository
    );

    await expect(
      resourcesService.fetchNarration("authToken", "02", "901", 1)
    ).rejects.toThrowError(expoectedError);
  });

  test(`想定外の値が返却された(音声合成)場合、UMesseErrorがthrowされること`, async () => {
    const responseJson = "aaaaaaaaaaaaaa";
    const expoectedError = new UMesseError(
      ERROR_CODE.A0001,
      ERROR_PATTERN.A0001,
      ""
    );

    jest.spyOn(axios, "request").mockRejectedValue({ data: responseJson });
    const resourcesRepository = new umesseapi.ResourcesApi(
      undefined,
      "",
      axios
    );
    const recordingRepository = new umesseapi.RecordingApi(
      undefined,
      "",
      axios
    );
    const ttsRepository = new umesseapi.TtsApi(undefined, "", axios);
    const resourcesService = useResourcesService(
      resourcesRepository,
      recordingRepository,
      ttsRepository
    );

    await expect(
      resourcesService.fetchNarration("authToken", "02", "902", 1)
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
    const resourcesRepository = new umesseapi.ResourcesApi(
      undefined,
      "",
      axios
    );
    const recordingRepository = new umesseapi.RecordingApi(
      undefined,
      "",
      axios
    );
    const ttsRepository = new umesseapi.TtsApi(undefined, "", axios);
    const resourcesService = useResourcesService(
      resourcesRepository,
      recordingRepository,
      ttsRepository
    );

    await expect(
      resourcesService.fetchNarration("authToken", "01", "901", 1)
    ).rejects.toThrowError(expoectedError);
  });

  test(`エラー(録音)の場合、UMesseErrorがthrowされること`, async () => {
    const expoectedError = new UMesseError(
      ERROR_CODE.A3999,
      ERROR_PATTERN.A3999,
      ""
    );

    jest
      .spyOn(axios, "request")
      .mockRejectedValue({ response: { status: 500 } });
    const resourcesRepository = new umesseapi.ResourcesApi(
      undefined,
      "",
      axios
    );
    const recordingRepository = new umesseapi.RecordingApi(
      undefined,
      "",
      axios
    );
    const ttsRepository = new umesseapi.TtsApi(undefined, "", axios);
    const resourcesService = useResourcesService(
      resourcesRepository,
      recordingRepository,
      ttsRepository
    );

    await expect(
      resourcesService.fetchNarration("authToken", "02", "901", 1)
    ).rejects.toThrowError(expoectedError);
  });

  test(`エラー(音声合成)の場合、UMesseErrorがthrowされること`, async () => {
    const expoectedError = new UMesseError(
      ERROR_CODE.A3999,
      ERROR_PATTERN.A3999,
      ""
    );

    jest
      .spyOn(axios, "request")
      .mockRejectedValue({ response: { status: 500 } });
    const resourcesRepository = new umesseapi.ResourcesApi(
      undefined,
      "",
      axios
    );
    const recordingRepository = new umesseapi.RecordingApi(
      undefined,
      "",
      axios
    );
    const ttsRepository = new umesseapi.TtsApi(undefined, "", axios);
    const resourcesService = useResourcesService(
      resourcesRepository,
      recordingRepository,
      ttsRepository
    );

    await expect(
      resourcesService.fetchNarration("authToken", "02", "902", 1)
    ).rejects.toThrowError(expoectedError);
  });
});

describe("fetchChimeのテスト", () => {
  test(`正常終了の場合、ChimeItem[]が返ること`, async () => {
    const responseJson = [
      {
        category: "chime",
        description: "チャイム・サンプル01",
        id: "チャイム01",
        seconds: 5,
        timestamp: "2019-09-01T09:00:00+09:00",
        title: "サンプル01",
      },
      {
        category: "chime",
        description: "チャイム・サンプル02",
        id: "チャイム02",
        seconds: 5,
        timestamp: "2019-09-01T09:00:00+09:00",
        title: "サンプル02",
      },
    ];
    jest.spyOn(axios, "request").mockResolvedValue({ data: responseJson });
    const resourcesRepository = new umesseapi.ResourcesApi(
      undefined,
      "",
      axios
    );
    const recordingRepository = new umesseapi.RecordingApi(
      undefined,
      "",
      axios
    );
    const ttsRepository = new umesseapi.TtsApi(undefined, "", axios);
    const resourcesService = useResourcesService(
      resourcesRepository,
      recordingRepository,
      ttsRepository
    );

    const response = await resourcesService.fetchChime(1);

    expect(response.length).toBe(2);
    expect(response[0].id).toBe("チャイム01");
    expect(response[1].id).toBe("チャイム02");
  });

  test(`想定外の値が返却された場合、UMesseErrorがthrowされること`, async () => {
    const responseJson = "aaaaaaaaaaaaaa";
    const expoectedError = new UMesseError(
      ERROR_CODE.A0001,
      ERROR_PATTERN.A0001,
      ""
    );

    jest.spyOn(axios, "request").mockRejectedValue({ data: responseJson });
    const resourcesRepository = new umesseapi.ResourcesApi(
      undefined,
      "",
      axios
    );
    const recordingRepository = new umesseapi.RecordingApi(
      undefined,
      "",
      axios
    );
    const ttsRepository = new umesseapi.TtsApi(undefined, "", axios);
    const resourcesService = useResourcesService(
      resourcesRepository,
      recordingRepository,
      ttsRepository
    );

    await expect(resourcesService.fetchChime(1)).rejects.toThrowError(
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
    const resourcesRepository = new umesseapi.ResourcesApi(
      undefined,
      "",
      axios
    );
    const recordingRepository = new umesseapi.RecordingApi(
      undefined,
      "",
      axios
    );
    const ttsRepository = new umesseapi.TtsApi(undefined, "", axios);
    const resourcesService = useResourcesService(
      resourcesRepository,
      recordingRepository,
      ttsRepository
    );

    await expect(resourcesService.fetchChime(1)).rejects.toThrowError(
      expoectedError
    );
  });
});

describe("fetchBgmのテスト", () => {
  test(`正常終了の場合、BgmItem[]が返ること`, async () => {
    const responseJson = [
      {
        category: "bgm",
        description: "BGM・サンプル01",
        id: "BGM01",
        seconds: 5,
        timestamp: "2019-09-01T09:00:00+09:00",
        title: "BGM01",
        industry: { industryCd: "01", industryName: "業種01" },
      },
      {
        category: "bgm",
        description: "BGM・サンプル02",
        id: "BGM02",
        seconds: 5,
        timestamp: "2019-09-01T09:00:00+09:00",
        title: "BGM02",
      },
    ];
    jest.spyOn(axios, "request").mockResolvedValue({ data: responseJson });
    const resourcesRepository = new umesseapi.ResourcesApi(
      undefined,
      "",
      axios
    );
    const recordingRepository = new umesseapi.RecordingApi(
      undefined,
      "",
      axios
    );
    const ttsRepository = new umesseapi.TtsApi(undefined, "", axios);
    const resourcesService = useResourcesService(
      resourcesRepository,
      recordingRepository,
      ttsRepository
    );

    const response = await resourcesService.fetchBgm("01", 1);

    expect(response.length).toBe(2);
    expect(response[0].id).toBe("BGM01");
    expect(response[1].id).toBe("BGM02");
  });

  test(`想定外の値が返却された場合、UMesseErrorがthrowされること`, async () => {
    const responseJson = "aaaaaaaaaaaaaa";
    const expoectedError = new UMesseError(
      ERROR_CODE.A0001,
      ERROR_PATTERN.A0001,
      ""
    );

    jest.spyOn(axios, "request").mockRejectedValue({ data: responseJson });
    const resourcesRepository = new umesseapi.ResourcesApi(
      undefined,
      "",
      axios
    );
    const recordingRepository = new umesseapi.RecordingApi(
      undefined,
      "",
      axios
    );
    const ttsRepository = new umesseapi.TtsApi(undefined, "", axios);
    const resourcesService = useResourcesService(
      resourcesRepository,
      recordingRepository,
      ttsRepository
    );

    await expect(resourcesService.fetchBgm("01", 1)).rejects.toThrowError(
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
    const resourcesRepository = new umesseapi.ResourcesApi(
      undefined,
      "",
      axios
    );
    const recordingRepository = new umesseapi.RecordingApi(
      undefined,
      "",
      axios
    );
    const ttsRepository = new umesseapi.TtsApi(undefined, "", axios);
    const resourcesService = useResourcesService(
      resourcesRepository,
      recordingRepository,
      ttsRepository
    );

    await expect(resourcesService.fetchBgm("01", 1)).rejects.toThrowError(
      expoectedError
    );
  });
});

describe("fetchTemplateのテスト", () => {
  test(`正常終了の場合、TemplateItem[]が返ること`, async () => {
    const responseJson = [
      {
        category: "template",
        description: "テンプレート・サンプル04, 日本語、英語",
        details: [
          {
            lang: "ja",
            text:
              "本日は{customerName}へご来店頂きまして、誠にありがとうございます。お買い物中のお客様に…ます。お客様の、またのご来店を心よりお待ち申しあげております。本日のご来店、誠に有難うございます。",
            speaker: "0",
          },
          {
            lang: "en",
            text:
              "Thank you for visiting our store today. We would l…eeing you again. Thank you for visiting us today.",
            speaker: "0",
          },
        ],
        id: "テンプレート04",
        industry: [{ industryCd: "01", industryName: "業種01" }],
        manuscript:
          "本日は{customerName}へご来店頂きまして、誠にありがとうございます。お買い物中のお客様にご案内申しあげます。誠に勝手ではございますが、当店の営業時間は、{endTime}までとなっております。まもなく閉店時間でございます。お客様の、またのご来店を心よりお待ち申しあげております。本日のご来店、誠に有難うございます。",
        scene: [{ sceneCd: "01", sceneName: "シーン01" }],
        timestamp: "2019-09-01T09:00:00+09:00",
        title: "まもなく閉店時間",
      },
      {
        category: "template",
        description: "テンプレート・サンプル04, 日本語、英語",
        details: [
          {
            lang: "ja",
            text:
              "本日は{customerName}へご来店頂きまして、誠にありがとうございます。お買い物中のお客様に…ます。お客様の、またのご来店を心よりお待ち申しあげております。本日のご来店、誠に有難うございます。",
            speaker: "0",
          },
          {
            lang: "en",
            text:
              "Thank you for visiting our store today. We would l…eeing you again. Thank you for visiting us today.",
            speaker: "0",
          },
        ],
        id: "テンプレート05",
        industry: [{ industryCd: "01", industryName: "業種01" }],
        manuscript:
          "本日は{customerName}へご来店頂きまして、誠にありがとうございます。お買い物中のお客様にご案内申しあげます。誠に勝手ではございますが、当店の営業時間は、{endTime}までとなっております。まもなく閉店時間でございます。お客様の、またのご来店を心よりお待ち申しあげております。本日のご来店、誠に有難うございます。",
        scene: [{ sceneCd: "01", sceneName: "シーン01" }],
        timestamp: "2019-09-01T09:00:00+09:00",
        title: "まもなく閉店時間",
      },
    ];
    jest.spyOn(axios, "request").mockResolvedValue({ data: responseJson });
    const resourcesRepository = new umesseapi.ResourcesApi(
      undefined,
      "",
      axios
    );
    const recordingRepository = new umesseapi.RecordingApi(
      undefined,
      "",
      axios
    );
    const ttsRepository = new umesseapi.TtsApi(undefined, "", axios);
    const resourcesService = useResourcesService(
      resourcesRepository,
      recordingRepository,
      ttsRepository
    );

    const response = await resourcesService.fetchTemplate("01", 1);

    expect(response.length).toBe(2);
    expect(response[0].id).toBe("テンプレート04");
    expect(response[1].id).toBe("テンプレート05");
  });

  test(`想定外の値が返却された場合、UMesseErrorがthrowされること`, async () => {
    const responseJson = "aaaaaaaaaaaaaa";
    const expoectedError = new UMesseError(
      ERROR_CODE.A0001,
      ERROR_PATTERN.A0001,
      ""
    );

    jest.spyOn(axios, "request").mockRejectedValue({ data: responseJson });
    const resourcesRepository = new umesseapi.ResourcesApi(
      undefined,
      "",
      axios
    );
    const recordingRepository = new umesseapi.RecordingApi(
      undefined,
      "",
      axios
    );
    const ttsRepository = new umesseapi.TtsApi(undefined, "", axios);
    const resourcesService = useResourcesService(
      resourcesRepository,
      recordingRepository,
      ttsRepository
    );

    await expect(resourcesService.fetchTemplate("01", 1)).rejects.toThrowError(
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
    const resourcesRepository = new umesseapi.ResourcesApi(
      undefined,
      "",
      axios
    );
    const recordingRepository = new umesseapi.RecordingApi(
      undefined,
      "",
      axios
    );
    const ttsRepository = new umesseapi.TtsApi(undefined, "", axios);
    const resourcesService = useResourcesService(
      resourcesRepository,
      recordingRepository,
      ttsRepository
    );

    await expect(resourcesService.fetchTemplate("01", 1)).rejects.toThrowError(
      expoectedError
    );
  });
});

describe("fetchFreeのテスト", () => {
  test(`正常終了の場合、FreeItem[]が返ること`, async () => {
    const responseJson = [
      {
        category: "bgm",
        description: "BGM・サンプル01",
        id: "サンプル01",
        industry: [{ industryCd: "01", industryName: "業種01" }],
        scene: [{ sceneCd: "01", sceneName: "シーン01" }],
        seconds: 60,
        timestamp: "2019-09-01T09:00:00+09:00",
        title: "サンプル01",
      },
      {
        category: "bgm",
        description: "BGM・サンプル02",
        id: "サンプル02",
        industry: [{ industryCd: "01", industryName: "業種01" }],
        scene: [{ sceneCd: "01", sceneName: "シーン01" }],
        seconds: 60,
        timestamp: "2019-09-01T09:00:00+09:00",
        title: "サンプル02",
      },
    ];
    jest.spyOn(axios, "request").mockResolvedValue({ data: responseJson });
    const resourcesRepository = new umesseapi.ResourcesApi(
      undefined,
      "",
      axios
    );
    const recordingRepository = new umesseapi.RecordingApi(
      undefined,
      "",
      axios
    );
    const ttsRepository = new umesseapi.TtsApi(undefined, "", axios);
    const resourcesService = useResourcesService(
      resourcesRepository,
      recordingRepository,
      ttsRepository
    );

    const response = await resourcesService.fetchFree("01", 1);

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
    const resourcesRepository = new umesseapi.ResourcesApi(
      undefined,
      "",
      axios
    );
    const recordingRepository = new umesseapi.RecordingApi(
      undefined,
      "",
      axios
    );
    const ttsRepository = new umesseapi.TtsApi(undefined, "", axios);
    const resourcesService = useResourcesService(
      resourcesRepository,
      recordingRepository,
      ttsRepository
    );

    await expect(resourcesService.fetchFree("01", 1)).rejects.toThrowError(
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
    const resourcesRepository = new umesseapi.ResourcesApi(
      undefined,
      "",
      axios
    );
    const recordingRepository = new umesseapi.RecordingApi(
      undefined,
      "",
      axios
    );
    const ttsRepository = new umesseapi.TtsApi(undefined, "", axios);
    const resourcesService = useResourcesService(
      resourcesRepository,
      recordingRepository,
      ttsRepository
    );

    await expect(resourcesService.fetchFree("01", 1)).rejects.toThrowError(
      expoectedError
    );
  });
});
