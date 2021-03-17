import { AxiosInstance } from "axios";

export class AudioRepository {

  constructor(private axios: AxiosInstance) {
    this.axios = axios;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async download(url: string): Promise<any> {
    try {
      const response = await this.axios
        .get(url, {
          headers: {
            "accept": "audio/mpeg",
          },
          responseType: "arraybuffer",
        });
      return response;
    } catch (error) {
      console.log("error");
    }
  }
}