<template>
  <div class="container">
    <div class="container-box">
      <div class="container_titlebg">
        <p class="container_title">公共卫生安全舆情与风险监管虚拟仿真平台</p>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "commonHeader",
  data() {
    return {};
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  background: url("../assets/image/loginbg.png") repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
  display: flex;
  z-index: 1;
  .container-box {
    width: 100%;
    .container_titlebg {
      width: 98%;
      height: 0.7552rem;
      margin: 0 auto;
      z-index: 2;
      background: url("../assets/image/index_img/commonbg.png") no-repeat center
        center;
      background-size: 100%;
      .container_title {
        margin-top: 0.1rem;
        display: inline-block;
        font-size: 0.1875rem;
        font-family: Source Han Sans CN;
        font-weight: 550;
        color: rgba(255, 255, 255, 1);
        line-height: 0.4688rem;
        text-align: left;

        margin-left: 0.1563rem;
        font-family: Source Han Sans CN;
        background: linear-gradient(#00d6ff 32%, #003a91);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
}
</style>
