<template>
  <div class="box">
    <div class="hot">
      <hot />
    </div>
    <div class="top">
      <top />
    </div>
    <div class="map">
      <Map />
    </div>
    <div class="radar">
      <Radar />
    </div>
    <div class="WordMouth">
      <word-mouth />
    </div>
  </div>
</template>

<script>
import Top from "../common/middle/top"; //排行
import Hot from "../common/middle/hot"; //热词
import Map from "../common/middle/map"; //地图
import Radar from "../common/middle/radar"; //雷达
import WordMouth from "../common/middle/wordMouth"; //口碑
export default {
  name: "Middle",
  components: {
    Top,
    Hot,
    Map,
    Radar,
    WordMouth
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.box {
  position: relative;
  .hot {
    position: absolute;
    left: 52px;
    top: 698px;
  }
  .top {
    position: absolute;
    left: 52px;
  }
  .map {
    position: absolute;
    top: 141px;
    left: 659px;
  }
  .radar {
    position: absolute;
    top: 0px;
    right: 50px;
  }
  .WordMouth {
    position: absolute;
    top: 1050px;
    right: 1120px;
  }
}
</style>