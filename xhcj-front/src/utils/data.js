// 各种数据

import router from "../router"
import Vue from "../main"


class Activity {
  // 活动数据
  actStateOptions() {
    return [
      {label: "草稿", value: '0', color: "#E78921"},
      {label: "未开始", value: 'l2_coming', color: "#0079FF"},
      {label: "进行中", value: "l3_hot", color: "#16A05D"},
      {label: "已结束", value: 'l1_finish', color: "#7F7F7F"},
    ]
  }

  getPartActStateOptionsByValues(valueList = []) {
    return this.actStateOptions().filter(option => valueList.includes(option.value))
  }

  getActStateLabelByValue(value) {
    let row = this.actStateOptions().filter(d => d.value === value);
    if (row.length !== 1) return "";
    return row[0].label
  }

  getActStateColorByValue(value) {
    let row = this.actStateOptions().filter(d => d.value === value);
    if (row.length !== 1) return false;
    return row[0].color
  }

  // 审核状态
  applyStatusOptions() {
    return [
      {label: "未审核", value: 0, color: '#E78921'},
      {label: "已通过", value: 1, color: '#16A05D'},
      {label: "未通过", value: 2, color: '#DC4B41'},
    ]
  }

  getApplyStatusLabelByValue(value) {
    let row = this.applyStatusOptions().filter(d => d.value === value);
    if (row.length !== 1) return false;
    return row[0].label
  }

  getApplyStatusColorByValue(value) {
    let row = this.applyStatusOptions().filter(d => d.value === value);
    if (row.length !== 1) return false;
    return row[0].color
  }

  // 性别
  sexOptions() {
    return [
      {label: "男", value: 'male'},
      {label: "女", value: 'female'},
    ]
  }

  getSexLabelByValue(value) {
    let row = this.sexOptions().filter(d => d.value === value);
    if (row.length !== 1) return false;
    return row[0].label
  }

  // 签到状态
  signInStatusOptions() {
    return [
      {label: "未签到", value: 0, color: "#DC4B41"},
      {label: "已签到", value: 1, color: "#16A05D"},
    ]
  }

  getSignInStatusLabelByValue(value) {
    let row = this.signInStatusOptions().filter(d => d.value === value);
    if (row.length !== 1) return false
    return row[0].label
  }

  getSignInStatusColorByValue(value) {
    let row = this.signInStatusOptions().filter(d => d.value === value);
    if (row.length !== 1) return false
    return row[0].color
  }
}

class system {
  //字典状态
  dictStatusOptions() {
    return [
      {label: '正常', value: 0},
      {label: '停用', value: 1}
    ]
  }

  getDictStatusLabelByValue(value) {
    let row = this.dictStatusOptions().filter(d => d.value === value);
    if (row.length !== 1) return false
    return row[0].label
  }

  //系统内置
  sysStatusOptions() {
    return [
      {label: '是', value: 'Y'},
      {label: '否', value: 'N'}
    ]
  }

  userStatusOptions() {
    return [
      {label: '正常', value: 0},
      {label: '锁定', value: 1},
      {label: '禁用', value: 2}
    ]
  }
}

class News {
  newsStatusOptions() {
    return [
      {
        value: "published",
        label: "已发布",
        color: "#16A05D"
      },
      {
        value: "hide",
        label: "已隐藏",
        color: '#7F7F7F'
      },
      {
        value: "recyclebin",
        label: "回收站",
        color: '#E78921'
      }
    ]
  }

  getNewsStatusLabelByValue(value) {
    let row = this.newsStatusOptions().filter(d => d.value === value);
    if (row.length !== 1) return false
    return row[0].label
  }

  getNewsStateColorByValue(value) {
    let row = this.newsStatusOptions().filter(d => d.value === value);
    if (row.length !== 1) return false;
    return row[0].color
  }

