import LRUCache from 'lru-cache';
import { reactive } from 'vue'

export default function baseStore() {
  const state = reactive({
    isDarkTheme: false
  });

  const cache = new LRUCache({
    max: 50,
    maxAge: 1000 * 60 * 5 // 5分
  });

  return {
    get isDarkTheme() {
      return state.isDarkTheme
    },
    get cache() {
      return cache
    },
    toggleDarkTheme() {
      state.isDarkTheme = !state.isDarkTheme
    }
  }
}
export type BaseStore = ReturnType<typeof baseStore>;