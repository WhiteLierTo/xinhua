<template>
  <accept-header class="container hguasjhdoiad">
    <div class="main-box">
      <el-tabs tab-position="left" style="height: auto;">
        <el-tab-pane label="当前待办">
          <public-opinion-list></public-opinion-list>
        </el-tab-pane>
      </el-tabs>
    </div>
  </accept-header>
</template>

<script>
  export default {
    components: {
      acceptHeader: () => import("../../../components/acceptHeader"),
      publicOpinionList: () => import("./acceptManager/publicOpinionList"),
      currentBacklog: () => import("./acceptManager/currentBacklog"),
      announceList: () => import("./acceptManager/announceList")
    },
    name: "publicOpinionAccept",
    data() {
      return {};
    },
    methods: {}
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .container {
    .main-box {
      width: 94%;
      margin: 0.125rem;
      margin-top: -0.053rem;
      box-sizing: border-box;
      z-index: 1;
    }
  }
</style>

<style lang="scss">
  .hguasjhdoiad {
    .el-tabs__nav-wrap.is-left::after {
      display: none;
    }

    .el-tabs__active-bar {
      display: none;
    }

    .el-tabs__item {
      width: 1.151rem;
      height: 0.4219rem;
      line-height: 0.4219rem;
      text-align: center !important;
      padding-left: 0.2708rem;
      margin-top: 0.199rem;
      font-size: 0.125rem;
      color: rgba(40, 158, 255, 1);
      background: url("../../../assets/image/personnal/btnbg.png");
      background-size: contain;
    }

    .el-tabs__item.is-active {
      background: url("../../../assets/image/personnal/activebg.png");
      color: #fccd14;
      background-size: contain;
    }
  }

</style>
