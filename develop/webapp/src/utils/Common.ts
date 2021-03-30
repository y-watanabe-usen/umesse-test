import Constants, {
  Industry,
  Scene,
  Sorts,
  AppInformation,
  TtsLangs,
} from "@/utils/Constants";
import PackageJson from "@/../../webapp/package.json";

/**
 * ナレーション選択画面に表示する業種を取得する
 * @param
 * @return Industry[]
 */
export function getNarrationIndustries() {
  const getCdList = ["02", "10", "20", "30", "31", "40", "50", "51", "90"];
  return getIndustries(getCdList);
}

/**
 * 業種に紐づくシーンを取得する
 * TODO: 適当に作ってるので後で正式版に変える
 * @param
 * @return Scene[]
 */
export function getIndustryScenes(industryCd: string) {
  let getCdList: string[] = [];
  switch (industryCd) {
    case "01":
      getCdList = ["001"];
      break;
    case "02":
      getCdList = ["901", "902"];
      break;
    case "10":
      getCdList = [
        "001",
        "002",
        "003",
        "004",
        "005",
        "007",
        "008",
        "009",
        "010",
        "011",
        "012",
        "013",
        "014",
        "015",
        "018",
        "019",
        "022",
        "048",
        "051",
        "052",
      ];
      break;
    case "20":
      getCdList = [
        "001",
        "002",
        "003",
        "004",
        "005",
        "007",
        "008",
        "009",
        "011",
        "012",
        "013",
        "014",
        "015",
        "018",
        "019",
        "045",
        "051",
        "052",
      ];
      break;
    case "30":
      getCdList = [
        "001",
        "002",
        "003",
        "004",
        "005",
        "007",
        "008",
        "009",
        "010",
        "011",
        "012",
        "013",
        "014",
        "015",
        "018",
        "019",
        "020",
        "022",
        "036",
        "048",
        "051",
        "052",
      ];
      break;
    case "31":
      getCdList = [
        "001",
        "002",
        "003",
        "004",
        "005",
        "007",
        "008",
        "009",
        "010",
        "011",
        "012",
        "013",
        "014",
        "015",
        "018",
        "019",
        "020",
        "022",
        "036",
        "051",
        "052",
      ];
      break;
    case "40":
      getCdList = [
        "001",
        "002",
        "003",
        "007",
        "008",
        "009",
        "011",
        "012",
        "013",
        "015",
        "018",
        "021",
        "023",
        "024",
        "025",
        "026",
        "027",
        "028",
        "029",
        "030",
        "031",
        "032",
        "033",
        "034",
        "035",
        "036",
        "037",
        "045",
        "052",
      ];
      break;
    case "50":
      getCdList = [
        "001",
        "002",
        "003",
        "007",
        "011",
        "015",
        "021",
        "036",
        "037",
        "038",
        "039",
        "040",
        "041",
        "042",
        "043",
        "044",
        "045",
        "046",
        "047",
        "052",
      ];
      break;
    case "51":
      getCdList = [
        "001",
        "002",
        "003",
        "004",
        "007",
        "008",
        "009",
        "011",
        "012",
        "013",
        "015",
        "018",
        "020",
        "021",
        "037",
        "051",
        "052",
      ];
      break;
    case "90":
      getCdList = [
        "001",
        "002",
        "003",
        "004",
        "005",
        "007",
        "008",
        "009",
        "011",
        "012",
        "013",
        "014",
        "015",
        "018",
        "019",
        "020",
        "021",
        "022",
        "036",
        "037",
        "048",
        "049",
        "050",
        "051",
        "052",
      ];
      break;
    case "99":
      getCdList = [
        "001",
        "002",
        "003",
        "004",
        "005",
        "007",
        "008",
        "009",
        "010",
        "011",
        "012",
        "013",
        "014",
        "015",
        "018",
        "019",
        "020",
        "021",
        "022",
        "023",
        "024",
        "025",
        "026",
        "027",
        "028",
        "029",
        "030",
        "031",
        "032",
        "033",
        "034",
        "035",
        "036",
        "037",
        "038",
        "039",
        "040",
        "041",
        "042",
        "043",
        "044",
        "045",
        "046",
        "047",
        "048",
        "049",
        "050",
        "051",
        "052",
      ];
      break;
    default:
      getCdList = [
        "001",
        "002",
        "003",
        "004",
        "005",
        "007",
        "008",
        "009",
        "010",
        "011",
        "012",
        "013",
        "014",
        "015",
        "018",
        "019",
        "020",
        "021",
        "022",
        "023",
        "024",
        "025",
        "026",
        "027",
        "028",
        "029",
        "030",
        "031",
        "032",
        "033",
        "034",
        "035",
        "036",
        "037",
        "038",
        "039",
        "040",
        "041",
        "042",
        "043",
        "044",
        "045",
        "046",
        "047",
        "048",
        "049",
        "050",
        "051",
        "052",
      ];
      break;
  }
  return getScenes(getCdList);
}

