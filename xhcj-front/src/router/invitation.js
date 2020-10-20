// 邀请相关路由

const invitationRouter = {
  path: "/invitation",
  component: () => import("../views/empty"),
  meta: {label: "邀请"},
  children: [
    {
      path: "invitationManage",
      name: "invitationManage",
      component: () => import("../views/invitation/invitation-manage/invitation-manage.vue"),
      meta: {label: "邀请管理"}
    },
    {
      path: "invitationStatistics",
      name: "invitationStatistics",
      component: () => import("../views/invitation/invitation-statistics/invitation-statistics.vue"),
      meta: {label: "邀请统计"}
    },
  ]

}

export default invitationRouter
