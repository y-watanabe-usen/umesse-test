import { useResourcesService } from "./resourcesService";
import { useRecordingService } from "./recordingService";
import { useCmService } from "./cmService";
import { useTtsService } from "./ttsService";
import { audioRepository, authRepository, cmRepository, recordingRepository, resourcesRepository, ttsRepository, userRepository, uploadRepository } from "@/repository/api";
import { useAudioService } from "./audioService";
import { audioCache, cmCache, ttsCache } from "@/repository/cache";
import { useUserService } from "./userService";
import { useUploadService } from "./uploadService";

const audioContext = new AudioContext();
const fileReader = new FileReader();

const userService = useUserService(authRepository, userRepository);
const resourcesService = useResourcesService(resourcesRepository, recordingRepository, ttsRepository);
const recordingService = useRecordingService(recordingRepository, fileReader);
const cmService = useCmService(cmRepository, cmCache);
const ttsService = useTtsService(ttsRepository, ttsCache);
const audioService = useAudioService(audioRepository, resourcesRepository, audioCache, audioContext);
const uploadService = useUploadService(uploadRepository);

export { userService, resourcesService, recordingService, cmService, ttsService, audioService, uploadService };