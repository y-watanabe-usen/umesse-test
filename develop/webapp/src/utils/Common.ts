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
* BGMの業種を取得する
* @param
* @return Industry[]
*/
export function getBgmIndustries() {
  let result: Industry[] = []
  const cds = ['01', '10', '20', '30', '31', '40', '50', '51', '90']
  cds.forEach((v) => {
    result.push(Constants.INDUSTORIES.find(vv => vv.cd == v)!)
  })

  // TODO: sort

  return result
}