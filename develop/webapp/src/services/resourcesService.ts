import Constants from "@/utils/constants";
import * as UMesseApi from "umesseapi";
import {
  BgmItem,
  ChimeItem,
  FreeItem,
  NarrationItem,
  TemplateItem,
} from "umesseapi/models";
import { UMesseErrorFromApiFactory } from "@/models/umesseError";

export function useResourcesService(
  resourcesApi: UMesseApi.ResourcesApi,
  recordingApi: UMesseApi.RecordingApi,
  ttsApi: UMesseApi.TtsApi
) {

  const fetchNarration = async (
    authToken: string,
    industryCd: string,
    sceneCd: string,
    sort?: number
  ): Promise<NarrationItem[]> => {
    if (industryCd == "02") {
      // ユーザー作成音声は別のAPIからデータ取得
      if (sceneCd == "901") {
        return new Promise(function (resolve, reject) {
          recordingApi
            .listUserRecording(authToken, sort)
            .then((value) => {
              const data: NarrationItem[] = [];
              value.data.forEach((v) => {
                data.push({
                  id: v.id,
                  title: v.title,
                  description: v.description,
                  category: Constants.CATEGORY.RECORDING,
                  timestamp: v.timestamp,
                  seconds: v.seconds,
                });
              });
              resolve(<NarrationItem[]>data);
            })
            .catch((e) => {
              reject(UMesseErrorFromApiFactory(e));
            });
        });
      } else {
        return new Promise(function (resolve, reject) {
          ttsApi
            .listUserTts(authToken, sort)
            .then((value) => {
              const data: NarrationItem[] = [];
              value.data.forEach((v) => {
                data.push({
                  id: v.id,
                  title: v.title,
                  description: v.description,
                  category: Constants.CATEGORY.TTS,
                  timestamp: v.timestamp,
                  manuscript: v.manuscript,
                  seconds: v.seconds,
                });
              });
              resolve(<NarrationItem[]>data);
            })
            .catch((e) => {
              reject(UMesseErrorFromApiFactory(e));
            });
        });
      }
    }
    return new Promise(function (resolve, reject) {
      resourcesApi
        .listNarration(industryCd, sceneCd, sort)
        .then((value) => {
          resolve(value.data);
        })
        .catch((e) => {
          reject(UMesseErrorFromApiFactory(e));
        });
    });
  };

  const fetchChime = async (sort?: number): Promise<ChimeItem[]> => {
    return new Promise(function (resolve, reject) {
      resourcesApi
        .listChime(sort)
        .then((value) => {
          resolve(value.data);
        })
        .catch((e) => {
          reject(UMesseErrorFromApiFactory(e));
        });
    });
  };

  const fetchBgm = async (
    industryCd: string,
    sort?: number
  ): Promise<BgmItem[]> => {
    return new Promise(function (resolve, reject) {
      resourcesApi
        .listBgm(industryCd, sort)
        .then((value) => {
          resolve(value.data);
        })
        .catch((e) => {
          reject(UMesseErrorFromApiFactory(e));
        });
    });
  };

  const fetchTemplate = async (
    industryCd: string,
    sceneCd: string,
    sort?: number
  ): Promise<TemplateItem[]> => {
    return new Promise(function (resolve, reject) {
      resourcesApi
        .listTemplate(industryCd, sceneCd, sort)
        .then((value) => {
          resolve(value.data);
        })
        .catch((e) => {
          reject(UMesseErrorFromApiFactory(e));
        });
    });
  };

  const fetchFree = async (
    industryCd: string,
    sceneCd: string,
    sort?: number
  ): Promise<FreeItem[]> => {
    return new Promise(function (resolve, reject) {
      resourcesApi
        .listFree(industryCd, sceneCd, sort)
        .then((value) => {
          resolve(value.data);
        })
        .catch((e) => {
          reject(UMesseErrorFromApiFactory(e));
        });
    });
  };

  return {
    fetchNarration,
    fetchChime,
    fetchBgm,
    fetchTemplate,
    fetchFree,
  };
}
