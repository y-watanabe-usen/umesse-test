export const ConverterType = {
  customerName: "${customerName}",
  time: "${time}",
  percentage: "${percentage}",
  count: "${number}",
  endYearDate: "${date1}",
  newYearDate: "${date2}",
  age: "${age}",
  minutes: "${minutes}",
  point: "${points}",
} as const;
export type ConverterType = typeof ConverterType[keyof typeof ConverterType];

/**
 * 時刻を各国の形式に変換
 * @param timeString string 00:00
 * @param lang string ja|en|zh|ko
 * @return string
 */
const convertTime = (timeString: string, lang: string) => {
  let result = "";
  const time = timeString.split(":");
  if (lang == "ja") {
    const h = +time[0] % 12;
    result = `${+time[0] < 12 ? "午前" : "午後"}${h}時`;
    if (+time[1] > 0) {
      result += `${time[1]}分`;
    }
  } else if (lang == "en") {
    const h = +time[0] % 12 === 0 ? 12 : +time[0] % 12;
    result = `${h}:${time[1]} ${+time[0] < 12 ? "a.m" : "p.m"}`;
  } else if (lang == "zh") {
    const h = +time[0] % 12 === 0 ? 12 : +time[0] % 12;
    let amPm = "";
    if (+time[0] < 5) {
      amPm = "凌晨";
    } else if (+time[0] < 9) {
      amPm = "早上";
    } else if (+time[0] < 12) {
      amPm = "上午";
    } else if (+time[0] < 13) {
      amPm = "中午";
    } else if (+time[0] < 18) {
      amPm = "下午";
    } else {
      amPm = "晚上";
    }
    result = `${amPm}${h}点`;
    if (+time[1] > 0) {
      result += `${time[1]}分`;
    }
  } else if (lang == "ko") {
    if (+time[0] == 0 && +time[1] == 0) {
      result = "자정";
    } else {
      let h = +time[0] % 12;
      if (+time[0] === 12) h = 12;
      result = `${+time[0] < 12 ? "오전" : "오후"} ${h}시`;
      if (+time[1] > 0) {
        result += ` ${time[1]} 분`;
      }
    }
  }
  return result;
};

/**
 * パーセンテージを各国の形式に変換
 * @param percentage number
 * @param lang string ja|en|zh|ko
 * @return number
 */
const convertPercentage = (percentage: number, lang: string) => {
  if (lang == "ja" || lang == "en" || lang == "ko") {
    return percentage;
  }
  return (100 - percentage) / 10;
};

/**
 * 年末の日付を各国の形式に変換
 * @param dateString string 12/1-31
 * @param lang string ja|en|zh|ko
 * @return number
 */
const convertEndYearDate = (dateString: string, lang: string) => {
  return convertDate(dateString, lang);
};

/**
 * 年始の日付を各国の形式に変換
 * @param dateString string 1/1-31
 * @param lang string ja|en|zh|ko
 * @return number
 */
const convertNewYearDate = (dateString: string, lang: string) => {
  return convertDate(dateString, lang);
};

/**
 * 日付を各国の形式に変換
 * @param dateString string MM/DD
 * @param lang string ja|en|zh|ko
 * @return number
 */
const convertDate = (dateString: string, lang: string) => {
  const date = dateString.split("/");
  if (lang == "ja" || lang == "zh" || lang == "ko") {
    return date[1];
  }
  let suffix = "th";
  if (date[1] == "1") {
    suffix = "st";
  } else if (date[1] == "2") {
    suffix = "nd";
  } else if (date[1] == "3") {
    suffix = "rd";
  }
  return `${date[1]}${suffix}`;
};

const convertManuscript = (
  manuscript: string,
  lang: string,
  customerName: string,
  time: string,
  percentage: number,
  count: number,
  endYearDate: string,
  newYearDate: string,
  age: number,
  minutes: number,
  point: number,
) => {
  return manuscript
    .replace(new RegExp(`\\${ConverterType.customerName}`, "g"), customerName)
    .replace(new RegExp(`\\${ConverterType.time}`, "g"), convertTime(time, lang))
    .replace(new RegExp(`\\${ConverterType.percentage}`, "g"), convertPercentage(percentage, lang) + "")
    .replace(new RegExp(`\\${ConverterType.count}`, "g"), count + "")
    .replace(new RegExp(`\\${ConverterType.endYearDate}`, "g"), convertEndYearDate(endYearDate, lang))
    .replace(new RegExp(`\\${ConverterType.newYearDate}`, "g"), convertNewYearDate(newYearDate, lang))
    .replace(new RegExp(`\\${ConverterType.age}`, "g"), age + "")
    .replace(new RegExp(`\\${ConverterType.minutes}`, "g"), minutes + "")
    .replace(new RegExp(`\\${ConverterType.minutes}`, "g"), minutes + "")
    .replace(new RegExp(`\\${ConverterType.point}`, "g"), point + "");
};

const converter = {
  convertTime,
  convertPercentage,
  convertEndYearDate,
  convertNewYearDate,
  convertManuscript,
};

export default converter;
