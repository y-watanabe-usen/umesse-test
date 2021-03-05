import LRUCache from "lru-cache";

class UMesseCache {
  private static _instance: UMesseCache;

  private _audioCache: LRUCache<unknown, unknown>
  private _freeCache: LRUCache<unknown, unknown>

  private constructor() {
    this._audioCache = new LRUCache({
      max: 50,
      maxAge: 1000 * 60 * 5 // 5分
    });
    this._freeCache = new LRUCache({
      max: 50,
      maxAge: 1000 * 60 * 60 // 60分
    });
  }

  get audioCache() {
    return this._audioCache;
  }
  get freeCache() {
    return this._freeCache;
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }
}

export default UMesseCache.instance;