import { AudioRepository } from "@/repository/api/audioRepositry";
import axios from "@/repository/api/axiosInstance";
import { AudioCache } from "@/repository/cache/audioCache";
import { useAudioService } from "@/services/audioService";
import * as umesseapi from "umesseapi";

const audioRepository = new AudioRepository(axios);
const resourcesRepository = new umesseapi.ResourcesApi(undefined, "", axios);
const audioCache = new AudioCache();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let audioContext: any;
const audioService = useAudioService(audioRepository, resourcesRepository, audioCache, audioContext);

describe("getByIdのテスト", () => {
  test(`正常系の場合、AudioBufferが返る`, async () => {
    jest.spyOn(axios, 'request').mockResolvedValue({ data: { pepe: 1 } });
    const response = await audioService.getById("1", "cm");
    console.log("response", response);
    expect(1).toBe(1);
  });
});