/**
 * BGM選択画面に表示する業種を取得する
 * @param
 * @return Industry[]
 */
export function getBgmIndustries() {
  const getCdList = ["10", "20", "30", "31", "40", "50", "51", "90", "99"];
  return getIndustries(getCdList);
}

/**
 * テンプレート選択画面に表示する業種を取得する
 * @param
 * @return Industry[]
 */
export function getTemplateIndustries() {
  const getCdList = ["10", "20", "30", "31", "40", "50", "51", "90", "99"];
  return getIndustries(getCdList);
}

/**
 * フリーテンプレート選択画面に表示する業種を取得する
 * @param
 * @return Industry[]
 */
export function getFreeTemplateIndustries() {
  const getCdList = ["10", "20", "30", "31", "40", "50", "51", "90", "99"];
  return getIndustries(getCdList);
}

/**
 * 店内アナウンスの管理画面に表示するシーンを取得する
 * @param
 * @return Scene[]
 */
export function getManagementScenes() {
  return getScenes();
}

/**
 * 選択画面に表示する並び替えを取得する
 * @param
 * @return Industry[]
 */
export function getSort() {
  const getCdList = [1, 2, 3, 4];
  return getSorts(getCdList);
}

/**
 * 設定画面に表示する項目を取得する
 * @param
 * @return AppInformation[]
 */
export function getSettingAppInformations(): AppInformation[] {
  return getAppInformation();
}

/**
 * idの形式がRecordingか判定
 * @param id string
 * @return bool
 */
export function isRecordingById(id: string): boolean {
  return id.match(`^[0-9a-z]+-r-[0-9a-z]{8}$`) ? true : false;
}

/**
 * idの形式がTtsか判定
 * @param id string
 * @return bool
 */
export function isTtsById(id: string): boolean {
  return id.match(`^[0-9a-z]+-t-[0-9a-z]{8}$`) ? true : false;
}

/**
 * package.jsonのバージョンを取得
 * @param
 * @return Version
 */
export function getVersion() {
  return PackageJson.version;
}

/**
 * fromからtoまでの要素を持つ配列を作成
 * @param
 * @return number[]
 */
export const range = (from: number, to: number) =>
  [...Array(to - from)].map((_, i) => from + i);

/**
 * 音声合成テンプレート画面の保存モーダルに表示する各言語のCD,と名称を取得する
 * @param langList string[]
 * @return TtsLangs[]
 */
export function getLangs(langList?: string[]) {
  if (!langList) return Constants.TTS_LANGS;
  const result: TtsLangs[] = [];
  langList.forEach((v) => {
    const lang = Constants.TTS_LANGS.find((vv) => vv.cd == v);
    if (lang) result.push(lang);
  });

  return result;
}

function getIndustries(cdList: string[]) {
  const result: Industry[] = [];
  cdList.forEach((v) => {
    const industry = Constants.INDUSTORIES.find((vv) => vv.cd == v);
    if (industry) result.push(industry);
  });
  // TODO: sort

  return result;
}

function getScenes(cdList?: string[]) {
  if (!cdList) return Constants.SCENES;
  const result: Scene[] = [];
  cdList.forEach((v) => {
    const scene = Constants.SCENES.find((vv) => vv.cd == v);
    if (scene) result.push(scene);
  });
  // TODO: sort

  return result;
}

function getSorts(cdList: number[]) {
  const result: Sorts[] = [];
  cdList.forEach((v) => {
    const sort = Constants.SORTS.find((vv) => vv.cd == v);
    if (sort) result.push(sort);
  });

  return result;
}

function getAppInformation(cdList?: string[]) {
  if (!cdList) return Constants.APP_INFORMATIONS;
  const result: AppInformation[] = [];
  cdList.forEach((v) => {
    const appInformation = Constants.APP_INFORMATIONS.find((vv) => vv.cd == v);
    if (appInformation) result.push(appInformation);
  });

  return result;
}

export function getUploadSystemUmusic() {
  const getSystemUmusic = [
    { cd: '01', name: 'U MUSIC' },
    { cd: '99', name: "アップロードしない" },
  ];

  return getSystemUmusic;
}

export function getUploadSystemSsence() {
  const getSystemSsense = [
    { cd: '02', name: "S'sence" },
    { cd: '99', name: "アップロードしない" },
  ];

  return getSystemSsense;
}