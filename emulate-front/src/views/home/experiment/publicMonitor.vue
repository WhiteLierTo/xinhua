<template>
  <div class="containers dsdfssdf">
    <office-pano class="pano-view"></office-pano>
    <common-public-head>
      <div class="tips" @click="testHandleClick" v-show="!status">舆情扩散测试题</div>
      <div class="tips release" @click="goOnHnadleClick" v-if="!receive">继续</div>
      <div class="guide">
        <p>操作指引</p>
        <div class="context" v-if="!status">1、监测大屏的舆情信息走势</div>
        <div class="context" v-else>1、接收舆情信息</div>
      </div>
    </common-public-head>
    <el-dialog :visible.sync="dialogTableVisible" :show-close="false" :close-on-click-modal="true" :modal="false">
      <test-questions :process="3" @dialog-show="dialogShow"></test-questions>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "publicMonitor",
  components: {
    commonPublicHead: () => import("../../../components/commonPublicHead"),
    testQuestions: () => import("./testQuestions"),
    officePano: () => import("@/components/pano/office")
  },
  data() {
    return {
      processNo: "",
      dialogTableVisible: false,
      receive: false,
      status: false
    };
  },
  mounted() {
    window.officeObj = this;
    // console.log(this.$route.query.receive);
    this.receive = this.$route.query.receive;
    if (this.$route.query.status) {
      this.status = this.$route.query.status;
    }

    if (this.$route.query.signNo === "13") {
      this.processNo = "13";
    } else if (this.$route.query.signNo === "24") {
      this.processNo = "24";
    } else if (this.$route.query.signNo === "43") {
      this.processNo = "43";
    } else if (this.$route.query.signNo === "31") {
      this.processNo = "31";
    }
  },
  methods: {
    //跳转趋势图
    stepHandleClick() {
      this.$router.push({
        path: "/publicDissipate",
        query: {
          flag: false,
          announcementComplete: false
        }
      });
    },
    testHandleClick() {
      this.dialogTableVisible = true;
    },
    dialogShow(val) {
      this.dialogTableVisible = val;
    },
    goOnHnadleClick() {
      this.$router.push({
        path: "/publicAnalysis",
        query: {
          signNo: this.processNo
        }
      });
    },
    didHandleClick() {
      this.$router.push({
        path: "/publicOpinionAccept"
      });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.containers {
  width: 100%;
  height: 100%;
  background-size: 102%;
  background-attachment: fixed;
  position: relative;
  z-index: 1;
  .pano-view {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
  }
  .tiao {
    width: 200px;
    height: 200px;
    background: #f00;
    position: absolute;
    top: 25%;
    left: 50%;
    cursor: pointer;
  }
  .tips {
    position: absolute;
    left: 3.9167rem;
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
    z-index: 999;
  }
  .release {
    margin-left: 1.0677rem;
  }
  .guide {
    width: 1.8333rem;
    height: 2.5573rem;
    background: url("../../../assets/image/caozuo.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 0.7813rem;
    left: 0.1302rem;
    p {
      text-align: center;
      font-size: 0.1875rem;
      font-family: Source Han Sans CN;
      font-weight: 600;
      background: linear-gradient(#00d6ff 32%, #003a91);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .context {
      width: 1.4063rem;
      height: 0.4635rem;
      font-size: 0.1458rem;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #00b8e0;
      line-height: 0.3125rem;
      margin: 0 auto;
    }
  }
}
.daping {
  position: absolute;
  top: 40%;
  left: 50%;
  width: 300px;
  height: 200px;
  color: #fff;
  background: #ccc;
  z-index: 99;
}
</style>
<style lang="scss">
.dsdfssdf {
  .el-dialog__wrapper {
    background: url("../../../assets/image/model.png") no-repeat;
    background-size: 100% 100%;
  }
  .el-dialog {
    background: transparent;
    width: 100%;
    .el-dialog__body {
      width: 66%;
      margin: 0 auto;
    }
  }
}
</style>