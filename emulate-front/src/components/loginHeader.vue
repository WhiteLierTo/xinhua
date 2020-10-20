<template>
  <div class="container">
    <div class="container-box">
      <div class="container_titlebg">
        <p class="container_title">公共卫生安全舆情与风险监管虚拟仿真平台</p>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "loginHeader",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    // 报告管理
    teacherManage() {
      this.$router.push({
        name: "personalCenter",
        params: {
          activeName: "second"
        }
      });
    },
    // 个人中心
    personnalCenter() {
      this.$router.push({
        name: "personalCenter",
        params: {
          activeName: "first"
        }
      });
    },
    // 退出
    loginOut() {
      localStorage.removeItem("userInfo");
      this.$router.push({
        path: "/login"
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;

  .container-box {
    width: 100%;
    height: 100%;
    background: url("../assets/image/loginbg.png") no-repeat;
    background-size: 102% 100%;
    background-attachment: fixed;
    display: flex;
    z-index: 1;

    .container_titlebg {
      width: 100%;
      height: 0.7552rem;
      z-index: 2;
      background: url("../assets/image/titlebg.png") no-repeat center center;
      background-size: 100%;

      .container_title {
        height: 0.4688rem;
        font-size: 0.2604rem;
        font-weight: 550;
        line-height: 0.4688rem;
        text-align: center;
        margin-top: 0.0781rem;
        padding-left: 1%;
        font-family: Source Han Sans CN;
        background: linear-gradient(#00d6ff 52%, #003a91);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
}
</style>
