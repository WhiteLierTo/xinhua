// 个人中心相关路由

const personRouter = {
    path: "/person",
    component: () => import("../views/empty"),
    meta: { label: "个人中心" },
    children: [
        {
            path: "personCenter",
            name: "personCenter",
            component: () => import("../views/person/person-center/person-center"),
            meta: { label: "个人中心" }
        }
    ]
}

export default personRouter