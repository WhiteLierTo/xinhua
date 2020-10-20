// 主题相关路由

const menuRouter = {
  path: "/menu",
  component: () => import("../views/empty"),
  meta: {label: "主题管理"},
  children: [
    {
      path: "addMenu",
      name: "addMenu",
      component: () => import("../views/menu/add-menu/add-menu"),
      meta: {label: "新增主题"}
    },
    {
      path: "menuEntry",
      name: "menuEntry",
      component: () => import("../views/menu/menu"),
      // component: () => import("../views/menu/add-menu/menu-entry"),
      meta: {label: "主题录入"}
    }
  ]
};

export default menuRouter
