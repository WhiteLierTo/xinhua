//系统相关路由

const systemRouter = {
  path: "/system",
  component: () => import("../views/empty"),
  meta: {label: "系统"},
  children: [
    {
      path: "menu",
      name: "menuManage",
      component: () => import("../views/system/menu-manage/menu-manage"),
      meta: {label: "菜单管理"}
    },
    {
      path: "dictionary",
      name: "dataDictionary",
      component: () => import("../views/system/data-dictionary/data-dictionary"),
      meta: {label: "数据字典"}
    },
    {
      path: "dictionary/dictionaryDetail",
      name: "dictionaryDetail",
      component: () => import("../views/system/data-dictionary/data-dictionary-detail"),
      meta: {label: "数据字典详情"}
    },
    {
      path: "user",
      name: "SystemUser",
      component: () => import("../views/system/user-manage/user-manage"),
      meta: {label: "角色管理"}
    },
    {
      path: "setting",
      name: "systemSetting",
      component: () => import("../views/system/system-setting/system-setting"),
      meta: {label: "系统管理"}
    },
    {
      path: "bgUser",
      name: "backgroundUser",
      component: () => import("../views/system/background-user/background-user"),
      meta: {label: "后台用户"}
    },
    {
      path: "institution",
      name: "institutionManage",
      component: () => import("../views/system/institution-manage/institution-manage"),
      meta: {label: "后台机构"}
    },
    {
      path: "opinion",
      name: "Opinion",
      component: () => import("../views/system/opinion-feedback/opinion-feedback"),
      meta: {label: "意见反馈"}
    },
    {
      path: "seeking-coverage",
      name: "seekingCoverage",
      component: () => import("../views/system/seeking-coverage/seeking-coverage"),
      meta: {label: "寻求报道管理"}
    },
    {
      path: "sensitive",
      name: "sensitiveManage",
      component: () => import("../views/system/sensitive-manage/sensitive-manage"),
      meta: {label: "敏感词管理"}
    }
  ]
};

export default systemRouter
