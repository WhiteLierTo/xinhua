<template>
  <div class="container">
    <div class="intro">
      <div
        class="intro_info"
      >各位老师、同学，大家好。欢迎参加校园公共卫生安全舆情与风险监管虚拟仿真演练活动，本次演练以真实发生的舆情事件为背景的仿真演练活动。请各位根据流程中的业务环节，代表各个环节中的角色对舆情事件进行传播、上报、监控、处置。</div>
      <div class="intro_btn" @click="goPublic">继续</div>
      <div class="tip">
        <div class="tip_left">
          <div class="tip_round1">
            <img class="tip_round1_img" src="../../../assets/image/experiment/round1.png" />
          </div>
          <div class="tip_round2">
            <img class="tip_round2_img" src="../../../assets/image/experiment/round2.png" />
          </div>
          <div class="tip_round3">
            <img class="tip_round3_img" src="../../../assets/image/experiment/round3.png" />
          </div>
        </div>
        <div class="tip_right">
          <div class="tip_robot">
            <img class="tip_robot_img" src="../../../assets/image/experiment/robot.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Introduce",
  data() {
    return {};
  },
  methods: {
    goPublic() {
      this.$router.push({
        path: "/publicOpinion"
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  background: url("../../../assets/image/school.png") no-repeat;
  background-size: 100%;
  position: relative;
  .intro {
    width: 5.9479rem;
    height: 2.5521rem;
    background: url("../../../assets/image/experiment/introbg.png") no-repeat;
    background-size: 100%;
    position: absolute;
    left: 2.0833rem;
    top: 0.7604rem;
    .intro_info {
      width: 4.6771rem;
      height: 1.0885rem;
      font-size: 0.1563rem;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: rgba(170, 240, 255, 1);
      line-height: 0.3125rem;
      margin: 0.4479rem 0 0 0.599rem;
    }
    .intro_btn {
      width: 0.8125rem;
      height: 0.3906rem;
      background: url("../../../assets/image/experiment/btnbg.png") no-repeat;
      background-size: 100%;
      margin: 0.2656rem 0 0 2.5677rem;
      font-size: 0.125rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 0.3906rem;
      text-align: center;
      cursor: pointer;
    }
    .tip {
      position: absolute;
      right: 0;
      top: 2.5625rem;
      display: inline;
      overflow: hidden;
      .tip_left {
        float: left;
      }
      .tip_right {
        float: left;
      }
      .tip_round1_img {
        width: 0.3542rem;
        height: 0.3542rem;
      }
      .tip_round2 {
        margin-left: 0.3333rem;
        .tip_round2_img {
          width: 0.2344rem;
          height: 0.2344rem;
        }
      }
      .tip_round3 {
        margin-left: 0.6146rem;
        margin-top: 0.0781rem;
        .tip_round3_img {
          width: 0.125rem;
          height: 0.125rem;
        }
      }
      .tip_robot {
        margin-top: 0.2604rem;
        margin-left: 0.1875rem;
        .tip_robot_img {
          width: 0.9688rem;
          height: 1.25rem;
        }
      }
    }
  }
}
</style>
