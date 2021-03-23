import { useResourcesService } from "./resourcesService";
import { useRecordingService } from "./recordingService";
import { useCmService } from "./cmService";
import { useTtsService } from "./ttsService";
import { audioRepository, authRepository, cmRepository, recordingRepository, resourcesRepository, ttsRepository, userRepository } from "@/repository/api";
import { useAudioService } from "./audioService";
import { audioCache } from "@/repository/cache";
import { useUserService } from "./userService";

const audioContext = new AudioContext();

const userService = useUserService(authRepository, userRepository);
const resourcesService = useResourcesService(resourcesRepository, recordingRepository, ttsRepository);
const recordingService = useRecordingService(recordingRepository);
const cmService = useCmService(cmRepository);
const ttsService = useTtsService(ttsRepository);
const audioService = useAudioService(audioRepository, resourcesRepository, audioCache, audioContext);

export { userService, resourcesService, recordingService, cmService, ttsService, audioService };