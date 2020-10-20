// 统计


const dashboardRouter = {
  path: "/dashboard",
  component: () => import("../views/empty"),
  meta: {label: "统计信息"},
  children: [
    {
      path: "channel",
      name: "channel-statistics",
      component: () => import("../views/dashboard/channel-statistics/channel-statistics.vue"),
      meta: {label: "频道专题报表"}
    },
    {
      path: "article",
      name: "article-statistics",
      component: () => import("../views/dashboard/article-statistics/article-statistics"),
      meta: {label: "稿件报表"}
    },
    {
      path: "dau",
      name: "dau-statistics",
      component: () => import("../views/dashboard/dau-statistics/dau-statistics"),
      meta: {label: "日活报表"}
    },
  ]
};

export default dashboardRouter
