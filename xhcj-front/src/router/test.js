// 测试用路由

const testRouter = {
  path: "/test",
  component: () => import("../views/empty"),
  children: [
    {
      path: "picCut2",
      name: "PicCut2",
      component: () => import("../views/test/picCut2"),
    }
  ]
};

export default testRouter
