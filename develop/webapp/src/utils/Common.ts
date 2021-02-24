import Constants, { Industry, Scene, Sorts } from "@/utils/Constants";

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
 * 店内アナウンスの管理画面・CM音源保存時に表示するシーンを取得する
 * @param
 * @return Scene[]
 */
export function getManagementScenes() {
  return getScenes();
}

/**
 * 表示するアップロード先を取得する
 * @param
 * @return UploadSystem[]
 */
export function getUploadSystems() {
  return getUploadSystem();
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

function getIndustries(cdList: string[]) {
  let result: Industry[] = [];
  cdList.forEach((v) => {
    result.push(Constants.INDUSTORIES.find((vv) => vv.cd == v)!);
  });
  // TODO: sort

  return result;
}

function getScenes(cdList?: string[]) {
  if (!cdList) return Constants.SCENES;
  let result: Scene[] = [];
  cdList.forEach((v) => {
    result.push(Constants.SCENES.find((vv) => vv.cd == v)!);
  });
  // TODO: sort

  return result;
}

function getSorts(cdList: number[]) {
  let result: Sorts[] = [];
  cdList.forEach((v) => {
    result.push(Constants.SORTS.find((vv) => vv.cd == v)!);
  });

  return result;
}

function getUploadSystem(cdList?: string[]) {
  if (!cdList) return Constants.UPLOAD_SYSTEMS;
  let result: Scene[] = [];
  cdList.forEach((v) => {
    result.push(Constants.UPLOAD_SYSTEMS.find((vv) => vv.cd == v)!);
  });

  return result;
}