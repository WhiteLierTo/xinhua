// 财经号相关路由

const economicsRouter = {
    path: "/economics",
    component: () => import("../views/empty"),
    meta: { label: "财经号管理" },
    children: [
        {
            path: "economicsManage",
            name: "economicsManage",
            component: () => import("../views/economics/economics-manage/economics-manage"),
            meta: { label: "财经号管理" }
        },
        {
            path: "userEconomics",
            name: "userEconomics",
            component: () => import("../views/economics/economics-user/economics-user"),
            meta: { label: "财经号用户" }
        },
        {
            path: "economicsManage/addEconomics",
            name: "addEconomics",
            component: () => import("../views/economics/economics-manage/add-economics"),
            meta: { label: "财经号新增页" }
        }
    ]
}

export default economicsRouter