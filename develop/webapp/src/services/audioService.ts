import { UMesseErrorFromApiFactory } from "@/models/UMesseError";
import { AudioRepository } from "@/repository/api/audioRepositry";

export function useAudioService(
  audioRepository: AudioRepository,
) {

  const ctx = new AudioContext();

  const download = async (url: string) => {
    try {
      const response = await audioRepository.download(url);
      const audio = await ctx.decodeAudioData(response.data);
      return audio;
    } catch (e) {
      throw UMesseErrorFromApiFactory(e);
    }
  };

  return {
    download
  };
}
