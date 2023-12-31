import * as common from "@/utils/common";
import Constants from "@/utils/constants";

describe("getNarrationIndustriesのテスト", () => {
  const expected = [
    { cd: "02", name: "ユーザー作成音声", sort: 2 },
    { cd: "10", name: "飲食店向け", sort: 3 },
    { cd: "20", name: "サービス業向け", sort: 4 },
    { cd: "30", name: "小売店向け", sort: 5 },
    { cd: "31", name: "スーパー／ドラッグ／量販店向け", sort: 6 },
    { cd: "40", name: "医療／福祉向け", sort: 7 },
    { cd: "50", name: "オフィス／事務所／教育機関向け", sort: 8 },
    { cd: "51", name: "金融機関向け", sort: 9 },
    { cd: "90", name: "施設向け", sort: 10 },
    { cd: "99", name: "全業種", sort: 11 },
  ];
  test(`指定（02, 10, 20, 30, 31, 40, 50, 51, 90, 99）の業種一覧が返ること`, () => {
    expect(common.getNarrationIndustries()).toEqual(expected);
  });
});

describe("getIndustryScenesのテスト", () => {
  const datas = [
    {
      industryCd: "02",
      expected: [
        { cd: "901", name: "過去に録音した素材" },
        { cd: "902", name: "過去に音声合成した素材" },
      ],
    },
    {
      industryCd: "10",
      expected: [
        { cd: "004", name: "開店" },
        { cd: "005", name: "閉店" },
        { cd: "007", name: "案内" },
        { cd: "008", name: "年末営業告知" },
        { cd: "009", name: "年始営業告知" },
        { cd: "010", name: "年中行事販促" },
        { cd: "011", name: "時報" },
        { cd: "012", name: "営業時間案内" },
        { cd: "013", name: "駐車場" },
        { cd: "014", name: "カード" },
        { cd: "015", name: "注意・禁止" },
        { cd: "018", name: "防犯" },
        { cd: "019", name: "エコ推奨" },
        { cd: "022", name: "セール" },
        { cd: "048", name: "催事" },
        { cd: "051", name: "営業終了案内" },
        { cd: "052", name: "コロナ関連" },
      ],
    },
    {
      industryCd: "20",
      expected: [
        { cd: "004", name: "開店" },
        { cd: "005", name: "閉店" },
        { cd: "007", name: "案内" },
        { cd: "008", name: "年末営業告知" },
        { cd: "009", name: "年始営業告知" },
        { cd: "011", name: "時報" },
        { cd: "012", name: "営業時間案内" },
        { cd: "013", name: "駐車場" },
        { cd: "014", name: "カード" },
        { cd: "015", name: "注意・禁止" },
        { cd: "018", name: "防犯" },
        { cd: "019", name: "エコ推奨" },
        { cd: "045", name: "整理・清掃" },
        { cd: "051", name: "営業終了案内" },
        { cd: "052", name: "コロナ関連" },
      ],
    },
    {
      industryCd: "30",
      expected: [
        { cd: "004", name: "開店" },
        { cd: "005", name: "閉店" },
        { cd: "007", name: "案内" },
        { cd: "008", name: "年末営業告知" },
        { cd: "009", name: "年始営業告知" },
        { cd: "010", name: "年中行事販促" },
        { cd: "011", name: "時報" },
        { cd: "012", name: "営業時間案内" },
        { cd: "013", name: "駐車場" },
        { cd: "014", name: "カード" },
        { cd: "015", name: "注意・禁止" },
        { cd: "018", name: "防犯" },
        { cd: "019", name: "エコ推奨" },
        { cd: "020", name: "ＡＴＭ注意事項" },
        { cd: "022", name: "セール" },
        { cd: "036", name: "バス時間" },
        { cd: "048", name: "催事" },
        { cd: "051", name: "営業終了案内" },
        { cd: "052", name: "コロナ関連" },
      ],
    },
    {
      industryCd: "31",
      expected: [
        { cd: "004", name: "開店" },
        { cd: "005", name: "閉店" },
        { cd: "007", name: "案内" },
        { cd: "008", name: "年末営業告知" },
        { cd: "009", name: "年始営業告知" },
        { cd: "010", name: "年中行事販促" },
        { cd: "011", name: "時報" },
        { cd: "012", name: "営業時間案内" },
        { cd: "013", name: "駐車場" },
        { cd: "014", name: "カード" },
        { cd: "015", name: "注意・禁止" },
        { cd: "018", name: "防犯" },
        { cd: "019", name: "エコ推奨" },
        { cd: "020", name: "ＡＴＭ注意事項" },
        { cd: "022", name: "セール" },
        { cd: "036", name: "バス時間" },
        { cd: "051", name: "営業終了案内" },
        { cd: "052", name: "コロナ関連" },
      ],
    },
    {
      industryCd: "40",
      expected: [
        { cd: "007", name: "案内" },
        { cd: "008", name: "年末営業告知" },
        { cd: "009", name: "年始営業告知" },
        { cd: "011", name: "時報" },
        { cd: "012", name: "営業時間案内" },
        { cd: "013", name: "駐車場" },
        { cd: "015", name: "注意・禁止" },
        { cd: "018", name: "防犯" },
        { cd: "021", name: "体操" },
        { cd: "023", name: "起床・消灯" },
        { cd: "024", name: "食事" },
        { cd: "025", name: "入浴" },
        { cd: "026", name: "面会" },
        { cd: "027", name: "受付" },
        { cd: "028", name: "診察" },
        { cd: "029", name: "回診" },
        { cd: "030", name: "イベント" },
        { cd: "031", name: "レクリエーション" },
        { cd: "032", name: "検診案内" },
        { cd: "033", name: "通年健康情報" },
        { cd: "034", name: "季節健康情報" },
        { cd: "035", name: "歯科向け" },
        { cd: "036", name: "バス時間" },
        { cd: "037", name: "朝礼・終礼" },
        { cd: "045", name: "整理・清掃" },
        { cd: "052", name: "コロナ関連" },
      ],
    },
    {
      industryCd: "50",
      expected: [
        { cd: "007", name: "案内" },
        { cd: "011", name: "時報" },
        { cd: "015", name: "注意・禁止" },
        { cd: "021", name: "体操" },
        { cd: "036", name: "バス時間" },
        { cd: "037", name: "朝礼・終礼" },
        { cd: "038", name: "業務時間" },
        { cd: "039", name: "作業時間" },
        { cd: "040", name: "休憩・昼休み" },
        { cd: "041", name: "集荷時間" },
        { cd: "042", name: "会議" },
        { cd: "043", name: "工場見学" },
        { cd: "044", name: "身なり・衛生" },
        { cd: "045", name: "整理・清掃" },
        { cd: "046", name: "注意・心がけ" },
        { cd: "047", name: "禁止事項" },
        { cd: "052", name: "コロナ関連" },
      ],
    },
    {
      industryCd: "51",
      expected: [
        { cd: "004", name: "開店" },
        { cd: "007", name: "案内" },
        { cd: "008", name: "年末営業告知" },
        { cd: "009", name: "年始営業告知" },
        { cd: "011", name: "時報" },
        { cd: "012", name: "営業時間案内" },
        { cd: "013", name: "駐車場" },
        { cd: "015", name: "注意・禁止" },
        { cd: "018", name: "防犯" },
        { cd: "020", name: "ＡＴＭ注意事項" },
        { cd: "021", name: "体操" },
        { cd: "037", name: "朝礼・終礼" },
        { cd: "051", name: "営業終了案内" },
        { cd: "052", name: "コロナ関連" },
      ],
    },
    {
      industryCd: "90",
      expected: [
        { cd: "004", name: "開店" },
        { cd: "005", name: "閉店" },
        { cd: "007", name: "案内" },
        { cd: "008", name: "年末営業告知" },
        { cd: "009", name: "年始営業告知" },
        { cd: "011", name: "時報" },
        { cd: "012", name: "営業時間案内" },
        { cd: "013", name: "駐車場" },
        { cd: "014", name: "カード" },
        { cd: "015", name: "注意・禁止" },
        { cd: "018", name: "防犯" },
        { cd: "019", name: "エコ推奨" },
        { cd: "020", name: "ＡＴＭ注意事項" },
        { cd: "021", name: "体操" },
        { cd: "022", name: "セール" },
        { cd: "036", name: "バス時間" },
        { cd: "037", name: "朝礼・終礼" },
        { cd: "048", name: "催事" },
        { cd: "049", name: "風営法" },
        { cd: "050", name: "営業開始案内" },
        { cd: "051", name: "営業終了案内" },
        { cd: "052", name: "コロナ関連" },
      ],
    },
    {
      industryCd: "99",
      expected: [
        { cd: "004", name: "開店" },
        { cd: "005", name: "閉店" },
        { cd: "007", name: "案内" },
        { cd: "008", name: "年末営業告知" },
        { cd: "009", name: "年始営業告知" },
        { cd: "010", name: "年中行事販促" },
        { cd: "011", name: "時報" },
        { cd: "012", name: "営業時間案内" },
        { cd: "013", name: "駐車場" },
        { cd: "014", name: "カード" },
        { cd: "015", name: "注意・禁止" },
        { cd: "018", name: "防犯" },
        { cd: "019", name: "エコ推奨" },
        { cd: "020", name: "ＡＴＭ注意事項" },
        { cd: "021", name: "体操" },
        { cd: "022", name: "セール" },
        { cd: "023", name: "起床・消灯" },
        { cd: "024", name: "食事" },
        { cd: "025", name: "入浴" },
        { cd: "026", name: "面会" },
        { cd: "027", name: "受付" },
        { cd: "028", name: "診察" },
        { cd: "029", name: "回診" },
        { cd: "030", name: "イベント" },
        { cd: "031", name: "レクリエーション" },
        { cd: "032", name: "検診案内" },
        { cd: "033", name: "通年健康情報" },
        { cd: "034", name: "季節健康情報" },
        { cd: "035", name: "歯科向け" },
        { cd: "036", name: "バス時間" },
        { cd: "037", name: "朝礼・終礼" },
        { cd: "038", name: "業務時間" },
        { cd: "039", name: "作業時間" },
        { cd: "040", name: "休憩・昼休み" },
        { cd: "041", name: "集荷時間" },
        { cd: "042", name: "会議" },
        { cd: "043", name: "工場見学" },
        { cd: "044", name: "身なり・衛生" },
        { cd: "045", name: "整理・清掃" },
        { cd: "046", name: "注意・心がけ" },
        { cd: "047", name: "禁止事項" },
        { cd: "048", name: "催事" },
        { cd: "049", name: "風営法" },
        { cd: "050", name: "営業開始案内" },
        { cd: "051", name: "営業終了案内" },
        { cd: "052", name: "コロナ関連" },
      ],
    },
    {
      industryCd: "03",
      expected: [
        { cd: "004", name: "開店" },
        { cd: "005", name: "閉店" },
        { cd: "007", name: "案内" },
        { cd: "008", name: "年末営業告知" },
        { cd: "009", name: "年始営業告知" },
        { cd: "010", name: "年中行事販促" },
        { cd: "011", name: "時報" },
        { cd: "012", name: "営業時間案内" },
        { cd: "013", name: "駐車場" },
        { cd: "014", name: "カード" },
        { cd: "015", name: "注意・禁止" },
        { cd: "018", name: "防犯" },
        { cd: "019", name: "エコ推奨" },
        { cd: "020", name: "ＡＴＭ注意事項" },
        { cd: "021", name: "体操" },
        { cd: "022", name: "セール" },
        { cd: "023", name: "起床・消灯" },
        { cd: "024", name: "食事" },
        { cd: "025", name: "入浴" },
        { cd: "026", name: "面会" },
        { cd: "027", name: "受付" },
        { cd: "028", name: "診察" },
        { cd: "029", name: "回診" },
        { cd: "030", name: "イベント" },
        { cd: "031", name: "レクリエーション" },
        { cd: "032", name: "検診案内" },
        { cd: "033", name: "通年健康情報" },
        { cd: "034", name: "季節健康情報" },
        { cd: "035", name: "歯科向け" },
        { cd: "036", name: "バス時間" },
        { cd: "037", name: "朝礼・終礼" },
        { cd: "038", name: "業務時間" },
        { cd: "039", name: "作業時間" },
        { cd: "040", name: "休憩・昼休み" },
        { cd: "041", name: "集荷時間" },
        { cd: "042", name: "会議" },
        { cd: "043", name: "工場見学" },
        { cd: "044", name: "身なり・衛生" },
        { cd: "045", name: "整理・清掃" },
        { cd: "046", name: "注意・心がけ" },
        { cd: "047", name: "禁止事項" },
        { cd: "048", name: "催事" },
        { cd: "049", name: "風営法" },
        { cd: "050", name: "営業開始案内" },
        { cd: "051", name: "営業終了案内" },
        { cd: "052", name: "コロナ関連" },
      ],
    },
  ];
  datas.forEach((v) => {
    test(`引数に画面種別ナレーションと${v.industryCd}を渡すと${v.industryCd}に紐づくシーン一覧が返ること`, () => {
      expect(common.getIndustryScenes(Constants.DISPLAY_NARRATION,v.industryCd)).toEqual(v.expected);
    });
  });
});

