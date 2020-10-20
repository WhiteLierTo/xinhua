<template>
  <common-box class="container gasodaijnn">
    <div class="center-box">
      <div class="center-title">
        <div class="zhuye" @click="back()">
          <img src="../../../assets/image/index_img/back.png" alt />
          <span>退出测试</span>
        </div>
        <div class="title">“公共卫生安全舆情与风险监管”测试</div>
        <img class="title-img" src="../../../assets/image/index_img/title.png" alt />
        <div class="content">
          <div class="content-word">
            <p class="purpose">(一)单项选择题</p>
            <div class="questions" v-for="(item,index) in singleSelectionList" :key="item.libraryName">
              <div class="questions-item">{{index+1}}、{{item.libraryName}}</div>
              <el-radio-group v-model="item.libraryId" @change="handleCheckedChange(item.libraryId,$event)">

                <el-row>
                  <el-col :span="24">
                    <el-radio v-for="temp in item.itemList" :label="temp.itemName" :key="`${temp.itemName+temp.itemId}`">{{temp.itemName}}
                    </el-radio>
                  </el-col>
                </el-row>

              </el-radio-group>
              <div class="right-answer" v-if="isAnswer">正确答案：{{item.answer}}</div>
            </div>

            <p class="purpose">(二)多项选择题</p>
            <div class="questions" v-for="(item1,index1) in multipleSelectionList" :key="index1">
              <div class="questions-item">{{index1+1}}、{{item1.libraryName }}</div>
              <el-checkbox-group class="answer" v-model="checkBoxVal" @change="handleCheckedChange(item1.libraryId,$event)">
                <el-row>
                  <el-col :span="1">
                    <el-checkbox v-for="temp1 in item1.itemList" :label="temp1.itemName" :key="`${temp1.itemName+temp1.itemId}`">{{temp1.itemName}}
                    </el-checkbox>
                  </el-col>
                </el-row>
              </el-checkbox-group>
              <div class="right-answer" v-if="isAnswer">正确答案：{{item1.answer}}</div>
            </div>
          </div>
        </div>
        <div class="bottom-btn">
          <div class="btn" @click="submit()">完成测试，提交</div>
        </div>
      </div>
    </div>
  </common-box>
</template>

<script>
import commonBox from "../../../components/commonBox";
import { getPracticeList, subPractice } from "../../../api/test";

export default {
  components: {
    commonBox
  },
  name: "Login",
  data() {
    return {
      singleSelectionList: [],
      multipleSelectionList: [],
      radio: "",
      checkBoxVal: [],
      isAnswer: false
    };
  },
  mounted() {
    // 初始化习题
    getPracticeList()
      .then(res => {
        const data = res.data;
        this.singleSelectionList = data.singleSelectionList; //单选
        this.multipleSelectionList = data.multipleSelectionList; //多选
      })
      .catch(err => {
      });
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    submit() {
      const userId = JSON.parse(localStorage.getItem("userInfo")).userId;
      subPractice(userId)
        .then(res => {
          this.$message({
            message: "提交成功",
            center: true
          });
          this.isAnswer = true;

        })
        .catch(err => {
        });
    },
    handleCheckedChange(id, e) {
      console.log(id);
      console.log("选中:" + e);
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
    height: 3.7396rem;
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
          width: 0.1302rem;
          height: 0.1354rem;
        }

        span {
          position: absolute;
          top: -0.0156rem;
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
        overflow: auto;
        .purpose {
          margin: 0.0521rem 0;
          font-size: 0.1563rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(170, 240, 255, 1);
        }

        .questions {
          margin-bottom: 0.1042rem;

          .answer {
            display: flex;
            justify-content: flex-start;
            width: 70%;
          }
        }

        .right-answer {
          font-size: 0.1146rem;
          font-weight: 400;
          color: rgba(233, 85, 20, 1);
          line-height: 0.1875rem;
          margin-bottom: 0.0208rem;
        }
      }
    }

    .bottom-btn {
      display: flex;
      justify-content: space-around;
      padding: 0 25%;

      .btn {
        width: 1.151rem;
        height: 0.3906rem;
        line-height: 0.3906rem;
        text-align: center;
        margin: 0 auto;
        margin-top: 0.1875rem;
        background: url("../../../assets/image/index_img/continue.png")
          no-repeat;
        background-size: contain;
        font-size: 0.12rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(40, 158, 255, 1);
        cursor: pointer;
      }
    }
  }
}
</style>

<style lang="scss">
.gasodaijnn {
  .el-radio__label {
    margin-right: 0.5208rem;
    color: #00b8e0;
    font-size: 0.1146rem;
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
    // margin-left: 0.2865rem;
  }

  .el-radio__inner {
    width: 0.1042rem;
    height: 0.1042rem;
    background: transparent;
    border: 0.0052rem solid #00b8e0;
    margin-top: 0.025083rem;
  }

  .el-radio__inner::after {
    width: 0.0417rem;
    height: 0.0417rem;
  }

  .el-radio {
    // margin-left: 0.2865rem;
    margin-bottom: 0.026rem;
    width: 40%;
  }

  .el-radio__input {
    height: 0.203125rem !important;
  }
  .content-word::-webkit-scrollbar {
    border-radius: 0.0521rem;
    width: 0.0417rem;
    height: 0.0417rem;
    background-color: #233865;
  }

  .content-word::-webkit-scrollbar-thumb {
    height: 0.0417rem;
    border-radius: 0.0521rem;
    -webkit-box-shadow: inset 0 0 0.2813rem rgba(0, 0, 0, 0.3);
    background-color: #289eff;
  }

  .content-word::-webkit-scrollbar-corner {
    background: #233865;
  }
}
</style>
