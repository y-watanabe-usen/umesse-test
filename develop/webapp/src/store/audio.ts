import { reactive } from 'vue';
import axios from "axios";

export interface audioState {
  isDownloading: boolean,
  audioBuffer: AudioBuffer | undefined,
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function audioStore() {

  const state = reactive<audioState>({
    isDownloading: false,
    audioBuffer: undefined,
  });

  const ctx = new AudioContext();

  return {
    get audioBuffer() {
      return state.audioBuffer;
    },
    get isDownloading() {
      return state.isDownloading;
    },

    async download(signedUrl: string) {
      state.isDownloading = true;
      try {
        const response = await axios
          .get(signedUrl, {
            headers: {
              "accept": "audio/mpeg",
            },
            responseType: "arraybuffer",
          });
        state.audioBuffer = await ctx.decodeAudioData(response.data);
      } catch (error) {
        console.log("error");
      }
      state.isDownloading = false;
    },
  };
}

export type AudioStore = ReturnType<typeof audioStore>;