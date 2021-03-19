import { AxiosInstance, AxiosResponse } from "axios";

export class AudioRepository {

  constructor(private axios: AxiosInstance) {
    this.axios = axios;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async download(url: string): Promise<AxiosResponse<ArrayBuffer>> {
    const response = await this.axios
      .get<ArrayBuffer>(url, {
        headers: {
          "accept": "audio/mpeg",
        },
        responseType: "arraybuffer",
      });
    return response;
  }
}
