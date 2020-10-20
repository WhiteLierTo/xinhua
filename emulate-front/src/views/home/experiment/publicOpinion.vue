<template>
  <div class="box">
    <video id="media" preload="metadata" autoplay class="shipin">
      <source src="../../../assets/audio/report.mp4" type="video/mp4" />
    </video>
    <common-head class="yemian">
      <div class="public" v-show="show">
        <div class="intro_btn" @click="goPublic">继续</div>
      </div>
      <div class="tips" @click="goPublic">跳过</div>
    </common-head>
  </div>
</template>
<script>
import { subProcess } from "../../../api/progress";
export default {
  name: "publicOpinionTran",
  components: {
    commonHead: () => import("../../../components/commonHead")
  },
  mounted() {
    document.getElementById("media").addEventListener(
      "ended",
      () => {
        // console.log("结束播放");
        this.show = true;
      },
      false
    );
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    goPublic() {
      // 上报流程
      let userId = JSON.parse(localStorage.getItem("userInfo")).userId;
      let data = {
        userId,
        processNo: "1"
      };
      subProcess(data);
      this.$router.push({
        path: "/publicOpinionTran"
      });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.box {
  .shipin {
    width: 100%;
    height: 100%;
    position: relative;
    top: 0;
    left: 0;
  }
  .yemian {
    position: absolute;
    left: 0;
    top: 0;
    .tips {
      position: absolute;
      left: 3.8802rem;
      top: 0.3333rem;
      width: 1.0938rem;
      height: 0.3438rem;
      background: url("../../../assets/image/experiment/tips.png") no-repeat;
      background-size: 100%;
      text-align: center;
      font-size: 0.1042rem;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: rgba(170, 240, 255, 1);
      line-height: 0.3rem;
      cursor: pointer;
      z-index: 2;
    }
  }
  .public {
    width: 3.9583rem;
    height: 2.0052rem;
    background: url("../../../assets/image/experiment/publicbg.png") no-repeat
      center center;
    background-size: 100%;
    margin: 0.9531rem auto 0;
    position: relative;
    .intro_btn {
      width: 0.8125rem;
      height: 0.3906rem;
      background: url("../../../assets/image/experiment/btnbg.png") no-repeat;
      background-size: 100%;
      font-size: 0.125rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 0.3906rem;
      text-align: center;
      cursor: pointer;
      position: absolute;
      top: 0.7813rem;
      left: 1.5781rem;
    }
  }
}
</style>
