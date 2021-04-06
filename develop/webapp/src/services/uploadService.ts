import { UMesseErrorFromApiFactory } from "@/models/UMesseError";
import { UploadApi } from "umesseapi";
import { UploadCreateRequestItem } from "@/models/UploadCreateRequestItem";

export function useUploadService(uploadRepository: UploadApi) {
  const create = async (
    id: string,
    authToken: string,
    uploadSystem: string
  ) => {
    const requestModel: UploadCreateRequestItem = {
      uploadSystem: uploadSystem,
    };
    try {
      const response = await uploadRepository.createUploadCm(
        id,
        authToken,
        requestModel
      );
      return response.data;
    } catch (e) {
      throw UMesseErrorFromApiFactory(e);
    }
  };

  const remove = async (id: string, authToken: string) => {
    try {
      const response = await uploadRepository.deleteUploadCm(id, authToken);
      return response.data;
    } catch (e) {
      throw UMesseErrorFromApiFactory(e);
    }
  };

  return {
    create,
    remove,
  };
}
