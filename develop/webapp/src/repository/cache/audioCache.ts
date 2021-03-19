import LRUCache from "lru-cache";

export class AudioCache {
  private cache: LRUCache<string, AudioBuffer>;

  constructor() {
    this.cache = new LRUCache<string, AudioBuffer>({
      max: 50,
      maxAge: 1000 * 60 * 5 // 5分
    });
  }

  has(key: string) {
    return this.cache.has(key);
  }

  get(key: string) {
    return this.cache.get(key);
  }

  set(key: string, value: AudioBuffer) {
    this.cache.set(key, value);
  }

  remove(key: string) {
    this.cache.del(key);
  }

  removeAll() {
    this.cache.reset();
  }
}