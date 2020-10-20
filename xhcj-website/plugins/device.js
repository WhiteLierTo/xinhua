function isMoible(UA) {
  return /(Android|webOS|iPhone|iPod|tablet|BlackBerry|Mobile)/i.test(UA);
}

export default (context) => {
  context.app.router.beforeEach((to, from, next) => {
    let isMob;

    if (context.query.isPreview) {
      isMob = true
    } else {
      let userAgent = process.server ? context.req.headers["user-agent"] : navigator.userAgent;
      isMob = isMoible(userAgent);
    }

    process.isMob = isMob;

    next();
  })
}