describe("getIndustryScenesのテスト", () => {
  const datas = [
    {
      industryCd: "02",
      expected: [
        { cd: "901", name: "過去に録音した素材" },
        { cd: "902", name: "過去に音声合成した素材" },
      ],
    },
    {
      industryCd: "10",
      expected: [
        { cd: "004", name: "開店" },
        { cd: "005", name: "閉店" },
        { cd: "007", name: "案内" },
        { cd: "008", name: "年末営業告知" },
        { cd: "009", name: "年始営業告知" },
        { cd: "010", name: "年中行事販促" },
        { cd: "011", name: "時報" },
        { cd: "012", name: "営業時間案内" },
        { cd: "013", name: "駐車場" },
        { cd: "014", name: "カード" },
        { cd: "015", name: "注意・禁止" },
        { cd: "018", name: "防犯" },
        { cd: "019", name: "エコ推奨" },
        { cd: "022", name: "セール" },
        { cd: "048", name: "催事" },
        { cd: "051", name: "営業終了案内" },
        { cd: "052", name: "コロナ関連" },
      ],
    },
    {
      industryCd: "20",
      expected: [
        { cd: "004", name: "開店" },
        { cd: "005", name: "閉店" },
        { cd: "007", name: "案内" },
        { cd: "008", name: "年末営業告知" },
        { cd: "009", name: "年始営業告知" },
        { cd: "011", name: "時報" },
        { cd: "012", name: "営業時間案内" },
        { cd: "013", name: "駐車場" },
        { cd: "014", name: "カード" },
        { cd: "015", name: "注意・禁止" },
        { cd: "018", name: "防犯" },
        { cd: "019", name: "エコ推奨" },
        { cd: "045", name: "整理・清掃" },
        { cd: "051", name: "営業終了案内" },
        { cd: "052", name: "コロナ関連" },
      ],
    },
    {
      industryCd: "30",
      expected: [
        { cd: "004", name: "開店" },
        { cd: "005", name: "閉店" },
        { cd: "007", name: "案内" },
        { cd: "008", name: "年末営業告知" },
        { cd: "009", name: "年始営業告知" },
        { cd: "010", name: "年中行事販促" },
        { cd: "011", name: "時報" },
        { cd: "012", name: "営業時間案内" },
        { cd: "013", name: "駐車場" },
        { cd: "014", name: "カード" },
        { cd: "015", name: "注意・禁止" },
        { cd: "018", name: "防犯" },
        { cd: "019", name: "エコ推奨" },
        { cd: "020", name: "ＡＴＭ注意事項" },
        { cd: "022", name: "セール" },
        { cd: "036", name: "バス時間" },
        { cd: "048", name: "催事" },
        { cd: "051", name: "営業終了案内" },
        { cd: "052", name: "コロナ関連" },
      ],
    },
    {
      industryCd: "31",
      expected: [
        { cd: "004", name: "開店" },
        { cd: "005", name: "閉店" },
        { cd: "007", name: "案内" },
        { cd: "008", name: "年末営業告知" },
        { cd: "009", name: "年始営業告知" },
        { cd: "010", name: "年中行事販促" },
        { cd: "011", name: "時報" },
        { cd: "012", name: "営業時間案内" },
        { cd: "013", name: "駐車場" },
        { cd: "014", name: "カード" },
        { cd: "015", name: "注意・禁止" },
        { cd: "018", name: "防犯" },
        { cd: "019", name: "エコ推奨" },
        { cd: "020", name: "ＡＴＭ注意事項" },
        { cd: "022", name: "セール" },
        { cd: "036", name: "バス時間" },
        { cd: "051", name: "営業終了案内" },
        { cd: "052", name: "コロナ関連" },
      ],
    },
    {
      industryCd: "40",
      expected: [
        { cd: "007", name: "案内" },
        { cd: "008", name: "年末営業告知" },
        { cd: "009", name: "年始営業告知" },
        { cd: "011", name: "時報" },
        { cd: "012", name: "営業時間案内" },
        { cd: "013", name: "駐車場" },
        { cd: "015", name: "注意・禁止" },
        { cd: "018", name: "防犯" },
        { cd: "021", name: "体操" },
        { cd: "023", name: "起床・消灯" },
        { cd: "024", name: "食事" },
        { cd: "025", name: "入浴" },
        { cd: "026", name: "面会" },
        { cd: "027", name: "受付" },
        { cd: "028", name: "診察" },
        { cd: "029", name: "回診" },
        { cd: "030", name: "イベント" },
        { cd: "031", name: "レクリエーション" },
        { cd: "032", name: "検診案内" },
        { cd: "033", name: "通年健康情報" },
        { cd: "034", name: "季節健康情報" },
        { cd: "035", name: "歯科向け" },
        { cd: "036", name: "バス時間" },
        { cd: "037", name: "朝礼・終礼" },
        { cd: "045", name: "整理・清掃" },
        { cd: "052", name: "コロナ関連" },
      ],
    },
    {
      industryCd: "50",
      expected: [
        { cd: "007", name: "案内" },
        { cd: "011", name: "時報" },
        { cd: "015", name: "注意・禁止" },
        { cd: "021", name: "体操" },
        { cd: "036", name: "バス時間" },
        { cd: "037", name: "朝礼・終礼" },
        { cd: "038", name: "業務時間" },
        { cd: "039", name: "作業時間" },
        { cd: "040", name: "休憩・昼休み" },
        { cd: "041", name: "集荷時間" },
        { cd: "042", name: "会議" },
        { cd: "043", name: "工場見学" },
        { cd: "044", name: "身なり・衛生" },
        { cd: "045", name: "整理・清掃" },
        { cd: "046", name: "注意・心がけ" },
        { cd: "047", name: "禁止事項" },
        { cd: "052", name: "コロナ関連" },
      ],
    },
    {
      industryCd: "51",
      expected: [
        { cd: "004", name: "開店" },
        { cd: "007", name: "案内" },
        { cd: "008", name: "年末営業告知" },
        { cd: "009", name: "年始営業告知" },
        { cd: "011", name: "時報" },
        { cd: "012", name: "営業時間案内" },
        { cd: "013", name: "駐車場" },
        { cd: "015", name: "注意・禁止" },
        { cd: "018", name: "防犯" },
        { cd: "020", name: "ＡＴＭ注意事項" },
        { cd: "021", name: "体操" },
        { cd: "037", name: "朝礼・終礼" },
        { cd: "051", name: "営業終了案内" },
        { cd: "052", name: "コロナ関連" },
      ],
    },
    {
      industryCd: "90",
      expected: [
        { cd: "004", name: "開店" },
        { cd: "005", name: "閉店" },
        { cd: "007", name: "案内" },
        { cd: "008", name: "年末営業告知" },
        { cd: "009", name: "年始営業告知" },
        { cd: "011", name: "時報" },
        { cd: "012", name: "営業時間案内" },
        { cd: "013", name: "駐車場" },
        { cd: "014", name: "カード" },
        { cd: "015", name: "注意・禁止" },
        { cd: "018", name: "防犯" },
        { cd: "019", name: "エコ推奨" },
        { cd: "020", name: "ＡＴＭ注意事項" },
        { cd: "021", name: "体操" },
        { cd: "022", name: "セール" },
        { cd: "036", name: "バス時間" },
        { cd: "037", name: "朝礼・終礼" },
        { cd: "048", name: "催事" },
        { cd: "049", name: "風営法" },
        { cd: "050", name: "営業開始案内" },
        { cd: "051", name: "営業終了案内" },
        { cd: "052", name: "コロナ関連" },
      ],
    },
    {
      industryCd: "99",
      expected: [
        { cd: "004", name: "開店" },
        { cd: "005", name: "閉店" },
        { cd: "007", name: "案内" },
        { cd: "008", name: "年末営業告知" },
        { cd: "009", name: "年始営業告知" },
        { cd: "010", name: "年中行事販促" },
        { cd: "011", name: "時報" },
        { cd: "012", name: "営業時間案内" },
        { cd: "013", name: "駐車場" },
        { cd: "014", name: "カード" },
        { cd: "015", name: "注意・禁止" },
        { cd: "018", name: "防犯" },
        { cd: "019", name: "エコ推奨" },
        { cd: "020", name: "ＡＴＭ注意事項" },
        { cd: "021", name: "体操" },
        { cd: "022", name: "セール" },
        { cd: "023", name: "起床・消灯" },
        { cd: "024", name: "食事" },
        { cd: "025", name: "入浴" },
        { cd: "026", name: "面会" },
        { cd: "027", name: "受付" },
        { cd: "028", name: "診察" },
        { cd: "029", name: "回診" },
        { cd: "030", name: "イベント" },
        { cd: "031", name: "レクリエーション" },
        { cd: "032", name: "検診案内" },
        { cd: "033", name: "通年健康情報" },
        { cd: "034", name: "季節健康情報" },
        { cd: "035", name: "歯科向け" },
        { cd: "036", name: "バス時間" },
        { cd: "037", name: "朝礼・終礼" },
        { cd: "038", name: "業務時間" },
        { cd: "039", name: "作業時間" },
        { cd: "040", name: "休憩・昼休み" },
        { cd: "041", name: "集荷時間" },
        { cd: "042", name: "会議" },
        { cd: "043", name: "工場見学" },
        { cd: "044", name: "身なり・衛生" },
        { cd: "045", name: "整理・清掃" },
        { cd: "046", name: "注意・心がけ" },
        { cd: "047", name: "禁止事項" },
        { cd: "048", name: "催事" },
        { cd: "049", name: "風営法" },
        { cd: "050", name: "営業開始案内" },
        { cd: "051", name: "営業終了案内" },
        { cd: "052", name: "コロナ関連" },
      ],
    },
    {
      industryCd: "03",
      expected: [
        { cd: "004", name: "開店" },
        { cd: "005", name: "閉店" },
        { cd: "007", name: "案内" },
        { cd: "008", name: "年末営業告知" },
        { cd: "009", name: "年始営業告知" },
        { cd: "010", name: "年中行事販促" },
        { cd: "011", name: "時報" },
        { cd: "012", name: "営業時間案内" },
        { cd: "013", name: "駐車場" },
        { cd: "014", name: "カード" },
        { cd: "015", name: "注意・禁止" },
        { cd: "018", name: "防犯" },
        { cd: "019", name: "エコ推奨" },
        { cd: "020", name: "ＡＴＭ注意事項" },
        { cd: "021", name: "体操" },
        { cd: "022", name: "セール" },
        { cd: "023", name: "起床・消灯" },
        { cd: "024", name: "食事" },
        { cd: "025", name: "入浴" },
        { cd: "026", name: "面会" },
        { cd: "027", name: "受付" },
        { cd: "028", name: "診察" },
        { cd: "029", name: "回診" },
        { cd: "030", name: "イベント" },
        { cd: "031", name: "レクリエーション" },
        { cd: "032", name: "検診案内" },
        { cd: "033", name: "通年健康情報" },
        { cd: "034", name: "季節健康情報" },
        { cd: "035", name: "歯科向け" },
        { cd: "036", name: "バス時間" },
        { cd: "037", name: "朝礼・終礼" },
        { cd: "038", name: "業務時間" },
        { cd: "039", name: "作業時間" },
        { cd: "040", name: "休憩・昼休み" },
        { cd: "041", name: "集荷時間" },
        { cd: "042", name: "会議" },
        { cd: "043", name: "工場見学" },
        { cd: "044", name: "身なり・衛生" },
        { cd: "045", name: "整理・清掃" },
        { cd: "046", name: "注意・心がけ" },
        { cd: "047", name: "禁止事項" },
        { cd: "048", name: "催事" },
        { cd: "049", name: "風営法" },
        { cd: "050", name: "営業開始案内" },
        { cd: "051", name: "営業終了案内" },
        { cd: "052", name: "コロナ関連" },
      ],
    },
  ];
  datas.forEach((v) => {
    test(`引数に画面種別フリー入力と${v.industryCd}を渡すと${v.industryCd}に紐づくシーン一覧が返ること`, () => {
      expect(common.getIndustryScenes(Constants.DISPLAY_FREE,v.industryCd)).toEqual(v.expected);
    });
  });
});

