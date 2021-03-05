import { reactive } from "vue";
import * as UMesseApi from "umesseapi";
import { RecordingItem } from "umesseapi/models";

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

export function useUploadRecordingService(api: UMesseApi.RecordingApi) {
  const state = reactive({
    status: UPLOAD_RECORDING_STATE.NONE as UPLOAD_RECORDING_STATE,
  });

  const getStatus = () => state.status;

  const upload = async (authToken: string, file: RecordingFile): Promise<RecordingItem> => {
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
            (state.status = UPLOAD_RECORDING_STATE.UPLOADED);
            resolve(<RecordingItem>value.data);
          })
          .catch((e) => {
            console.log(e);
            reject((state.status = UPLOAD_RECORDING_STATE.ERROR));
          });
      };
      if (file.blob) fr.readAsBinaryString(file.blob);
    });
  };
  const reset = () => (state.status = UPLOAD_RECORDING_STATE.NONE);
  return {
    upload,
    reset,
    getStatus,
  };
}
