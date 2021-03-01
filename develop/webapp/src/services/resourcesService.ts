import Constants from "@/utils/Constants";
import * as UMesseApi from "umesseapi";
import UMesseCache from "@/repository/UMesseCache"
import { BgmItem, ChimeItem, FreeItem, NarrationItem, TemplateItem } from "umesseapi/models";
import AudioStore from "@/store/audio";

export function useResourcesService(
  resourcesApi: UMesseApi.ResourcesApi,
  recordingApi: UMesseApi.RecordingApi,
) {

  const audioStore = AudioStore();

  const fetchNarration = async (
    industryCd: string,
    sort?: number
  ): Promise<NarrationItem[]> => {
    console.log(industryCd)
    if (industryCd == "02") {
      // ユーザー作成音声は別のAPIからデータ取得
      return new Promise(function (resolve, reject) {
        recordingApi
          .listUserRecording("123456789")
          .then((value) => {
            console.log(value)
            let data: NarrationItem[] = []
            value.data.forEach((v: any) => {
              data.push({
                contentsId: v.id,
                title: v.title,
                description: v.description,
                category: Constants.CATEGORY.RECORDING,
                timestamp: v.timestamp,
              })
            })
            console.log(data)
            resolve(<NarrationItem[]>data)
          })
          .catch((error) => {
            console.log("reject")
            // TODO: Error
            reject()
          }
          );
      });
    }
    return new Promise(function (resolve, reject) {
      resourcesApi
        .listNarration(industryCd, undefined, sort)
        .then((value) => {
          resolve(value.data)
        })
        .catch((error) =>
          // TODO: Error
          reject()
        );
    });
  }

  const fetchChime = async (
    sort?: number
  ): Promise<ChimeItem[]> => {
    return new Promise(function (resolve, reject) {
      resourcesApi
        .listChime(sort)
        .then((value) => {
          resolve(value.data)
        })
        .catch((error) =>
          // TODO: Error
          reject()
        );
    });
  }

  const fetchBgm = async (
    industryCd: string,
    sort?: number
  ): Promise<BgmItem[]> => {
    return new Promise(function (resolve, reject) {
      resourcesApi
        .listBgm(industryCd, sort)
        .then((value) => {
          resolve(value.data)
        })
        .catch((error) =>
          // TODO: Error
          reject()
        );
    });
  }

  const fetchTemplate = async (
    industryCd: string,
    sort?: number
  ): Promise<TemplateItem[]> => {
    return new Promise(function (resolve, reject) {
      resourcesApi
        .listTemplate(industryCd, undefined, sort)
        .then((value) => {
          resolve(value.data)
        })
        .catch((error) =>
          // TODO: Error
          reject()
        );
    });
  }

  const fetchFree = async (
    industryCd: string,
    sort?: number
  ): Promise<FreeItem[]> => {
    return new Promise(function (resolve, reject) {
      resourcesApi
        .listFree(industryCd, undefined, sort)
        .then((value) => {
          resolve(value.data)
        })
        .catch((error) =>
          // TODO: Error
          reject()
        );
    });
  }

  const getAudioBufferByContentsId = async (contentsId: string, category: string) => {
    const cacheKey = `${category}/${contentsId}`;
    if (UMesseCache.audioCache.has(cacheKey)) {
      return <AudioBuffer>UMesseCache.audioCache.get(cacheKey);
    }
    const response = await resourcesApi.getSignedUrl(
      contentsId,
      category
    );
    return await getAudioBuffer(response.data.url, cacheKey);
  }

  const getAudioBufferByUrl = async (url: string) => {
    const cacheKey = url;
    if (UMesseCache.audioCache.has(cacheKey)) {
      return <AudioBuffer>UMesseCache.audioCache.get(cacheKey);
    }
    return await getAudioBuffer(url, cacheKey);
  }

  const getAudioBuffer = async (url: string, cacheKey: string) => {
    await audioStore.download(url);
    UMesseCache.audioCache.set(cacheKey, audioStore.audioBuffer);
    return <AudioBuffer>audioStore.audioBuffer;
  }

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