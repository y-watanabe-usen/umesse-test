import { useResourcesService } from "./resourcesService";
import { useRecordingService } from "./recordingService";
import { useCmService } from "./cmService";
import { useTtsService } from "./ttsService";
import { audioRepository, cmRepository, recordingRepository, resourcesRepository, ttsRepository } from "@/repository/api";
import { useAudioService } from "./audioService";
import { audioCache } from "@/repository/cache";

const resourcesService = useResourcesService(resourcesRepository, recordingRepository, ttsRepository);
const recordingService = useRecordingService(recordingRepository);
const cmService = useCmService(cmRepository);
const ttsService = useTtsService(ttsRepository);
const audioService = useAudioService(audioRepository, resourcesRepository, audioCache);

export { resourcesService, recordingService, cmService, ttsService, audioService };