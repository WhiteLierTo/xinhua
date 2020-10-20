import Vue from 'vue'
import Store from '../store'
import VueRouter from 'vue-router'
import testRouter from "./test";
import activityRouter from "./activity";
import systemRouter from "./system"
import economicsRouter from './economics'
import newsRouter from './news'
import cookieApi from "../utils/cookie"
import advertisementRouter from "./advertisement"
import menuRouter from './menu'
import personRouter from './person'
import userRouter from './user'
import invitationRouter from './invitation'
import liveRouter from './live'
import videoRouter from './video'
import dashboardRouter from "./dashboard"


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: "/index"
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/other/login/login")
  },
  {
    path: "/signScreen",
    name: "signScreen",
    component: () => import("../views/activity/sign-screen/sign-screen"),
    meta: {label: "签到投屏"}
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('../views/index'),
    children: [
      testRouter,
      activityRouter,
      systemRouter,
      economicsRouter,
      newsRouter,
      advertisementRouter,
      menuRouter,
      personRouter,
      userRouter,
      invitationRouter,
      liveRouter,
      videoRouter,
      dashboardRouter
    ]
  },
  {
    path: '/poster',
    name: "Poster",
    component: () => import("../views/empty")
  }
];

const router = new VueRouter({
  base: "./",
  routes
});


export default router


router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next();
    return
  }
  let token = cookieApi.get();
  if (token) next();
  else {
    next('/login')
  }
});
