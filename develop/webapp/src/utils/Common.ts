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