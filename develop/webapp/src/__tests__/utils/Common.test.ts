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

describe("isFullWidthKanaのテスト", () => {
  const datas = [
    {
      text: "カタカナ", expected: true,
    },
    {
      text: "カ タ カ ナ", expected: true,
    },
    {
      text: "カ　タ　カ　ナ", expected: true,
    },
    {
      text: "かたかな", expected: false,
    },
    {
      text: "katakana", expected: false,
    },
    {
      text: "ｋａｔａｋａｎａ", expected: false,
    },
    {
      text: "ｶﾀｶﾅ", expected: false,
    },
    {
      text: "かたカナ", expected: false,
    },
  ];
  datas.forEach((v) => {
    test(`引数に${v.text}を渡すと${v.expected}が返ること`, () => {
      expect(Common.isFullWidthKana(v.text)).toBe(v.expected);
    });
  });
});

describe("isSpaceのテスト", () => {
  const datas = [
    {
      text: "　", expected: true,
    },
    {
      text: " ", expected: true,
    },
    {
      text: "　　　　", expected: true,
    },
    {
      text: "    ", expected: true,
    },
    {
      text: "test ", expected: false,
    },
    {
      text: " test", expected: false,
    },
    {
      text: "te st", expected: false,
    },
  ];
  datas.forEach((v) => {
    test(`引数に${v.text}を渡すと${v.expected}が返ること`, () => {
      expect(Common.isSpace(v.text)).toBe(v.expected);
    });
  });
});
