const timeLimitFmt = (timeLimit) => {
  var fmt = '-'
  if (timeLimit == null || timeLimit == 0) {
    return fmt
  } else if (timeLimit / 24 < 1) {
    fmt = timeLimit % 24 + '小时'
  } else if (timeLimit % 24 == 0) {
    fmt = timeLimit / 24 + '天'
  } else {
    Math.floor(timeLimit / 24) + '天' + timeLimit % 24 + '小时'
  }
  return fmt
}

const dateFormat = (fmt, date) => {
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(),        // 年
    "m+": (date.getMonth() + 1).toString(),     // 月
    "d+": date.getDate().toString(),            // 日
    "H+": date.getHours().toString(),           // 时
    "M+": date.getMinutes().toString(),         // 分
    "S+": date.getSeconds().toString()          // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    };
  };
  return fmt;
}

export {
  timeLimitFmt,
  dateFormat
}
