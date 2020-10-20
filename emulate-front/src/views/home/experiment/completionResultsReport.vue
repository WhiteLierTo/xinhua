<template>
  <div>
    <common-header class="container pqpqpq">
      <div class="tips release1" @click="jumoHandleClick">跳过</div>
      <h3>公共卫生安全舆情与风险监管平台实验结果报告</h3>
      <div class="main-box">
        <div class="item">
          <p class="purpose">实验目的和要求</p>
          <div class="purpose-con">
            <p>（1）掌握食品安全管理与舆情知识：包括食品科学知识练习、食品安全事件标准判断、食品安全信息报告流程、人类心理行为知识与网络舆情传播知识的掌握、舆情地图的熟悉等；</p>
            <p>（2）熟悉食品安全事件的应急处理方法：包括食品安全事件的随机冲击、食品安全事故的信息收集与传播、食品安全事故的讨论与质疑、人物角色的选取与互动、食品安全事故信息的确认、恶意信息传播的制止等。</p>
          </div>
        </div>
        <div class="item">
          <p class="purpose">完成实验步骤</p>
          <div class="con">
            <el-table :data="processList1" style="width: 410px;">
              <el-table-column prop="processName" label="步骤流程" align="center" width="auto"></el-table-column>
              <el-table-column prop="stepName" label="交互实现" align="center" width="auto"></el-table-column>
            </el-table>
            <el-table :data="processList2" style="width: 410px;">
              <el-table-column prop="processName" label="步骤流程" align="center" width="auto"></el-table-column>
              <el-table-column prop="stepName" label="交互实现" align="center" width="auto"></el-table-column>
            </el-table>
            <el-table :data="processList3" style="width: 410px;">
              <el-table-column prop="processName" label="步骤流程" align="center" width="auto"></el-table-column>
              <el-table-column prop="stepName" label="交互实现" align="center" width="auto"></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="item">
          <p class="purpose">讨论和分析</p>
          <el-input
            class="evaluate-con"
            type="textarea"
            v-model="analysis"
            placeholder="分析实验原理，解释得到这样结果的原因以及总结实验中应当注意的问题，提高改进的措施等。"
          ></el-input>
        </div>
      </div>
      <div class="btn" @click="submit()">确认提交</div>
    </common-header>
    <div class="vhhuisd">
      <el-dialog :visible.sync="dialogList" :show-close="false" :close-on-click-modal="true">
        <div class="center-title">您已完成公共卫生安全舆情与风险监管仿真</div>
        <div class="intro_btn" @click="backHome">返回主页</div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import commonHeader from "../../../components/commonHeader";

import { processCompleted, subReport } from "../../../api/progress";