describe("getIndustryScenesのテスト", () => {
  const datas = [
    {
      industryCd: "02",
      expected: [
        { cd: "901", name: "過去に録音した素材" },
        { cd: "902", name: "過去に音声合成した素材" },
      ],
    },
    {
      industryCd: "10",
      expected: [
        { cd: "004", name: "開店" },
        { cd: "005", name: "閉店" },
        { cd: "007", name: "案内" },
        { cd: "008", name: "年末営業告知" },
        { cd: "009", name: "年始営業告知" },
        { cd: "010", name: "年中行事販促" },
        { cd: "011", name: "時報" },
        { cd: "012", name: "営業時間案内" },
        { cd: "013", name: "駐車場" },
        { cd: "014", name: "カード" },
        { cd: "015", name: "注意・禁止" },
        { cd: "018", name: "防犯" },
        { cd: "019", name: "エコ推奨" },
        { cd: "022", name: "セール" },
        { cd: "048", name: "催事" },
        { cd: "051", name: "営業終了案内" },
        { cd: "052", name: "コロナ関連" },
      ],
    },
    {
      industryCd: "20",
      expected: [
        { cd: "004", name: "開店" },
        { cd: "005", name: "閉店" },
        { cd: "007", name: "案内" },
        { cd: "008", name: "年末営業告知" },
        { cd: "009", name: "年始営業告知" },
        { cd: "011", name: "時報" },
        { cd: "012", name: "営業時間案内" },
        { cd: "013", name: "駐車場" },
        { cd: "014", name: "カード" },
        { cd: "015", name: "注意・禁止" },
        { cd: "018", name: "防犯" },
        { cd: "019", name: "エコ推奨" },
        { cd: "045", name: "整理・清掃" },
        { cd: "051", name: "営業終了案内" },
        { cd: "052", name: "コロナ関連" },
      ],
    },
    {
      industryCd: "30",
      expected: [
        { cd: "004", name: "開店" },
        { cd: "005", name: "閉店" },
        { cd: "007", name: "案内" },
        { cd: "008", name: "年末営業告知" },
        { cd: "009", name: "年始営業告知" },
        { cd: "010", name: "年中行事販促" },
        { cd: "011", name: "時報" },
        { cd: "012", name: "営業時間案内" },
        { cd: "013", name: "駐車場" },
        { cd: "014", name: "カード" },
        { cd: "015", name: "注意・禁止" },
        { cd: "018", name: "防犯" },
        { cd: "019", name: "エコ推奨" },
        { cd: "020", name: "ＡＴＭ注意事項" },
        { cd: "022", name: "セール" },
        { cd: "036", name: "バス時間" },
        { cd: "048", name: "催事" },
        { cd: "051", name: "営業終了案内" },
        { cd: "052", name: "コロナ関連" },
      ],
    },
    {
      industryCd: "31",
      expected: [
        { cd: "004", name: "開店" },
        { cd: "005", name: "閉店" },
        { cd: "007", name: "案内" },
        { cd: "008", name: "年末営業告知" },
        { cd: "009", name: "年始営業告知" },
        { cd: "010", name: "年中行事販促" },
        { cd: "011", name: "時報" },
        { cd: "012", name: "営業時間案内" },
        { cd: "013", name: "駐車場" },
        { cd: "014", name: "カード" },
        { cd: "015", name: "注意・禁止" },
        { cd: "018", name: "防犯" },
        { cd: "019", name: "エコ推奨" },
        { cd: "020", name: "ＡＴＭ注意事項" },
        { cd: "022", name: "セール" },
        { cd: "036", name: "バス時間" },
        { cd: "051", name: "営業終了案内" },
        { cd: "052", name: "コロナ関連" },
      ],
    },
    {
      industryCd: "40",
      expected: [
        { cd: "007", name: "案内" },
        { cd: "008", name: "年末営業告知" },
        { cd: "009", name: "年始営業告知" },
        { cd: "011", name: "時報" },
        { cd: "012", name: "営業時間案内" },
        { cd: "013", name: "駐車場" },
        { cd: "015", name: "注意・禁止" },
        { cd: "018", name: "防犯" },
        { cd: "021", name: "体操" },
        { cd: "023", name: "起床・消灯" },
        { cd: "024", name: "食事" },
        { cd: "025", name: "入浴" },
        { cd: "026", name: "面会" },
        { cd: "027", name: "受付" },
        { cd: "028", name: "診察" },
        { cd: "029", name: "回診" },
        { cd: "030", name: "イベント" },
        { cd: "031", name: "レクリエーション" },
        { cd: "032", name: "検診案内" },
        { cd: "034", name: "季節健康情報" },
        { cd: "035", name: "歯科向け" },
        { cd: "036", name: "バス時間" },
        { cd: "037", name: "朝礼・終礼" },
        { cd: "045", name: "整理・清掃" },
        { cd: "052", name: "コロナ関連" },
      ],
    },
    {
      industryCd: "50",
      expected: [
        { cd: "007", name: "案内" },
        { cd: "011", name: "時報" },
        { cd: "015", name: "注意・禁止" },
        { cd: "021", name: "体操" },
        { cd: "036", name: "バス時間" },
        { cd: "037", name: "朝礼・終礼" },
        { cd: "038", name: "業務時間" },
        { cd: "039", name: "作業時間" },
        { cd: "040", name: "休憩・昼休み" },
        { cd: "041", name: "集荷時間" },
        { cd: "042", name: "会議" },
        { cd: "043", name: "工場見学" },
        { cd: "044", name: "身なり・衛生" },
        { cd: "045", name: "整理・清掃" },
        { cd: "046", name: "注意・心がけ" },
        { cd: "047", name: "禁止事項" },
        { cd: "052", name: "コロナ関連" },
      ],
    },
    {
      industryCd: "51",
      expected: [
        { cd: "004", name: "開店" },
        { cd: "007", name: "案内" },
        { cd: "008", name: "年末営業告知" },
        { cd: "009", name: "年始営業告知" },
        { cd: "011", name: "時報" },
        { cd: "012", name: "営業時間案内" },
        { cd: "013", name: "駐車場" },
        { cd: "015", name: "注意・禁止" },
        { cd: "018", name: "防犯" },
        { cd: "020", name: "ＡＴＭ注意事項" },
        { cd: "021", name: "体操" },
        { cd: "037", name: "朝礼・終礼" },
        { cd: "051", name: "営業終了案内" },
        { cd: "052", name: "コロナ関連" },
      ],
    },
    {
      industryCd: "90",
      expected: [
        { cd: "004", name: "開店" },
        { cd: "005", name: "閉店" },
        { cd: "007", name: "案内" },
        { cd: "008", name: "年末営業告知" },
        { cd: "009", name: "年始営業告知" },
        { cd: "011", name: "時報" },
        { cd: "012", name: "営業時間案内" },
        { cd: "013", name: "駐車場" },
        { cd: "014", name: "カード" },
        { cd: "015", name: "注意・禁止" },
        { cd: "018", name: "防犯" },
        { cd: "019", name: "エコ推奨" },
        { cd: "020", name: "ＡＴＭ注意事項" },
        { cd: "021", name: "体操" },
        { cd: "022", name: "セール" },
        { cd: "036", name: "バス時間" },
        { cd: "037", name: "朝礼・終礼" },
        { cd: "048", name: "催事" },
        { cd: "049", name: "風営法" },
        { cd: "050", name: "営業開始案内" },
        { cd: "051", name: "営業終了案内" },
        { cd: "052", name: "コロナ関連" },
      ],
    },
    {
      industryCd: "99",
      expected: [
        { cd: "004", name: "開店" },
        { cd: "005", name: "閉店" },
        { cd: "007", name: "案内" },
        { cd: "008", name: "年末営業告知" },
        { cd: "009", name: "年始営業告知" },
        { cd: "010", name: "年中行事販促" },
        { cd: "011", name: "時報" },
        { cd: "012", name: "営業時間案内" },
        { cd: "013", name: "駐車場" },
        { cd: "014", name: "カード" },
        { cd: "015", name: "注意・禁止" },
        { cd: "018", name: "防犯" },
        { cd: "019", name: "エコ推奨" },
        { cd: "020", name: "ＡＴＭ注意事項" },
        { cd: "021", name: "体操" },
        { cd: "022", name: "セール" },
        { cd: "023", name: "起床・消灯" },
        { cd: "024", name: "食事" },
        { cd: "025", name: "入浴" },
        { cd: "026", name: "面会" },
        { cd: "027", name: "受付" },
        { cd: "028", name: "診察" },
        { cd: "029", name: "回診" },
        { cd: "030", name: "イベント" },
        { cd: "031", name: "レクリエーション" },
        { cd: "032", name: "検診案内" },
        { cd: "034", name: "季節健康情報" },
        { cd: "035", name: "歯科向け" },
        { cd: "036", name: "バス時間" },
        { cd: "037", name: "朝礼・終礼" },
        { cd: "038", name: "業務時間" },
        { cd: "039", name: "作業時間" },
        { cd: "040", name: "休憩・昼休み" },
        { cd: "041", name: "集荷時間" },
        { cd: "042", name: "会議" },
        { cd: "043", name: "工場見学" },
        { cd: "044", name: "身なり・衛生" },
        { cd: "045", name: "整理・清掃" },
        { cd: "046", name: "注意・心がけ" },
        { cd: "047", name: "禁止事項" },
        { cd: "048", name: "催事" },
        { cd: "049", name: "風営法" },
        { cd: "050", name: "営業開始案内" },
        { cd: "051", name: "営業終了案内" },
        { cd: "052", name: "コロナ関連" },
      ],
    },
    {
      industryCd: "03",
      expected: [
        { cd: "004", name: "開店" },
        { cd: "005", name: "閉店" },
        { cd: "007", name: "案内" },
        { cd: "008", name: "年末営業告知" },
        { cd: "009", name: "年始営業告知" },
        { cd: "010", name: "年中行事販促" },
        { cd: "011", name: "時報" },
        { cd: "012", name: "営業時間案内" },
        { cd: "013", name: "駐車場" },
        { cd: "014", name: "カード" },
        { cd: "015", name: "注意・禁止" },
        { cd: "018", name: "防犯" },
        { cd: "019", name: "エコ推奨" },
        { cd: "020", name: "ＡＴＭ注意事項" },
        { cd: "021", name: "体操" },
        { cd: "022", name: "セール" },
        { cd: "023", name: "起床・消灯" },
        { cd: "024", name: "食事" },
        { cd: "025", name: "入浴" },
        { cd: "026", name: "面会" },
        { cd: "027", name: "受付" },
        { cd: "028", name: "診察" },
        { cd: "029", name: "回診" },
        { cd: "030", name: "イベント" },
        { cd: "031", name: "レクリエーション" },
        { cd: "032", name: "検診案内" },
        { cd: "033", name: "通年健康情報" },
        { cd: "034", name: "季節健康情報" },
        { cd: "035", name: "歯科向け" },
        { cd: "036", name: "バス時間" },
        { cd: "037", name: "朝礼・終礼" },
        { cd: "038", name: "業務時間" },
        { cd: "039", name: "作業時間" },
        { cd: "040", name: "休憩・昼休み" },
        { cd: "041", name: "集荷時間" },
        { cd: "042", name: "会議" },
        { cd: "043", name: "工場見学" },
        { cd: "044", name: "身なり・衛生" },
        { cd: "045", name: "整理・清掃" },
        { cd: "046", name: "注意・心がけ" },
        { cd: "047", name: "禁止事項" },
        { cd: "048", name: "催事" },
        { cd: "049", name: "風営法" },
        { cd: "050", name: "営業開始案内" },
        { cd: "051", name: "営業終了案内" },
        { cd: "052", name: "コロナ関連" },
      ],
    },
  ];
  datas.forEach((v) => {
    test(`引数に画面種別テンプレートと${v.industryCd}を渡すと${v.industryCd}に紐づくシーン一覧が返ること`, () => {
      expect(common.getIndustryScenes(Constants.DISPLAY_TEMPLATE,v.industryCd)).toEqual(v.expected);
    });
  });
});

