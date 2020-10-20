// 活动相关路由

const activityRouter = {
  path: "/activity",
  component: () => import("../views/empty"),
  meta: {label: "活动"},
  children: [
    {
      path: "info",
      name: "ActivityInfo",
      component: () => import("../views/activity/activity-info/activity-info"),
      meta: {label: "信息管理"}
    },
    {
      path: "signUp",
      name: "ActivitySignUp",
      component: () => import("../views/activity/activity-sign-up/activity-sign-up"),
      meta: {label: "报名管理"}
    },
    {
      path: "signIn",
      name: "ActivitySignIn",
      component: () => import("../views/activity/activity-sign-in/activity-sign-in"),
      meta: {label: "签到管理"}
    },
    {
      path: "signUp/registrationReview",
      name: "RegistrationReview",
      component: () => import("../views/activity/registration-review/registration-review"),
      meta: {label: "报名审核"}
    },
    {
      path: "signIn/signInDetail",
      name: "ActivitySignInDetail",
      component: () => import("../views/activity/activity-sign-in-detail/activity-sign-in-detail"),
      meta: {label: "签到明细"}
    },

    {
      path: "info/addActivity",
      name: "addActivity",
      component: () => import("../views/activity/add-activity/add-activity"),
      meta: {label: "创建活动"}
    }

  ]
};

export default activityRouter
