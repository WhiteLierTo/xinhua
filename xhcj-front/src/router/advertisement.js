// 广告相关路由

const advertisementRouter = {
  path: "/advertisement",
  component: () => import("../views/empty"),
  meta: {label: "广告管理"},
  children: [
    {
      path: "starUp",
      name: "appStarUp",
      component: () => import("../views/advertisement/app-start-up/index.vue"),
      meta: {label: "APP启动页"}
    },
    {
      path: "rotationPicture",
      name: "activityRotationPicture",
      component: () => import("../views/advertisement/activity-rotation-picture/index.vue"),
      meta: {label: "官网活动轮播大图"}
    },
  ]
};

export default advertisementRouter
