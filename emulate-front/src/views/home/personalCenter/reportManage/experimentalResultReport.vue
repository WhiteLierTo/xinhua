<template>
  <common-header class="container hasuigfhuashdhasdias">
    <!-- <div class="square">
      <img src="../../../../assets/image/square.png" alt />
      <span>导出</span>
    </div>-->
    <h3>公共卫生安全舆情与风险监管平台实验结果报告</h3>
    <div class="main-box">
      <div class="item">
        <p class="title">个人中心</p>
        <el-form ref="form" :model="personalInfo" label-width="auto" :inline="true">
          <el-form-item label="姓名：">
            <el-input v-model="personalInfo.userName" readonly></el-input>
          </el-form-item>
          <el-form-item label="性别：">
            <el-input v-model="personalInfo.userSex" readonly></el-input>
          </el-form-item>
          <el-form-item label="邮箱：">
            <el-input v-model="personalInfo.email" readonly></el-input>
          </el-form-item>
          <el-form-item label="学号：">
            <el-input v-model="personalInfo.studentId" readonly></el-input>
          </el-form-item>
          <el-form-item label="学校：">
            <el-input v-model="personalInfo.school" readonly></el-input>
          </el-form-item>
          <el-form-item label="专业：">
            <el-input v-model="personalInfo.profession" readonly></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="item">
        <p class="title">实验过程</p>
        <div class="questions-item" v-show="this.libraryList">
          <div class="all-questions" v-for="(item,index ) in libraryList" :key="item.libraryName">
            <div class="question">{{index+1}}、{{item.libraryName}}</div>
            <div class="answer">
              <p v-for="item1 in item.itemList" :key="item1.itemCode">{{item1.itemName}}</p>
            </div>
            <div class="right-answer">正确答案：{{item.answer}}</div>
            <div class="right-answer">您的答案：{{item.userAnswer}}</div>
          </div>
        </div>
      </div>
      <div class="item">
        <p class="title">实验报告</p>
        <div class="report-item">
          <div class="report-title">实验目的和要求</div>
          <div class="report-con">
            <p>（1）掌握食品安全管理与舆情知识：包括食品科学知识练习、食品安全事件标准判断、食品安全信息报告流程、人类心理行为知识与网络舆情传播知识的掌握、舆情地图的熟悉等；</p>
            <p>（2）熟悉食品安全事件的应急处理方法：包括食品安全事件的随机冲击、食品安全事故的信息收集与传播、食品安全事故的讨论与质疑、人物角色的选取与互动、食品安全事故信息的确认、恶意信息传播的制止等。</p>
          </div>
        </div>
        <div class="report-item">
          <div class="report-title">实验分析</div>

          <p class="texts-result">
            <span>第一部分理论测试</span>
            <span>{{isTheory}}</span>
          </p>
          <p class="texts-result">
            <span>第二部分理论测试</span>
            <span>{{isProcess}}</span>
          </p>
          <div class="con">
            <el-table :data="processList1" style="410px">
              <el-table-column prop="processName" label="步骤流程" align="center" width="auto"></el-table-column>
              <el-table-column prop="processScore" label="结果评价" align="center" width="auto"></el-table-column>
            </el-table>
            <el-table :data="processList2" style="width: 410px;">
              <el-table-column prop="processName" label="步骤流程" align="center" width="auto"></el-table-column>
              <el-table-column prop="processScore" label="结果评价" align="center" width="auto"></el-table-column>
            </el-table>
            <el-table :data="processList3" style="width: 410px;">
              <el-table-column prop="processName" label="步骤流程" align="center" width="auto"></el-table-column>
              <el-table-column prop="processScore" label="结果评价" align="center" width="auto"></el-table-column>
            </el-table>
          </div>
          <div class="scode">
            <el-row>
              <el-col :span="12">
                <span>综合得分</span>
              </el-col>
              <el-col :span="12">
                <span>{{comprehensiveScore}}</span>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="report-item">
          <div class="report-title">讨论和分析</div>
          <div class="report-con">{{discussContent}}</div>
        </div>
        <div class="report-item">
          <div class="report-title">总评成绩：{{score}} 分</div>
        </div>
        <div class="report-item">
          <div class="report-title">实验评价</div>
          <div class="report-con">{{content}}</div>
        </div>
      </div>
    </div>
    <div class="btn" @click="back()">返回上一页</div>
  </common-header>
</template>

<script>
import commonHeader from "../../../../components/commonHeader";
import { getReportInfo } from "../../../../api/progress";

