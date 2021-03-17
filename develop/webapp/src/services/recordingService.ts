import { reactive } from "vue";
import * as UMesseApi from "umesseapi";
import { RecordingItem } from "umesseapi/models";
import { UMesseErrorFromApiFactory } from "@/models/UMesseError";

export interface RecordingFile {
  title: string | undefined;
  description: string | undefined;
  blob: Blob | undefined;
}

export enum UPLOAD_RECORDING_STATE {
  NONE,
  UPLOADING,
  UPLOADED,
  ERROR,
}

export function useRecordingService(api: UMesseApi.RecordingApi) {
  const state = reactive({
    status: UPLOAD_RECORDING_STATE.NONE as UPLOAD_RECORDING_STATE,
  });

  const getStatus = () => state.status;

  const fetch = async (authToken: string) => {
    try {
      const response = await api.listUserRecording(authToken);
      return response.data;
    } catch (e) {
      throw UMesseErrorFromApiFactory(e);
    }
  };

  const update = async (authToken: string, id: string, title: string, description: string) => {
    try {
      const response = await api.updateUserRecording(authToken, id, {
        title: title,
        description: description,
      });
      return response.data;
    } catch (e) {
      throw UMesseErrorFromApiFactory(e);
    }
  };

  const upload = async (
    authToken: string,
    file: RecordingFile
  ): Promise<RecordingItem> => {
    return new Promise(function (resolve, reject) {
      if (state.status === UPLOAD_RECORDING_STATE.UPLOADING) {
        return reject(new Error(`state is uploading`));
      }
      // TODO: check arguments here.
      state.status = UPLOAD_RECORDING_STATE.UPLOADING;

      const fr = new FileReader();

      fr.onload = function () {
        api
          .createUserRecording(authToken, file.title ?? "", fr.result as string, file.title, file.description)
          .then((value) => {
            console.log("resolve");
            console.log("createUserRecording", <RecordingItem>value.data);
            (state.status = UPLOAD_RECORDING_STATE.UPLOADED);
            resolve(<RecordingItem>value.data);
          })
          .catch((e) => {
            (state.status = UPLOAD_RECORDING_STATE.ERROR);
            console.log("reject", e);
            reject(UMesseErrorFromApiFactory(e));
          });
      };
      if (file.blob) fr.readAsBinaryString(file.blob);
    });
  };

  const remove = async (authToken: string, id: string) => {
    try {
      const response = await api.deleteUserRecording(id, authToken);
      return response.data;
    } catch (e) {
      throw UMesseErrorFromApiFactory(e);
    }
  };

  const reset = () => (state.status = UPLOAD_RECORDING_STATE.NONE);

  return {
    fetch,
    update,
    upload,
    remove,
    reset,
    getStatus,
  };
}
