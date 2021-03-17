import { UMesseErrorFromApiFactory } from "@/models/UMesseError";
import { AudioRepository } from "@/repository/api/audioRepositry";
import LRUCache from "lru-cache";
import { ResourcesApi } from "umesseapi";

export function useAudioService(
  audioRepository: AudioRepository,
  resourcesRepository: ResourcesApi,
  audioCache: LRUCache<unknown, unknown>
) {

  const ctx = new AudioContext();

  const getAudioById = async (id: string, category: string) => {
    const cacheKey = `audioService/downloadById/${category}/${id}`;
    if (audioCache.has(cacheKey)) {
      return <AudioBuffer>audioCache.get(cacheKey);
    }
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

  const getAudioByUrl = async (url: string) => {
    const cacheKey = `audioService/downloadById/${url}`;
    if (audioCache.has(cacheKey)) {
      return <AudioBuffer>audioCache.get(cacheKey);
    }
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
    getAudioById,
    getAudioByUrl,
  };
}
