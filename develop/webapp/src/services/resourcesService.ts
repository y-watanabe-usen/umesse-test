import Constants from "@/utils/Constants";
import * as UMesseApi from "umesseapi";
import {
  BgmItem,
  ChimeItem,
  FreeItem,
  NarrationItem,
  TemplateItem,
} from "umesseapi/models";
import AudioStore from "@/store/audio";
import { UMesseErrorFromApiFactory } from "@/models/UMesseError";
import { audioCache } from "@/repository/cache";

export function useResourcesService(
  resourcesApi: UMesseApi.ResourcesApi,
  recordingApi: UMesseApi.RecordingApi,
  ttsApi: UMesseApi.TtsApi
) {
  const audioStore = AudioStore();

  const fetchNarration = async (
    authToken: string,
    industryCd: string,
    sceneCd: string,
    sort?: number
  ): Promise<NarrationItem[]> => {
    console.log(industryCd);
    if (industryCd == "02") {
      // ユーザー作成音声は別のAPIからデータ取得
      if (sceneCd == "901") {
        return new Promise(function(resolve, reject) {
          recordingApi
            .listUserRecording(authToken)
            .then((value) => {
              const data: NarrationItem[] = [];
              value.data.forEach((v) => {
                data.push({
                  id: v.id,
                  title: v.title,
                  description: v.description,
                  category: Constants.CATEGORY.RECORDING,
                  timestamp: v.timestamp,
                });
              });
              resolve(<NarrationItem[]>data);
            })
            .catch((e) => {
              console.log("reject", e);
              reject(UMesseErrorFromApiFactory(e));
            });
        });
      } else {
        return new Promise(function(resolve, reject) {
          ttsApi
            .listUserTts(authToken)
            .then((value) => {
              console.log(value);
              const data: NarrationItem[] = [];
              value.data.forEach((v) => {
                data.push({
                  id: v.id,
                  title: v.title,
                  description: v.description,
                  category: Constants.CATEGORY.TTS,
                  timestamp: v.timestamp,
                });
              });
              console.log(data);
              resolve(<NarrationItem[]>data);
            })
            .catch((e) => {
              console.log("reject", e);
              reject(UMesseErrorFromApiFactory(e));
            });
        });
      }
    }
    return new Promise(function(resolve, reject) {
      resourcesApi
        .listNarration(industryCd, sceneCd, sort)
        .then((value) => {
          console.log("resolve");
          console.log("listNarration", value.data);
          resolve(value.data);
        })
        .catch((e) => {
          console.log("reject", e);
          reject(UMesseErrorFromApiFactory(e));
        });
    });
  };

  const fetchChime = async (sort?: number): Promise<ChimeItem[]> => {
    return new Promise(function(resolve, reject) {
      resourcesApi
        .listChime(sort)
        .then((value) => {
          console.log("resolve");
          console.log("listChime", value.data);
          resolve(value.data);
        })
        .catch((e) => {
          console.log("reject", e);
          reject(UMesseErrorFromApiFactory(e));
        });
    });
  };

  const fetchBgm = async (
    industryCd: string,
    sort?: number
  ): Promise<BgmItem[]> => {
    return new Promise(function(resolve, reject) {
      resourcesApi
        .listBgm(industryCd, sort)
        .then((value) => {
          console.log("resolve");
          console.log("listBgm", value.data);
          resolve(value.data);
        })
        .catch((e) => {
          console.log("reject", e);
          reject(UMesseErrorFromApiFactory(e));
        });
    });
  };

  const fetchTemplate = async (
    industryCd: string,
    sort?: number
  ): Promise<TemplateItem[]> => {
    return new Promise(function(resolve, reject) {
      resourcesApi
        .listTemplate(industryCd, undefined, sort)
        .then((value) => {
          console.log("resolve");
          console.log("listTemplate", value.data);
          resolve(value.data);
        })
        .catch((e) => {
          console.log("reject", e);
          reject(UMesseErrorFromApiFactory(e));
        });
    });
  };

  const fetchFree = async (
    industryCd: string,
    sort?: number
  ): Promise<FreeItem[]> => {
    return new Promise(function(resolve, reject) {
      resourcesApi
        .listFree(industryCd, undefined, sort)
        .then((value) => {
          console.log("resolve");
          console.log("listFreeTemplate", value.data);
          resolve(value.data);
        })
        .catch((e) => {
          console.log("reject", e);
          reject(UMesseErrorFromApiFactory(e));
        });
    });
  };

  const getAudioBufferByContentsId = async (
    contentsId: string,
    category: string
  ) => {
    const cacheKey = `${category}/${contentsId}`;
    if (audioCache.has(cacheKey)) {
      return <AudioBuffer>audioCache.get(cacheKey);
    }
    const response = await resourcesApi.getSignedUrl(contentsId, category);
    return await getAudioBuffer(response.data.url, cacheKey);
  };

  const getAudioBufferByUrl = async (url: string) => {
    const cacheKey = url;
    if (audioCache.has(cacheKey)) {
      return <AudioBuffer>audioCache.get(cacheKey);
    }
    return await getAudioBuffer(url, cacheKey);
  };

  const getAudioBuffer = async (url: string, cacheKey: string) => {
    await audioStore.download(url);
    audioCache.set(cacheKey, audioStore.audioBuffer);
    return <AudioBuffer>audioStore.audioBuffer;
  };

  return {
    fetchNarration,
    fetchChime,
    fetchBgm,
    fetchTemplate,
    fetchFree,
    getAudioBufferByContentsId,
    getAudioBufferByUrl,
  };
}
