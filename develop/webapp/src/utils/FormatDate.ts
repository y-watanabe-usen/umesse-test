import dayjs from "dayjs";

/**
 * 日付文字列をYYYY/MM/DDに変換
 * @param dateString YYYY-MM-DDTHH:mm:ss+09:00
 * @return YYYY/MM/DD 形式の文字列
 */
export const convertDatestringToDate = (dateString: string) => {
  return dayjs(dateString).format("YYYY/MM/DD");
};

/**
 * 日付文字列をYYYY年MM月DD日に変換
 * @param dateString YYYY-MM-DDTHH:mm:ss+09:00
 * @return YYYY年MM月DD日 形式の文字列
 */
export const convertDatestringToDateJp = (dateString: string) => {
  return dayjs(dateString).format("YYYY年MM月DD日");
};

/**
 * 秒を時分秒に変換
 * @param second 秒
 * @return h:m:s 形式の時刻
 */
export const convertNumberToTime = (second: number) => {
  second = Math.floor(second);
  const h = "" + ((second / 36000) | 0) + ((second / 3600) % 10 | 0);
  const m =
    "" + (((second % 3600) / 600) | 0) + (((second % 3600) / 60) % 10 | 0);
  const s = "" + (((second % 60) / 10) | 0) + ((second % 60) % 10);
  return h == "00" ? m + ":" + s : h + ":" + m + ":" + s;
};
