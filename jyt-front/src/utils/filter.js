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

export {
  timeLimitFmt
}
