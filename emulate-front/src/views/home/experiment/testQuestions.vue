<template>
  <div class="containers plmnki">
    <div class="center-box">
      <img class="center-img" src="../../../assets/image/index_img/center.png" alt />
      <div class="center-title">
        <div class="title">舆情传播测试题</div>
        <img class="title-img" src="../../../assets/image/index_img/title.png" alt />
      </div>
      <div class="all-questions">
        <div class="questions" v-for="(item,index) in selectionList" :key="index">
          <div
            class="questions-item"
          >[{{item.answerType=== 1 ? '单选' : '多选' }}]{{index+1}}、{{item.libraryName }}</div>
          <div v-if="item.answerType === 1">
            <el-radio-group class="answer" v-model="radioArray[index]">
              <el-row>
                <el-col :span="1">
                  <el-radio
                    v-for="item1 in item.itemList"
                    :label="item1.itemName"
                    :key="item1.itemId"
                    :disabled="disabled"
                  >{{item1.itemName}}</el-radio>
                </el-col>
              </el-row>
            </el-radio-group>
          </div>
          <div v-else>
            <el-checkbox-group class="answer" v-model="radioArray[index]">
              <el-row>
                <el-col :span="1">
                  <el-checkbox
                    v-for="item1 in item.itemList"
                    :label="item1.itemName"
                    :key="item1.itemId"
                    :disabled="disabled"
                  >{{item1.itemName}}</el-checkbox>
                </el-col>
              </el-row>
            </el-checkbox-group>
          </div>
          <div class="right-answer" v-if="isAnswer">正确答案：{{item.answer}}</div>
        </div>
      </div>
      <div class="btn">
        <div class="intro_btn" @click="backHandleClick">返回</div>
        <div class="intro_btn" @click="saveHandleClick" v-show="showBtn">保存</div>
        <!-- <div class="intro_btn" @click="saveHandleClick">保存</div> -->
        <div class="intro_btn" @click="seeHandleClick" v-show="!showBtn">查看答案</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getProcessList, subProcess } from "../../../api/test";

