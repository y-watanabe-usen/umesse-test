import * as UMesseApi from "umesseapi";
import { RecordingItem } from "umesseapi/models";
import { UMesseErrorFromApiFactory } from "@/models/umesseError";

export interface RecordingFile {
  title: string | undefined;
  description: string | undefined;
  blob: Blob | undefined;
}

export function useRecordingService(
  api: UMesseApi.RecordingApi,
  fileReader: FileReader
) {
  const fetch = async (authToken: string) => {
    try {
      const response = await api.listUserRecording(authToken);
      return response.data;
    } catch (e) {
      throw UMesseErrorFromApiFactory(e);
    }
  };

  const upload = async (
    authToken: string,
    file: RecordingFile
  ): Promise<RecordingItem> => {
    return new Promise(function(resolve, reject) {
      fileReader.onload = function() {
        api
          .createUserRecording(
            authToken,
            file.title ?? "",
            fileReader.result as string,
            file.title,
            file.description
          )
          .then((value) => {
            console.log("resolve");
            console.log("createUserRecording", <RecordingItem>value.data);
            resolve(<RecordingItem>value.data);
          })
          .catch((e) => {
            console.log("reject", e);
            reject(UMesseErrorFromApiFactory(e));
          });
      };
      if (file.blob) fileReader.readAsBinaryString(file.blob);
    });
  };

  const update = async (
    authToken: string,
    id: string,
    title: string,
    description: string
  ) => {
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

  const remove = async (authToken: string, id: string) => {
    try {
      const response = await api.deleteUserRecording(id, authToken);
      return response.data;
    } catch (e) {
      throw UMesseErrorFromApiFactory(e);
    }
  };

  return {
    fetch,
    upload,
    update,
    remove,
  };
}
