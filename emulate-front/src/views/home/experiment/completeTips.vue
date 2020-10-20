<template>
  <div class="center-box">
    <img class="center-img" src="../../../assets/image/index_img/center.png" alt="" />
    <div class="center-title">
      您已完成公共卫生安全舆情与风险监管仿真
    </div>
    <div class="intro_btn">返回</div>
  </div>

</template>

<script>
export default {

  name: "completeTips",
  data() {
    return {
      flag: false
    };
  },
  methods: {

  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.center-box {
  position: relative;
  width: 3.8021rem;
  height: 1.849rem;
  margin: 1.6406rem auto;
  .center-img {
    width: 100%;
    height: 100%;
  }
  .center-title {
    position: absolute;
    top: 0.5156rem;
    left: 0.125rem;
    font-size: 0.1875rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(170, 240, 255, 1);
    line-height: 0.25rem;
  }
  .intro_btn {
    position: absolute;
    bottom: 0.2083rem;
    left: 50%;
    transform: translateX(-50%);
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
  }
}
</style>
