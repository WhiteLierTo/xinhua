<template>
  <div class="box">
    <div class="box_chat">
      <video id="media" preload="metadata" autoplay class="shipin">
        <source src="../../../assets/audio/map4.mp4" type="video/mp4" />
      </video>
      <p class="box_chat_a" v-show="show1">
        <span v-if="dVal1&&num>=1&&num<10">{{dVal1}}</span>
        <span v-else-if="!dVal1">听说我们学校法律系的好几个学生被送到医院去了</span>
      </p>
      <p class="box_chat_b" v-show="show2">
        <span v-if="dVal2&&num>=10&&num<20">{{dVal2}}</span>
        <span v-else-if="!dVal2">是真的，已经在急诊了，估计是食堂用霉变的食材，电视都这么报导;</span>
      </p>
      <p class="box_chat_c" v-show="show3">
        <span v-if="dVal3&&num>=20&&num<30">{{dVal3}}</span>
        <span v-else-if="!dVal3">据说一个班的学生都中毒了…</span>
      </p>
      <p class="box_chat_d" v-show="show4">
        <span v-if="dVal4&&num>=30&&num<=40">{{dVal4}}</span>
        <span v-else-if="!dVal4">哎大家不要在食堂吃饭了，都去外面吃吧</span>
      </p>
    </div>
    <div>
      <div class="operation" v-show="show">
        <h2>发表评论</h2>
        <textarea cols="8" rows="20" class="chat" v-model="chatVal" />
        <div class="submit" @click="submitHandle">提交</div>
      </div>
    </div>
    <common-head class="container">
      <div class="tips" @click="testHandleClick">舆情传播测试题</div>
      <div class="tips release1" @click="jumpHandleClick">跳过</div>
      <div class="tips release" @click="goOnHandleClick" v-show="show">继续</div>
    </common-head>
    <div class="sddsfds">
      <el-dialog
        :visible.sync="isReported"
        :show-close="false"
        :close-on-click-modal="true"
        :modal="false"
      >
        <div class="public">
          <img src="../../../assets/image/experiment/publicbg.png" />
          <div class="public_con">
            <p class="public_title">请评估是否需要上报舆情</p>
            <el-row>
              <el-col :span="12">
                <div class="intro_btn not_report" @click="goNotReport">不上报</div>
              </el-col>
              <el-col :span="12">
                <div class="intro_btn report" @click="goReport">上报</div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-dialog>
    </div>
    <div class="uhbh">
      <el-dialog
        :visible.sync="dialogTableVisible"
        :show-close="false"
        :close-on-click-modal="true"
        :modal="false"
      >
        <test-questions :process="1" @dialog-show="dialogShow"></test-questions>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { subProcess } from "../../../api/progress";
