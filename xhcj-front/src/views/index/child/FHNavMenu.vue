<template>
  <div
    class="FH-nav-menu-container"
    :class="{ collapse: isCollapse }"
    @mouseleave="onFHNavMenuMouseLeave"
  >
    <div
      class="one-nav-container"
      :class="{ isOpen: openNavIndex === index && !isCollapse }"
      v-for="(nav, index) in navInfo"
      :key="index"
      @mousemove="onOneNavMouseMove(index)"
    >
      <div
        class="level-one-nav-container"
        @click="selectLevelOneNav(nav, index)"
        :title="isCollapse ? nav.label : ''"
      >
        <img :src="nav.iconPath" alt class="nav-icon-img" />
        <span v-if="!isCollapse">{{ nav.label }}</span>
        <i class="el-icon-arrow-down" v-if="nav.children && !isCollapse"></i>
      </div>

      <div class="level-two-nav-container" v-if="nav.children && openNavIndex === index">
        <div
          class="one-level-two-nav-container"
          :class="{
            'one-level-two-nav-container-active': $route.path.includes(
              navCell.path
            ),
          }"
          v-for="(navCell, cellIndex) in nav.children"
          :key="cellIndex"
        >
          <div
            class="level-two-label-row-container"
            :class="{ twoOpen: openLevenNavIndex === cellIndex }"
            @click="clickLevelTwoNav(navCell, cellIndex)"
            @mousemove="onTwoNavMouseMove(cellIndex)"
          >
            <i :class="navCell.icon"></i>
            <span>{{ navCell.label }}</span>
            <i class="el-icon-arrow-down" v-if="navCell.children && !isCollapse"></i>
            <i class="el-icon-arrow-right" v-if="navCell.children && isCollapse"></i>
          </div>

          <div class="level-three-rows-container" v-if="navCell.children">
            <div v-for="(navThreeCell, threeCellIndex) in navCell.children" :key="threeCellIndex">
              <div
                class="level-three-nav-container"
                :class="{
                  'one-level-two-nav-container-active': $route.path.includes(
                    navThreeCell.path
                  ),
                }"
                @click="clickLevelThreeNav(navThreeCell)"
                v-if="openLevenNavIndex === cellIndex"
              >
                <i :class="navThreeCell.icon"></i>
                <span>{{ navThreeCell.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// TODO 路由匹配算法有问题
// TODO 次级路由太长,页面高度不够时的bug
export default {
  name: "FHNavMenu",
  props: {
    isCollapse: Boolean,
  },
  //"permissions"
  data() {
    return {
      navInfo: [
        {
          label: "数据报表",
          iconPath: require("../../../assets/icons/navbar/baobiao.png"),
          permissionKey: "allow",
          children: [
            {
              label: "频道与专题",
              icon: "el-icon-s-flag",
              path: "/dashboard/channel",
              permissionKey: "allow",
            },
            {
              label: "稿件报表",
              icon: "el-icon-s-flag",
              path: "/dashboard/article",
              permissionKey: "allow",
            },
            {
              label: "DAU报表",
              icon: "el-icon-s-flag",
              path: "/dashboard/dau",
              permissionKey: "allow",
            },
          ],
        },
        {
          label: "新闻管理",
          iconPath: require("../../../assets/icons/navbar/icon10.png"),
          children: [
            {
              label: "稿件管理(集合页)",
              icon: "el-icon-s-flag",
              path: "/news/manuscript",
              permissionKey: "news:articleList:query",
            },
            {
              label: "频道管理",
              icon: "el-icon-s-flag",
              path: "/news/channel",
              permissionKey: "news:normalChannel:query",
            },
            {
              label: "专题库管理",
              icon: "el-icon-s-flag",
              path: "/news/thematic",
              permissionKey: "news:specialChannel:query",
            },
            {
              label: "评论审核",
              icon: "el-icon-s-flag",
              path: "/news/commentManage",
              permissionKey: "news:commentAudit:query",
            },
            {
              label: "快讯管理",
              icon: "el-icon-s-flag",
              children: [
                {
                  label: "快讯管理",
                  path: "/news/expressManage",
                  icon: "el-icon-s-flag",
                  permissionKey: "news:newsFlash:query",
                },
                {
                  label: "快讯回收站",
                  path: "/news/recyclingStation",
                  icon: "el-icon-s-flag",
                  permissionKey: "news:newsFlash:recycle:query",
                },
              ],
            },
            {
              label: "资源库管理",
              icon: "el-icon-s-flag",
              path: "/news/resource",
              permissionKey: "news:resource:query",
            },
            {
              label: "搜索管理",
              icon: "el-icon-s-flag",
              children: [
                {
                  label: "搜索关键词",
                  path: "/news/search/keyword",
                  icon: "el-icon-s-flag",
                  permissionKey: "news:search:keyword:query",
                },
                {
                  label: "搜索统计",
                  path: "/news/search/statistics",
                  icon: "el-icon-s-flag",
                  permissionKey: "news:search:total:query",
                },
              ],
            },
            {
              label: "推送管理",
              icon: "el-icon-s-flag",
              path: "/news/push",
              permissionKey: "news:push:query",
            },
          ],
        },
        {
          label: "活动管理",
          iconPath: require("../../../assets/icons/navbar/icon5.png"),
          children: [
            {
              label: "信息管理",
              path: "/activity/info",
              icon: "el-icon-s-flag",
              permissionKey: "activity:infomation:query",
            },
            {
              label: "报名管理",
              path: "/activity/signUp",
              icon: "el-icon-s-flag",
              permissionKey: "activity:apply:query",
            },
            {
              label: "签到管理",
              path: "/activity/signIn",
              icon: "el-icon-s-flag",
              permissionKey: "activity:siginIn:query",
            },
          ],
        },
        {
          label: "视频管理",
          iconPath: require("../../../assets/icons/navbar/icon9.png"),

          children: [
            {
              label: "视频管理",
              path: "/video/videoManage",
              icon: "el-icon-s-flag",
              permissionKey: "video:infomation:query",
            },
          ],
        },
        {
          label: "直播管理",
          iconPath: require("../../../assets/icons/navbar/icon4.png"),
          children: [
            {
              label: "直播管理",
              path: "/live/liveManage",
              icon: "el-icon-s-flag",
              permissionKey: "live:infomation:query",
            },
          ],
        },
        {
          label: "财经号管理",
          iconPath: require("../../../assets/icons/navbar/icon1.png"),
          children: [
            {
              label: "财经号管理",
              path: "/economics/economicsManage",
              icon: "el-icon-s-flag",
              permissionKey: "cjh:infomation:query",
            },
            {
              label: "财经号用户",
              path: "/economics/userEconomics",
              icon: "el-icon-s-flag",
              permissionKey: "cjh:user:query",
            },
          ],
        },
        {
          label: "广告管理",
          iconPath: require("../../../assets/icons/navbar/icon6.png"),
          children: [
            {
              label: "APP启动页",
              path: "/advertisement/starUp",
              icon: "el-icon-s-flag",
              permissionKey: "advertisement:app:query",
            },
            {
              label: "官网活动轮播大图",
              path: "/advertisement/rotationPicture",
              icon: "el-icon-s-flag",
              permissionKey: "advertisement:officialWeb:query",
            },
          ],
        },
        {
          label: "App用户管理",
          iconPath: require("../../../assets/icons/navbar/icon3.png"),
          children: [
            {
              label: "App用户管理",
              path: "/user/userManage",
              icon: "el-icon-s-flag",
              permissionKey: "app:user:query",
            },
          ],
        },
        {
          label: "主题管理",
          iconPath: require("../../../assets/icons/navbar/icon8.png"),
          children: [
            {
              label: "主题管理",
              path: "/menu/menuEntry",
              icon: "el-icon-s-flag",
              permissionKey: "theme:import:query",
            },
          ],
        },
        {
          label: "系统管理",
          iconPath: require("../../../assets/icons/navbar/icon11.png"),
          children: [
            {
              label: "菜单管理",
              path: "/system/menu",
              icon: "el-icon-s-flag",
              permissionKey: "system:menu:query",
            },
            {
              label: "数据字典",
              path: "/system/dictionary",
              icon: "el-icon-s-flag",
              permissionKey: "system:dictData:query",
            },
            {
              label: "角色管理",
              path: "/system/user",
              icon: "el-icon-s-flag",
              permissionKey: "system:role:query",
            },
            {
              label: "系统管理",
              path: "/system/setting",
              icon: "el-icon-s-flag",
              permissionKey: "system:config:query",
            },
            {
              label: "后台用户",
              path: "/system/bgUser",
              icon: "el-icon-s-flag",
              permissionKey: "system:user:query",
            },
            {
              label: "后台机构",
              path: "/system/institution",
              icon: "el-icon-s-flag",
              permissionKey: "system:organize:query",
            },
            {
              label: "意见反馈",
              path: "/system/opinion",
              icon: "el-icon-s-flag",
              permissionKey: "system:userSuggest:query",
            },
            {
              label: "寻求报道管理",
              path: "/system/seeking-coverage",
              icon: "el-icon-s-flag",
              permissionKey: "system:seekReport:query",
            },
            {
              label: "敏感词管理",
              path: "/system/sensitive",
              icon: "el-icon-s-flag",
              permissionKey: "system:sensitiveWord:query",
            },
          ],
        },
        {
          label: "邀请管理",
          iconPath: require("../../../assets/icons/navbar/icon7.png"),
          children: [
            {
              label: "邀请管理",
              path: "/invitation/invitationManage",
              icon: "el-icon-s-flag",
              permissionKey: "invitation:infomation:query",
            },
            {
              label: "邀请统计",
              path: "/invitation/invitationStatistics",
              icon: "el-icon-s-flag",
              permissionKey: "invitation:total:query",
            },
          ],
        },
      ],
      openNavIndex: -1,
      openLevenNavIndex: -1,
    };
  },
  mounted() {
    // 清洗目录
    this.cleanNavInfo();

    // 动画有点卡,延迟半秒执行
    if (!this.isCollapse) {
      setTimeout(this.handleDefaultOpen, 1000);
    }
  },
  watch: {
    isCollapse() {
      // 丑陋!
      if (this.isCollapse) {
        this.openNavIndex = -1;
      }
    },
  },
  methods: {
    selectLevelOneNav(nav, index) {
      // 无下拉
      if (!nav.children) {
        this.openNavIndex = index;
        if (nav.path !== this.$route.path) {
          this.$router.push(nav.path);
        }
        return;
      }

      // 有下拉
      if (this.isCollapse) return;

      if (this.openNavIndex !== index) {
        this.openNavIndex = index;
      } else if (nav.children && this.openNavIndex === index) {
        this.openNavIndex = -1;
      }
    },

    clickLevelTwoNav(navCell, index) {
      // 无下拉
      if (!navCell.children) {
        if (navCell.path !== this.$route.path) {
          this.$router.push(navCell.path);
        }
        return;
      }

      // 有下拉
      if (this.isCollapse) return;
      if (this.openLevenNavIndex === index) {
        this.openLevenNavIndex = -1;
        return;
      }
      this.openLevenNavIndex = index;
    },

    clickLevelThreeNav(threeCell) {
      if (threeCell.path !== this.$route.path) {
        this.$router.push(threeCell.path);
      }
    },

    handleDefaultOpen() {
      // 刷新后默认打开
      // 丑陋!
      let currentPath = this.$route.path;

      for (let i = 0; i < this.navInfo.length; i++) {
        let nav = this.navInfo[i];
        if (nav.path === currentPath) {
          this.openNavIndex = i;
          return;
        }
        if (nav.children) {
          for (let j = 0; j < nav.children.length; j++) {
            let childNav = nav.children[j];
            if (childNav.path === currentPath) {
              // 二级菜单
              this.openNavIndex = i;
              return;
            }

            if (childNav.children) {
              for (let k = 0; k < childNav.children.length; k++) {
                let threeChildNav = childNav.children[k];
                if (threeChildNav.path === currentPath) {
                  // 三级级菜单
                  this.openNavIndex = i;
                  this.openLevenNavIndex = j;
                  return;
                }
              }
            }
          }
        }
      }
    },

    onOneNavMouseMove(index) {
      if (!this.isCollapse) return;
      this.openNavIndex = index;
    },

    onTwoNavMouseMove(index) {
      if (!this.isCollapse) return;
      this.openLevenNavIndex = index;
    },

    onFHNavMenuMouseLeave() {
      if (!this.isCollapse) return;
      this.openNavIndex = -1;
      this.openLevenNavIndex = -1;
    },

    cleanNavInfo() {
      this.navInfo = this.navInfo
        .map(this._getNavWithPermission)
        .filter(Boolean);
    },

    _getNavWithPermission(nav) {
      if (nav.children) {
        let cleanedChildren = nav.children
          .map((childNav) => this._getNavWithPermission(childNav))
          .filter(Boolean);
        if (cleanedChildren.length) {
          nav.children = cleanedChildren;
          return nav;
        }
        return null;
      } else {
        return this.$store.state.permissions.includes(nav.permissionKey)
          ? nav
          : null;
      }
    },
  },
};
</script>

<style scoped lang="less">
@import "../../../style/config";
@import "../../../style/styles";

.FH-nav-menu-container {
  width: 100%;
  height: 100%;
  user-select: none;

  &::-webkit-scrollbar {
    display: none;
  }

  .one-nav-container {
    width: 100%;
    transition: all @defaultAnimationTime;
    overflow: hidden;

    .level-one-nav-container {
      padding-left: 12px;
      width: 100%;
      height: 28px;
      line-height: 28px;
      display: flex;
      align-items: center;
      color: white;
      cursor: pointer;
      padding-right: 10px;
      overflow: hidden;

      @media (min-width: 1400px) {
        height: 38px;
        line-height: 38px;
      }

      .nav-icon-img {
        margin-right: 8px;
        width: 12px;

        @media (min-width: 1400px) {
          width: 16px;
          margin-right: 12px;
        }
      }

      span {
        font-size: @defaultFontSize;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        @media (min-width: 1400px) {
          font-size: @bigFontSize;
        }
      }

      i:last-child {
        font-size: @defaultFontSize;
        margin-left: auto;
        transition: all @defaultAnimationTime;

        @media (min-width: 1400px) {
          font-size: @bigFontSize;
        }
      }
    }

    .level-two-nav-container {
      position: relative;
      padding-left: 32px;

      .one-level-two-nav-container {
        color: white;
        cursor: pointer;
        position: relative;

        .level-two-label-row-container {
          height: 20px;
          line-height: 20px;
          animation: levelTwoNavGrow @defaultAnimationTime;
          overflow: hidden;
          display: flex;
          align-items: center;
          padding-right: 10px;

          @media (min-width: 1400px) {
            height: 28px;
            line-height: 28px;
          }

          i:first-child {
            font-size: @defaultFontSize;
            margin-right: 6px;

            @media (min-width: 1400px) {
              font-size: @middleFontSize;
            }
          }

          span {
            font-size: @defaultFontSize;
            @media (min-width: 1400px) {
              font-size: @middleFontSize;
            }
          }

          i:last-child {
            font-size: @defaultFontSize * 0.8;
            margin-left: auto;
            transition: all @defaultAnimationTime;
          }
        }

        .twoOpen {
          i:last-child {
            transform: rotate(180deg) !important;
          }
        }

        .level-three-nav-container {
          padding-left: 24px;
          height: 20px;
          line-height: 20px;
          animation: levelThreeNavGrow @defaultAnimationTime;
          overflow: hidden;

          @media (min-width: 1400px) {
            height: 24px;
            line-height: 24px;
          }

          i:first-child {
            font-size: @defaultFontSize;
            margin-right: 4px;
          }
        }
      }
    }
  }

  .isOpen {
    background: @navActiveBgColor;
    position: relative;
    padding-bottom: 6px;

    &:before {
      content: "";
      position: absolute;
      height: 100%;
      width: 5px;
      background: @defaultBlueClick;
      left: 0;
    }

    .one-level-two-nav-container-active {
      position: relative;

      &:after {
        content: "";
        position: absolute;
        right: 0;
        top: 50%;
        width: 8px;
        height: 8px;
        background: white;
        transform: translateY(-50%) translateX(50%) rotate(45deg);
      }
    }

    .level-one-nav-container {
      i:last-child {
        transform: rotate(180deg) !important;
      }
    }
  }
}

.collapse {
  .one-nav-container {
    position: relative;
    overflow: visible;

    .level-one-nav-container {
      transition: all @defaultAnimationTime;

      &:hover {
        background: @leftCollapseBarHoverColor;
      }

      i:first-child {
        margin-right: unset;
      }

      i:last-child {
        margin-left: unset;
      }
    }

    .level-two-nav-container {
      position: absolute;
      z-index: 99;
      left: @leftCollapseBarWidth;
      padding-left: 4px;
      top: 0;

      .one-level-two-nav-container {
        padding-left: 15px;
        animation: levelTwoNavGrow @defaultAnimationTime;
        background: @navActiveBgColor;

        i:first-child {
          font-size: @defaultFontSize;
          margin-right: 6px;
        }

        span {
          font-size: @defaultFontSize;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .level-two-label-row-container {
          padding-right: 20px;

          i:last-child {
            margin-left: 20px;
          }
        }
      }
    }

    .level-three-rows-container {
      position: absolute;
      z-index: 99;
      left: 100%;
      padding-left: 2px;
      top: 8px;

      .level-three-nav-container {
        padding-right: 20px;
        display: flex;
        align-items: center;
        padding-left: 10px !important;
        background: @navActiveBgColor;

        span {
          font-size: @defaultFontSize;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        i:last-child {
          margin-left: auto;
        }
      }
    }
  }
}

@keyframes levelTwoNavGrow {
  from {
    height: 0;
    opacity: 0;
  }

  to {
    height: 20px;
    opacity: 1;
  }
}

@keyframes levelThreeNavGrow {
  from {
    height: 0;
    opacity: 0;
  }

  to {
    height: 20px;
    opacity: 1;
  }
}

@media (min-width: 1400px) {
  @keyframes levelTwoNavGrow {
    from {
      height: 0;
      opacity: 0;
    }

    to {
      height: 28px;
      opacity: 1;
    }
  }

  @keyframes levelThreeNavGrow {
    from {
      height: 0;
      opacity: 0;
    }

    to {
      height: 24px;
      opacity: 1;
    }
  }
}
</style>
