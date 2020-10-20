//新闻相关路由

const newsRouter = {
  path: "/news",
  component: () => import("../views/empty"),
  meta: {label: "新闻"},
  children: [
    {
      path: "expressManage",
      name: "expressManage",
      component: () => import("../views/news/express-manage/express-manage"),
      meta: {label: "快讯管理"},
    },
    {
      path: "recyclingStation",
      name: "recyclingStation",
      component: () =>
          import("../views/news/recycling-station/recycling-station"),
      meta: {label: "快讯回收站"},
    },
    {
      path: "resource",
      name: "Resource",
      component: () => import("../views/news/resource/resource.vue"),
      meta: {label: "资源库管理"},
    },
    {
      path: "search",
      component: () => import("../views/empty"),
      meta: {label: "搜索管理"},
      children: [
        {
          path: "statistics",
          name: "Statistics",
          component: () =>
              import("../views/news/search/search-statistics/search-statistics"),
          meta: {label: "搜索统计"},
        },
        {
          path: "keyword",
          name: "keyword",
          component: () =>
              import("../views/news/search/search-keyword/search-keyword"),
          meta: {label: "搜索关键词"},
        },
      ],
    },
    {
      path: "channel",
      name: "channel",
      component: () => import("../views/news/channel/channel-manage.vue"),
      meta: {label: "频道管理"},
    },
    {
      path: "channel/editChannel",
      name: "editChannel",
      component: () => import("../views/news/channel/edit-channel"),
      meta: {label: "频道编辑"},
    },
    {
      path: "thematic",
      name: "thematic",
      component: () => import("../views/news/thematic/index.vue"),
      meta: {label: "专题库管理"},
    },
    {
      path: "thematic/addThematic",
      name: "addThematic",
      component: () => import("../views/news/thematic/add-thematic.vue"),
      meta: {label: "专题库新增页"},
    },
    {
      path: "manuscript",
      name: "manuscript",
      component: () => import("../views/news/manuscript/index.vue"),
      meta: {label: "集合页", alive: true},
    },
    {
      path: "manuscript/relation",
      name: "relationView",
      component: () => import("../views/news/manuscript/relation-view.vue"),
      meta: {label: "关联"},
    },
    {
      path: "commentManage",
      name: "commentManage",
      component: () => import("../views/news/comment/comment-manage"),
      meta: {label: "评论审核"},
    },
    {
      path: "articleManage",
      name: "articleManage",
      component: () => import("../views/news/article/article-manage"),
      meta: {label: "文章管理"},
    },
    {
      path: "manuscript/addArticle",
      name: "addArticle",
      component: () => import("../views/news/article/add-article"),
      meta: {label: "新增文章"},
    },
    {
      path: "push",
      name: "Push",
      component: () => import("../views/news/push/push-manage"),
      meta: {label: "推送管理"},
    },
  ],
};

export default newsRouter;
