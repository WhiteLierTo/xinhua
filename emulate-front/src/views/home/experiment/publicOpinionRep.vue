<template>
  <div class="box">
    <house-pano class="pano-view"></house-pano>
    <common-head class="container">
      <div class="tips" @click="testHandleClick">舆情上报测试题</div>
      <div class="tips release" @click="goOnHandleClick">继续</div>
      <div class="guide">
        <p>操作指引</p>
        <div class="context">1、将本次南京科技大学食品安全舆情进行上报</div>
      </div>
    </common-head>
    <div class="njjcnkj">
      <el-dialog :visible.sync="dialog" :show-close="false" :close-on-click-modal="true">
        <p class="title">食品安全事故上报</p>
        <div class="info">
          <img src="../../../assets/image/experiment/alertbg.png" />
          <div class="info_all">
            <div class="info_com">
              <p class="info_com_title">一、突发事件</p>
              <el-row>
                <el-col :span="12">
                  <div class="t1">事故发生单位：南京科技大学</div>
                </el-col>
                <el-col :span="12">
                  <div class="t1">
                    <span class="t2">地 点</span>：南京市建邺区
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <div class="t1">
                    <span class="t2">发 病 情 况</span>：抽搐、口吐白沫
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="t1"></div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <div class="t1">
                    <span class="t2">发 病 时 间</span>：2020-09-28 12:34
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="t1">
                    <span class="t2">进 食 时 间</span>：2020-09-27 19:36
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <div class="t1">
                    <span class="t2">发 病 人 数</span>：2人
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="t1">
                    <span class="t2">死 亡 人 数</span>：1人
                  </div>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <div class="t1">
                    <span class="t2">诊 疗 情 况</span>：属于食物中毒
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="info_com">
              <p class="info_com_title">二、上报时间</p>
              <el-radio-group v-model="checkedCities">
                <el-radio
                  v-for="city in cities"
                  :label="city"
                  :key="city"
                  @change="handleCheckedCitiesChange($event)"
                >
                  {{
                  city
                  }}
                </el-radio>
              </el-radio-group>
            </div>
            <div class="info_com">
              <p class="info_com_title">三、上报部门</p>
              <el-radio-group v-model="department">
                <el-radio
                  v-for="department in departmentList"
                  :label="department"
                  :key="department"
                >{{ department }}</el-radio>
              </el-radio-group>
            </div>
            <el-row>
              <el-col :span="12">
                <div class="intro_btn not_report" @click="back()">返回</div>
              </el-col>
              <el-col :span="12">
                <div class="intro_btn report" @click="goReport">确认上报</div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-dialog>
    </div>
    <div class="iubji">
      <el-dialog
        :visible.sync="dialogTableVisible"
        :show-close="false"
        :close-on-click-modal="true"
        :modal="false"
      >
        <test-questions :process="2" @dialog-show="dialogShow"></test-questions>
      </el-dialog>
    </div>
  </div>
</template>
<script>
const cityOptions = ["半个小时", "1个小时", "2个小时", "半天", "1天", "2天"];
export default {
  name: "publicOpinionRep",
  components: {
    commonHead: () => import("../../../components/commonHead"),
    testQuestions: () => import("./testQuestions"),
    housePano: () => import("../../../components/pano/house")
  },
  data() {
    return {
      dialog: false,
      dialogTableVisible: false,
      cities: cityOptions,
      checkedCities: [],
      departmentList: [
        "单位主管机构",
        "教育主管单位",
        "医疗卫生机构",
        "当地人民政府",
        "国务院中央机关"
      ],
      department: "",
      time: ""
    };
  },
  mounted() {
    window.opinionRepObj = this;
  },
  methods: {
    // 测试题
    testHandleClick() {
      this.dialogTableVisible = true;
    },
    dialogShow(val) {
      this.dialogTableVisible = val;
    },
    // 继续
    goOnHandleClick() {
      this.dialog = true;
    },
    goReport() {
      if (this.department && this.time) {
        this.$router.push({
          path: "/publicMonitor",
          query: {
            receive: true,
            status: true
          }
        });
        localStorage.setItem("time", this.time);
      } else {
        this.$message({
          message: "请填写上报信息",
          center: true
        });
      }
    },
    back() {
      this.dialog = false;
    },
    handleCheckedCitiesChange(value) {
      this.time = value;
    },
    departmentChange(value) {}
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.box {
  .pano-view {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
  }
  .bg_color {
    background: #1d2088 !important;
    opacity: 0.8;
    z-index: 999;
    width: 100%;
    height: 100%;
  }
  .container {
    z-index: 1;
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
      z-index: 2;
      cursor: pointer;
    }
    .release {
      margin-left: 1.0677rem;
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
    .public {
      width: 3.9583rem;
      height: 2.0052rem;
      background: url("../../../assets/image/experiment/publicbg.png") no-repeat
        center center;
      background-size: 100%;
      margin: 0.9531rem auto 0;
      position: relative;
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
        position: absolute;
        top: 0.7813rem;
        left: 1.5781rem;
      }
    }
  }

  .title {
    font-size: 0.1563rem;
    font-family: Source Han Sans CN;
    font-weight: 600;
    color: rgba(193, 243, 255, 1);
    line-height: 0.1563rem;
    background: linear-gradient(#00d6ff 32%, #003a91);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    position: absolute;
    top: -0.1rem;
    left: 1.7rem;
  }
  .info {
    margin-left: 0.2656rem;
    position: relative;
    img {
      width: 6.8594rem;
    }
    .info_all {
      position: absolute;
      top: 0rem;
      left: 0.25rem;
      .info_com {
        .t1 {
          font-size: 0.1146rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(0, 184, 224, 1);
          margin-left: 0.2813rem;
          margin-top: 0.0333rem;
          .t2 {
            letter-spacing: 0.0179rem;
          }
        }

        .info_com_title {
          font-size: 0.1354rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(170, 240, 255, 1);
          line-height: 0.1875rem;
        }
      }
    }
  }
  .not_report {
    margin-right: 0.6719rem;
    float: right;
  }
  .report {
    margin-left: 0.4219rem;
    float: left;
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
  }
}
</style>
<style lang="scss">
.njjcnkj {
  .el-dialog__wrapper {
    background: url("../../../assets/image/model.png") no-repeat;
    background-size: 100% 100%;
  }
  .el-dialog {
    background: transparent;
    width: 100%;
  }
  .el-dialog__body {
    width: 75%;
    margin: 0 auto;
  }
  .el-radio__inner {
    background: transparent;
    border-radius: 50%;
    width: 0.1016rem;
    height: 0.1016rem;
    border: 0.0052rem solid #00b8e0;
    margin-top: -0.0521rem;
  }
  .el-radio__label {
    color: #00b8e0;
    font-size: 0.1146rem;
  }
  .el-radio__inner::after {
    left: 0.045rem;
    top: 0.045rem;
    border: none;
  }
  .el-radio__inner::after {
    width: 0.0313rem;
    height: 0.0313rem;
  }
  .el-radio-group {
    margin-left: 0.2865rem;
    width: 100%;
  }
}
.iubji {
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