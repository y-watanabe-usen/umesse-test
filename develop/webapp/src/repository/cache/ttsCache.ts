import LRUCache from "lru-cache";

export class TtsCache {
  private cache: LRUCache<string, unknown>;

  constructor() {
    this.cache = new LRUCache<string, unknown>({
      max: 50,
      maxAge: 1000 * 60 * 60 // 60分
    });
  }

  has(key: string) {
    return this.cache.has(key);
  }

  get<T>(key: string) {
    return <T>this.cache.get(key);
  }

  set<T>(key: string, value: T) {
    this.cache.set(key, value);
  }

  remove(key: string) {
    this.cache.del(key);
  }

  removeAll() {
    this.cache.reset();
  }
}