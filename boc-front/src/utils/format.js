// 各种格式化函数

class Format {
  // 将时间戳转换为2020-04-12 10:12"的形式
  timeStampToStandardStr(timeStamp, splitStr = '-', splitStr2 = ":") {
    timeStamp = parseInt(timeStamp);
    if (isNaN(timeStamp)) {
      throw new Error("timeStampToStr: 入参格式非法");
    }
    let data = new Date(timeStamp);
    return `
    ${data.getFullYear()}${splitStr}
    ${(data.getMonth() + 1).toString().padStart(2, "0")}
    ${splitStr}${data.getDate().toString().padStart(2, "0")} 
    ${data.getHours().toString().padStart(2, "0")}${splitStr2}
    ${data.getMinutes().toString().padStart(2, "0")}${splitStr2}
    `
  }
}

export default new Format()
