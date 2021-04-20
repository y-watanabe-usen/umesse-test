import { AudioCache } from "./audioCache";
import { FreeCache } from "./freeCache";
import { DisplayCache } from "./displayCache";

const audioCache = new AudioCache();
const freeCache = new FreeCache();
const displayCache = new DisplayCache();

export { audioCache, freeCache, displayCache };