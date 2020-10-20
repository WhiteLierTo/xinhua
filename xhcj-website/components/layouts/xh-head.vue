<template>
  <div class="header">
    <div class="header-content" v-if="isShowOriginalHead">
      <img src="../../assets/index/LOGO@6x.png" alt class="logo-img" @click="goHomePage"/>
      <div class="tabs-container">
        <div
          class="tab-container"
          v-for="(item,index) in tabs"
          :key="item.label"
          :class="{tabActive:$route.path === item.path}"
          @click="onTabSelect(item,index)"
        >{{ item.label }}
        </div>
      </div>
      <div class="search-container">
        <label>
          <input type="text" v-model="keyword" @keyup.enter="search" placeholder="输入关键词搜索" class="search-input"/>
        </label>
        <div class="search-icon-container" @click="search">
          <i class="fa fa-search search-icon"></i>
        </div>
      </div>
    </div>
    <div class="header-content" v-else>
      <div class="tabs-container outside-tabs-container">
        <div
          class="tab-container outside-tab-container"
          v-for="(item,index) in pageTabs"
          :key="item.label"
          :class="{tabActive:pageActiveTabIndex === index}"
          @click="onPageTabSelect(item,index)"
        >{{ item.label }}
        </div>
      </div>
    </div>
    <downLoadDialog v-show="dialogShow" @dialogHiddle="dialogHiddle"/>
  </div>
</template>

<script>
  import downLoadDialog from "./downLoadDialog";

  export default {
    name: "xh-head",
    components: {downLoadDialog},
    props: {
      isShowOriginalHead: {
        type: Boolean,
        default: true
      },
      pageTabs: Array,
      pageActiveTabIndex: Number,
      pageTabsOnClick: Function
    },

    data() {
      return {
        tabs: [
          {
            label: "首页",
            path: "/"
          },
          {
            label: "活动",
            path: "/activity"
          },
          {
            label: "视频",
            path: ""
          },
          {
            label: "财经号",
            path: ""
          },
          {
            label: "APP下载",
            path: "/download"
          },
          {
            label: "关于我们",
            path: "/about"
          }
        ],
        dialogShow: false,
        keyword: ""
      };
    },

    methods: {
      onTabSelect(item, index) {
        if (item.path && this.$route.path !== item.path) {
          location.href = item.path
        } else if (!item.path) {
          this.dialogShow = true;
        }
      },

      onPageTabSelect(item, index) {
        if (index === this.pageActiveTabIndex) return;
        // this.pageActiveTabIndex = index;
        this.$emit("update:pageActiveTabIndex", index);
        this.pageTabsOnClick && this.pageTabsOnClick(item, index);
      },

      dialogHiddle() {
        this.dialogShow = false;
      },

      showDownloadDialog() {
        this.dialogShow = true;
      },

      goHomePage() {
        location.href = "/";
      },

      search() {
        if (this.keyword) {
          location.href = `/search?keyword=${this.keyword}`;
          this.keyword = ""
        }
      }
    }
  };
</script>

<style scoped lang="less">
  .header {
    height: 53px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    background: white;
    z-index: 1000;

    .header-content {
      width: 1120px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;

      .logo-img {
        width: 110px;
        margin-right: 60px;
        cursor: pointer;
      }

      .tabs-container {
        display: flex;
        align-items: center;

        .tab-container {
          margin-right: 40px;
          font-size: 16px;
          cursor: pointer;
          font-weight: 300;

          &:hover {
            color: #0098ff;
          }
        }


        .tabActive {
          color: #222;
          font-weight: 600;
          position: relative;

          &:after {
            position: absolute;
            left: 0;
            bottom: -5px;
            width: 100%;
            height: 3px;
            background: #0098ff;
            content: "";
          }
        }
      }

      .outside-tabs-container {
        width: 100%;
        /*justify-content: space-between;*/

        .outside-tab-container {
          margin-right: 20px;
        }
      }

      .search-container {
        width: 235px;
        height: 32px;
        margin-left: auto;
        position: relative;

        input {
          width: 100%;
          height: 100%;
          border: 1px solid #eee;
          outline: none;
          border-radius: 16px;
          padding-left: 20px;

          &::placeholder {
            color: #99999980;
            font-size: 14px;
            letter-spacing: 1px;
          }
        }

        .search-icon-container {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;

          .search-icon {
            color: #999;
          }
        }
      }

      .mob-open-icon-container {
        display: none;
      }
    }
  }
</style>
