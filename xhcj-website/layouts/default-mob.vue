<template>
  <div class="app">
    <xhHeadMob
      :isShowOriginalHead="isShowOriginalHead"
      :pageTabs="pageTabs"
      :pageActiveTabIndex.sync="pageActiveTabIndex"
      :pageTabsOnClick="pageTabsOnClick"
      ref="xhHead"
    />
    <nuxt/>
    <div style="margin-top: auto;"></div>
    <div class="mob-foot-container">
      <div>版权所有© 2017 江苏新华财经传媒股份有限公司</div>
      <a href="http://www.beian.miit.gov.cn/">苏ICP备17064473号</a>
    </div>
    <xhTooltips class="mob"/>
  </div>
</template>

<script>
  import xhHeadMob from "../components/layouts-mob/xh-head-mob"
  import xhTooltips from "../components/layouts/xh-tooltips"

  export default {
    name: "default-mob",
    components: {xhHeadMob, xhTooltips},
    data() {
      return {
        isShowOriginalHead: true, // 显示原始头部
        pageTabs: [], // 从子页面接受到的tabs
        pageActiveTabIndex: -1, // 子页面的激活tabs
        pageTabsOnClick: () => "", // 子页面tab的点击事件
      }
    },


    methods: {
      onHeadChange(tabs, activeTabIndex, onSelect, scrollToPx) {
        if (!this.isShowOriginalHead) return;
        this.pageTabs = tabs;
        this.pageActiveTabIndex = activeTabIndex;
        this.pageTabsOnClick = onSelect;
        this.isShowOriginalHead = false;
        if (scrollToPx === 0 || scrollToPx) {
          this.$refs.xhHead.scrollTo(scrollToPx);
        }
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

<style scoped lang="less">
  .app {
    width: 100%;
    font-size: 16px;
    min-height: 100vh;

    .mob-foot-container {
      width: 100%;
      padding: 0.17rem 0.1rem;
      background: #333743;
      color: #9297a3;
      font-size: 13px;
      font-weight: 300;
      line-height: 1.46;
      text-align: center;

      a {
        color: #9297a3;
      }
    }
  }
</style>
