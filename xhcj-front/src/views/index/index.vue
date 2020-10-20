<template>
  <div class="container" v-if="hasUserDetail">
    <div class="nav-wrapper" :class="{collapse:isCollapse}">
      <div class="logo-container">
        <img src="../../assets/logo.png" alt />
      </div>
      <div class="nav-bar-wrapper" :class="{navBarCollapse:isCollapse}">
        <FHNavMenu :isCollapse="isCollapse"></FHNavMenu>
      </div>
    </div>
    <div class="content-container">
      <div class="content-head">
        <i class="el-icon-s-fold fold-icon" :class="{'rotate':isCollapse}" @click="toggleCollapse"></i>

        <div class="breadcrumb-container" v-if="breadcrumbObjs && breadcrumbObjs.find(b=>b.label)">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <template v-for="(route,index) in (modifiedBreadcrumbs || breadcrumbObjs)">
              <el-breadcrumb-item
                :to="{ path: route.path }"
                v-if="route.canJump"
                :key="index"
              >{{ route.label }}</el-breadcrumb-item>
              <el-breadcrumb-item v-else :key="index">{{ route.label }}</el-breadcrumb-item>
            </template>
          </el-breadcrumb>
        </div>

        <user />
      </div>
      <div class="content-main">
        <div class="content-content">
          <router-view />
        </div>
      </div>
    </div>
  </div>
  <div v-else v-loading="true" class="container"></div>
</template>

<script>
import FHNavMenu from "./child/FHNavMenu";
import user from "./child/user";

export default {
  name: "index",
  data() {
    return {
      isCollapse: this.$utils.Store.get("isCollapse", "false") === "true",
      hasUserDetail: false,
      modifiedBreadcrumbs: null,
    };
  },
  provide() {
    return {
      modifyLastBreadcrumbLabel: this.modifyLastBreadcrumbLabel,
    };
  },
  components: { FHNavMenu, user },
  computed: {
    breadcrumbObjs() {
      this.modifiedBreadcrumbs = null;
      return this.$utils.data.route.getBreadcrumb();
    },
  },
  async mounted() {
    Promise.all([this.getUserDetail()]).then(([ok]) => {
      // this.getRoute

      if (ok) {
        this.hasUserDetail = true;
      }
    });
  },
  methods: {
    modifyLastBreadcrumbLabel(label) {
      this.modifiedBreadcrumbs = this.$utils.gadgets.deepClone(
        this.breadcrumbObjs
      );
      this.modifiedBreadcrumbs[
        this.modifiedBreadcrumbs.length - 1
      ].label = label;
    },

    toggleCollapse() {
      // 切换侧边栏收起状态
      this.isCollapse = !this.isCollapse;
      this.$utils.Store.set("isCollapse", this.isCollapse.toString());
    },

    async getUserDetail() {
      let [ok, data] = await this.$ajax.user.detail();
      if (ok) {
        this.$store.commit("setUserDetail", data.user);
        this.$store.commit("setPermissions", data.permissions);
      } else {
        // this.$message.error("获取用户详情失败,请检查网络")
      }
      return ok;
    },

    async getRoute() {
      await this.$ajax.user.getRoute();
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/config";
@import "../../style/styles";

.container {
  height: 100vh;
  min-height: @containerMinHeight;
  width: 100vw;
  display: flex;
  overflow: hidden;

  .nav-wrapper {
    width: @leftNavBarWidth;
    height: 100%;
    background-color: @leftNavBarBgColor;
    display: flex;
    flex-direction: column;
    transition: all @defaultAnimationTime;

    @media (min-width: 1400px) {
      width: @leftNavBarWidth + 30px;
    }

    .logo-container {
      width: 100%;
      height: @logoHeight;
      .flexCenter();
      color: white;

      img {
        width: @logoHeight;
        object-fit: scale-down;
      }

      @media (min-width: 1400px) {
        height: @leftNavBarWidth + 30px;

        img {
          width: @leftNavBarWidth + 30px;
        }
      }
    }

    .nav-bar-wrapper {
      flex: 1;
      width: 100%;

      &::-webkit-scrollbar {
        width: 4px;
        height: 6px;
        background: transparent;
      }

      &::-webkit-scrollbar-thumb {
        background: #7aa3e0;
      }
    }

    .nav-bar-wrapper:not(.navBarCollapse) {
      overflow-y: auto;
    }
  }

  .collapse {
    width: @leftCollapseBarWidth;

    .logo-container {
      img {
        width: 100%;
      }
    }
  }

  .content-container {
    flex: 1;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .content-head {
      width: 100%;
      height: @topNavBarHeight;
      background-color: @topNavBarBgColor;
      flex-shrink: 0;
      padding: 0 @defaultContentPadding;

      display: flex;
      align-items: center;
      color: white;

      @media (min-width: 1400px) {
        height: @topNavBarHeight + 10px;
      }

      .breadcrumb-container {
        flex: 1;
        overflow: hidden;
        flex-shrink: 0;
        margin-left: @defaultPaddingX;
        color: white;

        .el-breadcrumb__inner {
          color: white !important;
        }
      }

      .fold-icon {
        font-size: 16px;
        cursor: pointer;
        transition: all @defaultAnimationTime;

        @media (min-width: 1400px) {
          font-size: 18px;
          position: relative;
          top: -1px;
        }
      }

      .rotate {
        transform: rotate(180deg);
      }

      .tea-icon {
        font-size: 22px;
        margin-right: 16px;
        position: relative;
        top: 2px;
      }

      span {
        font-size: @bigFontSize;
        .oneLineWord();
      }
    }

    .content-main {
      flex: 1;
      width: 100%;
      overflow: hidden;
      background-color: @defaultBgColor;
      padding: @defaultContentPadding;
      display: flex;
      flex-direction: column;

      .content-content {
        flex: 1;
        overflow: auto;
        /*display: none;*/
      }
    }
  }
}
</style>

<style lang="less">
@import "../../style/config";
@import "../../style/styles";

.breadcrumb-container {
  .el-breadcrumb__inner {
    color: rgba(255, 255, 255, 0.8) !important;
    font-size: @smallFontSize + 1;
    position: relative;
    top: -2px;
  }

  .el-breadcrumb__inner.is-link {
    font-weight: 600;
    color: white !important;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all @defaultAnimationTime;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

