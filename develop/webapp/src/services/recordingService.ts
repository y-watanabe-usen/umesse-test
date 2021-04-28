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
  recordingApi: UMesseApi.RecordingApi
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

  const put = async (url: string, file: RecordingFile): Promise<void> => {
    return new Promise(function (resolve, reject) {
      if (file.blob)
        axios
          .put(url, file.blob, {
            headers: {
              'Content-Type': file.blob.type,
              'Content-Length': file.blob.size
            }
          })
          .then(res => {
            console.log(res);
            resolve();
          })
          .catch(err => reject(err));
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
