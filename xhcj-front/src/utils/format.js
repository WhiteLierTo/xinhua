// 各种格式化函数

class Format {
  // 将时间戳转换为2020-04-12 10:12"的形式
  // TODO 可选到哪里
  static timeStampToStandardStr(timeStamp, splitStr = '-', splitStr2 = ":") {
    timeStamp = parseInt(timeStamp);
    if (isNaN(timeStamp)) {
      return "";
      // throw new Error("timeStampToStr: 入参格式非法");
    }
    let data = new Date(timeStamp);
    return `${data.getFullYear()}${splitStr}${(data.getMonth() + 1).toString().padStart(2, "0")}${splitStr}${data.getDate().toString().padStart(2, "0")}
    ${data.getHours().toString().padStart(2, "0")}${splitStr2}${data.getMinutes().toString().padStart(2, "0")}
   `
  }

  static dateStampToStandardStr(timeStamp, splitStr = '-', splitStr2 = ":") {
    timeStamp = parseInt(timeStamp);
    if (isNaN(timeStamp)) {
      return "";
      // throw new Error("timeStampToStr: 入参格式非法");
    }
    let data = new Date(timeStamp);
    return `${(data.getMonth() + 1).toString().padStart(2, "0")}${splitStr}${data.getDate().toString().padStart(2, "0")}
    ${data.getHours().toString().padStart(2, "0")}${splitStr2}${data.getMinutes().toString().padStart(2, "0")}
   `
  }

  // 将b转换成kb,mb
  static bTOHigherCompany(n) {
    let companyTextList = ["kB", "MB", 'GB', 'TB'];
    let company = "B";
    while (n >= 1024 && companyTextList.length) {
      n = n / 1024;
      company = companyTextList.shift();
    }
    return `${n.toFixed(0)}${company}`
  }

  static sToTimeStr(s) {
    // 将秒数转换成"时:分:秒"的形式
    s = parseInt(s);// 舍弃小数
    if (s < 60) {
      return `00:${s.toString().padStart(2, "0")}`;
    }
    let min = parseInt(s / 60);
    s = s % 60;
    // if (min < 60) {
    return `${min.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
    // }
    // let h = parseInt(min / 60);
    // min = h % 60;
    // return `${h.toString()}:${min.toString()}:${s.toString()}`
  }
}

export default Format
