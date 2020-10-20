<template>
  <div class="app">
    <xhHeadMob/>
    <nuxt/>
  </div>
</template>

<script>
  import xhHeadMob from "../components/layouts-mob/xh-head-mob"

  export default {
    components: {xhHeadMob},
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
    font-size: 16px;
  }
</style>
