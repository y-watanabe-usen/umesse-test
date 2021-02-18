import { reactive } from "vue";
import * as UMesseApi from "umesseapi";
import { TtsItem } from "umesseapi/models";

export interface RecordingFile {
  title: string | undefined;
  description: string | undefined;
  blob: Blob | undefined;
}

export enum UPLOAD_TTS_STATE {
  NONE,
  UPLOADING,
  UPLOADED,
  ERROR,
}

export function useUploadTtsService(api: UMesseApi.TtsApi) {
  const state = reactive({
    status: UPLOAD_TTS_STATE.NONE as UPLOAD_TTS_STATE,
  });

  const getStatus = () => state.status;

  const upload = async (authToken: string, file: RecordingFile): Promise<TtsItem> => {
    return new Promise(function (resolve, reject) {
      if (state.status === UPLOAD_TTS_STATE.UPLOADING) {
        return reject(new Error(`state is uploading`));
      }
      // TODO: check arguments here.
      state.status = UPLOAD_TTS_STATE.UPLOADING;

      var fr = new FileReader();

      fr.onload = function () {
        // TODO: AWSでTTS作るなら音源ファイルは送らなくていい？
        api
          .createUserTts(authToken, file.title!, fr.result as string, file.title, file.description)
          .then((value) => {
            state.status = UPLOAD_TTS_STATE.UPLOADED
            console.log("createUserTts", value.data)
            resolve(<TtsItem>value.data)
          })
          .catch((error) =>
            reject((state.status = UPLOAD_TTS_STATE.ERROR))
          );
      };
      fr.readAsBinaryString(file.blob!!);
    });
  };
  const reset = () => (state.status = UPLOAD_TTS_STATE.NONE);
  return {
    upload,
    reset,
    getStatus,
  };
}
