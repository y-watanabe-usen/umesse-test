import validator from "@/utils/validator";

describe("isFullWidthKanaのテスト", () => {
  const datas = [
    { text: "カタカナ", expected: true },
    { text: "カ タ カ ナ", expected: true },
    { text: "カ　タ　カ　ナ", expected: true, },
    { text: "かたかな", expected: false },
    { text: "katakana", expected: false, },
    { text: "ｋａｔａｋａｎａ", expected: false, },
    { text: "ｶﾀｶﾅ", expected: false, },
    { text: "かたカナ", expected: false, },
  ];
  datas.forEach((v) => {
    test(`引数に${v.text}を渡すと${v.expected}が返ること`, () => {
      expect(validator.isFullWidthKana(v.text)).toBe(v.expected);
    });
  });
});

describe("isEmptyのテスト", () => {
  const datas = [
    { text: "", expected: true, },
    { text: "　", expected: false, },
    { text: " ", expected: false, },
    { text: "　　　　", expected: false, },
    { text: "    ", expected: false, },
    { text: "test ", expected: false, },
    { text: " test", expected: false, },
    { text: "te st", expected: false, },
  ];
  datas.forEach((v) => {
    test(`引数に"${v.text}"を渡すと${v.expected}が返ること`, () => {
      expect(validator.isEmpty(v.text)).toBe(v.expected);
    });
  });
});
