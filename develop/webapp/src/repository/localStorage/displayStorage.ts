export const DISPLAY_STORAGE_KEYS = {
  VOICE_TEMPLATE_AAA: "void"
} as const;
export type DISPLAY_STORAGE_KEYS = typeof DISPLAY_STORAGE_KEYS[keyof typeof DISPLAY_STORAGE_KEYS];

export class DisplayStorage {
  constructor(private localStorage: Storage) { }

  get(key: DISPLAY_STORAGE_KEYS) {
    this.localStorage.getItem(key);
  }

  set(key: DISPLAY_STORAGE_KEYS, value: string) {
    this.localStorage.setItem(key, value);
  }

  remove(key: DISPLAY_STORAGE_KEYS) {
    this.localStorage.removeItem(key);
  }

  removeAll() {
    this.localStorage.clear();
  }
}

