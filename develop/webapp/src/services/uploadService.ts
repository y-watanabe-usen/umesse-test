import { UMesseErrorFromApiFactory } from "@/models/umesseError";
import { UploadApi } from "umesseapi";
import { UploadCreateRequestItem } from "@/models/uploadCreateRequestItem";

export function useUploadService(uploadRepository: UploadApi) {
  const create = async (
    id: string,
    unisCustomerCd: string,
    authToken: string,
    uploadSystem: string
  ) => {
    const requestModel: UploadCreateRequestItem = {
      uploadSystem: uploadSystem,
    };
    try {
      const response = await uploadRepository.createUploadCm(
        id,
        unisCustomerCd,
        authToken,
        requestModel
      );
      return response.data;
    } catch (e) {
      throw UMesseErrorFromApiFactory(e);
    }
  };

  const remove = async (id: string, unisCustomerCd: string, authToken: string) => {
    try {
      const response = await uploadRepository.deleteUploadCm(id, unisCustomerCd, authToken);
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
