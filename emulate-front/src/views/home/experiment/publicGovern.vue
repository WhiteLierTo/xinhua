<template>
  <div class="containers ffweweffwe">
    <office-pano class="pano-view"></office-pano>
    <common-public-head>
      <div class="tips" @click="testHandleClick">舆情治理测试题</div>
      <div class="tips release" @click="releaseHandleClick1">发布公告</div>
      <div class="tips release1" @click="goOnHnadleClick">继续</div>

      <div class="guide">
        <p>操作指引</p>
        <div class="context">
          1、分析舆情上报内容
          2、对舆情严重程度进行评估，根据舆情严重程度选择处理方式
        </div>
      </div>
      <div v-if="noticeShow">
        <ul>
          <li class="notice_all">
            <div class="tip">公告一</div>
            <div :class="flag1==true?'noticebgactive':'noticebg'" @click="selectAnnounce1()">
              <p>近日，有学生反映高校食堂集体中毒的时间。对此，我院高度重视，现将有关案件情况公布如下：</p>
              <p>2020年4月23日，法律系学生张某因在食堂吃完午餐后发生呕吐现象，经送医治疗后已恢复，目前情况良好，经过对食堂留底饭餐检疫，未发现异常。</p>
              <p>感谢大家对我院工作的关注，欢迎大家继续对我院各项工作的支持和监督。</p>
            </div>
          </li>
          <li class="notice_all again">
            <div class="tip">公告二</div>
            <div :class="flag2==true?'noticebgactive':'noticebg'" @click="selectAnnounce2()">
              <p>
                近日，有学生反映高校食堂集体中毒的时间。对此，我院高度重视，现将有关案件情况公布如下：
                2020年4月23日，法律系学生张某等学生因在食堂吃完午餐后发生呕吐现象，经送医治疗后不幸离世，其余学生共计11人病情已得到控制，目前正在医院接收观察。经过对食堂留底饭餐检疫，发现菜品中含有氟乙酰氨成分（俗称老鼠药），我们将继续侦查，对相关责任方追责。感谢大家对我院工作的关注，欢迎大家继续对我院各项工作的支持和监督。
              </p>
            </div>
          </li>
          <li class="notice_all again1">
            <div class="tip">发布公告</div>
            <div class="noticebg">
              <textarea cols="8" rows="20" class="chat" v-model="noticeVal" />
            </div>
          </li>
        </ul>
        <!-- <div class="intro_btn" @click="goOnHnadleClick">继续</div> -->
      </div>
    </common-public-head>
    <el-dialog
      :visible.sync="dialogTableVisible"
      :show-close="false"
      :close-on-click-modal="true"
      :modal="false"
    >
      <test-questions :process="3" @dialog-show="dialogShow"></test-questions>
    </el-dialog>
  </div>
</template>
<script>
import { subProcess } from "../../../api/progress";
export default {
  name: "publicGovern",
  components: {
    commonPublicHead: () => import("../../../components/commonPublicHead"),
    testQuestions: () => import("./testQuestions"),
    officePano: () => import("@/components/pano/office")
  },
  data() {
    return {
      noticeShow: false,
      processNo: "",
      dialogTableVisible: false,
      flag1: false,
      flag2: false,
      noticeVal: ""
    };
  },
  mounted() {
    window.governObj = this;
    var signNo = this.$route.query.signNo;
    let status = this.$route.query.status;
    if (signNo === "12") {
      this.processNo = "13";
    } else if (signNo === "23") {
      this.processNo = "24";
    } else if (signNo === "31") {
      this.processNo = "31";
    } else if (signNo === "41") {
      this.processNo = "42";
    }

    if (status) {
      this.noticeShow = true;
      this.flag1 = true;
    }
  },
  methods: {
    jumpHandle() {
      this.$router.push({
        path: "/publicSpread"
      });
    },
    testHandleClick() {
      this.dialogTableVisible = true;
    },
    dialogShow(val) {
      this.dialogTableVisible = val;
    },
    releaseHandleClick() {
      this.noticeShow = true;
    },
    releaseHandleClick1() {
      if (this.flag1 || this.flag2) {
        this.$message({
          message: "发布成功",
          center: true
        });
        return;
      }
      if (this.noticeVal) {
        this.$message({
          message: "发布成功",
          center: true
        });
      } else {
        this.$message({
          message: "请填写发布信息",
          center: true
        });
      }
    },
    goOnHnadleClick() {
      // 舆情处理
      let userId = JSON.parse(localStorage.getItem("userInfo")).userId;
      let data = {
        userId,
        processNo: this.processNo
      };
      subProcess(data);
      if (this.processNo === "42") {
        this.$router.push({
          path: "/publicSpread",
          query: {
            signNo: this.processNo
          }
        });
      } else {
        this.$router.push({
          path: "/publicAnalysis",
          query: {
            signNo: this.processNo
          }
        });
      }
    },
    selectAnnounce1() {
      this.flag1 = true;
      this.flag2 = false;
    },
    selectAnnounce2() {
      this.flag2 = true;
      this.flag1 = false;
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
  .pano-view {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
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
    z-index: 2;
  }
  .release {
    margin-left: 1.0677rem;
  }
  .release1 {
    margin-left: 2.16rem;
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
      color: rgba(0, 184, 224, 1);
      line-height: 0.3125rem;
      margin: 0 auto;
    }
  }
  .notice_all {
    position: absolute;
    top: 1.1719rem;
    left: 2.2rem;
    width: 2.5rem;
    height: 1.8rem;
    cursor: pointer;
  }
  .tip {
    font-size: 0.1563rem;
    font-family: Source Han Sans CN;
    font-weight: 600;
    color: #0c2d73;
    line-height: 0.1563rem;
    margin-left: 0.1979rem;
  }
  .noticebgactive {
    width: 100%;
    height: 100%;
    background: url("../../../assets/image/experiment/activeNotice.png")
      no-repeat;
    background-size: 100%;
    padding-top: 0.3125rem;
    p {
      width: 2.2rem;
      font-size: 0.08rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(193, 243, 255, 1);
      line-height: 0.13rem;
      margin: 0rem auto;
      text-indent: 2em;
    }
  }
  .noticebg {
    width: 100%;
    height: 100%;
    background: url("../../../assets/image/experiment/notice.png") no-repeat;
    background-size: 100%;
    padding-top: 0.3125rem;

    p {
      width: 2.2rem;
      font-size: 0.08rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(193, 243, 255, 1);
      line-height: 0.13rem;
      margin: 0rem auto;
      text-indent: 2em;
    }
  }
  .again {
    margin-left: 2.6rem;
  }
  .again1 {
    margin-left: 5.2rem;
    .chat {
      width: 90%;
      margin: 0 auto;
      display: block;
      height: 1.0938rem;
      background: transparent;
      border-color: rgba(170, 240, 255, 1);
      color: rgba(170, 240, 255, 1);
      font-size: 0.0938rem;
    }
  }

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
    margin-top: 0.25rem;
    position: absolute;
    bottom: 0.5833rem;
    right: 3.8281rem;
  }
}
</style>
<style lang="scss">
.ffweweffwe {
  .el-dialog__wrapper {
    background: url("../../../assets/image/model.png") no-repeat;
    background-size: 100% 100%;
  }
  .el-dialog {
    background: transparent;
    width: 100%;
    .el-dialog__body {
      width: 62%;
      margin: 0 auto;
    }
  }
}
</style>