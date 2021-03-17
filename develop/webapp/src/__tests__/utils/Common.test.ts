import * as Common from "@/utils/Common";

describe("isRecordingByIdのテスト", () => {
  const datas = [
    {
      id: "123456789-r-6rtlrvac", expected: true,
    },
    {
      id: "123456789-t-6rtlrvac", expected: false,
    },
  ];
  datas.forEach((v) => {
    test(`引数に${v.id}を渡すと${v.expected}が返ること`, () => {
      expect(Common.isRecordingById(v.id)).toBe(v.expected);
    });
  });
});

describe("isTtsByIdのテスト", () => {
  const datas = [
    {
      id: "123456789-r-6rtlrvac", expected: false,
    },
    {
      id: "123456789-t-6rtlrvac", expected: true,
    },
  ];
  datas.forEach((v) => {
    test(`引数に${v.id}を渡すと${v.expected}が返ること`, () => {
      expect(Common.isTtsById(v.id)).toBe(v.expected);
    });
  });
});
