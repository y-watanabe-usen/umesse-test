import { UMesseError } from "@/models/UMesseError";
import { AudioRepository } from "@/repository/api/audioRepositry";
import axios from "@/repository/api/axiosInstance";
import { AudioCache } from "@/repository/cache/audioCache";
import { useAudioService } from "@/services/audioService";
import { ERROR_CODE, ERROR_PATTERN } from "@/utils/Constants";
import * as umesseapi from "umesseapi";

const audioRepository = new AudioRepository(axios);
const resourcesRepository = new umesseapi.ResourcesApi(undefined, "", axios);
const audioCache = new AudioCache();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const audioContext: any = new class {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  decodeAudioData = async (data: any) => {
    if (data != "DownloadedAudioFile") {
      throw new Error("err");
    }
    return "DecodedAudioBuffer";
  };
};

const audioService = useAudioService(audioRepository, resourcesRepository, audioCache, audioContext);

describe("getByIdのテスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    audioCache.removeAll();
  });

  const id = "123456789";
  const category = "bgm";
  const cacheKey = `audioService/getById/${category}/${id}`;

  test(`正常系の場合、AudioBufferがキャッシュにセットされ返ること`, async () => {
    jest.spyOn(axios, 'request').mockResolvedValue({ data: { url: "https://example.com" } });
    jest.spyOn(axios, 'get').mockResolvedValue({ data: "DownloadedAudioFile" });

    const response = await audioService.getById(id, category);

    expect(audioCache.get(cacheKey)).toBe("DecodedAudioBuffer");
    expect(response).toBe("DecodedAudioBuffer");
  });

  test(`キャッシュがある場合、キャッシュの中身が返ること`, async () => {
    jest.spyOn(axios, 'request').mockResolvedValue({ data: { url: "https://example.com" } });
    jest.spyOn(axios, 'get').mockResolvedValue({ data: "DownloadedAudioFile" });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    audioCache.set(cacheKey, <any>"CacheAudioBuffer");

    const response = await audioService.getById(id, category);

    expect(response).toBe("CacheAudioBuffer");
  });

  test(`想定外の値が返却された場合、UMesseErrorがthrowされること`, async () => {
    jest.spyOn(axios, 'get').mockResolvedValue({ data: "aaaaaaaaaaaaaaaaa" });
    const expoectedError = new UMesseError(ERROR_CODE.A0001, ERROR_PATTERN.A0001, "");

    await expect(audioService.getById(id, category)).rejects.toThrowError(expoectedError);
  });

  test(`404エラーの場合、UMesseErrorがthrowされること`, async () => {
    jest.spyOn(axios, 'get').mockRejectedValue({ response: { status: 404 } });
    const expoectedError = new UMesseError(ERROR_CODE.A3000, ERROR_PATTERN.A3000, "");

    await expect(audioService.getById(id, category)).rejects.toThrowError(expoectedError);
  });

  test(`500エラーの場合、UMesseErrorがthrowされること`, async () => {
    jest.spyOn(axios, 'get').mockRejectedValue({ response: { status: 500 } });
    const expoectedError = new UMesseError(ERROR_CODE.A3999, ERROR_PATTERN.A3999, "");

    await expect(audioService.getById(id, category)).rejects.toThrowError(expoectedError);
  });
});

describe("getByUrlのテスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    audioCache.removeAll();
  });

  const url = "https://example.com";
  const cacheKey = `audioService/getByUrl/${url}`;

  test(`正常系の場合、AudioBufferがキャッシュにセットされ返ること`, async () => {
    jest.spyOn(axios, 'get').mockResolvedValue({ data: "DownloadedAudioFile" });

    const response = await audioService.getByUrl(url);

    expect(audioCache.get(cacheKey)).toBe("DecodedAudioBuffer");
    expect(response).toBe("DecodedAudioBuffer");
  });

  test(`キャッシュがある場合、キャッシュの中身が返ること`, async () => {
    jest.spyOn(axios, 'get').mockResolvedValue({ data: "DownloadedAudioFile" });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    audioCache.set(cacheKey, <any>"CacheAudioBuffer");

    const response = await audioService.getByUrl(url);

    expect(response).toBe("CacheAudioBuffer");
  });

  test(`想定外の値が返却された場合、UMesseErrorがthrowされること`, async () => {
    jest.spyOn(axios, 'get').mockResolvedValue({ data: "aaaaaaaaaaaaaaaaa" });
    const expoectedError = new UMesseError(ERROR_CODE.A0001, ERROR_PATTERN.A0001, "");

    await expect(audioService.getByUrl(url)).rejects.toThrowError(expoectedError);
  });

  test(`404エラーの場合、UMesseErrorがthrowされること`, async () => {
    jest.spyOn(axios, 'get').mockRejectedValue({ response: { status: 404 } });
    const expoectedError = new UMesseError(ERROR_CODE.A3000, ERROR_PATTERN.A3000, "");

    await expect(audioService.getByUrl(url)).rejects.toThrowError(expoectedError);
  });

  test(`500エラーの場合、UMesseErrorがthrowされること`, async () => {
    jest.spyOn(axios, 'get').mockRejectedValue({ response: { status: 500 } });
    const expoectedError = new UMesseError(ERROR_CODE.A3999, ERROR_PATTERN.A3999, "");

    await expect(audioService.getByUrl(url)).rejects.toThrowError(expoectedError);
  });
});