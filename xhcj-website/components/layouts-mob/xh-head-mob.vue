<template>
  <div class="xh-head-mob-container">
    <div class="xh-head-mob-inner">
      <div class="header-content" v-if="isShowOriginalHead">
        <img src="../../assets/index/LOGO@6x.png" alt class="logo-img"/>
        <i class="fa fa-bars bar-icon" @click="isShowDetail = !isShowDetail"></i>
      </div>
      <div class="header-content" v-else>
        <div class="special-tab-container-out">
          <div class="tabs-container special-tab-container-haha">
            <div
              class="tab-container"
              v-for="(item,index) in pageTabs"
              :key="item.label"
              :class="{tabActive:pageActiveTabIndex === index}"
              @click="onPageTabSelect(item,index)"
            >{{ item.label }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="xh-head-mob-detail-container" v-if="isShowOriginalHead && isShowDetail">
      <div class="search-container">
        <input type="text" class="search-input-ele" v-model="keyword" @keyup.enter="search">
        <div class="search-icon-container">
          <i class="fa fa-search fa-search-icon" @click="search"></i>
        </div>
      </div>
      <div class="tab-row-container" @click="onTabSelect(tabItem,index)" v-for="(tabItem,index) in tabs" :key="index">
        {{ tabItem.label }}
      </div>
    </div>
    <downLoadDialog v-if="isShowDownloadQRCode" @dialogHiddle="isShowDownloadQRCode = false" class="mob"/>
  </div>
</template>

<script>
  import downLoadDialog from "../layouts/downLoadDialog"

  export default {
    name: "xh-head-mob",
    props: {
      isShowOriginalHead: {
        type: Boolean,
        default: true
      },
      pageTabs: Array,
      pageActiveTabIndex: Number,
      pageTabsOnClick: Function
    },
    components: {downLoadDialog},
    data() {
      return {
        tabs: [
          {
            label: "首页",
            path: "/index-mob"
          },
          {
            label: "活动",
            path: "/activity-mob"
          },
          {
            label: "视频",
          },
          {
            label: "财经号",
          },
          {
            label: "APP下载",
            path: "/download-mob"
          },
          {
            label: "关于我们",
            path: "/about-mob"
          }
        ],
        isShowDetail: false,
        isShowDownloadQRCode: false,
        keyword: ""
      }
    },
    methods: {
      scrollTo(x) {
        this.$nextTick(() => {
          let dom = document.getElementsByClassName("special-tab-container-haha")[0];
          if (dom) {
            dom.scrollTo(x, 0);
          }
        })
      },

      onTabSelect(item, index) {
        if (item.path && this.$route.path !== item.path) {
          this.isShowDetail = false;
          location.href = item.path;
        } else if (!item.path) {
          this.showDownloadDialog()
        }
      },

      onPageTabSelect(item, index) {
        if (index === this.pageActiveTabIndex) return;
        this.$emit("update:pageActiveTabIndex", index);
        this.pageTabsOnClick && this.pageTabsOnClick(item, index);
      },

      showDownloadDialog() {
        this.isShowDetail = false;
        this.isShowDownloadQRCode = true
      },

      search() {
        if (this.keyword) {
          location.href = `/search?keyword=${this.keyword}`;
          this.keyword = ""
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .xh-head-mob-container {
    width: 100%;
    height: 0.53rem;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    background: white;
    font-size: 14px;

    .xh-head-mob-inner {
      width: 100%;
      height: 100%;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
      border-bottom: 1px solid #eaeaea;
      padding: 0.1rem;

      .header-content {
        width: 100%;
        display: flex;
        align-items: center;

        .logo-img {
          width: 1.1rem;
        }

        .bar-icon {
          margin-left: auto;
          font-size: 16px;
        }

        .tabs-container {
          display: flex;
          align-items: center;
          overflow: auto;

          .tab-container {
            margin-right: 0.1rem;
            font-size: 15px;
            flex-shrink: 0;
            line-height: 0.3rem;
          }

          .tabActive {
            color: #222;
            font-weight: 600;
            position: relative;
            overflow: hidden;

            &:after {
              position: absolute;
              left: 0;
              bottom: 0;
              width: 100%;
              height: 3px;
              background: #0098ff;
              content: "";
            }
          }
        }


        .special-tab-container-out {
          width: 100%;
          height: 0.33rem;
          overflow: hidden;

          .special-tab-container-haha {
            height: 0.43rem;
            padding-bottom: 0.11rem;
          }
        }
      }

    }

    .xh-head-mob-detail-container {
      width: 100%;
      position: absolute;
      padding: 0.1rem;
      top: 0.53rem;
      left: 0;
      background: white;

      .search-container {
        width: 100%;
        height: 0.32rem;
        position: relative;

        .search-input-ele {
          width: 100%;
          height: 100%;
          border: 1px solid #eee;
          outline: none;
          border-radius: 0.16rem;
          padding-left: 0.2rem;
        }

        .search-icon-container {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 0.3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;

          .fa-search-icon {
            color: #999;
          }
        }
      }

      .tab-row-container {
        width: 100%;
        height: 0.38rem;
        border-bottom: 1px solid #eee;
        font-size: 14px;
        color: #555;
        font-weight: 300;
        line-height: 0.38rem;
      }

    }
  }
</style>
