import { UMesseError } from "@/models/UMesseError";
import axios from "@/repository/api/axiosInstance";
import {
  useRecordingService,
  // RecordingFile,
} from "@/services/recordingService";
import { ERROR_CODE, ERROR_PATTERN } from "@/utils/Constants";
import * as umesseapi from "umesseapi";

describe("fetchのテスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test(`正常終了の場合、RecordingItem[]が返ること`, async () => {
    const responseJson = [
      {
        id: "123456789-c-v2qvc913",
        category: "recording",
        title: "recording1",
        description: "description1",
        startDate: "2019-09-01T00:00:00.000Z",
        timestamp: "2021-03-17T13:29:32.195+09:00",
      },
      {
        id: "123456789-c-5ml6xdvj",
        category: "recording",
        title: "recording2",
        description: "description2",
        startDate: "2019-09-01T00:00:00.000Z",
        timestamp: "2021-03-17T13:29:32.195+09:00",
      },
    ];
    jest.spyOn(axios, "request").mockResolvedValue({ data: responseJson });
    const recordingRepository = new umesseapi.RecordingApi(
      undefined,
      "",
      axios
    );
    const recordingService = useRecordingService(recordingRepository);

    const response = await recordingService.fetch("authToken");

    expect(response.length).toBe(2);
    expect(response[0].id).toBe("123456789-c-v2qvc913");
    expect(response[1].id).toBe("123456789-c-5ml6xdvj");
    expect(response[0].category).toBe("recording");
  });

  test(`想定外の値が返却された場合、UMesseErrorがthrowされること`, async () => {
    const responseJson = "aaaaaaaaaaaaaa";
    const expoectedError = new UMesseError(
      ERROR_CODE.A0001,
      ERROR_PATTERN.A0001,
      ""
    );

    jest.spyOn(axios, "request").mockRejectedValue({ data: responseJson });
    const recordingRepository = new umesseapi.RecordingApi(
      undefined,
      "",
      axios
    );
    const recordingService = useRecordingService(recordingRepository);

    await expect(recordingService.fetch("authToken")).rejects.toThrowError(
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
    const recordingRepository = new umesseapi.RecordingApi(
      undefined,
      "",
      axios
    );
    const recordingService = useRecordingService(recordingRepository);

    await expect(recordingService.fetch("authToken")).rejects.toThrowError(
      expoectedError
    );
  });
});

describe("updateのテスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test(`正常終了の場合、RecordingItemが返ること`, async () => {
    const responseJson = {
      id: "123456789-c-v2qvc913",
      category: "recording",
      title: "recording1",
      description: "description1",
      startDate: "2019-09-01T00:00:00.000Z",
      timestamp: "2021-03-17T13:29:32.195+09:00",
    };
    jest.spyOn(axios, "request").mockResolvedValue({ data: responseJson });
    const recordingRepository = new umesseapi.RecordingApi(
      undefined,
      "",
      axios
    );
    const recordingService = useRecordingService(recordingRepository);

    const response = await recordingService.update(
      "authToken",
      "001",
      "title",
      "description"
    );

    expect(response.id).toBe("123456789-c-v2qvc913");
    expect(response.category).toBe("recording");
  });

  test(`想定外の値が返却された場合、UMesseErrorがthrowされること`, async () => {
    const responseJson = "aaaaaaaaaaaaaa";
    const expoectedError = new UMesseError(
      ERROR_CODE.A0001,
      ERROR_PATTERN.A0001,
      ""
    );

    jest.spyOn(axios, "request").mockRejectedValue({ data: responseJson });
    const recordingRepository = new umesseapi.RecordingApi(
      undefined,
      "",
      axios
    );
    const recordingService = useRecordingService(recordingRepository);

    await expect(
      recordingService.update("authToken", "001", "title", "description")
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
    const recordingRepository = new umesseapi.RecordingApi(
      undefined,
      "",
      axios
    );
    const recordingService = useRecordingService(recordingRepository);

    await expect(
      recordingService.update("authToken", "001", "title", "description")
    ).rejects.toThrowError(expoectedError);
  });
});