export default {
  name: "publicOpinionTran",
  components: {
    commonHead: () => import("../../../components/commonHead"),
    testQuestions: () => import("./testQuestions")
  },
  data() {
    return {
      isReported: false,
      dialogTableVisible: false,
      show: false,
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      chatVal: "",
      dVal1: "",
      dVal2: "",
      dVal3: "",
      dVal4: "",
      num: 0
    };
  },
  mounted() {
    document.getElementById("media").addEventListener(
      "timeupdate",
      () => {
        setTimeout(() => {
          this.show1 = true;
        }, 20500);
        setTimeout(() => {
          this.show2 = true;
        }, 25000);
        setTimeout(() => {
          this.show3 = true;
        }, 25500);
        setTimeout(() => {
          this.show4 = true;
        }, 30000);
        setTimeout(() => {
          this.show = true;
        }, 31000);
      },
      false
    );
  },
  methods: {
    submitHandle() {
      this.num = Math.floor(Math.random() * 40 + 1);
      if (this.num >= 1 && this.num < 10) {
        this.dVal1 = this.chatVal;
        this.dVal2 = "";
        this.dVal3 = "";
        this.dVal4 = "";
      } else if (this.num >= 10 && this.num < 20) {
        this.dVal2 = this.chatVal;
        this.dVal1 = "";
        this.dVal3 = "";
        this.dVal4 = "";
      } else if (this.num >= 20 && this.num < 30) {
        this.dVal3 = this.chatVal;
        this.dVal1 = "";
        this.dVal2 = "";
        this.dVal4 = "";
      } else if (this.num >= 30 && this.num <= 40) {
        this.dVal4 = this.chatVal;
        this.dVal1 = "";
        this.dVal2 = "";
        this.dVal3 = "";
      }
      this.chatVal = "";
    },
    goOnHandleClick() {
      // 上报流程
      let userId = JSON.parse(localStorage.getItem("userInfo")).userId;
      let data = {
        userId,
        processNo: "2"
      };
      subProcess(data);
      this.isReported = true;
    },
    jumpHandleClick() {
      // 上报流程
      let userId = JSON.parse(localStorage.getItem("userInfo")).userId;
      let data = {
        userId,
        processNo: "2"
      };
      subProcess(data).then(res => {
        // 上报流程
        let data = {
          userId,
          processNo: "21"
        };
        subProcess(data).then(res => {
          let data = {
            userId,
            processNo: "41"
          };
          subProcess(data);
          this.$router.push({
            path: "/publicGovern",
            query: {
              signNo: "41",
              status: true
            }
          });
        });
      });
    },
    //不报告
    goNotReport() {
      // 上报流程
      let userId = JSON.parse(localStorage.getItem("userInfo")).userId;
      let data = {
        userId,
        processNo: "11"
      };
      subProcess(data);
      this.$router.push({
        path: "/publicSpread",
        query: {
          signNo: "11"
        }
      });
    },
    //报告
    goReport() {
      // 上报流程
      let userId = JSON.parse(localStorage.getItem("userInfo")).userId;
      let data = {
        userId,
        processNo: "21"
      };
      subProcess(data);
      this.$router.push({
        path: "/publicOpinionRep"
      });
    },
    //本环节测试题
    testHandleClick() {
      this.dialogTableVisible = true;
    },
    dialogShow(val) {
      this.dialogTableVisible = val;
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.box {
  .box_chat {
    position: relative;
    p {
      width: 1.8rem;
      height: 1rem;
      font-size: 0.0938rem;
      color: #aaf0ff;
      background: url("../../../assets/image/chatbg.png") no-repeat;
      background-size: 100% 100%;
      span {
        display: block;
        width: 1.2323rem;
        height: 1.2135rem;
        margin: 0 auto;
      }
    }
    .box_chat_a {
      position: absolute;
      right: 0.0781rem;
      top: 2.4rem;
      span {
        padding-top: 0.367rem;
      }
    }
    .box_chat_b {
      position: absolute;
      left: 3.8073rem;
      top: 3rem;
      span {
        padding-top: 0.3125rem;
      }
    }
    .box_chat_c {
      position: absolute;
      left: 1.5rem;
      top: 1.8rem;
      span {
        padding-top: 0.4167rem;
      }
    }
    .box_chat_d {
      position: absolute;
      right: 2.5073rem;
      top: 1.8rem;
      span {
        padding-top: 0.367rem;
      }
    }
    .shipin {
      width: 100%;
      height: 100%;
      position: relative;
      top: 0;
      left: 0;
    }
  }
  .operation {
    width: 1.249rem;
    height: 2rem;
    position: absolute;
    top: 0.7813rem;
    left: 0.0781rem;
    background: url("../../../assets/image/caozuo.png") no-repeat;
    background-size: 100% 100%;
    h2 {
      text-align: center;
      color: rgba(170, 240, 255, 1);
    }
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
    .submit {
      width: 0.625rem;
      height: 0.2344rem;
      background: url("../../../assets/image/square.png") no-repeat;
      background-size: 100% 100%;
      line-height: 0.2344rem;
      text-align: center;
      color: rgba(170, 240, 255, 1);
      margin: 0.0521rem auto;
    }
  }
  .container {
    position: absolute;
    top: 0;
    display: flex;
    .tips {
      position: absolute;
      left: 3.8802rem;
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
      justify-content: space-between;
    }
    .release1 {
      margin-left: 1.0677rem;
    }
    .release {
      margin-left: 2.1377rem;
    }
  }
  .public {
    position: relative;
    margin-top: 0.5rem;
    img {
      width: 3.8021rem;
      height: 1.8438rem;
    }
    .public_con {
      position: absolute;
      top: 0rem;
      left: 0.25rem;
    }
    .public_title {
      font-size: 0.1875rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(170, 240, 255, 1);
      text-align: center;
      padding-top: 0.2rem;
      padding-left: 0.5229rem;
    }
    .not_report {
      margin-left: 0.4219rem;
    }
    .report {
      margin-left: 0.7552rem;
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
      margin-top: 0.1667rem;
    }
  }
}
</style>
<style lang="scss">
.sddsfds {
  .el-dialog__wrapper {
    background: url("../../../assets/image/model.png") no-repeat;
    background-size: 100% 100%;
  }
  .el-dialog {
    background: transparent;
    width: 100%;
    .el-dialog__body {
      width: 36%;
      margin: 0 auto;
    }
  }
}
.uhbh {
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