export default {
  name: "publicOpinionRep",
  components: {
    commonHead: () => import("../../../components/commonHead")
  },
  props: ["process"],
  data() {
    return {
      selectionList: [], //题目数组
      checkBoxVal: [], //多选model
      radioArray: [[], [], []], //单选model
      userId: JSON.parse(localStorage.getItem("userInfo")).userId,
      isAnswer: false,
      checkboxArr: [], //多选
      showBtn: true,
      disabled: false
    };
  },
  mounted() {
    const process = this.process;
    getProcessList(this.userId, process)
      .then(res => {
        this.selectionList = res.data.selectionList;
        if (res.data.isDone === 1) {
          this.showBtn = false;
          this.disabled = true;

          this.radioArray = this.selectionList.map(s => {
            if (s.answerType === 1) {
              return s.itemList.find(item => item.itemCode === s.userAnswer)
                .itemName;
            } else if (s.answerType === 2) {
              let answerList = s.userAnswer.split("");
              return s.itemList
                .filter(item => answerList.includes(item.itemCode))
                .map(d => d.itemName);
            }
          });
        }
      })
      .catch(err => {});
  },
  methods: {
    // 返回
    backHandleClick() {
      this.$emit("dialog-show", false);
    },
    // 保存
    saveHandleClick() {
      let wordList = ["A", "B", "C", "D", "E", "F", "E"];
      let resList = JSON.parse(JSON.stringify(this.radioArray));
      resList = resList.map((item, index) => {
        let libraryId = this.selectionList[index].libraryId;
        if (Array.isArray(item)) {
          let resList2 = item.map(it => it.substr(0, 1));
          resList2.sort((x, y) => wordList.indexOf(x) - wordList.indexOf(y));
          return {
            libraryId,
            answer: resList2.join("")
          };
        } else {
          return {
            libraryId,
            answer: item.substr(0, 1)
          };
        }
      });
      let flag = true;
      let target = resList.map(v => {
        if (v.answer) {
          return true;
        } else {
          return false;
        }
      });
      if (target.includes(false)) {
        flag = false;
      } else {
        flag = true;
      }

      if (!flag) {
        this.$message({
          message: "部分题目未完成",
          center: true
        });
      } else {
        subProcess(this.userId, resList)
          .then(res => {
            this.$message({
              message: "保存成功",
              center: true
            });
            this.disabled = true;
            this.showBtn = false;
          })
          .catch(err => {});
      }
    },
    // 查看答案
    seeHandleClick() {
      this.isAnswer = true;
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.containers {
  position: relative;
  z-index: 1;

  .center-box {
    position: relative;
    width: 6.3646rem;
    height: 3.3281rem;
    margin: 0 auto;
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
        background: linear-gradient(#00d6ff 52%, #003a91);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .title-img {
        width: 5.3229rem;
        margin: 0 auto;
      }
    }

    .all-questions {
      position: absolute;
      left: 0.75rem;
      top: 0.7708rem;
      width: 5.1927rem;
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
      overflow: auto;

      .questions {
        .answer {
          display: flex;
          justify-content: flex-start;
          width: 70%;
          margin: 0.0625rem 0 0 0;
        }
      }

      .right-answer {
        font-size: 0.1146rem;
        font-weight: 400;
        color: rgba(233, 85, 20, 1);
        line-height: 0.1875rem;
        margin-bottom: 0.0521rem;
      }
    }

    .all-questions::-webkit-scrollbar {
      border-radius: 0.0521rem;
      width: 0.0417rem;
      background-color: #233865;
    }

    .all-questions::-webkit-scrollbar-thumb {
      height: 0.0417rem;
      border-radius: 0.0521rem;
      -webkit-box-shadow: inset 0 0 0.0313rem rgba(0, 0, 0, 0.3);
      background-color: #289eff;
    }
  }

  .btn {
    display: flex;
    justify-content: space-around;
    position: absolute;
    left: 1.174rem;
    bottom: 0.2083rem;
    width: 60%;

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
      border: none;
    }
  }
}
</style>


<style lang="scss">
.plmnki {
  .el-radio__label {
    margin-right: 0.5208rem;
    color: #00b8e0;
    font-size: 0.1146rem;
  }

  .el-radio__input {
    vertical-align: middle;
    height: 0.203125rem !important;
    margin-bottom: 0.0427rem;
  }

  .el-radio__inner {
    border: 0.0052rem solid #00b8e0;
    margin-top: 0.047083rem;
  }

  .el-radio__input.is-checked + .el-radio__label {
    color: #00b8e0;
  }

  .el-radio__input.is-checked .el-radio__inner {
    background-color: #00b8e0;
  }
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #00b8e0;
  }
  .el-radio__input.is-checked .el-radio__inner:after {
    width: 0.0313rem;
    height: 0.0313rem;
  }

  .el-checkbox__inner {
    background: transparent;
    border-radius: 50%;
    width: 0.1016rem;
    height: 0.1016rem;
    border: 0.0052rem solid #00b8e0;
    margin-top: -0.0521rem;
  }

  .el-checkbox__label {
    color: #00b8e0;
    font-size: 0.1146rem;
  }

  .el-checkbox__inner::after {
    left: 0.0365rem;
    top: 0.0208rem;
  }

  .el-checkbox {
    margin-right: 0.65rem;
    width: 40%;
  }

  .el-radio {
    width: 40%;
  }

  .el-radio__inner {
    width: 0.1042rem;
    height: 0.1042rem;
    background: transparent;
  }
  .el-radio__input.is-disabled + span.el-radio__label {
    color: #00b8e0;
  }
  .el-checkbox__input.is-disabled + span.el-checkbox__label {
    color: #00b8e0;
  }
  .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
    background-color: #00b8e0;
  }
}
</style>
