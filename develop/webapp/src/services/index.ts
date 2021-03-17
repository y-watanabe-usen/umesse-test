import { useResourcesService } from "./resourcesService";
import { useRecordingService } from "./recordingService";
import { useCmService } from "./cmService";
import { useTtsService } from "./ttsService";
import { cmRepository, recordingRepository, resourcesRepository, ttsRepository } from "@/repository/api";

const resourcesService = useResourcesService(resourcesRepository, recordingRepository, ttsRepository);
const recordingService = useRecordingService(recordingRepository);
const cmService = useCmService(cmRepository);
const ttsService = useTtsService(ttsRepository);

export { resourcesService, recordingService, cmService, ttsService };