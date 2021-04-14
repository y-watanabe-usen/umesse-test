import { UMesseErrorFromApiFactory } from "@/models/UMesseError";
import { AudioRepository } from "@/repository/api/audioRepositry";
import { AudioCache } from "@/repository/cache/audioCache";
import { ResourcesApi } from "umesseapi";

export function useAudioService(
  audioRepository: AudioRepository,
  resourcesRepository: ResourcesApi,
  audioCache: AudioCache,
  audioContext: AudioContext,
) {

  const getById = async (id: string, category: string) => {
    const cacheKey = `audioService/getById/${category}/${id}`;
    const cacheData = audioCache.get(cacheKey);
    if (cacheData) return cacheData;
    try {
      const resourcesRepositoryResponse = await resourcesRepository.getSignedUrl(id, category);
      const audioRepositoryResponse = await audioRepository.download(resourcesRepositoryResponse.data.url);
      const audio = await audioContext.decodeAudioData(audioRepositoryResponse.data);
      audioCache.set(cacheKey, audio);
      return audio;
    } catch (e) {
      throw UMesseErrorFromApiFactory(e);
    }
  };

  const getByUrl = async (url: string) => {
    const cacheKey = `audioService/getByUrl/${url}`;
    const cacheData = audioCache.get(cacheKey);
    if (cacheData) return cacheData;
    try {
      const audioRepositoryResponse = await audioRepository.download(url);
      const audio = await audioContext.decodeAudioData(audioRepositoryResponse.data);
      audioCache.set(cacheKey, audio);
      return audio;
    } catch (e) {
      throw UMesseErrorFromApiFactory(e);
    }
  };

  const downloadById = async (id: string, category: string) => {
    const cacheKey = `audioService/getById/${category}/${id}`;
    const cacheData = audioCache.get(cacheKey);
    if (cacheData) return cacheData;
    try {
      const resourcesRepositoryResponse = await resourcesRepository.getSignedUrl(id, category);
      return resourcesRepositoryResponse.data.url;
    } catch (e) {
      throw UMesseErrorFromApiFactory(e);
    }
  };

  return {
    getById,
    getByUrl,
    downloadById,
  };
}
