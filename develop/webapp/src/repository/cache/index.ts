import { AudioCache } from "./audioCache";
import { CmCache } from "./cmCache";
import { TtsCache } from "./ttsCache";
import { DisplayCache } from "./displayCache";

const audioCache = new AudioCache();
const cmCache = new CmCache();
const ttsCache = new TtsCache();
const displayCache = new DisplayCache();

export { audioCache, cmCache, ttsCache, displayCache };