describe("getBgmIndustriesのテスト", () => {
  const expected = [
    { cd: "10", name: "飲食店向け", sort: 3 },
    { cd: "20", name: "サービス業向け", sort: 4 },
    { cd: "30", name: "小売店向け", sort: 5 },
    { cd: "31", name: "スーパー／ドラッグ／量販店向け", sort: 6 },
    { cd: "40", name: "医療／福祉向け", sort: 7 },
    { cd: "50", name: "オフィス／事務所／教育機関向け", sort: 8 },
    { cd: "51", name: "金融機関向け", sort: 9 },
    { cd: "90", name: "施設向け", sort: 10 },
    { cd: "99", name: "全業種", sort: 11 },
  ];
  test(`10, 20 ,30 ,31 ,40 ,50, 51, 90, 99に紐づく業種一覧が返ること`, () => {
    expect(common.getBgmIndustries()).toEqual(expected);
  });
});

describe("getTemplateIndustriesのテスト", () => {
  const expected = [
    { cd: "10", name: "飲食店向け", sort: 3 },
    { cd: "20", name: "サービス業向け", sort: 4 },
    { cd: "30", name: "小売店向け", sort: 5 },
    { cd: "31", name: "スーパー／ドラッグ／量販店向け", sort: 6 },
    { cd: "40", name: "医療／福祉向け", sort: 7 },
    { cd: "50", name: "オフィス／事務所／教育機関向け", sort: 8 },
    { cd: "51", name: "金融機関向け", sort: 9 },
    { cd: "90", name: "施設向け", sort: 10 },
    { cd: "99", name: "全業種", sort: 11 },
  ];
  test(`10, 20, 30, 31, 40, 50, 51, 90, 99に紐づく業種一覧が返ること`, () => {
    expect(common.getTemplateIndustries()).toEqual(expected);
  });
});

