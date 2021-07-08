export const LOCAL_STORAGE_KEY= {
  TUTORIAL: "TUTORIAL"
} as const;
export type LOCAL_STORAGE_KEY = typeof LOCAL_STORAGE_KEY[keyof typeof LOCAL_STORAGE_KEY];

export class umesseLocalStorage {
  private storage: typeof localStorage;

  constructor() {
    this.storage = localStorage;
  }

  get(key: string) {
    return this.storage.getItem(key);
  }

  set(key: string, value: string) {
    this.storage.setItem(key, value);
  }
}
