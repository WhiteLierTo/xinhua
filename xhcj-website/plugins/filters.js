import Vue from 'vue'

function timeStampToStandardStr(timeStamp, splitStr = '-', splitStr2 = ":") {
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

Vue.filter('timeFormat', timeStampToStandardStr);