// 他テスト作成後追加する
describe("uploadのテスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // test(`正常終了の場合、RecordingItemが返ること`, async () => {
  //   const responseJson = {
  //     id: "123456789-c-v2qvc913",
  //     category: "recording",
  //     title: "recording1",
  //     description: "description1",
  //     startDate: "2019-09-01T00:00:00.000Z",
  //     timestamp: "2021-03-17T13:29:32.195+09:00",
  //   };
  //   jest.spyOn(axios, "request").mockResolvedValue({ data: responseJson });
  //   const recordingRepository = new umesseapi.RecordingApi(
  //     undefined,
  //     "",
  //     axios
  //   );
  //   const recordingService = useRecordingService(recordingRepository);

  //   const response = await recordingService.upload("authToken", <RecordingFile>{
  //     title: "title",
  //     description: "description",
  //     blob: undefined,
  //   });

  //   expect(response.id).toBe("123456789-c-v2qvc913");
  //   expect(response.category).toBe("recording");
  // });

  // test(`想定外の値が返却された場合、UMesseErrorがthrowされること`, async () => {
  //   const responseJson = "aaaaaaaaaaaaaa";
  //   const expoectedError = new UMesseError(
  //     ERROR_CODE.A0001,
  //     ERROR_PATTERN.A0001,
  //     ""
  //   );

  //   jest.spyOn(axios, "request").mockRejectedValue({ data: responseJson });
  //   const recordingRepository = new umesseapi.RecordingApi(
  //     undefined,
  //     "",
  //     axios
  //   );
  //   const recordingService = useRecordingService(recordingRepository);

  //   await expect(
  //     recordingService.upload("authToken", <RecordingFile>{
  //       title: "title",
  //       description: "description",
  //       blob: undefined,
  //     })
  //   ).rejects.toThrowError(expoectedError);
  // });

  // test(`エラーの場合、UMesseErrorがthrowされること`, async () => {
  //   const expoectedError = new UMesseError(
  //     ERROR_CODE.A3999,
  //     ERROR_PATTERN.A3999,
  //     ""
  //   );

  //   jest
  //     .spyOn(axios, "request")
  //     .mockRejectedValue({ response: { status: 500 } });
  //   const recordingRepository = new umesseapi.RecordingApi(
  //     undefined,
  //     "",
  //     axios
  //   );
  //   const recordingService = useRecordingService(recordingRepository);

  //   await expect(
  //     recordingService.upload("authToken", <RecordingFile>{
  //       title: "title",
  //       description: "description",
  //       blob: undefined,
  //     })
  //   ).rejects.toThrowError(expoectedError);
  // });
});

describe("removeのテスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test(`正常終了の場合、RecordingItemが返ること`, async () => {
    const responseJson = {
      id: "123456789-c-v2qvc913",
      category: "recording",
      title: "recording1",
      description: "description1",
      startDate: "2019-09-01T00:00:00.000Z",
      timestamp: "2021-03-17T13:29:32.195+09:00",
    };
    jest.spyOn(axios, "request").mockResolvedValue({ data: responseJson });
    const recordingRepository = new umesseapi.RecordingApi(
      undefined,
      "",
      axios
    );
    const recordingService = useRecordingService(recordingRepository);
    const response = await recordingService.remove("authToken", "001");
    expect(response.id).toBe("123456789-c-v2qvc913");
    expect(response.category).toBe("recording");
  });

  test(`想定外の値が返却された場合、UMesseErrorがthrowされること`, async () => {
    const responseJson = "aaaaaaaaaaaaaa";
    const expoectedError = new UMesseError(
      ERROR_CODE.A0001,
      ERROR_PATTERN.A0001,
      ""
    );
    jest.spyOn(axios, "request").mockRejectedValue({ data: responseJson });
    const recordingRepository = new umesseapi.RecordingApi(
      undefined,
      "",
      axios
    );
    const recordingService = useRecordingService(recordingRepository);
    await expect(
      recordingService.remove("authToken", "001")
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
    const recordingRepository = new umesseapi.RecordingApi(
      undefined,
      "",
      axios
    );
    const recordingService = useRecordingService(recordingRepository);
    await expect(
      recordingService.remove("authToken", "001")
    ).rejects.toThrowError(expoectedError);
  });
});