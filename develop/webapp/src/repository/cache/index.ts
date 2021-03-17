import LRUCache from "lru-cache";

const audioCache = new LRUCache({
  max: 50,
  maxAge: 1000 * 60 * 5 // 5分
});

const freeCache = new LRUCache({
  max: 50,
  maxAge: 1000 * 60 * 60 // 60分
});

export { audioCache, freeCache };