import Constants, {
  Industry,
  Scene,
  Sorts,
  AppInformation,
  TtsLangs,
  UploadSystem,
} from "@/utils/constants";
import PackageJson from "@/../package.json";

/**
 * ナレーション選択画面に表示する業種を取得する
 * @param
 * @return Industry[]
 */
export function getNarrationIndustries() {
  const getCdList = [
    "02",
    "10",
    "20",
    "30",
    "31",
    "40",
    "50",
    "51",
    "90",
    "99",
  ];
  return getIndustries(getCdList);
}

/**
 * 業種に紐づくシーンを取得する
 * @param
 * @return Scene[]
 */
export function getIndustryScenes(industryCd: string) {
  let getCdList: string[] = [];
  switch (industryCd) {
    case "02":
      getCdList = ["901", "902"];
      break;
    case "10":
      getCdList = [
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
 * CM作成画面で保存先のシーンを取得する
 * @param
 * @return Scene[]
 */
export function getInputScenes() {
  let getCdList: string[] = [];
  getCdList = [
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
    "053",
  ];
  return getScenes(getCdList);
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

  result.sort(function(a, b) {
    if (a.sort < b.sort) return -1;
    if (a.sort > b.sort) return 1;
    return 0;
  });

  return result;
}

/**
 * CMアップロード先のCD,と名称を取得する
 * @param serviceCd string
 * @return UploadSystem[]
 */
export function getUploadSystemService(serviceCd: string) {
  let getCdList: string[] = [];

  if (serviceCd === Constants.SERVICE_CD_UMUSIC) {
    getCdList = ["01", "99"];
  } else if (serviceCd === Constants.SERVICE_CD_SSENCE) {
    getCdList = ["02", "99"];
  } else {
    getCdList = [];
  }

  return getUploadDestination(getCdList);
}

/**
 * CM作成で設定したCMアップロード先のCDを取得する（CM作成画面の確認モーダルのアップロード先）
 * @param authUserServiceCd string
 * @param uploadSystem string
 * @param isEdit boolean
 * @return string
 */
export function getUploadSystemServiceCd(
  authUserServiceCd: string,
  uploadSystem: string,
  isEdit: boolean
) {
  const userServiceCd =
    authUserServiceCd === Constants.SERVICE_CD_UMUSIC ? "01" : "02";

  if (!isEdit) return userServiceCd;

  if (
    uploadSystem === Constants.UPLOAD_SYSTEM_UMUSIC ||
    uploadSystem === Constants.UPLOAD_SYSTEM_SSENCE
  ) {
    return userServiceCd;
  } else {
    return "99";
  }
}

/**
 * CM作成で設定したシーンのCDを取得する（CM作成画面の確認モーダルのシーン）
 * @param sceneCd string
 * @param isEdit boolean
 * @return string
 */
 export function getSceneCd(
  sceneCd: string,
  isEdit: boolean
) {
  const userSceneCd = isEdit ? sceneCd : "004";

  return userSceneCd;
}

function getIndustries(cdList: string[]) {
  const result: Industry[] = [];
  cdList.forEach((v) => {
    const industry = Constants.INDUSTORIES.find((vv) => vv.cd == v);
    if (industry) result.push(industry);
  });

  return result;
}

function getScenes(cdList?: string[]) {
  if (!cdList) return Constants.SCENES;
  const result: Scene[] = [];
  cdList.forEach((v) => {
    const scene = Constants.SCENES.find((vv) => vv.cd == v);
    if (scene) result.push(scene);
  });

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

function getUploadDestination(cdList: string[]) {
  const result: UploadSystem[] = [];
  if (!cdList) return result;
  cdList.forEach((v) => {
    const uploadSystem = Constants.UPLOAD_SYSTEMS.find((vv) => vv.cd == v);
    if (uploadSystem) result.push(uploadSystem);
  });

  return result;
}

export function isVisibleDownload() {
  return process.env.NODE_ENV !== "production";
}