export default {
  components: {
    commonHeader
  },
  name: "index",
  data() {
    return {
      //  实验步骤数据
      processList1: [{}, {}, {}, {}],
      processList2: [{}, {}, {}, {}],
      processList3: [{}, {}, {}, {}],
      dialogList: false,
      analysis: "" //讨论和分析
    };
  },
  mounted() {
    // 获取用户id
    this.userId = JSON.parse(localStorage.getItem("userInfo")).userId;
    // 获取报告信息
    this.getProcessCompletedList(this.userId);
  },
  watch: {
    $route: {
      handler: function(route) {
        this.dialogList = route.query && route.query.dialogList;
      },
      immediate: true
    }
  },
  methods: {
    //  查看报告
    getProcessCompletedList(userId) {
      processCompleted(userId).then(res => {
        // console.log(res)
        let arrayList = this.$group(res.data.processList, 4);
        this.processList1 = arrayList[0];
        this.processList2 = arrayList[1];
        if (this.processList2.length < 4) {
          this.processList2.push("{}");
          return;
        }
      });
    },

    // 提交讨论分析内容
    submit() {
      if (this.analysis != "") {
        var data = {
          userId: JSON.parse(localStorage.getItem("userInfo")).userId,
          statusContent: this.analysis,
          processRemark: 1
        };

        subReport(data).then(res => {
          this.$message({
            message: "提交成功",
            center: true
          });
          this.dialogList = true;
        });
      } else {
        this.$message({
          message: "请填写讨论和分析",
          center: true
        });
      }
    },
    jumoHandleClick() {
      var data = {
        userId: JSON.parse(localStorage.getItem("userInfo")).userId,
        statusContent: this.analysis || "暂无评论",
        processRemark: 1
      };

      subReport(data).then(res => {
        this.$message({
          message: "提交成功",
          center: true
        });
        this.dialogList = true;
      });
    },
    backHome() {
      this.$router.push({
        path: "/home",
        query: {
          processComplete: true
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  position: relative;
  background: url("../../../assets/image/loginbg.png");
  background-size: 100%;
  background-attachment: fixed;
  min-height: 8.3333rem;
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
  .square {
    position: absolute;
    left: 3.7792rem;
    top: 0.35rem;
    cursor: pointer;

    img {
      position: relative;
      width: 1.0938rem;
      height: 0.3438rem;
    }

    span {
      position: absolute;
      left: 0.3958rem;
      top: 0.0938rem;
      font-size: 0.1042rem;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: rgba(170, 240, 255, 1);
    }
  }

  h3 {
    font-size: 0.1563rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(193, 243, 255, 1);
    line-height: 0.1563rem;
    margin-left: 1.755rem;
    background: linear-gradient(#00d6ff 32%, #003a91);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0;
  }

  .main-box {
    width: 6.8594rem;
    height: auto;
    margin: 0 auto;
    padding: 0.25rem;
    box-sizing: border-box;
    background: url("../../../assets/image/personnal/reportbg.png");
    background-size: 100% 100%;

    .item {
      .purpose {
        font-size: 0.1354rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 0.1563rem;
        background: linear-gradient(#00d6ff 32%, #003a91);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .purpose-con {
        width: 6.4063rem;
        height: auto;
        padding: 0.151rem;
        box-sizing: border-box;
        border: 0.0052rem solid rgba(11, 97, 178, 1);
        border-radius: 0.1042rem;
        background-color: #012c88;
        opacity: 0.8;
        font-size: 0.1146rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(0, 184, 224, 1);
        line-height: 0.1875rem;
        text-indent: 2em;
      }

      .con {
        display: flex;
        justify-content: flex-start;
        width: 6.4063rem;
        height: auto;
        padding: 0.151rem;
        box-sizing: border-box;
        border: 0.0052rem solid rgba(11, 97, 178, 1);
        border-radius: 0.1042rem;
        background-color: #012c88;
        opacity: 0.8;
      }

      .texts-result {
        display: flex;
        height: 0.2083rem;
        font-size: 0.125rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(170, 240, 255, 1);
        line-height: 0.2083rem;
        border-bottom: 0.0052rem solid rgba(4, 77, 125, 1);

        span {
          display: inline-block;
          width: 50%;
          text-align: center;
        }
      }

      .evaluate-con {
        height: 1.1094rem;
        padding: 0.151rem;
        box-sizing: border-box;
        border: 0.0052rem solid rgba(11, 97, 178, 1);
        border-radius: 0.1042rem;
        background-color: #012c88;
        opacity: 0.8;
        font-size: 0.1146rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(0, 184, 224, 1);
        line-height: 0.1875rem;
        text-indent: 2em;
      }
    }

    .grade {
      margin-top: 0.1563rem;
      font-size: 0.1354rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 0.1563rem;
      background: linear-gradient(#00d6ff 32%, #003a91);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

      .fill-in {
        display: inline-block;
        width: auto;
        min-width: 6%;
        text-align: center;
      }

      .fill-in:focus {
        outline: none !important;
      }
    }
  }
}

.btn {
  width: 1.151rem;
  height: 0.3906rem;
  line-height: 0.3906rem;
  text-align: center;
  margin: 0.1875rem auto;
  background: url("../../../assets/image/index_img/continue.png") no-repeat;
  background-size: contain;
  font-size: 0.125rem;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(40, 158, 255, 1);
  cursor: pointer;
}

.center-title {
  position: absolute;
  top: 0.5156rem;
  left: 0.4rem;
  font-size: 0.16rem;
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
</style>

<style lang="scss">
.pqpqpq {
  .el-table {
    //   margin-top: 0.1042rem;
    background-color: transparent !important;
  }

  .el-table th,
  .el-table tr {
    margin: 0;
    padding: 0;
    background-color: transparent !important;
    border-bottom: 0.0052rem solid rgba(4, 77, 125, 1);
  }

  .el-table th {
    color: #aaf0ff;
    font-size: 0.125rem;
    height: 0.3073rem;
    line-height: 0.3073rem;
  }

  .el-table tr {
    height: 0.3073rem;
    color: #00b8e0;
    font-size: 0.1146rem;
    line-height: 0.3073rem;
  }

  .el-table thead {
    font-size: 0.125rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(170, 240, 255, 1);
  }

  .el-table__body tr:hover > td {
    background-color: transparent;
  }

  .el-table td,
  .el-table th.is-leaf {
    border-bottom: 0.0052rem solid rgba(4, 77, 125, 1);
  }

  .el-table::before {
    display: none;
  }

  .el-table .cell {
    line-height: 0.1771rem;
  }

  .el-input__inner {
    border: none;
    background-color: transparent;
    color: #fff !important;
    z-index: 99;
  }

  .el-textarea__inner {
    width: 100%;
    height: 100%;
    min-height: 0.7292rem;
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
}

.vhhuisd {
  .el-dialog {
    background: url("../../../assets/image/experiment/publicbg.png") no-repeat
      center center;
    width: 3.8021rem;
    height: 1.8438rem;
    background-size: 100%;
    margin-top: 30vh !important;
  }

  .el-dialog__wrapper {
    background: url("../../../assets/image/model.png") no-repeat;
    background-size: 100% 100%;
  }
}
</style>
