<template>
  <div class="contain">
    <office-pano class="pano-view"></office-pano>
    <common-public-head>
      <div class="tips" @click="testHandleClick">舆情分析测试题</div>
      <div class="tips release" @click="publishHnadleClick" v-if="showAnnouncement">发布公告</div>
      <div class="tips release1" @click="jumpHandleClick">跳过</div>
      <div class="guide">
        <p>操作指引</p>
        <div class="context">
          1、根据舆情内容撰写事件处理结果公告
          2、完成后填写实验结果报告
        </div>
      </div>
    </common-public-head>
    <div class="njkds">
      <el-dialog
        :visible.sync="dialogTableVisible"
        :show-close="false"
        :close-on-click-modal="false"
      >
        <div class="analysis">
          <img src="../../../assets/image/experiment/publishbg.png" />
          <h4>突发事件处理结果公告</h4>
          <div class="pushlish">
            <div class="back" @click="backHandleClick">
              <span class="back_span">
                <img class="back_img" src="../../../assets/image/experiment/back.png" />
              </span>
              <span class="word">返回</span>
            </div>
            <div class="psh_title">南京科技大学学生食堂用餐后中毒去世事件处理结果公告</div>
            <div class="psh_content" v-if="checked==false">
              <p class="con_title">关于xxxx年xx月xx日南京xxx学校食堂公共卫生安全事故，现将事故调查结果通报如下：</p>
              <p class="con_title">1、事故发生原因</p>
              <el-input
                v-model=" resultsAnnouncement.reason"
                type="textarea"
                placeholder="请输入事件发生原因"
              ></el-input>
              <p class="con_title">2、调查处理情况总结</p>
              <el-input
                v-model=" resultsAnnouncement.situation"
                type="textarea"
                placeholder="请输入调查处理情况总结"
              ></el-input>
              <p class="con_title">3、防范和建议</p>
              <el-input
                v-model=" resultsAnnouncement.proposal"
                type="textarea"
                placeholder="请输入防范和建议"
              ></el-input>
            </div>
            <div class="psh_content" v-else>
              <p class="con_title">关于xxxx年xx月xx日南京xxx学校食堂公共卫生安全事故，现将事故调查结果通报如下：</p>
              <p class="con_title">1、事故发生原因</p>
              <p
                class="con_txt"
              >xxxx年xx月xx日，南京科技学校一名在校学生就餐后突发腹痛呕吐抽搐，医院检查出有氟乙酰胺成分，怀疑在食堂就餐时导致。11月7日，记者从学生家属处了解到，该事故造成1人死亡，多人出现严重呕吐反应，目前均已出院。</p>
              <p class="con_title">2、调查处理情况总结</p>
              <p
                class="con_txt"
              >根据调查结果，xx学校食堂由于食堂经理疏于管理，采购部门对于果蔬检疫工作不够重视，导致此次公共的卫生安全事件，公安部门将依法追究其刑事责任。</p>
              <p class="con_txt">特别表彰在本次安全事件中及时拨打救援电话并上报风险的经管系同学，校方将依照校规对其进行表彰。</p>
              <p class="con_title">3、防范和建议</p>
              <p class="con_txt">（1）采购部门要严格执行检疫标准；</p>
              <p class="con_txt">（2）日常饮食注意不要误食过期、霉变的食物；</p>
              <p class="con_txt">（3）避免听信流言，相信权威部门的公告内容，切勿传播虚假消息。</p>
            </div>

            <el-checkbox v-model="checked">引用模版</el-checkbox>
            <div class="psh_btn" @click="sureHandleClick">确认发布</div>
          </div>
        </div>
      </el-dialog>
    </div>
    <div class="hbib">
      <el-dialog
        :visible.sync="dialogTempShow"
        :show-close="false"
        :close-on-click-modal="true"
        :modal="false"
      >
        <test-questions :process="5" @dialog-show="dialogShow"></test-questions>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { subProcess } from "../../../api/progress";