  //频道管理
  channelStatusOptions() {
    return [
      {label: '显示', value: 1},
      {label: '隐藏', value: 0}
    ]
  }

  getchannelStatusOptions(value) {
    let row = this.channelStatusOptions().filter(d => d.value === value);
    if (row.length !== 1) return false
    return row[0].label
  }
}

class Economics {
  // 机构类型
  econStatusOptions() {
    return [
      {label: '保险', value: '保险'},
      {label: '证券', value: '证券'},
      {label: '银行', value: '银行'}
    ]
  }
}

//直播
class Live {
  //直播状态
  liveStatusOptions() {
    return [
      {
        value: "l1_finish",
        label: "视频回放",
        color: '#7F7F7F'
      },
      {
        value: "l2_coming",
        label: "即将到来",
        color: '#0079FF'
      },
      {
        value: "l3_living",
        label: "正在直播",
        color: '#16A05D'
      }
    ]
  }

  getLiveStatusLabelByValue(value) {
    let row = this.liveStatusOptions().filter(d => d.value === value);
    if (row.length !== 1) return false
    return row[0].label
  }

  getLiveStateColorByValue(value) {
    let row = this.liveStatusOptions().filter(d => d.value === value);
    if (row.length !== 1) return false;
    return row[0].color
  }

  //稿件状态
  articleStatusOptions() {
    return [
      {
        value: 0,
        label: "草稿",
        color: '#DC4B41'
      },
      {
        value: 1,
        label: "删除",
        color: '#0079FF'
      },
      {
        value: 2,
        label: "待审核",
        color: '#E7A23D'
      },
      {
        value: 3,
        label: "已发布",
        color: '#0079FF'
      },
      {
        value: 4,
        label: "已撤稿",
        color: '#7F7F7F'
      },
      {
        value: 5,
        label: "未通过",
        color: '#16A05D'
      }
    ]
  }

  getArticleStatusLabelByValue(value) {
    let row = this.articleStatusOptions().filter(d => d.value === value);
    if (row.length !== 1) return false
    return row[0].label
  }

  getArticleStateColorByValue(value) {
    let row = this.articleStatusOptions().filter(d => d.value === value);
    if (row.length !== 1) return false;
    return row[0].color
  }

  //置顶
  topStatusOptions() {
    return [
      {label: '否', value: 0},
      {label: '是', value: 1},
    ]
  }

  getTopStatusLabelByValue(value) {
    let row = this.topStatusOptions().filter(d => d.value === value);
    if (row.length !== 1) return false
    return row[0].label
  }


}

class Route {
  // 路由数据

  constructor() {
    this.routes = router.options.routes
  }

  // getBreadcrumb() {
  //   // TODO 可以优化
  //   let pathList = Vue.$route.path.split("/").filter(d => d);
  //   let breadcrumbs = []; // 返回的面包屑

  //   let currentRouteTree = this.routes.find(route => route.path === "/index"); // 匹配的路由树

  //   while (pathList.length) {
  //     if (!currentRouteTree.children || !currentRouteTree.children.length) {
  //       break
  //     }
  //     let currentPath = pathList.shift();
  //     let routeObj = currentRouteTree.children.find(route => {
  //       if (!route.path) return false;
  //       let lastPath = _getLastRoute(route.path);
  //       return lastPath === currentPath
  //     });
  //     if (!routeObj) break;
  //     breadcrumbs.push({ ...routeObj.meta, ...{ path: _getLastRoute(routeObj.path), canJump: !routeObj.children } });
  //     if (routeObj.children) {
  //       currentRouteTree = routeObj
  //     }
  //   }

