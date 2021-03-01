import { reactive } from "vue";
import { Bgm, Convert, CreateUserCmRequestItem, EndChime, Narration, StartChime } from "@/models/CreateUserCmRequestItem";
import { CreateUserCmResponseItem } from "@/models/CreateUserCmResponseItem";
import { UpdateUserCmRequestItem } from "@/models/UpdateUserCmRequestItem";
import Constants from "@/utils/Constants";
import * as UMesseApi from "umesseapi";
import { CmItem } from "umesseapi/models/cm-item";

export enum UPLOAD_CM_STATE {
  NONE,
  CREATING,
  CREATED,
  UPDATING,
  UPDATED,
  ERROR,
}

export function useUploadCmService(api: UMesseApi.CmApi) {
  const state = reactive({
    status: UPLOAD_CM_STATE.NONE as UPLOAD_CM_STATE,
  });

  const getStatus = () => state.status;

  const fetchCm = async (sceneCd: string, sort?: number) => {
    const xUnisCustomerCd = "123456789"

    const tmp = await api.listUserCm(
      xUnisCustomerCd,
      sort
    );

    const response = tmp.data.filter((v) => {
      if (!v.scene) return false;
      return v.scene.sceneCd == sceneCd;
    });
    return response
  }
  const create = async (
    authToken: string,
    narrationContentsIds: string[] | null,
    startChimeContentsId: string | null,
    endChimeContentsId: string | null,
    bgmContentsId: string | null
  ): Promise<CreateUserCmResponseItem> => {
    return new Promise(function (resolve, reject) {
      if (state.status === UPLOAD_CM_STATE.CREATING) {
        return reject(new Error(`state is creating`));
      }
      // TODO: check arguments here.
      state.status = UPLOAD_CM_STATE.CREATING;

      const requestModel = getCreateUserCmRequestModel(
        narrationContentsIds,
        startChimeContentsId,
        endChimeContentsId,
        bgmContentsId
      )
      api
        .createUserCm(authToken, requestModel)
        .then((value) => {
          state.status = UPLOAD_CM_STATE.CREATED
          resolve(<CreateUserCmResponseItem>value.data)
        })
        .catch((error) =>
          reject((state.status = UPLOAD_CM_STATE.ERROR))
        );
    });
  }

  const update = async (
    authToken: string,
    cmId: string,
    title: string,
    description: string | null,
    sceneCd: string,
    uploadSystem: string
  ) => {
    return new Promise(function (resolve, reject) {
      // if (state.status !== UPLOAD_CM_STATE.CREATED) {
      //   return reject(new Error(`state is not created`));
      // }
      // TODO: check arguments here.
      state.status = UPLOAD_CM_STATE.UPDATING;

      const requestModel = getUpdateUserCmRequestModel(title, description, sceneCd, uploadSystem)
      api
        .updateUserCm(authToken, cmId, requestModel)
        .then((value) => {
          console.log(value.data)
          resolve(state.status = UPLOAD_CM_STATE.UPDATED)
        })
        .catch((error) =>
          reject((state.status = UPLOAD_CM_STATE.ERROR))
        );
    });
  }

  // deleteは予約語なのでremove
  const remove = async (authToken: string, cmId: string) => {
    return new Promise(function (resolve, reject) {
      api
        .deleteUserCm(cmId, authToken)
        .then((value) => {
          console.log(value.data)
          resolve(state.status = UPLOAD_CM_STATE.NONE)
        })
        .catch((error) =>
          reject((state.status = UPLOAD_CM_STATE.ERROR))
        );
    });

  }

  const getCreateUserCmRequestModel = (
    narrationContentsIds: string[] | null,
    startChimeContentsId: string | null,
    endChimeContentsId: string | null,
    bgmContentsId: string | null
  ) => {
    let narrations: Narration[] | undefined = undefined;
    if (narrationContentsIds?.length) {
      narrationContentsIds.forEach((v) => {
        if (!narrations) narrations = []
        narrations.push({ contentsId: v, volume: 150 });
      });
    }
    const startChime: StartChime | undefined = startChimeContentsId
      ? { contentsId: startChimeContentsId, volume: 50 }
      : undefined;
    const endChime: EndChime | undefined = endChimeContentsId
      ? { contentsId: endChimeContentsId, volume: 50 }
      : undefined;
    const bgm: Bgm | undefined = bgmContentsId
      ? { contentsId: bgmContentsId, volume: 50 }
      : undefined;
    const requestModel: CreateUserCmRequestItem = {
      materials: {
        narrations: narrations,
        startChime: startChime,
        endChime: endChime,
        bgm: bgm,
      },
    };
    console.log(Convert.createUserCmRequestItemToJson(requestModel));
    return requestModel;
  };

  const getUpdateUserCmRequestModel = (
    title: string,
    description: string | null,
    sceneCd: string,
    uploadSystem: string
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
      uploadSystem: uploadSystem,
    };
    return requestModel;
  };

  return {
    fetchCm, create, update, remove, getStatus,
  };
}