describe("getFreeTemplateIndustriesのテスト", () => {
  const expected = [
    { cd: "10", name: "飲食店向け", sort: 3 },
    { cd: "20", name: "サービス業向け", sort: 4 },
    { cd: "30", name: "小売店向け", sort: 5 },
    { cd: "31", name: "スーパー／ドラッグ／量販店向け", sort: 6 },
    { cd: "40", name: "医療／福祉向け", sort: 7 },
    { cd: "50", name: "オフィス／事務所／教育機関向け", sort: 8 },
    { cd: "51", name: "金融機関向け", sort: 9 },
    { cd: "90", name: "施設向け", sort: 10 },
    { cd: "99", name: "全業種", sort: 11 },
  ];
  test(`10, 20, 30, 31, 40, 50, 51, 90, 99に紐づく業種一覧が返ること`, () => {
    expect(common.getFreeTemplateIndustries()).toEqual(expected);
  });
});

describe("getInputScenesのテスト", () => {
  const expected = [
    { cd: "004", name: "開店" },
    { cd: "005", name: "閉店" },
    { cd: "007", name: "案内" },
    { cd: "008", name: "年末営業告知" },
    { cd: "009", name: "年始営業告知" },
    { cd: "010", name: "年中行事販促" },
    { cd: "011", name: "時報" },
    { cd: "012", name: "営業時間案内" },
    { cd: "013", name: "駐車場" },
    { cd: "014", name: "カード" },
    { cd: "015", name: "注意・禁止" },
    { cd: "018", name: "防犯" },
    { cd: "019", name: "エコ推奨" },
    { cd: "020", name: "ＡＴＭ注意事項" },
    { cd: "021", name: "体操" },
    { cd: "022", name: "セール" },
    { cd: "023", name: "起床・消灯" },
    { cd: "024", name: "食事" },
    { cd: "025", name: "入浴" },
    { cd: "026", name: "面会" },
    { cd: "027", name: "受付" },
    { cd: "028", name: "診察" },
    { cd: "029", name: "回診" },
    { cd: "030", name: "イベント" },
    { cd: "031", name: "レクリエーション" },
    { cd: "032", name: "検診案内" },
    { cd: "033", name: "通年健康情報" },
    { cd: "034", name: "季節健康情報" },
    { cd: "035", name: "歯科向け" },
    { cd: "036", name: "バス時間" },
    { cd: "037", name: "朝礼・終礼" },
    { cd: "038", name: "業務時間" },
    { cd: "039", name: "作業時間" },
    { cd: "040", name: "休憩・昼休み" },
    { cd: "041", name: "集荷時間" },
    { cd: "042", name: "会議" },
    { cd: "043", name: "工場見学" },
    { cd: "044", name: "身なり・衛生" },
    { cd: "045", name: "整理・清掃" },
    { cd: "046", name: "注意・心がけ" },
    { cd: "047", name: "禁止事項" },
    { cd: "048", name: "催事" },
    { cd: "049", name: "風営法" },
    { cd: "050", name: "営業開始案内" },
    { cd: "051", name: "営業終了案内" },
    { cd: "052", name: "コロナ関連" },
    { cd: "053", name: "誕生日演出" },
  ];
  test(`保存するシーンの一覧が返ること`, () => {
    expect(common.getInputScenes()).toEqual(expected);
  });
});