  getBreadcrumb() {
    // TODO 可以优化
    let pathList = Vue.$route.path.split("/").filter(d => d);
    let breadcrumbs = []; // 返回的面包屑

    let currentRouteTree = this.routes.find(route => route.path === "/index"); // 匹配的路由树

    while (pathList.length) {
      if (!currentRouteTree.children || !currentRouteTree.children.length) {
        break
      }
      let currentPath = pathList.shift();
      let routeObj = currentRouteTree.children.find(route => {
        if (!route.path) return false;
        let lastPath = _getLastRoute(route.path);
        return lastPath === currentPath
      });
      if (!routeObj) break;
      breadcrumbs.push({...routeObj.meta, ...{path: _getLastRoute(routeObj.path), canJump: !routeObj.children}});
      if (routeObj.children) {
        currentRouteTree = routeObj
      }
    }

    if (breadcrumbs.length) {
      breadcrumbs[breadcrumbs.length - 1].canJump = false;
    }

    let accumulationPathList = [""];
    breadcrumbs.forEach((breadcrumb, index) => {
      accumulationPathList.push(breadcrumb.path);
      breadcrumb.path = accumulationPathList.join("/")
    });

    return breadcrumbs;

    function _getLastRoute(path) {
      if (!path) return "";
      let routeList = path.split("/").filter(d => d);
      return routeList[routeList.length - 1];
    }
  }
}

class File {
  static getImageByDocExtension(fileName) {
    let ext = "";
    if (fileName.includes(".")) {
      ext = fileName.split(".")[fileName.split(".").length - 1]
    } else {
      ext = fileName
    }

    let docMapping = {
      doc: require("../assets/resource/word.png"),
      docx: require("../assets/resource/word.png"),
      pdf: require("../assets/resource/pdf.png"),
      txt: require("../assets/resource/Txt.png"),
      xls: require("../assets/resource/excel.png"),
      xlsx: require("../assets/resource/excel.png"),
      pptx: require("../assets/resource/ppt.png"),
    };
    return docMapping[ext]
  }
}

class Advertisement {
  adsStateOptions() {
    return [
      {label: "正常", value: 1, color: "#16A05D"},
      {label: "停用", value: 0, color: "#7F7F7F"},
    ]
  }

  getAdsStateColorByValue(value) {
    let row = this.adsStateOptions().filter(d => d.value === value);
    if (row.length !== 1) return false;
    return row[0].color
  }
}

class Manuscript {
  static manuscriptTypeOptions() {
    return [
      {
        value: 1, // articleType
        label: "原创",
      },
      {
        value: 2,
        label: "抓取",
      },
      {
        value: 3,
        label: "广告",
      },
      {
        value: 4,
        label: "财经号",
      },
      {
        value: 5,
        label: "视频",
      },
      {
        value: 6,
        label: "直播",
      },
      {
        value: 7,
        label: "活动",
      },
      {
        value: 8,
        label: "专题",
      },
    ]
  }

  static getManuscriptStatusLabelByValue(value) {
    let row = Manuscript.manuscriptTypeOptions().filter(d => d.value === value);
    if (row.length !== 1) return false;
    return row[0].label
  }

}

class Video {
  //稿件状态
  articleStatusOptions() {
    return [
      {
        value: 0,
        label: "草稿",
        color: '#E78921'
      },
      {
        value: 2,
        label: "待审核",
        color: '#0079FF'
      },
      {
        value: 3,
        label: "已发布",
        color: '#16A05D'
      },

      {
        value: 4,
        label: "已撤稿",
        color: '#7F7F7F'
      },
      {
        value: 5,
        label: "未通过",
        color: '#DC4B41'
      },


    ]
  }

  getArticleStatusLabelByValue(value) {
    let row = this.articleStatusOptions().filter(d => d.value === value);
    if (row.length !== 1) return false
    return row[0].label
  }

  getArticleStateColorByValue(value) {
    let row = this.articleStatusOptions().filter(d => d.value === value);
    if (row.length !== 1) return false;
    return row[0].color
  }

  //置顶
  topStatusOptions() {
    return [
      {label: '是', value: 1},
      {label: '否', value: 0},

    ]
  }

