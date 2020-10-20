// App用户相关路由

const userRouter = {
    path: "/user",
    component: () => import("../views/empty"),
    meta: { label: "App用户管理" },
    children: [
        {
            path: "userManage",
            name: "userManage",
            component: () => import("../views/user/user-manage/user-manage"),
            meta: { label: "App用户管理" }
        }
    ]
}

export default userRouter