describe("getManagementScenesのテスト", () => {
  const expected = [
    { cd: "001", name: "チャイム" },
    { cd: "002", name: "ブザー" },
    { cd: "003", name: "効果ＢＧＭ" },
    { cd: "004", name: "開店" },
    { cd: "005", name: "閉店" },
    { cd: "006", name: "エスカレーター" },
    { cd: "007", name: "案内" },
    { cd: "008", name: "年末営業告知" },
    { cd: "009", name: "年始営業告知" },
    { cd: "010", name: "年中行事販促" },
    { cd: "011", name: "時報" },
    { cd: "012", name: "営業時間案内" },
    { cd: "013", name: "駐車場" },
    { cd: "014", name: "カード" },
    { cd: "015", name: "注意・禁止" },
    { cd: "016", name: "スタッフコール" },
    { cd: "017", name: "呼び出し" },
    { cd: "018", name: "防犯" },
    { cd: "019", name: "エコ推奨" },
    { cd: "020", name: "ＡＴＭ注意事項" },
    { cd: "021", name: "体操" },
    { cd: "022", name: "セール" },
    { cd: "023", name: "起床・消灯" },
    { cd: "024", name: "食事" },
    { cd: "025", name: "入浴" },
    { cd: "026", name: "面会" },
    { cd: "027", name: "受付" },
    { cd: "028", name: "診察" },
    { cd: "029", name: "回診" },
    { cd: "030", name: "イベント" },
    { cd: "031", name: "レクリエーション" },
    { cd: "032", name: "検診案内" },
    { cd: "033", name: "通年健康情報" },
    { cd: "034", name: "季節健康情報" },
    { cd: "035", name: "歯科向け" },
    { cd: "036", name: "バス時間" },
    { cd: "037", name: "朝礼・終礼" },
    { cd: "038", name: "業務時間" },
    { cd: "039", name: "作業時間" },
    { cd: "040", name: "休憩・昼休み" },
    { cd: "041", name: "集荷時間" },
    { cd: "042", name: "会議" },
    { cd: "043", name: "工場見学" },
    { cd: "044", name: "身なり・衛生" },
    { cd: "045", name: "整理・清掃" },
    { cd: "046", name: "注意・心がけ" },
    { cd: "047", name: "禁止事項" },
    { cd: "048", name: "催事" },
    { cd: "049", name: "風営法" },
    { cd: "050", name: "営業開始案内" },
    { cd: "051", name: "営業終了案内" },
    { cd: "052", name: "コロナ関連" },
    { cd: "053", name: "誕生日演出" },
    { cd: "901", name: "過去に録音した素材" },
    { cd: "902", name: "過去に音声合成した素材" },
  ];
  test(`全シーン一覧が返ること`, () => {
    expect(common.getManagementScenes()).toEqual(expected);
  });
});

