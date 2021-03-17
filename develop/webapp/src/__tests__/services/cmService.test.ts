import { UMesseError } from "@/models/UMesseError";
import axios from "@/repository/axiosInstance";
import { useCmService } from "@/services/cmService";
import * as umesseapi from "umesseapi";

describe("fetchCmのテスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test(`正常系の場合、CmItem[]が返る`, async () => {
    const responseJson = [
      {
        "endDate": "9999-12-31T14:59:59.000Z",
        "productionType": "02",
        "description": "説明",
        "title": "cmテスト",
        "scene": {
          "sceneCd": "001",
          "sceneName": "チャイム"
        },
        "seconds": 74.109388,
        "materials": {
          "narrations": [
            {
              "volume": 100,
              "seconds": 0,
              "description": "ナレーション・サンプル01",
              "id": "サンプル01",
              "title": "サンプル01",
              "category": "narration",
              "timestamp": "2019-09-01T09:00:00+09:00"
            }
          ]
        },
        "uploadSystem": "01",
        "id": "123456789-c-v2qvc913",
        "category": "cm",
        "startDate": "2019-09-01T00:00:00.000Z",
        "status": "03",
        "timestamp": "2021-03-17T13:29:32.195+09:00"
      },
      {
        "endDate": "9999-12-31T14:59:59.000Z",
        "productionType": "02",
        "description": "",
        "title": "かか",
        "scene": {
          "sceneCd": "001",
          "sceneName": "チャイム"
        },
        "seconds": 78.106122,
        "materials": {
          "startChime": {
            "volume": 100,
            "seconds": 5,
            "description": "チャイム・サンプル01",
            "id": "サンプル01",
            "title": "サンプル01",
            "category": "chime",
            "timestamp": "2019-09-01T09:00:00+09:00"
          },
          "narrations": [
            {
              "volume": 100,
              "seconds": 0,
              "description": "ナレーション・サンプル01",
              "id": "サンプル01",
              "title": "サンプル01",
              "category": "narration",
              "timestamp": "2019-09-01T09:00:00+09:00"
            }
          ]
        },
        "uploadSystem": "01",
        "id": "123456789-c-5ml6xdvj",
        "category": "cm",
        "startDate": "2019-09-01T00:00:00.000Z",
        "status": "03",
        "timestamp": "2021-03-17T11:04:06.570+09:00"
      }
    ];
    jest.spyOn(axios, 'request').mockResolvedValue({ data: responseJson });
    const cmRepository = new umesseapi.CmApi(undefined, "", axios);
    const cmService = useCmService(cmRepository);

    const response = await cmService.fetchCm("token", "001");

    expect(response.length).toBe(2);
    expect(response[0].id).toBe("123456789-c-v2qvc913");
    expect(response[1].id).toBe("123456789-c-5ml6xdvj");
  });

  test(`エラーの場合、UMesseErrorがthrowされる`, async () => {
    jest.spyOn(axios, 'request').mockRejectedValue({data: ""});

    const cmRepository = new umesseapi.CmApi(undefined, "", axios);
    const cmService = useCmService(cmRepository);

    await expect(cmService.fetchCm("token", "001")).rejects.toThrowError(UMesseError);
  });
});
