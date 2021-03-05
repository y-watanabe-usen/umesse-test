import Constants, { Industry, Scene, Sorts, AppInformation } from "@/utils/Constants";

/**
 * ナレーション選択画面に表示する業種を取得する
 * @param
 * @return Industry[]
 */
export function getNarrationIndustries() {
  const getCdList = [
    "01",
    "02",
    "10",
    "20",
    "30",
    "31",
    "40",
    "50",
    "51",
    "90",
  ];
  return getIndustries(getCdList);
}

/**
 * 業種に紐づくシーンを取得する
 * TODO: 適当に作ってるので後で正式版に変える
 * @param
 * @return Scene[]
 */
export function getIndustryScenes(industryCd: string) {
  let getCdList: string[] = []
  switch (industryCd) {
    case "01":
      getCdList = ["001"];
      break;
    case "02":
      getCdList = ["901", "902"];
      break;
    case "10":
      getCdList = ["004", "005", "007", "008", "009", "050", "051", "052", "053"];
      break;
    case "20":
      getCdList = ["001", "002", "003"];
      break;
    case "30":
      getCdList = ["004", "005"];
      break;
    case "31":
      getCdList = ["004", "005", "006", "007", "008", "009", "010", "011", "012", "013", "016", "017", "018", "019", "022", "050", "051", "052"];
      break;
    case "40":
      getCdList = ["016", "017", "021", "023", "024", "025", "026", "027", "028", "029", "030", "031", "032", "033", "034", "035", "036"];
      break;
    case "50":
      getCdList = ["036", "037", "038", "039", "040", "041", "042"];
      break;
    case "51":
      getCdList = ["013", "014", "015", "018", "019", "020"];
      break;
    case "90":
      getCdList = ["043", "044", "045", "046", "047", "048", "049"];
      break;
    case "99":
      getCdList = ["001", "002", "003", "004", "005", "006", "007", "008", "009", "010", "011", "012", "013", "014", "015", "016", "017", "018", "019", "020", "021", "022", "023", "024", "025", "026", "027", "028", "029", "030", "031", "032", "033", "034", "035", "036", "037", "038", "039", "040", "041", "042", "043", "044", "045", "046", "047", "048", "049", "050", "051", "052", "053", "901", "902",];
      break;
    default:
      getCdList = ["001", "002", "003", "004", "005", "006", "007", "008", "009", "010", "011", "012", "013", "014", "015", "016", "017", "018", "019", "020", "021", "022", "023", "024", "025", "026", "027", "028", "029", "030", "031", "032", "033", "034", "035", "036", "037", "038", "039", "040", "041", "042", "043", "044", "045", "046", "047", "048", "049", "050", "051", "052", "053", "901", "902",];
      break
  }
  return getScenes(getCdList);
}

/**
 * BGM選択画面に表示する業種を取得する
 * @param
 * @return Industry[]
 */
export function getBgmIndustries() {
  const getCdList = ["01", "10", "20", "30", "31", "40", "50", "51", "90"];
  return getIndustries(getCdList);
}

/**
 * テンプレート選択画面に表示する業種を取得する
 * @param
 * @return Industry[]
 */
export function getTemplateIndustries() {
  const getCdList = ["01", "10", "20", "30", "31", "40", "50", "51", "90"];
  return getIndustries(getCdList);
}

/**
 * フリーテンプレート選択画面に表示する業種を取得する
 * @param
 * @return Industry[]
 */
export function getFreeTemplateIndustries() {
  const getCdList = ["01", "10", "20", "30", "31", "40", "50", "51", "90"];
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
export function getSettingAppInformations() {
  return getAppInformation();
}

/**
 * idの形式がRecordingか判定
 * @param id string
 * @return bool
 */
export function isRecordingById(id: string) {
  return id.match(`^[0-9a-z]+-r-[0-9a-z]{8}$`)
}

/**
 * idの形式がTtsか判定
 * @param id string
 * @return bool
 */
export function isTtsById(id: string) {
  return id.match(`^[0-9a-z]+-t-[0-9a-z]{8}$`)
}

function getIndustries(cdList: string[]) {
  const result: Industry[] = [];
  cdList.forEach((v) => {
    result.push(Constants.INDUSTORIES.find((vv) => vv.cd == v)!);
  });
  // TODO: sort

  return result;
}

function getScenes(cdList?: string[]) {
  if (!cdList) return Constants.SCENES;
  const result: Scene[] = [];
  cdList.forEach((v) => {
    result.push(Constants.SCENES.find((vv) => vv.cd == v)!);
  });
  // TODO: sort

  return result;
}

function getSorts(cdList: number[]) {
  const result: Sorts[] = [];
  cdList.forEach((v) => {
    result.push(Constants.SORTS.find((vv) => vv.cd == v)!);
  });

  return result;
}

function getAppInformation(cdList?: string[]) {
  if (!cdList) return Constants.APP_INFORMATIONS;
  const result: AppInformation[] = [];
  cdList.forEach((v) => {
    result.push(Constants.APP_INFORMATIONS.find((vv) => vv.cd == v)!);
  });

  return result;
}