describe("getSettingAppInformationsのテスト", () => {
  const expected = [
    { cd: "01", name: "お客様情報" },
    { cd: "02", name: "アプリ情報" },
    { cd: "03", name: "禁止事項" },
    { cd: "04", name: "音声CM作成の流れ" },
  ];
  test(`全設定項目が返ること`, () => {
    expect(common.getSettingAppInformations()).toEqual(expected);
  });
});

describe("getSortのテスト", () => {
  const expected = [
    { cd: 1, name: "名前昇順" },
    { cd: 2, name: "名前降順" },
    { cd: 3, name: "日時昇順" },
    { cd: 4, name: "日時降順" },
  ];
  test(`1, 2, 3, 4に紐づく並び替えが返ること`, () => {
    expect(common.getSort()).toEqual(expected);
  });
});

describe("isRecordingByIdのテスト", () => {
  const datas = [
    {
      id: "123456789-r-6rtlrvac",
      expected: true,
    },
    {
      id: "123456789-t-6rtlrvac",
      expected: false,
    },
  ];
  datas.forEach((v) => {
    test(`引数に${v.id}を渡すと${v.expected}が返ること`, () => {
      expect(common.isRecordingById(v.id)).toBe(v.expected);
    });
  });
});

describe("isTtsByIdのテスト", () => {
  const datas = [
    {
      id: "123456789-r-6rtlrvac",
      expected: false,
    },
    {
      id: "123456789-t-6rtlrvac",
      expected: true,
    },
  ];
  datas.forEach((v) => {
    test(`引数に${v.id}を渡すと${v.expected}が返ること`, () => {
      expect(common.isTtsById(v.id)).toBe(v.expected);
    });
  });
});

