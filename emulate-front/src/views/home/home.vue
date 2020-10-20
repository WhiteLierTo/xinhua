<template>
  <index-header class="container">
    <div class="center-box">
      <img class="center-img" src="../../assets/image/index_img/center.png" alt />
      <div class="center-title">
        <!-- <div class="title">
          <div class="item">
            <span>所属学院：</span>
            <span>食品健康安全类</span>
          </div>
          <div class="item">
            <span>所属专业：</span>
            <span>舆情专业</span>
          </div>
        </div>-->
        <img class="title-img" src="../../assets/image/index_img/title.png" alt />
        <div class="content-abc">
          <div
            class="content-word"
          >本实验嵌入了食品科学与安全管理、信息传播与舆情、危机管理与风险监管等基本理论、方法和技术措施，涵盖了食品安全科学与法律标准、社会大众应急应激心理行为、信息传播与舆情、危机管理、风险评估与监管、组织控制职能、等多个知识点。各知识点既有逻辑上的相继性，又有实际上的交互性，具体到食品安全仿真实验中，需要学生们综合采用相应理论分析实验操作的逻辑性与合理性，体现“学中干”、“干中学”的教学效果。</div>
          <div class="content-audio">
            <video id="media" preload="metadata" autoplay loop class="audio-sty">
              <source src="../../assets/audio/report.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        <div class="btn" @click="goIntroduce">做实验</div>
      </div>
    </div>
    <div class="bottom-box">
      <div class="btn" @click="goPurpose()">实验目的与原理</div>
      <div class="btn" @click="goMethods()">实验方法与须知</div>
      <div class="btn" @click="goTests()">实验预习与测试</div>
    </div>
  </index-header>
</template>

<script>
import indexHeader from "../../components/indexHeader";
import { finishedExperiment } from "../../api/progress";

export default {
  name: "Login",
  components: {
    indexHeader
  },
  data() {
    return {
      videoUrl: "http://player.youku.com/embed/XMzcwNTY3NTM2MA?autoplay=true",
      userId: JSON.parse(localStorage.getItem("userInfo")).userId,
      processComplete: false //是否完成实验
    };
  },

  watch: {
    $route: {
      handler: function(route) {
        this.processComplete = route.query && route.query.processComplete;
      },
      immediate: true
    }
  },
  mounted() {},
  methods: {
    // 做实验
    goIntroduce() {
      // 是否已完成实验
      finishedExperiment(this.userId)
        .then(res => {
          // console.log(res)

          if (res.data == 0) {
            this.$router.push({
              path: "/introduce"
            });
          } else if (res.data == 1) {
            this.$router.push({
              path: "/completionResultsReport",
              query: {
                dialogList: true
              }
            });
          }
        })
        .catch(err => {
          this.$message({
            message: err,
            center: true
          });
        });
    },
    //   实验目的与原理
    goPurpose() {
      this.$router.push({
        path: "/purpose"
      });
    },
    // 实验方法与须知
    goMethods() {
      this.$router.push({
        path: "/methods"
      });
    },
    // 实验预习与测试
    goTests() {
      this.$router.push({
        path: "/tests"
      });
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
    height: 3.3281rem;
    margin: 0.0938rem auto;

    .center-img {
      width: 100%;
      height: 100%;
    }

    .center-title {
      position: absolute;
      left: 0.599rem;
      top: 0.2604rem;
      width: 86%;
      margin: 0.1042rem auto;

      .title {
        display: flex;
        justify-content: space-around;
        font-size: 0.1875rem;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: rgba(170, 240, 255, 1);
        line-height: 0.0729rem;

        .item {
          width: 50%;
          padding-left: 0.8333rem;
        }
      }

      .title-img {
        width: 6.7917rem;
        margin: 0.1042rem 0 0 0.1563rem;
      }
    }

    .content-abc {
      display: flex;
      width: 100%;
      height: 1.3646rem;
      justify-content: flex-start;

      .content-word {
        width: 3.58rem;
        height: 1.3646rem;
        margin-left: 0.4531rem;
        font-size: 0.1146rem;
        font-weight: 400;
        color: rgba(0, 184, 224, 1);
        line-height: 0.25rem;
        text-indent: 0.1667rem;
      }

      .content-audio {
        width: 2.2656rem;
        height: 1.5rem;
        background: url("../../assets/image/index_img/audio.png") no-repeat;
        background-size: 100%;
        margin-left: 0.2344rem;
        margin-top: 0.1rem;

        .audio-sty {
          width: 2.15rem;
          height: 1.4rem;
          padding: 0.055rem;
        }
      }
    }

    .btn {
      width: 0.8073rem;
      height: 0.3906rem;
      line-height: 0.3906rem;
      text-align: center;
      margin: 0.5rem 0 0 0.4531rem;
      background: url("../../assets/image/index_img/experiment.png") no-repeat;
      background-size: cover;
      font-size: 0.125rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(40, 158, 255, 1);
      cursor: pointer;
    }
  }

  .bottom-box {
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
    padding: 0 0.9938rem;

    .btn {
      width: 1.1979rem;
      height: 0.4219rem;
      line-height: 0.4219rem;
      text-align: center;
      background: url("../../assets/image/index_img/btnbg.png") no-repeat;
      background-size: cover;
      font-size: 0.125rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(40, 158, 255, 1);
      cursor: pointer;
    }
  }
}
</style>
