import LRUCache from "lru-cache";

export class FreeCache {
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

  get(key: string) {
    return this.cache.get(key);
  }

  set(key: string, value: unknown) {
    this.cache.set(key, value);
  }

  remove(key: string) {
    this.cache.del(key);
  }
}