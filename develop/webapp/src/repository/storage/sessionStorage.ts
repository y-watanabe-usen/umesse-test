export const SESSION_STORAGE_KEY = {
  TUTORIAL: "TUTORIAL",
} as const;
export type SESSION_STORAGE_KEY = typeof SESSION_STORAGE_KEY[keyof typeof SESSION_STORAGE_KEY];

export class umesseSessionStorage {
  private storage: typeof sessionStorage;

  constructor() {
    this.storage = sessionStorage;
  }

  get(key: SESSION_STORAGE_KEY) {
    return this.storage.getItem(key);
  }

  set(key: SESSION_STORAGE_KEY, value: string) {
    this.storage.setItem(key, value);
  }
}
