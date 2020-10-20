export default function (context) {

  if (context.query.isPreView) {
    return
  }

  if (process.isMob && context.req.path === "/") {
    context.redirect("/index-mob");
    return
  }

  if (!process.isMob && context.req.path === "/index-mob") {
    context.redirect({path: "/"});
    return
  }

  if (process.isMob && !context.req.path.endsWith("-mob")) {
    context.redirect({path: `${context.req.path}-mob`, query: context.query});
    return
  }

  if (!process.isMob && context.req.path.endsWith("-mob")) {
    context.redirect({path: context.req.path.substr(0, context.req.path.length - 4), query: context.query});
  }
}
