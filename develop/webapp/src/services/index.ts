import { useResourcesService } from "@/services/resourcesService";
import { useRecordingService } from "@/services/recordingService";
import { useCmService } from "@/services/cmService";
import { useTtsService } from "./ttsService";
import { audioRepository, authRepository, cmRepository, recordingRepository, resourcesRepository, ttsRepository, userRepository, uploadRepository } from "@/repository/api";
import { useAudioService } from "@/services/audioService";
import { audioCache, cmCache, ttsCache } from "@/repository/cache";
import { useUserService } from "@/services/userService";
import { useUploadService } from "@/services/uploadService";
import { localStorage } from "@/repository/localStorage";

const userService = useUserService(authRepository, userRepository, localStorage);
const resourcesService = useResourcesService(resourcesRepository, recordingRepository, ttsRepository);
const recordingService = useRecordingService(resourcesRepository, recordingRepository);
const cmService = useCmService(cmRepository, cmCache);
const ttsService = useTtsService(ttsRepository, ttsCache);
const audioService = useAudioService(audioRepository, resourcesRepository, audioCache);
const uploadService = useUploadService(uploadRepository);

export { userService, resourcesService, recordingService, cmService, ttsService, audioService, uploadService };