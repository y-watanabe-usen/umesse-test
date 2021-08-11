import { TtsCache } from "@/repository/cache/ttsCache";

const ttsCache = new TtsCache();

describe("removeOtherのテスト", () => {
  beforeEach(() => {
    ttsCache.removeAll();
  });

  test(`cacheから引数以外のkeyが削除されること`, async () => {
    ttsCache.set<string>("key1", "value1");
    ttsCache.set<string>("key2", "value2");
    ttsCache.set<string>("key3", "value3");
    ttsCache.set<string>("key4", "value4");
    ttsCache.set<string>("key5", "value5");

    ttsCache.removeOther("key3");

    expect(ttsCache.get<string|undefined>("key1")).toBe(undefined);
    expect(ttsCache.get<string|undefined>("key2")).toBe(undefined);
    expect(ttsCache.get<string|undefined>("key3")).toBe("value3");
    expect(ttsCache.get<string|undefined>("key4")).toBe(undefined);
    expect(ttsCache.get<string|undefined>("key5")).toBe(undefined);
  });
});
