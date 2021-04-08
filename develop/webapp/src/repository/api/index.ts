import * as umesseapi from "umesseapi";
import { config } from "@/repository/api/UMesseApiConfiguration";
import axios from "@/repository/api/axiosInstance";
import { AudioRepository } from "./audioRepositry";

const pingRepository = new umesseapi.PingApi(config, config.basePath, axios);
const authRepository = new umesseapi.AuthApi(config, config.basePath, axios);
const userRepository = new umesseapi.UserApi(config, config.basePath, axios);
const cmRepository = new umesseapi.CmApi(config, config.basePath, axios);
const recordingRepository = new umesseapi.RecordingApi(config, config.basePath, axios);
const ttsRepository = new umesseapi.TtsApi(config, config.basePath, axios);
const uploadRepository = new umesseapi.UploadApi(config, config.basePath, axios);
const shareRepository = new umesseapi.ShareApi(config, config.basePath, axios);
const resourcesRepository = new umesseapi.ResourcesApi(config, config.basePath, axios);
const externalRepository = new umesseapi.ExternalApi(config, config.basePath, axios);
const audioRepository = new AudioRepository(axios);

export {
  pingRepository,
  authRepository,
  userRepository,
  cmRepository,
  recordingRepository,
  ttsRepository,
  uploadRepository,
  shareRepository,
  resourcesRepository,
  externalRepository,
  audioRepository,
};