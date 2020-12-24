import { reactive } from "vue";

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

interface FunctionInterface {
  createUserRecording(s: string, s2: string, s3: string): Promise<any>;
}
export function useUploadRecordingService(api: FunctionInterface) {
  const state = reactive({
    status: UPLOAD_RECORDING_STATE.NONE as UPLOAD_RECORDING_STATE,
  });

  const getStatus = () => state.status;

  const upload = async (authToken: string, file: RecordingFile) => {
    return new Promise(function(resolve, reject) {
      if (state.status === UPLOAD_RECORDING_STATE.UPLOADING) {
        return reject(new Error(`state is uploading`));
      }
      // TODO: check arguments here.
      state.status = UPLOAD_RECORDING_STATE.UPLOADING;

      var fr = new FileReader();

      fr.onload = function() {
        api
          .createUserRecording(authToken, file.title!, fr.result as string)
          .then((value) =>
            resolve((state.status = UPLOAD_RECORDING_STATE.UPLOADED))
          )
          .catch((error) =>
            reject((state.status = UPLOAD_RECORDING_STATE.ERROR))
          );
      };
      fr.readAsBinaryString(file.blob!!);
    });
  };
  const reset = () => (state.status = UPLOAD_RECORDING_STATE.NONE);
  return {
    upload,
    reset,
    getStatus,
  };
}
