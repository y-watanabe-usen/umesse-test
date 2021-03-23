import { UMesseError } from "@/models/UMesseError";
import axios from "@/repository/api/axiosInstance";
import { useCmService } from "@/services/cmService";
import { ERROR_CODE, ERROR_PATTERN } from "@/utils/Constants";
import * as umesseapi from "umesseapi";

describe("fetchのテスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test(`正常終了の場合、CmItem[]が返ること`, async () => {
    const responseJson = [
      {
        endDate: "9999-12-31T14:59:59.000Z",
        productionType: "02",
        description: "説明",
        title: "cmテスト",
        scene: {
          sceneCd: "001",
          sceneName: "チャイム",
        },
        seconds: 74.109388,
        materials: {
          narrations: [
            {
              volume: 100,
              seconds: 0,
              description: "ナレーション・サンプル01",
              id: "サンプル01",
              title: "サンプル01",
              category: "narration",
              timestamp: "2019-09-01T09:00:00+09:00",
            },
          ],
        },
        uploadSystem: "01",
        id: "123456789-c-v2qvc913",
        category: "cm",
        startDate: "2019-09-01T00:00:00.000Z",
        status: "03",
        timestamp: "2021-03-17T13:29:32.195+09:00",
      },
      {
        endDate: "9999-12-31T14:59:59.000Z",
        productionType: "02",
        description: "",
        title: "かか",
        scene: {
          sceneCd: "001",
          sceneName: "チャイム",
        },
        seconds: 78.106122,
        materials: {
          startChime: {
            volume: 100,
            seconds: 5,
            description: "チャイム・サンプル01",
            id: "サンプル01",
            title: "サンプル01",
            category: "chime",
            timestamp: "2019-09-01T09:00:00+09:00",
          },
          narrations: [
            {
              volume: 100,
              seconds: 0,
              description: "ナレーション・サンプル01",
              id: "サンプル01",
              title: "サンプル01",
              category: "narration",
              timestamp: "2019-09-01T09:00:00+09:00",
            },
          ],
        },
        uploadSystem: "01",
        id: "123456789-c-5ml6xdvj",
        category: "cm",
        startDate: "2019-09-01T00:00:00.000Z",
        status: "03",
        timestamp: "2021-03-17T11:04:06.570+09:00",
      },
    ];
    jest.spyOn(axios, "request").mockResolvedValue({ data: responseJson });
    const cmRepository = new umesseapi.CmApi(undefined, "", axios);
    const cmService = useCmService(cmRepository);

    const response = await cmService.fetch("token", "001");

    expect(response.length).toBe(2);
    expect(response[0].id).toBe("123456789-c-v2qvc913");
    expect(response[1].id).toBe("123456789-c-5ml6xdvj");
  });

  test(`想定外の値が返却された場合、UMesseErrorがthrowされること`, async () => {
    const responseJson = "aaaaaaaaaaaaaa";
    const expoectedError = new UMesseError(
      ERROR_CODE.A0001,
      ERROR_PATTERN.A0001,
      ""
    );

    jest.spyOn(axios, "request").mockResolvedValue({ data: responseJson });

    const cmRepository = new umesseapi.CmApi(undefined, "", axios);
    const cmService = useCmService(cmRepository);

    await expect(cmService.fetch("token", "001")).rejects.toThrowError(
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

    const cmRepository = new umesseapi.CmApi(undefined, "", axios);
    const cmService = useCmService(cmRepository);

    await expect(cmService.fetch("token", "001")).rejects.toThrowError(
      expoectedError
    );
  });
});

// 他テスト作成後追加する
describe("createのテスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test(`正常終了の場合、CreateUserCmResponseItemが返ること`, async () => {
    expect(true).toBe(true);
  });

  test(`キャッシュがある場合、キャッシュの中身が返ること`, async () => {
    expect(true).toBe(true);
  });

  test(`想定外の値が返却された場合、UMesseErrorがthrowされること`, async () => {
    expect(true).toBe(true);
  });

  test(`エラーの場合、UMesseErrorがthrowされること`, async () => {
    expect(true).toBe(true);
  });
});

