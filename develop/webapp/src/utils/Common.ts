import Constants, { AppInformation, Industry, Scene } from "@/utils/Constants";

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
 * 店内アナウンスの管理画面に表示するシーンを取得する
 * @param
 * @return Scene[]
 */
export function getManagementScenes() {
  return getScenes();
}

/**
 * 設定画面に表示する項目を取得する
 * @param
 * @return AppInformation[]
 */
export function getSettingAppInformations() {
  return getAppInformation();
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

function getAppInformation(cdList?: string[]) {
  if (!cdList) return Constants.APP_INFORMATIONS;
  let result: AppInformation[] = [];
  cdList.forEach((v) => {
    result.push(Constants.APP_INFORMATIONS.find((vv) => vv.cd == v)!);
  });
  // TODO: sort

  return result;
}