export default {
  components: {
    commonHeader
  },
  name: "index",
  data() {
    return {
      //个人中心
      personalInfo: {},
      discussContent: "111", //讨论和分析
      isTheory: "", //理论测试通过与否
      isProcess: "", //实践操作通过与否
      score: "", //总评分
      content: " ", //实验评价
      comprehensiveScore: " ", //综合得分
      processList1: [{}, {}, {}, {}],
      processList2: [{}, {}, {}, {}],
      processList3: [{}, {}, {}, {}],
      //   题目
      libraryList: []
    };
  },
  mounted() {
    // console.log(this.$route.query)
    this.personalInfo = {
      userName: this.$route.query.userName,
      userSex: this.$route.query.userSex,
      email: this.$route.query.email,
      studentId: this.$route.query.studentId,
      school: this.$route.query.school,
      profession: this.$route.query.profession
    };
    // 获取报告信息
    this.getReportInfo(this.$route.query.userId);
  },
  methods: {
    //  查看报告
    getReportInfo(data) {
      getReportInfo(data)
        .then(res => {
          //答题列表
          this.libraryList = res.data.libraryList;
          console.log(this.libraryList);
          console.log(res);
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
          // 综合得分
          this.comprehensiveScore = res.data.comprehensiveScore;
          this.score = res.data.score;
          //   // 实验评价
          this.content = res.data.teachContent;
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
.container {
  position: relative;
  .square {
    position: fixed;
    left: 3.8192rem;
    top: 0.3388rem;
    margin-right: 0.260417rem;
    z-index: 99;
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
    margin-left: 1.775rem;
    margin-top: 0.941667rem;
    background: linear-gradient(#00d6ff 32%, #003a91);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .main-box {
    width: 6.8594rem;
    height: auto;
    margin: 0 auto;
    padding: 0.1667rem;
    box-sizing: border-box;
    background: url("../../../../assets/image/personnal/reportbg.png");
    background-size: 100% 100%;

    .item {
      position: relative;

      .title {
        font-size: 0.1354rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(193, 243, 255, 1);
        line-height: 0.2083rem;
        margin-left: 0.0719rem;
      }

      .title:before {
        content: "";
        display: inline-block;
        width: 0.0208rem;
        height: 0.1406rem;
        vertical-align: middle;
        background: rgba(40, 158, 255, 1);
        margin-right: 0.125rem;
      }

      .report-title {
        font-size: 0.1146rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(0, 184, 224, 1);
        line-height: 0.2083rem;
        margin-left: 0.1885rem;
        margin-top: 0.1094rem;
      }

      .report-con {
        width: 6.1875rem;
        height: auto;
        min-height: 0.9167rem;
        padding: 0.0521rem;
        margin: 0 auto;
        // box-sizing: border-box;
        border: 0.0052rem solid rgba(11, 97, 178, 1);
        border-radius: 0.1042rem;
        background-color: #012c88;
        opacity: 0.8;
        font-size: 0.1146rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #00b8e0;
        line-height: 0.1875rem;
        text-indent: 2em;
      }

      .con {
        display: flex;
        justify-content: flex-start;
        width: 6.4063rem;
        height: auto;
        padding: 0 0.151rem;
        box-sizing: border-box;
        border: 0.0052rem solid rgba(11, 97, 178, 1);
        border-bottom: none;
        border-top-left-radius: 0.1042rem;
        border-top-right-radius: 0.1042rem;
        background-color: #012c88;
        opacity: 0.8;
      }
      .scode {
        width: 98%;
        height: 0.4167rem;
        line-height: 0.4167rem;
        border-bottom-left-radius: 0.1042rem;
        border-bottom-right-radius: 0.1042rem;
        border: 0.0052rem solid rgba(11, 97, 178, 1);
        border-top: none;
        background-color: #012c88;
        opacity: 0.8;
        text-align: center;
        span {
          font-size: 0.125rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(170, 240, 255, 1);
        }
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
    }

    .questions-item {
      position: relative;
      width: 6.1927rem;
      height: 1.776rem;
      resize: none;
      outline: none;
      overflow-y: scroll;

      .title {
        font-size: 0.1354rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(193, 243, 255, 1);
        line-height: 0.2083rem;
        margin-left: 0.0719rem;
      }

      .title:before {
        content: "";
        display: inline-block;
        width: 0.0208rem;
        height: 0.1406rem;
        vertical-align: middle;
        background: rgba(40, 158, 255, 1);
        margin-right: 0.125rem;
      }

      .question {
        font-size: 0.1146rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(0, 184, 224, 1);
        line-height: 0.2083rem;
        margin-left: 0.1885rem;
      }

      .answer {
        // display: flex;
        width: 85%;
        // justify-content: space-between;
        font-size: 0.1146rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(0, 184, 224, 1);
        line-height: 0.2083rem;
        margin-left: 0.1885rem;
      }

      .right-answer {
        font-size: 0.1146rem;
        font-weight: 400;
        color: rgba(233, 85, 20, 1);
        line-height: 0.1875rem;
        margin-bottom: 0.0208rem;
        margin-left: 0.1885rem;
      }
    }

    .questions-item::-webkit-scrollbar {
      border-radius: 0.0521rem;
      width: 0.0417rem;
      background-color: #233865;
    }

    .questions-item::-webkit-scrollbar-thumb {
      height: 0.0417rem;
      border-radius: 0.0521rem;
      -webkit-box-shadow: inset 0 0 0.0313rem rgba(0, 0, 0, 0.3);
      background-color: #289eff;
    }
  }
}

.btn {
  width: 1.151rem;
  height: 0.3906rem;
  line-height: 0.3906rem;
  text-align: center;
  margin: 0.1875rem auto;
  background: url("../../../../assets/image/index_img/continue.png") no-repeat;
  background-size: contain;
  font-size: 0.125rem;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(40, 158, 255, 1);
  cursor: pointer;
}

.el-form {
  margin-left: 0.205625rem;
  overflow: hidden;
}
</style>


<style lang="scss">
.hasuigfhuashdhasdias {
  .el-form-item {
    height: 0.2083rem;
    margin: 0;
    margin-bottom: 0.1563rem;
    margin-right: 0.1563rem;
    line-height: 0.2083rem;
    word-break: keep-all;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    float: left;
  }

  //改变placeholder颜色
  input::-webkit-input-placeholder {
    color: #126476;
  }

  input::-moz-input-placeholder {
    color: #126476;
  }

  input::-ms-input-placeholder {
    color: #126476;
  }

  .el-form-item__content {
    position: relative;
  }

  .el-input__icon {
    position: absolute;
    right: -0.841667rem;
    top: 0.084167rem;
    color: rgba(3, 252, 255, 1);
  }

  .el-form-item {
    /*display: inline-block;*/
    /*margin-right: 0.260417rem !important;*/
    /*line-height: 0.104167rem;*/
  }

  //改变placeholder颜色
  //改变placeholder颜色
  input::-webkit-input-placeholder {
    color: #126476;
  }

  input::-moz-input-placeholder {
    color: #126476;
  }

  input::-ms-input-placeholder {
    color: #126476;
  }

  .el-input {
    width: 1.020833rem;
    height: 0.209375rem;
    font-size: 0.114583rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(0, 184, 224, 1);
    line-height: 0.208333rem;
  }

  .el-input__inner {
    width: auto;
    height: 0.238333rem;
    background-color: transparent;
    color: #00b8e0;
    border: none;
    padding-bottom: 0.052083rem;
  }

  .el-form-item__label {
    height: 0.208333rem;
    text-align: left;
    font-size: 0.114583rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(0, 184, 224, 1);
    width: 0.420833rem !important;
    line-height: 0.208333rem;
  }

  .el-icon-arrow-up:before {
    content: "";
    position: absolute;
    right: -0.9917rem !important;
    top: 0.13167rem;
    color: rgba(3, 252, 255, 1);
    font-size: 0.104167rem;
  }

  .el-icon-arrow-up:after {
    content: "";
    position: absolute;
    right: -1.9917rem !important;
    top: 0.13167rem;
    color: rgba(3, 252, 255, 1);
    font-size: 0.104167rem;
  }

  .el-select .el-input.is-focus .el-input__inner,
  .el-select .el-input__inner:focus {
    border-color: rgba(0, 184, 224, 1);
  }

  .el-select-dropdown,
  .el-select-dropdown__item {
    background-color: transparent !important;
    line-height: 0.208333rem;
  }

  deep.el-select-dropdown__item.hover {
    background-color: transparent !important;
  }

  .el-select-dropdown__item.selected {
    background: transparent !important;
  }

  .el-table {
    margin-top: 0.1042rem;
    background-color: transparent !important;
  }

  .el-table th,
  .el-table tr {
    padding: 0.0521rem 0;
    background-color: transparent !important;
    border-bottom: 0.0052rem solid rgba(4, 77, 125, 1);
    font-size: 0.1146rem;
  }

  .el-table .cell {
    height: 0.216667rem;
    line-height: 0.216667rem;
  }

  .el-table th {
    color: #aaf0ff;
  }

  .el-table tr {
    color: #00b8e0;
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

  .el-button {
    background-color: transparent;
    border: none;
    font-size: 0.1146rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
