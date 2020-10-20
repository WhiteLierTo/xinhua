<template>
  <common-header class="containers pisdhjfa">
    <div class="square" @click="saveData()" v-if="userType==1">
      <img src="../../../../assets/image/square.png" alt />
      <span>保存</span>
    </div>
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
          <div class="progress">
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
      </div>
      <div class="item">
        <p class="purpose">实验结果分析</p>
        <div class="result-con">
          <div class="con">
            <p class="texts-result">
              <span class="first">第一部分理论测试</span>
              <span>{{isTheory}}</span>
            </p>
            <p class="texts-result">
              <span>第二部分实践操作</span>
              <span>{{isProcess}}</span>
            </p>

            <div class="progress">
              <el-table :data="processList1" style="width: 410px;">
                <el-table-column prop="processName" label="步骤流程" align="center" width="auto"></el-table-column>
                <el-table-column label="结果评价" align="center" width="auto">
                  <template slot-scope="scope">
                    <el-input
                      placeholder
                      v-model="scope.row.processScore"
                      @change="scoring(scope.row.processNo,$event)"
                    ></el-input>
                  </template>
                </el-table-column>
              </el-table>
              <el-table :data="processList2" style="width: 410px;">
                <el-table-column prop="processName" label="步骤流程" align="center" width="auto"></el-table-column>
                <el-table-column prop="score" label="结果评价" align="center" width="auto">
                  <template slot-scope="scope">
                    <el-input
                      placeholder
                      v-model="scope.row.processScore"
                      @change="scoring(scope.row.processNo,$event)"
                    ></el-input>
                  </template>
                </el-table-column>
              </el-table>
              <el-table :data="processList3" style="width: 410px;">
                <el-table-column prop="processName" label="步骤流程" align="center" width="auto"></el-table-column>
                <el-table-column prop="processScore" label="结果评价" align="center" width="auto">
                  <template slot-scope="scope">
                    <el-input
                      placeholder
                      v-model="scope.row.processScore"
                      @change="scoring(scope.row.processNo,$event)"
                    ></el-input>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <p class="score">
              <span class="totalScore">综合评价得分</span>
              <el-input class="score" placeholder=" " v-model="comprehensiveScore"></el-input>
            </p>
          </div>
        </div>
      </div>
      <div class="item">
        <p class="purpose">讨论和分析</p>
        <p class="evaluate-con">{{discussContent}}</p>
        <!-- <el-input class="evaluate-con" type="textarea" v-model="analysis" placeholder="请填写"></el-input> -->
      </div>
      <div class="grade">
        <span>评分(</span>
        <el-input class="score" placeholder v-model="score"></el-input>
        <span>)分</span>
      </div>

      <div class="item">
        <p class="purpose">实验评价</p>
        <el-input class="evaluate-con" type="textarea" v-model="content"></el-input>
      </div>
    </div>
    <div class="btn" @click="back()">返回上一页</div>
  </common-header>
</template>

<script>
import commonHeader from "../../../../components/commonHeader";
import { getReportInfo, scoring } from "../../../../api/progress";

