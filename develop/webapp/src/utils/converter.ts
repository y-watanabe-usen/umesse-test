/**
 * 時刻を各国の形式に変換
 * @param timeString string 00:00
 * @param lang string ja|en|zh|ko
 * @return string
 */
const time = (timeString: string, lang: string) => {
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

const converter = {
  time,
};

export default converter;
