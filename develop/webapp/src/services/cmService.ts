import {
  Bgm,
  Convert,
  CreateUserCmRequestItem,
  EndChime,
  Narration,
  StartChime,
} from "@/models/createUserCmRequestItem";
import { CreateUserCmResponseItem } from "@/models/createUserCmResponseItem";
import { UpdateUserCmRequestItem } from "@/models/updateUserCmRequestItem";
import Constants, { ERROR_CODE, ERROR_PATTERN, Scene } from "@/utils/constants";
import * as UMesseApi from "umesseapi";
import { Recording, Tts } from "@/models/displayCmItem";
import { CmItem } from "umesseapi/models/cm-item";
import { UMesseError, UMesseErrorFromApiFactory } from "@/models/umesseError";
import { CmCache } from "@/repository/cache/cmCache";
import { CmListItemInner } from "umesseapi/models";
import { AxiosResponse } from "axios";

export function useCmService(api: UMesseApi.CmApi, cmCache: CmCache) {

  const fetch = async (
    authToken: string,
    sort?: number
  ): Promise<[Scene[], CmItem[]]> => {
    return new Promise(function (resolve, reject) {
      api
        .listUserCm(authToken, sort)
        .then((response) => {
          const scenes: Scene[] = [];
          const cms: CmItem[] = [];
          response.data.forEach((scene: CmListItemInner) => {
            scenes.push({ cd: scene.sceneCd, name: scene.sceneName });
            scene.details.forEach((cm: CmItem) => {
              cms.push(cm);
            });
          });
          resolve([scenes, cms]);
        })
        .catch((e) => {
          reject(UMesseErrorFromApiFactory(e));
        });
    });
  };

  const createGenerator = async function* (
    authToken: string,
    narrations: (Narration | Recording | Tts)[],
    startChime: StartChime | null,
    endChime: EndChime | null,
    bgm: Bgm | null,
    id?: string
  ) {
    const requestModel = getCreateUserCmRequestModel(
      narrations,
      startChime,
      endChime,
      bgm,
      id
    );

    const tmp = JSON.parse(JSON.stringify(requestModel));
    delete tmp.id;
    const cacheKey = Convert.createUserCmRequestItemToJson(tmp);
    cmCache.removeOther(cacheKey);
    const cacheValue = cmCache.get<CreateUserCmResponseItem | undefined>(cacheKey);
    if (cacheValue) {
      yield cacheValue;
      return;
    }

    try {
      const createUserCmResponse = await api.createUserCm(authToken, requestModel);
      let response: CreateUserCmResponseItem | undefined = undefined;
      for (let i = 0; i < Constants.MAX_COUNT_TIME_INTERVAL_GET_USER_CM; i++) {
        await new Promise(resolve => setTimeout(resolve, Constants.TIME_INTERVAL_GET_USER_CM * 1000)); // sleep
        const getUserCmResponse: AxiosResponse<CreateUserCmResponseItem> = await api.getUserCm(createUserCmResponse.data.id, authToken);
        if (getUserCmResponse.data.status === Constants.CM_STATUS_CREATING) {
          response = getUserCmResponse.data;
          break;
        } else {
          yield getUserCmResponse.data;
        }
      }
      if (!response) {
        throw new UMesseError(ERROR_CODE.A3003, ERROR_PATTERN.A3003, "");
      }
      cmCache.set<CreateUserCmResponseItem>(cacheKey, response);
      yield response;
    } catch (e) {
      if (e instanceof UMesseError) {
        throw e;
      }
      throw UMesseErrorFromApiFactory(e);
    }

  };

  const update = async (
    authToken: string,
    id: string,
    title: string,
    description: string | null,
    sceneCd: string,
    uploadSystem: string,
    manuscript: string,
  ): Promise<CmItem> => {
    return new Promise(function (resolve, reject) {
      const requestModel = getUpdateUserCmRequestModel(
        title,
        description,
        sceneCd,
        uploadSystem,
        manuscript
      );
      api
        .updateUserCm(authToken, id, requestModel)
        .then((value) => {
          removeCacheAll();
          resolve(value.data);
        })
        .catch((e) => {
          reject(UMesseErrorFromApiFactory(e));
        });
    });
  };

  // deleteは予約語なのでremove
  const remove = async (authToken: string, id: string): Promise<CmItem> => {
    return new Promise(function (resolve, reject) {
      api
        .deleteUserCm(id, authToken)
        .then((value) => {
          resolve(value.data);
        })
        .catch((e) => {
          reject(UMesseErrorFromApiFactory(e));
        });
    });
  };

  const removeCacheAll = () => {
    cmCache.removeAll();
  };

  const getCreateUserCmRequestModel = (
    narrations: (Narration | Recording | Tts)[],
    startChime: StartChime | null,
    endChime: EndChime | null,
    bgm: Bgm | null,
    id?: string
  ) => {
    const requestModel: CreateUserCmRequestItem = {
      id: id ?? undefined,
      materials: {
        narrations: narrations,
        startChime: startChime ?? undefined,
        endChime: endChime ?? undefined,
        bgm: bgm ?? undefined,
      },
    };
    return requestModel;
  };

  const getUpdateUserCmRequestModel = (
    title: string,
    description: string | null,
    sceneCd: string,
    uploadSystem: string,
    manuscript: string
  ) => {
    // TODO: startDate, endDate, Industryは何の値を入れる？
    const requestModel: UpdateUserCmRequestItem = {
      title: title,
      description: description ?? undefined,
      startDate: new Date(2019, 9 - 1, 1, 9, 0, 0).toISOString(),
      endDate: new Date(9999, 12 - 1, 31, 23, 59, 59).toISOString(),
      industry: undefined,
      scene: {
        sceneCd: sceneCd,
        sceneName: Constants.SCENES.find((v) => v.cd == sceneCd)?.name,
      },
      uploadSystem:
        uploadSystem != Constants.UPLOAD_SYSTEMS[2].cd
          ? uploadSystem
          : undefined,
      manuscript: manuscript != "" ? manuscript : undefined
    };
    return requestModel;
  };

  return {
    fetch,
    createGenerator,
    update,
    remove,
    removeCacheAll,
  };
}
