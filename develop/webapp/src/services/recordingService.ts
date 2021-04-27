import axios from "axios";
import * as UMesseApi from "umesseapi";
import { RecordingItem } from "umesseapi/models";
import { UMesseErrorFromApiFactory } from "@/models/umesseError";

export interface RecordingFile {
  id: string | undefined;
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
    return new Promise(function (resolve, reject) {
      recordingApi
        .createUserRecording(
          authToken,
          file.id,
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
        const config = {
          headers: {
            'Content-Type': 'audio/wave; charset=utf-8',
            'x-amz-acl': 'private',
            'Access-Control-Allow-Origin': '*',
          },
        }
        axios
          .put(url, fileReader.result, config)
          .then(res => resolve(res))
          .catch(err => reject(err));
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
