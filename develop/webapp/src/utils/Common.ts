import Constants, { Industry } from "@/utils/Constants"

/**
* 秒を時分秒に変換
* @param second 秒
* @return h:m:s 形式の時刻
*/
export function sToHms(second: number) {
  const h = "" + ((second / 36000) | 0) + ((second / 3600) % 10 | 0);
  const m =
    "" + (((second % 3600) / 600) | 0) + (((second % 3600) / 60) % 10 | 0);
  const s = "" + (((second % 60) / 10) | 0) + ((second % 60) % 10);
  return h + ":" + m + ":" + s;
}

/**
* BGM選択画面に表示する業種を取得する
* @param
* @return Industry[]
*/
export function getBgmIndustries() {
  const getCdList = ['01', '10', '20', '30', '31', '40', '50', '51', '90']
  return getIndustries(getCdList)
}

/**
* テンプレート選択画面に表示する業種を取得する
* @param
* @return Industry[]
*/
export function getTemplateIndustries() {
  const getCdList = ['01', '10', '20', '30', '31', '40', '50', '51', '90']
  return getIndustries(getCdList)
}

/**
* フリーテンプレート選択画面に表示する業種を取得する
* @param
* @return Industry[]
*/
export function getFreeTemplateIndustries() {
  const getCdList = ['01', '10', '20', '30', '31', '40', '50', '51', '90']
  return getIndustries(getCdList)
}

function getIndustries(cdList: string[]) {
  let result: Industry[] = []
  cdList.forEach((v) => {
    result.push(Constants.INDUSTORIES.find(vv => vv.cd == v)!)
  })
  // TODO: sort

  return result
}