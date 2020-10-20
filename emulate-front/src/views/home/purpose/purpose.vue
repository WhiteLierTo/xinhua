<template>
  <common-box class="container">
    <div class="center-box">
      <!-- <img class="center-img" src="../../../assets/image/index_img/center.png" alt=""> -->
      <div class="center-title">
        <div class="zhuye" @click="back()">
          <img src="../../../assets/image/index_img/zhuye.png" alt="">
          <span>主页</span>
        </div>
        <div class="title">
          实验目的与原理
        </div>
        <img class="title-img" src="../../../assets/image/index_img/title.png" alt="">
        <div class="content">
          <div class="content-word">
            <p class="purpose">(一)实验目的</p>
            <p>
              食品安全事件危机管理的仿真实验是一项综合性、实践性很强的实验，通过虚拟仿真实验便于考核学生对这些知识的掌握程度及综合应用能力。具体如下：
            </p>
            <p>（1）培养学生对食品安全与舆情的风险认知能力：包括食品科学知识练习、食品安全事件标准判断、食品安全信息报告流程、人类心理行为知识与网络舆情传播知识的掌握、舆情地图的熟悉等。</p>
            <p>（2）培养学生对食品安全事件的应急处理与综合实践能力：包括食品安全事件的随机冲击、食品安全事故的信息收集与传播、食品安全事故的讨论与质疑、人物角色的选取与互动、食品安全事故信息的确认、恶意信息传播的制止等。</p>
            <p>（3）培养学生对食品安全风险监管的创新设计能力：包括食品安全事件的流程优化、食品安全突出事件报告制度规范、食品安全舆情的引导策略、食品安全舆情的监与控预警体系等。</p>
            <p>因此，食品安全事件危机管理的虚拟仿真实验弥补传统食品安全教学实践的不足。通过该仿真实验使得学生和普通民众真正掌握食品科学与安全、社会心理行为、项目风险管理、舆情信息传播与监控等专业理论基础和基本方法，进而推动大众食品安全与舆情教育，降低社会食品安全风险事故与舆情事件。</p>
            <p class="purpose">(二)实验原理</p>

            <p>（1）本实验嵌入了食品科学与安全管理、信息传播与舆情、危机管理与风险监管等基本理论、方法和技术措施，涵盖了食品安全科学与法律标准、社会大众应急应激心理行为、信息传播与舆情、危机管理、风险评估与监管、组织控制职能、等多个知识点。各知识点既有逻辑上的相继性，又有实际上的交互性，具体到食品安全仿真实验中，需要学生们综合采用相应理论分析实验操作的逻辑性与合理性，体现“学中干”、“干中学”的教学效果。也包括未来安全。食品安全标准国家政府部门制定的标准，当前主要安全标准包括食品相关产品的致病性微生物、农药残留、兽药残留、重金属、污染物质以及其他危害人体健康物质的限量规定等九大类，截至目前，我国已制定公布300多部食品安全国家标准，覆盖6000多项食品安全指标。</p>
            <p>（2）信息传播与舆情理论。舆论信息传播是个人、组织和团体通过符号和媒介交流信息，向其他个人或团体传递信息、观念、态度或情意，以期发生相应变化的活动。在网络信息传播过程中，带有广大网民的主观性，未经媒体验证和包装，直接通过多种形式发布于互联网上，即网络舆情的自由性、交互性、多元性、偏差性、突出性等特点。《食品安全法》、《食品安全法实施条例》、《突发公共卫生事件应急条例》、《城市社区卫生服务机构管理办法(试行)》等明确规定了食品安全事故信息报告制度与流程。</p>
            <p>（3）危机管理与风险监管理论。计划、组织、领导、控制、创新是管理的五大基本职能。控制的实行条件包括有明确的执行标准，及时获得发生偏差的信息，纠正偏差的有效措施，包括事前控制、事中控制、事后控制。危机管理是组织通过危机监测、危机预警、危机决策和危机处理，达到避免、减少危机产生的危害，总结危机发生、发展的规律，对危机处理科学化、系统化的一种新型管理体系，包括危机管理的五力模型。项目风险监控是通过对风险规划、识别、估计、评价、应对全过程的监视和控制，从而保证风险管理能达到预期的目标。</p>

          </div>
        </div>
        <div class="btn" @click="back()">了解了，继续</div>
      </div>
    </div>
  </common-box>
</template>

<script>
import commonBox from "../../../components/commonBox"

export default {
  components: {
    commonBox
  },
  name: "Login",
  data() {
    return {

    };
  },
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  .center-box {
    position: relative;
    width: 8.3594rem;
    height: 3.9063rem;
    margin: 0 auto;
    background: url("../../../assets/image/index_img/center1.png") no-repeat;
    background-size: 100%;
    .center-img {
      width: 100%;
      height: 100%;
    }
    .center-title {
      position: absolute;
      left: 0.599rem;
      top: 0.2604rem;
      width: 86%;
      margin: 0 auto;
      .zhuye {
        position: relative;
        margin-left: -0.2604rem;
        font-size: 0.125rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(40, 158, 255, 1);
        line-height: 0.1563rem;
        vertical-align: bottom;
        cursor: pointer;

        img {
          width: 0.151rem;
          height: 0.1406rem;
        }
        span {
          position: absolute;
          top: 0.0052rem;
          left: 0.1771rem;
        }
      }
      .title {
        display: flex;
        justify-content: space-around;
        font-size: 0.1875rem;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: rgba(170, 240, 255, 1);
        line-height: 0.0729rem;
      }
      .title-img {
        width: 6.7917rem;
        margin: 0.1042rem 0 0 0.1563rem;
      }
    }
    .content {
      padding-left: 0.4365rem;
      .content-word {
        width: 6.1927rem;
        height: 1.776rem;
        font-size: 0.1146rem;
        padding: 0.0521rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(0, 184, 224, 1);
        line-height: 0.2083rem;
        background-color: transparent;
        resize: none;
        outline: none;
        overflow-y: scroll;
        .purpose {
          margin: 0.0521rem 0;
          font-size: 0.1563rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(170, 240, 255, 1);
        }
        p {
          display: block;
          width: 100%;
          text-indent: 2em;
        }
      }

      .content-word::-webkit-scrollbar {
        border-radius: 0.0521rem;
        width: 0.0417rem;
        background-color: #233865;
      }
      .content-word::-webkit-scrollbar-thumb {
        height: 0.0417rem;
        border-radius: 0.0521rem;
        -webkit-box-shadow: inset 0 0 0.0313rem rgba(0, 0, 0, 0.3);
        background-color: #289eff;
      }
    }
    .btn {
      width: 1.151rem;
      height: 0.3906rem;
      line-height: 0.3906rem;
      text-align: center;
      margin: 0 auto;
      margin-top: 0.1875rem;
      background: url("../../../assets/image/index_img/continue.png") no-repeat;
      background-size: contain;
      font-size: 0.125rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(40, 158, 255, 1);
      cursor: pointer;
    }
  }
}
</style>