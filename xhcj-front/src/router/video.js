//  相关路由

const videoRouter = {
    path: "/video",
    component: () => import("../views/empty"),
    meta: { label: "视频管理" },
    children: [
        {
            path: "videoManage",
            name: "videoManage",
            component: () => import("../views/video/video"),
            meta: { label: "视频管理" }
        },
        {
            path: "videoManage/editVideo",
            name: "editVideo",
            component: () => import("../views/video/edit-video"),
            meta: { label: "视频新增页" }
        }
    ]
}

export default videoRouter
