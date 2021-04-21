import { AudioCache } from "@/repository/cache/audioCache";
import { CmCache } from "@/repository/cache/cmCache";
import { TtsCache } from "@/repository/cache/ttsCache";
import { DisplayCache } from "@/repository/cache/displayCache";

const audioCache = new AudioCache();
const cmCache = new CmCache();
const ttsCache = new TtsCache();
const displayCache = new DisplayCache();

export { audioCache, cmCache, ttsCache, displayCache };