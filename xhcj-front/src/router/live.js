// 直播相关路由

const liveRouter = {
    path: "/live",
    component: () => import("../views/empty"),
    meta: { label: "直播" },
    children: [
        {
            path: "liveManage",
            name: "liveManage",
            component: () => import("../views/live/live-manage"),
            meta: { label: "直播管理" }
        },
        {
            path: "liveManage/editLive",
            name: "editLive",
            component: () => import("../views/live/edit-live"),
            meta: { label: "编辑" }
        },
        {
            path: "liveManage/sendManage",
            name: "sendManage",
            component: () => import("../views/live/send-dialog.vue"),
            meta: { label: "发送直播信息" }
        }
    ]
}

export default liveRouter