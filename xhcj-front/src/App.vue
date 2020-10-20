<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
  @import "./style/config";

  html {
    font-size: @defaultFontSize;
    overflow: auto;
    overflow-x: hidden;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }


</style>