  getTopStatusLabelByValue(value) {
    let row = this.topStatusOptions().filter(d => d.value === value);
    if (row.length !== 1) return false
    return row[0].label
  }

  //baner
  bannerStatusOptions() {
    return [
      {label: '是', value: 1},
      {label: '否', value: 0},
    ]
  }

  getBannerStatusLabelByValue(value) {
    let row = this.topStatusOptions().filter(d => d.value === value);
    if (row.length !== 1) return false
    return row[0].label
  }

  //isCommentAudit
  auditStatusOptions() {
    return [
      {label: '审核', value: 1},
      {label: '不审核', value: 0},
    ]
  }

  getAuditStatusLabelByValue(value) {
    let row = this.topStatusOptions().filter(d => d.value === value);
    if (row.length !== 1) return false
    return row[0].label
  }
}

class Article {
  //稿件状态
  articleStatusOptions() {
    return [
      {
        value: 0,
        label: "草稿",
        color: '#E78921'
      },
      {
        value: 2,
        label: "待审核",
        color: '#0079FF'
      },
      {
        value: 3,
        label: "审核通过",
        color: '#16A05D'
      },

      {
        value: 4,
        label: "已撤稿",
        color: '#7F7F7F'
      },
      {
        value: 5,
        label: "审核不通过",
        color: '#DC4B41'
      },


    ]
  }

  getArticleStatusLabelByValue(value) {
    let row = this.articleStatusOptions().filter(d => d.value === value);
    if (row.length !== 1) return false
    return row[0].label
  }

  getArticleStateColorByValue(value) {
    let row = this.articleStatusOptions().filter(d => d.value === value);
    if (row.length !== 1) return false;
    return row[0].color
  }


  //文章类型
  articleTypeOptions() {
    return [
      {
        value: 'normal',
        label: "原创",
      },
      {
        value: "grasp",
        label: "抓取",
      },
      {
        value: "adv",
        label: "广告",
      },
      {
        value: "cjh",
        label: "财经号",
      }
    ]
  }

  getArticleTypeLabelByValue(value) {
    let row = this.articleTypeOptions().filter(d => d.value === value);
    if (row.length !== 1) return false
    return row[0].label
  }

  //置顶
  topStatusOptions() {
    return [
      {label: '是', value: 1},
      {label: '否', value: 0},

    ]
  }

  getTopStatusLabelByValue(value) {
    let row = this.topStatusOptions().filter(d => d.value === value);
    if (row.length !== 1) return false
    return row[0].label
  }

  //baner
  bannerStatusOptions() {
    return [
      {label: '是', value: 1},
      {label: '否', value: 0},
    ]
  }

  getBannerStatusLabelByValue(value) {
    let row = this.topStatusOptions().filter(d => d.value === value);
    if (row.length !== 1) return false
    return row[0].label
  }

  //isCommentAudit
  auditStatusOptions() {
    return [
      {label: '审核', value: 1},
      {label: '不审核', value: 0},
    ]
  }

  getAuditStatusLabelByValue(value) {
    let row = this.topStatusOptions().filter(d => d.value === value);
    if (row.length !== 1) return false
    return row[0].label
  }

  // isPcBanner
  pcbannerStatusOptions() {
    return [
      {label: '是', value: 1},
      {label: '否', value: 0},
    ]
  }

  getPCbannerStatusLabelByValue(value) {
    let row = this.topStatusOptions().filter(d => d.value === value);
    if (row.length !== 1) return false
    return row[0].label
  }
}

const
    Data = {
      // 活动状态
      activity: new Activity(),
      // 系统状态
      system: new system(),
      // 新闻状态
      news: new News(),
      //财经号状态
      economics: new Economics(),
      //稿件
      manuscript: Manuscript,
      route: new Route(),
      file: File,
      advertisement: new Advertisement(),
      //直播
      live: new Live(),
      //视频
      video: new Video(),
      // 文章
      article: new Article()
    };

export default Data
