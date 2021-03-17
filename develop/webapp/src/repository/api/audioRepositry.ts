import { AxiosInstance } from "axios";

export class AudioRepository {
  readonly ctx = new AudioContext();

  constructor(private axios: AxiosInstance) {
    this.axios = axios;
  }

  async download(url: string) {
    try {
      const response = await this.axios
        .get(url, {
          headers: {
            "accept": "audio/mpeg",
          },
          responseType: "arraybuffer",
        });
      return await this.ctx.decodeAudioData(response.data);
    } catch (error) {
      console.log("error");
    }
  }
}