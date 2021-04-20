import { CmCache } from "@/repository/cache/cmCache";

const cmCache = new CmCache();

describe("removeOtherのテスト", () => {
  beforeEach(() => {
    cmCache.removeAll();
  });

  test(`cacheから引数以外のkeyが削除されること`, async () => {
    cmCache.set<string>("key1", "value1");
    cmCache.set<string>("key2", "value2");
    cmCache.set<string>("key3", "value3");
    cmCache.set<string>("key4", "value4");
    cmCache.set<string>("key5", "value5");

    cmCache.removeOther("key3");

    expect(cmCache.get<string|null>("key1")).toBe(null);
  });
});
