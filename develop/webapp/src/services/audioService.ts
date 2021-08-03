import { UMesseErrorFromApiFactory } from "@/models/umesseError";
import { AudioRepository } from "@/repository/api/audioRepositry";
import { AudioCache } from "@/repository/cache/audioCache";
import { ResourcesApi } from "umesseapi";

export function useAudioService(
  audioRepository: AudioRepository,
  resourcesRepository: ResourcesApi,
  audioCache: AudioCache,
) {

  const getArrayBufferById = async (id: string, category: string): Promise<ArrayBuffer> => {
    const cacheKey = `audioService/getArrayBufferById/${category}/${id}`;
    const cacheData = <ArrayBuffer>audioCache.get(cacheKey);
    if (cacheData) return cacheData;
    try {
      const resourcesRepositoryResponse = await resourcesRepository.getSignedUrl(id, category);
      const audioRepositoryResponse = await audioRepository.download(resourcesRepositoryResponse.data.url);
      audioCache.set(cacheKey, audioRepositoryResponse.data);
      return audioRepositoryResponse.data;
    } catch (e) {
      throw UMesseErrorFromApiFactory(e);
    }
  };

  const getUrlById = async (id: string, category: string) => {
    const cacheKey = `audioService/getUrlById/${category}/${id}`;
    const cacheData = audioCache.get(cacheKey);
    if (cacheData) return cacheData;
    try {
      const resourcesRepositoryResponse = await resourcesRepository.getSignedUrl(id, category);
      audioCache.set(cacheKey, resourcesRepositoryResponse.data.url);
      return resourcesRepositoryResponse.data.url;
    } catch (e) {
      throw UMesseErrorFromApiFactory(e);
    }
  };

  const getM3U8UrlById = async (unisCustomerCd: string, token: string, id: string, category: string) => {
    try {
      const resourcesRepositoryResponse = await resourcesRepository.getM3U8SignedUrl(unisCustomerCd, token, id, category);
      return resourcesRepositoryResponse.data.url;
    } catch (e) {
      throw UMesseErrorFromApiFactory(e);
    }
  };

  const getArrayBufferByUrl = async (url: string): Promise<ArrayBuffer> => {
    const cacheKey = `audioService/getArrayBufferByUrl/${url}`;
    const cacheData = <ArrayBuffer>audioCache.get(cacheKey);
    if (cacheData) return cacheData;
    try {
      const audioRepositoryResponse = await audioRepository.download(url);
      audioCache.set(cacheKey, audioRepositoryResponse.data);
      return audioRepositoryResponse.data;
    } catch (e) {
      throw UMesseErrorFromApiFactory(e);
    }
  };


  return {
    getArrayBufferById,
    getUrlById,
    getM3U8UrlById,
    getArrayBufferByUrl,
  };
}
