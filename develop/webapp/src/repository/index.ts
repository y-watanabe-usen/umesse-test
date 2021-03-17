import * as umesseapi from "umesseapi";
import { config } from "@/repository/UMesseApiConfiguration";

const pingRepository = new umesseapi.PingApi(config);
const authRepository = new umesseapi.AuthApi(config);
const userRepository = new umesseapi.UserApi(config);
const cmRepository = new umesseapi.CmApi(config);
const recordingRepository = new umesseapi.RecordingApi(config);
const ttsRepository = new umesseapi.TtsApi(config);
const uploadRepository = new umesseapi.UploadApi(config);
const shareRepository = new umesseapi.ShareApi(config);
const resourcesRepository = new umesseapi.ResourcesApi(config);
const externalRepository = new umesseapi.ExternalApi(config);

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
  externalRepository
};