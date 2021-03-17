import { UMesseErrorFromApiFactory } from "@/models/UMesseError";
import { AudioRepository } from "@/repository/api/audioRepositry";
import { AudioCache } from "@/repository/cache/audioCache";
import { ResourcesApi } from "umesseapi";

export function useAudioService(
  audioRepository: AudioRepository,
  resourcesRepository: ResourcesApi,
  audioCache: AudioCache
) {

  const ctx = new AudioContext();

  const getById = async (id: string, category: string) => {
    const cacheKey = `audioService/downloadById/${category}/${id}`;
    const cacheData = audioCache.get(cacheKey);
    if (cacheData) return cacheData;
    try {
      const resourcesRepositoryResponse = await resourcesRepository.getSignedUrl(id, category);
      const audioRepositoryResponse = await audioRepository.download(resourcesRepositoryResponse.data.url);
      const audio = await ctx.decodeAudioData(audioRepositoryResponse.data);
      audioCache.set(cacheKey, audio);
      return audio;
    } catch (e) {
      throw UMesseErrorFromApiFactory(e);
    }
  };

  const getByUrl = async (url: string) => {
    const cacheKey = `audioService/getAudioByUrl/${url}`;
    const cacheData = audioCache.get(cacheKey);
    if (cacheData) return cacheData;
    try {
      const audioRepositoryResponse = await audioRepository.download(url);
      const audio = await ctx.decodeAudioData(audioRepositoryResponse.data);
      audioCache.set(cacheKey, audio);
      return audio;
    } catch (e) {
      throw UMesseErrorFromApiFactory(e);
    }
  };

  return {
    getById,
    getByUrl,
  };
}