export default {
  components: {
    commonHeader
  },
  name: "index",
  data() {
    return {
      discussContent: "111", //讨论和分析
      isTheory: "通过", //理论测试通过与否
      isProcess: "未通过", //实践操作通过与否
      score: " ", //总评分
      content: " ", //实验评价
      comprehensiveScore: " ", //综合得分
      processScoreList: [], //流程及得分
      //  实验步骤数据
      processList1: [{}, {}, {}, {}],
      processList2: [{}, {}, {}, {}],
      processList3: [{}, {}, {}, {}],
      userType: JSON.parse(localStorage.getItem("userInfo")).userType
    };
  },
  mounted() {
    console.log(JSON.parse(localStorage.getItem("userInfo")).userType);
    // 获取报告信息
    this.getReportInfo(this.$route.query.userId);
  },
  methods: {
    //  查看报告
    getReportInfo(data) {
      getReportInfo(data)
        .then(res => {
          //   讨论和分析内容
          this.discussContent = res.data.statusContent;
          // //  理论测试通过与否
          if (res.data.isTheory == "1") {
            res.data.isTheory = "通过";
          } else if (res.data.isTheory == "2") {
            res.data.isTheory = "未通过";
          }
          this.isTheory = res.data.isTheory;
          // //  实践练习通过与否
          if (res.data.isProcess == "1") {
            res.data.isProcess = "通过";
          } else if (res.data.isProcess == "2") {
            res.data.isProcess = "未通过";
          }
          this.isProcess = res.data.isProcess;
          (this.score = res.data.score),
            // 实验评价
            (this.content = res.data.teachContent);
          this.comprehensiveScore = res.data.comprehensiveScore;
          // 完成步骤列表
          if (res.data.processList) {
            let arrayList = this.$group(res.data.processList, 4);
            this.processList1 = arrayList[0];
            this.processList2 = arrayList[1];
            if (this.processList2.length != []) {
              if (this.processList2.length < 4) {
                this.processList2.push("{}");
                return;
              }
            }
          }
        })
        .catch(err => {
          this.$message({
            message: err,
            center: true
          });
        });
    },

    // 步骤及得分
    scoring(processNo, processScore) {
      var processObj = {
        processNo,
        processScore
      };
      console.log(processObj);
      for (var i = 0; i < this.processScoreList.length - 1; i++) {
        if (this.processScoreList[i].processNo == processNo) {
          //   console.log(i)
          this.processScoreList.splice(i, 1);
        }
      }
      this.processScoreList.push(processObj);
      //   console.log(this.processScoreList)
    },

    // 保存数据
    saveData() {
      var data = {
        userId: this.$route.query.userId,
        score: this.score,
        content: this.content,
        comprehensiveScore: this.comprehensiveScore,
        processScore: this.processScoreList
      };
      console.log(data);
      scoring(data).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.$message({
            message: "保存成功",
            center: true
          });
        }
      });
    },
    backHome() {
      this.$router.push({
        path: "/home"
      });
    },
    back() {
      this.$router.push({
        name: "personalCenter",
        params: {
          activeName: "second"
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.containers {
  background: url("../../../../assets/image/loginbg.png");
  background-size: 100%;
  background-attachment: fixed;
  min-height: 8.3333rem;
  .square,
  .save {
    position: relative;
    left: 3.7192rem;
    top: -0.3812rem;
    margin-left: 0.1563rem;
    z-index: 99;
    display: inline;
    cursor: pointer;
    img {
      position: relative;
      width: 1.0938rem;
      height: 0.3438rem;
    }

    span {
      position: absolute;
      left: 0.3958rem;
      top: -0.19rem;
      font-size: 0.1042rem;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: rgba(170, 240, 255, 1);
    }
  }

  .save {
    left: 4.6792rem;
  }

  h3 {
    font-size: 0.1563rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(193, 243, 255, 1);
    line-height: 0.1563rem;
    margin-left: 1.675rem;
    background: linear-gradient(#00d6ff 32%, #003a91);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .main-box {
    width: 6.8594rem;
    margin: 0 auto;
    padding: 0.25rem;
    background: url("../../../../assets/image/personnal/reportbg.png") no-repeat;
    box-sizing: border-box;
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
        width: 100%;
        height: auto;
        padding: 0.051rem;
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
        width: 100%;
        height: auto;
        padding: 0 0.151rem;
        box-sizing: border-box;
        border: 0.0052rem solid rgba(11, 97, 178, 1);
        border-radius: 0.1042rem;
        background-color: #012c88;
        opacity: 0.8;

        .progress {
          display: flex;
          justify-content: flex-start;
        }
      }

      .texts-result,
      .score {
        display: flex;
        font-size: 0.125rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(170, 240, 255, 1);
        line-height: 0.2573rem;
        border-bottom: 0.0052rem solid rgba(4, 77, 125, 1);
        margin: 0;
        padding: 0;

        span {
          display: inline-block;
          width: 50%;
          text-align: center;
        }

        .first {
          display: block;
          margin-top: 0.052083rem;
        }

        .totalScore {
          padding-left: 0.490417rem;
        }
      }

      .evaluate-con {
        height: 0.916667rem;
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

      span {
        font-size: 0.1354rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 0.1563rem;
        background: linear-gradient(#00d6ff 32%, #003a91);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .score {
        display: inline-block;
        width: 8% !important;
        text-align: center;
      }
    }
  }
}

.btn {
  width: 1.151rem;
  height: 0.3906rem;
  line-height: 0.3906rem;
  text-align: center;
  margin: 0 auto;
  background: url("../../../../assets/image/index_img/continue.png") no-repeat;
  background-size: contain;
  font-size: 0.125rem;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(40, 158, 255, 1);
  cursor: pointer;
  padding-bottom: 0.1302rem;
}
</style>


<style lang="scss">
.pisdhjfa {
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
    line-height: 0.2573rem;
  }

  .el-table tr {
    height: 0.3073rem;
    color: #00b8e0;
    font-size: 0.1146rem;
    line-height: 0.32573rem;
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
    font-size: 0.114583rem;
    height: 0.225rem;
    border: none;
    background-color: transparent;
    color: #00b8e0;
    z-index: 99;
    line-height: 0.225rem;
    text-align: center;
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
</style>
