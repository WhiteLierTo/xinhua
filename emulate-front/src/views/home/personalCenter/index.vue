<template>
  <common-header class="containers">
    <div class="square" @click="back()" v-if="userType!==1">
      <img src="../../../assets/image/square.png" alt />
      <span>主页</span>
    </div>
    <div class="main-box personalCenter-hahaha">
      <el-tabs v-model="activeName" tab-position="left" style="height: auto;">
        <el-tab-pane name="first" label="个人中心" v-if="status&&userType!=1">
          <personal-center></personal-center>
        </el-tab-pane>
        <el-tab-pane name="second" label="报告管理">
          <report-manage v-if="userType===1"></report-manage>
          <my-report v-if="userType===2"></my-report>
        </el-tab-pane>
      </el-tabs>
    </div>
  </common-header>
</template>

<script>
import commonHeader from "../../../components/commonHeader";
import personalCenter from "./personalCenter";
import myReport from "./reportManage/myReport";
import reportManage from "./reportManage/reportManage";

export default {
  name: "index",
  components: {
    commonHeader,
    personalCenter,
    reportManage,
    myReport
  },
  data() {
    return {
      activeName: "first",
      userType: JSON.parse(localStorage.getItem("userInfo")).userType,
      status: JSON.parse(localStorage.getItem("userInfo")).isShow
    };
  },
  mounted() {
    this.$nextTick(() => {
      if (JSON.parse(localStorage.getItem("userInfo")).userType == 1) {
        this.activeName = "second";
      }
      this.activeName = this.$route.params.activeName || this.activeName;
      //   console.log(this.activeName)
    });
  },

  methods: {
    back() {
      this.$router.push({
        path: "/home"
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.containers {
  position: relative;
  background: url(/static/img/loginbg.30d4533b.png) repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
  // display: flex;
  z-index: 1;
  height: 100%;
  .square {
    position: fixed;
    left: 3.9192rem;
    top: 0.3388rem;
    cursor: pointer;
    z-index: 99;
    img {
      position: relative;
      width: 1.09375rem;
      height: 0.34375rem;
    }

    span {
      position: absolute;
      left: 0.395833rem;
      top: 0.09375rem;
      font-size: 0.104167rem;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: rgba(170, 240, 255, 1);
    }
  }

  .main-box {
    width: 85%;
    height: calc(100vh - 0.8rem);
    box-sizing: border-box;
    overflow: hidden;
    margin: 0 auto;
  }
}
</style>

<style lang="scss">
.personalCenter-hahaha {
  .el-tabs {
    height: 100% !important;
  }

  .el-tabs__item {
    width: 1.151042rem;
    height: 0.421875rem;
    line-height: 0.421875rem;
    text-align: center !important;
    padding-left: 0.270833rem;
    margin-top: 0.197917rem;
    font-size: 0.125rem;
    color: rgba(40, 158, 255, 1);
    background: url("../../../assets/image/personnal/btnbg.png");
    background-size: 100% 100%;
  }

  .el-tabs__item.is-active {
    background: url("../../../assets/image/personnal/activebg.png");
    color: #fccd14;
    background-size: contain;
  }

  .el-tabs__active-bar {
    display: none;
  }

  .el-tabs__nav-wrap.is-left::after {
    display: none;
  }
}
</style>

