<template>
  <div class="container">
    <div class="container-box">
      <div class="container_titlebg">
        <p class="container_title">公共卫生安全舆情与风险监管虚拟仿真平台</p>
        <div class="info">
          <div class="info_left">
            <img class="avtor" src="../assets/image/avtor.png" />
          </div>
          <div class="info_right">
            公众
          </div>
        </div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "commonBox",
  data() {
    return {};
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  width: 100%;
  .container-box {
    width: 100%;
    background-size: 102%;
    background-attachment: fixed;
    display: flex;
    z-index: 1;
    .container_titlebg {
      width: 98%;
      height: 0.7552rem;
      z-index: 2;
      background: url("../assets/image/index_img/commonbg.png") no-repeat center
        center;
      background-size: 100%;
      margin: 0 auto;
      overflow: hidden;
      .container_title {
        float: left;
        width: 4.0417rem;
        font-size: 0.1667rem;
        font-family: Source Han Sans CN;
        font-weight: 550;
        color: rgba(255, 255, 255, 1);
        line-height: 0.4688rem;
        text-align: left;
        margin-top: 0.0833rem;
        margin-left: 0.3229rem;
        font-family: Source Han Sans CN;
        background: linear-gradient(#00d6ff 32%, #003a91);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .info {
        overflow: hidden;
        float: right;
        margin-top: 0.2135rem;
        margin-right: 0.3698rem;
        .info_left {
          float: left;
          .avtor {
            width: 0.3125rem;
            height: 0.3125rem;
          }
        }
        .info_right {
          float: left;
          font-size: 0.1563rem;
          font-family: Adobe Heiti Std;
          font-weight: normal;
          color: rgba(170, 240, 255, 1);
          line-height: 0.25rem;
          margin-left: 0.0781rem;
          margin-top: 0.0417rem;
        }
      }
    }
  }
}
</style>