describe("getVersionのテスト", () => {
  test(`package.jsonのバージョン（例: 0.1.0）が返ること`, () => {
    expect(common.getVersion()).toMatch(/^[0-9].[0-9].[0-9]$/);
  });
});

describe("rangeのテスト", () => {
  const datas = [
    { from: 1, to: 5, expected: [1, 2, 3, 4] },
    { from: 16, to: 21, expected: [16, 17, 18, 19, 20] },
  ];
  datas.forEach((v) => {
    test(`引数に(${v.from}, ${v.to})を渡すと${v.expected}が返ること`, () => {
      expect(common.range(v.from, v.to)).toStrictEqual(v.expected);
    });
  });
});

describe("getLangsのテスト", () => {
  const datas = [
    {
      langs: undefined,
      expected: [
        {
          cd: "ja",
          name: "日本語",
          sort: 1,
        },
        {
          cd: "en",
          name: "英語",
          sort: 2,
        },
        {
          cd: "zh",
          name: "中国語",
          sort: 3,
        },
        {
          cd: "ko",
          name: "韓国語",
          sort: 4,
        },
      ],
    },
    {
      langs: ["ja", "en", "zh", "ko"],
      expected: [
        {
          cd: "ja",
          name: "日本語",
          sort: 1,
        },
        {
          cd: "en",
          name: "英語",
          sort: 2,
        },
        {
          cd: "zh",
          name: "中国語",
          sort: 3,
        },
        {
          cd: "ko",
          name: "韓国語",
          sort: 4,
        },
      ],
    },
    {
      langs: ["ja"],
      expected: [
        {
          cd: "ja",
          name: "日本語",
          sort: 1,
        },
      ],
    },
    {
      langs: ["en"],
      expected: [
        {
          cd: "en",
          name: "英語",
          sort: 2,
        },
      ],
    },
    {
      langs: ["zh"],
      expected: [
        {
          cd: "zh",
          name: "中国語",
          sort: 3,
        },
      ],
    },
    {
      langs: ["ko"],
      expected: [
        {
          cd: "ko",
          name: "韓国語",
          sort: 4,
        },
      ],
    },
    {
      langs: ["ja", "zh"],
      expected: [
        {
          cd: "ja",
          name: "日本語",
          sort: 1,
        },
        {
          cd: "zh",
          name: "中国語",
          sort: 3,
        },
      ],
    },
  ];
  datas.forEach((v) => {
    test(`引数に${v.langs}を渡すと${v.langs}に紐づく言語が返ること`, () => {
      expect(common.getLangs(v.langs)).toEqual(v.expected);
    });
  });
});

describe("getUploadSystemServiceのテスト", () => {
  const datas = [
    {
      cd: "U19",
      expected: [
        { cd: "01", name: "USEN MUSIC" },
        { cd: "99", name: "アップロードしない" },
      ],
    },
    {
      cd: "U17",
      expected: [
        { cd: "02", name: "S'sence" },
        { cd: "99", name: "アップロードしない" },
      ],
    },
    { cd: "U22", expected: [] },
  ];
  datas.forEach((v) => {
    test(`引数に(${v.cd})を渡すと${v.cd}に紐づくアップロード先情報が返ること`, () => {
      expect(common.getUploadSystemService(v.cd)).toStrictEqual(v.expected);
    });
  });
});

describe("getUploadSystemServiceCdのテスト", () => {
  const datas = [
    {
      authUserServiceCd: "U19",
      uploadSystem: "01",
      isEdit: false,
      expected: "01",
    },
    {
      authUserServiceCd: "U19",
      uploadSystem: "01",
      isEdit: true,
      expected: "01",
    },
    {
      authUserServiceCd: "U17",
      uploadSystem: "02",
      isEdit: true,
      expected: "02",
    },
    {
      authUserServiceCd: "U19",
      uploadSystem: "99",
      isEdit: true,
      expected: "99",
    },
    {
      authUserServiceCd: "U19",
      uploadSystem: "",
      isEdit: true,
      expected: "99",
    },
  ];
  datas.forEach((v) => {
    test(`紐づくアップロード先CDが返ること`, () => {
      expect(
        common.getUploadSystemServiceCd(v.authUserServiceCd, v.uploadSystem, v.isEdit)
      ).toStrictEqual(v.expected);
    });
  });
});


describe("getSceneCdのテスト", () => {
  const datas = [
    {
      sceneCd: "",
      isEdit: false,
      expected: "004",
    },
    {
      sceneCd: "004",
      isEdit: false,
      expected: "004",
    },
    {
      sceneCd: "004",
      isEdit: true,
      expected: "004",
    },
    {
      sceneCd: "005",
      isEdit: true,
      expected: "005",
    },
  ];
  datas.forEach((v) => {
    test(`紐づくシーンCDが返ること`, () => {
      expect(
        common.getSceneCd(v.sceneCd, v.isEdit)
      ).toStrictEqual(v.expected);
    });
  });
});