describe("updateのテスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test(`正常終了の場合、CmItemが返ること`, async () => {
    const responseJson = {
      endDate: "9999-12-31T14:59:59.000Z",
      productionType: "02",
      description: "説明",
      title: "cmテスト",
      scene: {
        sceneCd: "001",
        sceneName: "チャイム",
      },
      seconds: 74.109388,
      materials: {
        narrations: [
          {
            volume: 100,
            seconds: 0,
            description: "ナレーション・サンプル01",
            id: "サンプル01",
            title: "サンプル01",
            category: "narration",
            timestamp: "2019-09-01T09:00:00+09:00",
          },
        ],
      },
      uploadSystem: "01",
      id: "123456789-c-v2qvc913",
      category: "cm",
      startDate: "2019-09-01T00:00:00.000Z",
      status: "03",
      timestamp: "2021-03-17T13:29:32.195+09:00",
    };
    jest.spyOn(axios, "request").mockResolvedValue({ data: responseJson });
    const cmRepository = new umesseapi.CmApi(undefined, "", axios);
    const cmService = useCmService(cmRepository);

    const response = await cmService.update(
      "token",
      "001",
      "タイトル",
      "説明",
      "001",
      "02"
    );

    expect(response.id).toBe("123456789-c-v2qvc913");
    expect(response.title).toBe("cmテスト");
  });

  test(`想定外の値が返却された場合、UMesseErrorがthrowされること`, async () => {
    const responseJson = "aaaaaaaaaaaaaa";
    const expoectedError = new UMesseError(
      ERROR_CODE.A0001,
      ERROR_PATTERN.A0001,
      ""
    );

    jest.spyOn(axios, "request").mockRejectedValue({ data: responseJson });

    const cmRepository = new umesseapi.CmApi(undefined, "", axios);
    const cmService = useCmService(cmRepository);

    await expect(
      cmService.update("token", "001", "タイトル", "説明", "001", "02")
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

    const cmRepository = new umesseapi.CmApi(undefined, "", axios);
    const cmService = useCmService(cmRepository);

    await expect(
      cmService.update("token", "001", "タイトル", "説明", "001", "02")
    ).rejects.toThrowError(expoectedError);
  });
});

describe("removeのテスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test(`正常終了の場合、CmItemが返ること`, async () => {
    const responseJson = {
      endDate: "9999-12-31T14:59:59.000Z",
      productionType: "02",
      description: "説明",
      title: "cmテスト",
      scene: {
        sceneCd: "001",
        sceneName: "チャイム",
      },
      seconds: 74.109388,
      materials: {
        narrations: [
          {
            volume: 100,
            seconds: 0,
            description: "ナレーション・サンプル01",
            id: "サンプル01",
            title: "サンプル01",
            category: "narration",
            timestamp: "2019-09-01T09:00:00+09:00",
          },
        ],
      },
      uploadSystem: "01",
      id: "123456789-c-v2qvc913",
      category: "cm",
      startDate: "2019-09-01T00:00:00.000Z",
      status: "03",
      timestamp: "2021-03-17T13:29:32.195+09:00",
    };
    jest.spyOn(axios, "request").mockResolvedValue({ data: responseJson });
    const cmRepository = new umesseapi.CmApi(undefined, "", axios);
    const cmService = useCmService(cmRepository);

    const response = await cmService.remove("token", "001");

    expect(response.id).toBe("123456789-c-v2qvc913");
    expect(response.title).toBe("cmテスト");
  });

  test(`想定外の値が返却された場合、UMesseErrorがthrowされること`, async () => {
    const responseJson = "aaaaaaaaaaaaaa";
    const expoectedError = new UMesseError(
      ERROR_CODE.A0001,
      ERROR_PATTERN.A0001,
      ""
    );

    jest.spyOn(axios, "request").mockRejectedValue({ data: responseJson });

    const cmRepository = new umesseapi.CmApi(undefined, "", axios);
    const cmService = useCmService(cmRepository);

    await expect(cmService.remove("token", "001")).rejects.toThrowError(
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

    const cmRepository = new umesseapi.CmApi(undefined, "", axios);
    const cmService = useCmService(cmRepository);

    await expect(cmService.remove("token", "001")).rejects.toThrowError(
      expoectedError
    );
  });
});