export default {
  name: "publicMonitor",
  components: {
    commonPublicHead: () => import("../../../components/commonPublicHead"),
    testQuestions: () => import("./testQuestions"),
    officePano: () => import("@/components/pano/office")
  },
  data() {
    return {
      dialogTempShow: false,
      dialogTableVisible: false,
      checked: false,
      //   结果公告
      resultsAnnouncement: {
        reason: "", //原因
        situation: "", //情况总结
        proposal: "" //建议
      },
      showAnnouncement: true, //公告标志
      processNo: "",
      announcementNo: "",
      announcementComplete: false //是否发布完公告
    };
  },
  mounted() {
    window.officeAnalysis = this;
    console.log(this.$route.query.signNo)
    var signNo = this.$route.query.signNo;
    if (signNo === "13") {
      this.processNo = "14";
      this.announcementNo = "15";
    } else if (signNo === "24") {
      this.processNo = "25";
      this.announcementNo = "26";
    } else if (signNo === "43") {
      this.processNo = "44";
      this.announcementNo = "45";
    } else if (signNo === "31") {
      this.processNo = "31";
      this.announcementNo = "31";
      this.showAnnouncement = false;
    }
  },
  methods: {
    testHandleClick() {
      this.dialogTempShow = true;
    },
    dialogShow(val) {
      this.dialogTempShow = val;
    },
    publishHnadleClick() {
      this.dialogTableVisible = true;
    },
    sureHandleClick() {
      // 上报流程
      let userId = JSON.parse(localStorage.getItem("userInfo")).userId;
      let data = {
        userId,
        processNo: this.announcementNo
      };
      subProcess(data);
      this.$message({
        message: "发布成功",
        center: true
      });
      this.dialogTableVisible = false;
      this.announcementComplete = true;
    },

    backHandleClick() {
      this.dialogTableVisible = false;
    },
    jumpHandleClick() {
      // 上报流程
      let userId = JSON.parse(localStorage.getItem("userInfo")).userId;
      let data = {
        userId,
        processNo: this.announcementNo
      };
      subProcess(data).then(res => {
        let data = {
          userId,
          processNo: this.processNo
        };
        if (this.processNo !== "31") {
          subProcess(data);
        } else {
          this.announcementComplete = true;
        }
        this.$router.push({
          path: "/publicDissipate",
          query: {
            announcementComplete: this.announcementComplete,
            flag: true
          }
        });
      });
      this.dialogTableVisible = false;
      this.announcementComplete = true;
    },
    // 舆情分析点击大屏
    didHandleClick() {
      let userId = JSON.parse(localStorage.getItem("userInfo")).userId;
      let data = {
        userId,
        processNo: this.processNo
      };
      if (this.processNo !== "31") {
        subProcess(data);
      } else {
        this.announcementComplete = true;
      }
      this.$router.push({
        path: "/publicDissipate",
        query: {
          announcementComplete: this.announcementComplete,
          flag: true
        }
      });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.contain {
  position: relative;
  height: 100%;
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
    z-index: 999;
  }
  .release {
    margin-left: 1.0677rem;
  }
  .release1 {
    margin-left: 2.1377rem;
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
      background: linear-gradient(#00d6ff 86%, #003a91);
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
  .analysis {
    position: relative;
    img {
      position: relative;
      width: 6.8646rem;
      height: 4.0313rem;
    }
    h4 {
      font-size: 0.1563rem;
      font-family: Source Han Sans CN;
      font-weight: 600;
      color: rgba(193, 243, 255, 1);
      line-height: 0.1563rem;
      background: linear-gradient(#00d6ff 32%, #003a91);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      position: absolute;
      top: -0.4333rem;
      left: 0.2135rem;
    }
    .pushlish {
      position: absolute;
      top: 0.0521rem;
      left: 0.5rem;
      margin-top: 0.1563rem;
      .back {
        font-size: 0.125rem;
        font-weight: 400;
        color: rgba(40, 158, 255, 1);
        line-height: 0.2083rem;
        cursor: pointer;
        .back_span {
          display: inline-block;
          padding-right: 0.041rem;
          vertical-align: middle;
          .back_img {
            width: 0.0733rem;
            height: 0.1154rem;
          }
        }
      }

      .psh_title {
        height: 0.1563rem;
        line-height: 0.1563rem;
        text-align: center;
        font-size: 0.1563rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(193, 243, 255, 1);
      }
      .psh_content {
        width: 6.0417rem;
        margin: 0 auto;
        font-size: 0.1146rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 0.1875rem;
        padding-top: 0.1823rem;
        .con_title {
          color: #aaf0ff;
          margin: 0;
        }
        .con_txt {
          color: #00b8e0;
          text-indent: 2em;
          margin: 0;
        }
      }
      .psh_btn {
        position: absolute;
        bottom: -23%;
        left: 50%;
        transform: translateX(-50%);
        width: 0.6719rem;
        height: 0.3333rem;
        background: url("../../../assets/image/experiment/btnbg.png") no-repeat;
        background-size: 100%;
        font-size: 0.1042rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 0.3333rem;
        text-align: center;
        cursor: pointer;
        display: inline-block;
      }
    }
  }
}
</style>
<style lang="scss">
.njkds {
  .el-dialog__wrapper {
    background: url("../../../assets/image/model.png") no-repeat;
    background-size: 100% 100%;
  }
  .el-dialog {
    background: transparent;
    width: 100%;
    margin-top: 12vh !important;
    .el-dialog__body {
      width: 66%;
      margin: 0 auto;
    }
  }
  .el-checkbox {
    position: absolute;
    bottom: -18%;
    left: 0;
  }
  .el-checkbox__label {
    font-size: 0.0938rem;
    color: #fff;
  }
  .el-checkbox__inner {
    width: 0.104167rem;
    height: 0.104167rem;
    background: transparent;
    border-radius: 50%;
    border: 0.032rem solid #409eff;
  }
  .el-checkbox__inner::after {
    width: 0.030042rem;
    height: 0.030042rem;
    border-radius: 50%;
    background-color: #fff;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    width: 0.104167rem;
    height: 0.104167rem;
    // background: #fff;
    border-radius: 50%;
    border: 0.032rem solid #409eff;
  }
  //改变placeholder颜色
  .dz_textarea textarea::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #126476;
  }
  .dz_textarea textarea:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #126476;
  }
  .dz_textarea textarea::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #126476;
  }
  .dz_textarea textarea::-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #126476;
  }

  .el-textarea__inner {
    width: 100%;
    height: auto;
    min-height: 0.5625rem;
    border: none;
    background: transparent;
    color: #00b8e0;
    font-size: 0.1146rem;
    resize: none;
  }
  .el-textarea__inner::-webkit-scrollbar {
    border-radius: 0.0521rem;
    height: 100%;
    width: 0.0417rem;
    background-color: #233865;
  }
  .el-textarea__inner::-webkit-scrollbar-thumb {
    height: 0.0417rem;
    border-radius: 0.0521rem;
    -webkit-box-shadow: inset 0 0 0.0313rem rgba(0, 0, 0, 0.3);
    background-color: #289eff;
  }
  .el-dialog__body {
    padding: 10px;
  }
  .el-checkbox__inner::after {
    left: 0;
  }
}
.hbib {
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