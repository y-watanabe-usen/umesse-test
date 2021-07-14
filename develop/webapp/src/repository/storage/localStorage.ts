export const LOCAL_STORAGE_KEY= {
  DONT_SHOW_FOREVER_TUTORIAL: "DONT_SHOW_FOREVER_TUTORIAL"
} as const;
export type LOCAL_STORAGE_KEY = typeof LOCAL_STORAGE_KEY[keyof typeof LOCAL_STORAGE_KEY];

export class umesseLocalStorage {
  private storage: typeof localStorage;

  constructor() {
    this.storage = localStorage;
  }

  get(key: LOCAL_STORAGE_KEY) {
    return this.storage.getItem(key);
  }

  set(key: LOCAL_STORAGE_KEY, value: string) {
    this.storage.setItem(key, value);
  }
}
