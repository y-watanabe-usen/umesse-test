import { AudioCache } from "./audioCache";
import { FreeCache } from "./freeCache";

const audioCache = new AudioCache();
const freeCache = new FreeCache();

export { audioCache, freeCache };