import axios from "axios";
import * as UMesseApi from "umesseapi";
import { RecordingItem } from "umesseapi/models";
import { UMesseErrorFromApiFactory } from "@/models/umesseError";

export interface RecordingFile {
  title: string | undefined;
  description: string | undefined;
  blob: Blob | undefined;
}

export function useRecordingService(
  resourcesApi: UMesseApi.ResourcesApi,
  recordingApi: UMesseApi.RecordingApi,
  fileReader: FileReader
) {
  const fetch = async (authToken: string) => {
    try {
      const response = await recordingApi.listUserRecording(authToken);
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
        recordingApi
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
      const response = await recordingApi.updateUserRecording(authToken, id, {
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
      const response = await recordingApi.deleteUserRecording(id, authToken);
      return response.data;
    } catch (e) {
      throw UMesseErrorFromApiFactory(e);
    }
  };

  const put = async (url: string, file: RecordingFile): Promise<any> => {
    return new Promise(function (resolve, reject) {
      fileReader.onload = function () {
        const data = new FormData();
        data.append("file", fileReader.result as string);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
        axios
          .put(url, data, config)
          .then(response => resolve(response))
          .catch(error => reject(error));
      };
      if (file.blob) fileReader.readAsBinaryString(file.blob);
    });
  };

  const uploadById = async (id: string, category: string) => {
    try {
      const resourcesRepositoryResponse = await resourcesApi.getSignedUrl(id, category, "put");
      return resourcesRepositoryResponse.data.url;
    } catch (e) {
      throw UMesseErrorFromApiFactory(e);
    }
  };

  return {
    fetch,
    upload,
    update,
    remove,
    put,
    uploadById,
  };
}
