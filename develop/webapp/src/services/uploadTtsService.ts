import { reactive } from "vue";

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

interface FunctionInterface {
  createUserTts(xUnisCustomerCd: string, filename?: string, recordedFile?: string, title?: string, description?: string): Promise<any>;
}
export function useUploadTtsService(api: FunctionInterface) {
  const state = reactive({
    status: UPLOAD_TTS_STATE.NONE as UPLOAD_TTS_STATE,
  });

  const getStatus = () => state.status;

  const upload = async (authToken: string, file: RecordingFile) => {
    return new Promise(function(resolve, reject) {
      if (state.status === UPLOAD_TTS_STATE.UPLOADING) {
        return reject(new Error(`state is uploading`));
      }
      // TODO: check arguments here.
      state.status = UPLOAD_TTS_STATE.UPLOADING;

      var fr = new FileReader();

      fr.onload = function() {
        api
          .createUserTts(authToken, file.title!, fr.result as string,file.title,'FIXME: file.description')
          .then((value) =>
            resolve((state.status = UPLOAD_TTS_STATE.UPLOADED))
          )
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
