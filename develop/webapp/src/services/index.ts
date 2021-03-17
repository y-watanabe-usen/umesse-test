import { useResourcesService } from "./resourcesService";
import { useRecordingService } from "./recordingService";
import { useCmService } from "./cmService";
import { useTtsService } from "./ttsService";
import { audioRepository, cmRepository, recordingRepository, resourcesRepository, ttsRepository } from "@/repository/api";
import { useAudioService } from "./audioService";

const resourcesService = useResourcesService(resourcesRepository, recordingRepository, ttsRepository);
const recordingService = useRecordingService(recordingRepository);
const cmService = useCmService(cmRepository);
const ttsService = useTtsService(ttsRepository);
const audioService = useAudioService(audioRepository);

export { resourcesService, recordingService, cmService, ttsService, audioService };