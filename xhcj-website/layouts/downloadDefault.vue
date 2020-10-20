<template>
  <div class="app">
    <xhHead/>
    <nuxt/>
  </div>
</template>

<script>
  import xhHead from "../components/layouts/xh-head"

  export default {
    components: {xhHead},
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
  }
</style>
