import * as FormatDate from "@/utils/FormatDate";

describe("convertDatestringToDateのテスト", () => {
  const datas = [
    {
      dateString: "2021-01-01T01:01:01+09:00",
      expected: "2021/01/01",
    },
    {
      dateString: "2021-01-01",
      expected: "2021/01/01",
    },
    {
      dateString: "2021-01-01 01:01:01",
      expected: "2021/01/01",
    }
  ];
  datas.forEach((v) => {
    test(`引数に${v.dateString}を渡すと${v.expected}が返ること`, () => {
      expect(FormatDate.convertDatestringToDate(v.dateString)).toBe(v.expected);
    });
  });
});

describe("convertDatestringToDateJpのテスト", () => {
  const datas = [
    {
      dateString: "2021-01-01T01:01:01+09:00",
      expected: "2021年01月01日",
    },
    {
      dateString: "2021-01-01",
      expected: "2021年01月01日",
    },
    {
      dateString: "2021-12-01 12:01:01",
      expected: "2021年12月01日",
    }
  ];
  datas.forEach((v) => {
    test(`引数に${v.dateString}を渡すと${v.expected}が返ること`, () => {
      expect(FormatDate.convertDatestringToDateJp(v.dateString)).toBe(v.expected);
    });
  });
});

describe("convertNumberToTimeのテスト", () => {
  const datas = [
    {
      second: 0,
      expected: "00:00",
    },
    {
      second: 1,
      expected: "00:01",
    },
    {
      second: 59,
      expected: "00:59",
    },
    {
      second: 60,
      expected: "01:00",
    },
    {
      second: 3599,
      expected: "59:59",
    },
    {
      second: 3600,
      expected: "01:00:00",
    },
  ];
  datas.forEach((v) => {
    test(`引数に${v.second}を渡すと${v.expected}が返ること`, () => {
      expect(FormatDate.convertNumberToTime(v.second)).toBe(v.expected);
    });
  });
});