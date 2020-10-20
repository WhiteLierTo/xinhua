<template>
  <div class="app">
    <xhHead
      :isShowOriginalHead="isShowOriginalHead"
      :pageTabs="pageTabs"
      :pageActiveTabIndex.sync="pageActiveTabIndex"
      :pageTabsOnClick="pageTabsOnClick"
      ref="xhHead"
    />
    <nuxt/>
    <div style="margin-top: auto;"></div>
    <xhFoot/>
    <xhTooltips/>
  </div>
</template>

<script>
  import xhHead from "../components/layouts/xh-head"
  import xhFoot from "../components/layouts/xh-foot"
  import xhTooltips from "../components/layouts/xh-tooltips"

  export default {
    components: {xhHead, xhFoot, xhTooltips},
    data() {
      return {
        isShowOriginalHead: true, // 显示原始头部
        pageTabs: [], // 从子页面接受到的tabs
        pageActiveTabIndex: -1, // 子页面的激活tabs
        pageTabsOnClick: () => "", // 子页面tab的点击事件
      }
    },

    methods: {
      onHeadChange(tabs, activeTabIndex, onSelect) {
        if (!this.isShowOriginalHead) return;
        this.pageTabs = tabs;
        this.pageActiveTabIndex = activeTabIndex;
        this.pageTabsOnClick = onSelect;
        this.isShowOriginalHead = false;
      },
      resetOriginalHead() {
        this.isShowOriginalHead = true;
      },
      showDownloadDialog() {
        this.$refs.xhHead.showDownloadDialog()
      }
    },
    provide() {
      return {
        onHeadChange: this.onHeadChange,
        resetOriginalHead: this.resetOriginalHead,
        showDownloadDialog: this.showDownloadDialog
      };
    }
  }
</script>

<style lang="less">
  html {
    font-family: "HanHei SC", "PingFang SC", "Microsoft YaHei", sans-serif;
    font-size: 16px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  * {
    box-sizing: border-box;
    margin: 0;
  }

  .app {
    width: 100%;
    // padding-top: 70px;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
</style>
