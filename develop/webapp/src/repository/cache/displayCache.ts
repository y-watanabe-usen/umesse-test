import LRUCache from "lru-cache";

export const DISPLAY_CACHE_KEY = {
  VOICE_TEMPLATE_INDEX_INDUSTRY_CD: "VOICE_TEMPLATE_INDEX_INDUSTRY_CD",
  VOICE_TEMPLATE_INDEX_SCENE_CD: "VOICE_TEMPLATE_INDEX_SCENE_CD",
  VOICE_TEMPLATE_INDEX_TEMPLATES: "VOICE_TEMPLATE_INDEX_TEMPLATES",
  VOICE_TEMPLATE_INDEX_SCENES: "VOICE_TEMPLATE_INDEX_SCENES",
  VOICE_TEMPLATE_INDEX_SORT: "VOICE_TEMPLATE_INDEX_SORT",
  VOICE_TEMPLATE_INDEX_SELECT_TEMPLATE: "VOICE_TEMPLATE_INDEX_SELECT_TEMPLATE",
  VOICE_FREE_INDEX_SELECT_TEXT: "VOICE_FREE_INDEX_SELECT_TEXT",
} as const;
export type DISPLAY_CACHE_KEY = typeof DISPLAY_CACHE_KEY[keyof typeof DISPLAY_CACHE_KEY];

export class DisplayCache {
  private cache: LRUCache<DISPLAY_CACHE_KEY, unknown>;

  constructor() {
    this.cache = new LRUCache<DISPLAY_CACHE_KEY, unknown>({
      max: 50,
      maxAge: 1000 * 60 * 60 // 60分
    });
  }

  has(key: DISPLAY_CACHE_KEY) {
    return this.cache.has(key);
  }

  get<T>(key: DISPLAY_CACHE_KEY) {
    return <T>this.cache.get(key);
  }

  set<T>(key: DISPLAY_CACHE_KEY, value: T) {
    this.cache.set(key, value);
  }

  remove(key: DISPLAY_CACHE_KEY) {
    this.cache.del(key);
  }

  removeAll() {
    this.cache.reset();
  }
}