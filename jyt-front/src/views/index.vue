<template>
  <div class="dashboard-editor-container">
    <el-row style="margin-bottom: 15px;">
      <el-col :span="9">
        <div class="screening-main" style="margin-right: 15px;">
          <div class="listtitle">
            <i></i>
            <div class="txt">舆情统计</div>
          </div>
          <ul class="dqdb-list">
            <li>
              <div class="left">{{ pendNum }}</div>
              <div class="center">
                <div class="c-top">
                  待处理
                  <span>任务量</span>
                </div>
                <div class="c-bottom">
                  占总任务量
                  <span>{{ pendPer }}%</span>
                </div>
              </div>
              <div class="right">
                <pie-chart
                  height="100%"
                  :showValue="pendPer"
                  :otherValue="100 - pendPer"
                  :showColor="'#DD021B'"
                  v-if="showPie"
                />
              </div>
            </li>
            <li>
              <div class="left">{{ processNum }}</div>
              <div class="center">
                <div class="c-top">
                  流转中
                  <span>任务量</span>
                </div>
                <div class="c-bottom">
                  占总任务量
                  <span>{{ processPer }}%</span>
                </div>
              </div>
              <div class="right">
                <pie-chart
                  height="100%"
                  :showValue="processPer"
                  :otherValue="100 - processPer"
                  :showColor="'#EB7B16'"
                  v-if="showPie"
                />
              </div>
            </li>
            <li>
              <div class="left">{{ draftNum }}</div>
              <div class="center">
                <div class="c-top">
                  草稿箱
                  <span>任务量</span>
                </div>
                <div class="c-bottom">
                  占总任务量
                  <span>{{ draftPer }}%</span>
                </div>
              </div>
              <div class="right">
                <pie-chart
                  height="100%"
                  :showValue="draftPer"
                  :otherValue="100 - draftPer"
                  :showColor="'#1DA362'"
                  v-if="showPie"
                />
              </div>
            </li>
            <li>
              <div class="zrwltj">{{ totalNum }}</div>
              <div class="zrwltitle">总任务量</div>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="15">
        <div class="screening-main">
          <div class="listtitle">
            <i></i>
            <div class="txt">待处理趋势分布</div>
          </div>
          <div style="width: 100%; height: 100%;">
            <line-chart
              :lineDataX="lineDataX"
              :lineDataY="lineDataY"
              v-if="showLine"
            />
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="renwu-box">
      <el-col :span="12">
        <div
          class="screening-main screening-bottom"
          style="margin-right: 15px;"
        >
          <div class="listtitle">
            <i></i>
            <div class="txt">已超期任务</div>
          </div>
          <div>
            <ul class="renwulist">
              <li v-if="overDue.length > 0">
                <el-row
                  class="ycqlist"
                  :gutter="18"
                  type="flex"
                  align="middle"
                  v-for="(item, index) in overDue"
                  :key="index"
                >
                  <el-col :span="7">
                    <div class="time">{{ item.processCreateTime }}</div>
                  </el-col>
                  <el-col :span="13">
                    <div class="text">
                      <router-link
                        :to="'/waitDetail/' + item.orderId + '/2/2/0'"
                        >{{ item.artTitle }}</router-link
                      >
                    </div>
                  </el-col>
                  <el-col :span="2">
                    <el-button
                      class="duban"
                      plain
                      @click="
                        handlewarnbox(item.processId, 2, item.operatorDeptId)
                      "
                      >督办</el-button
                    >
                  </el-col>
                </el-row>
              </li>
              <li v-else>
                <el-row class="zwsj-txt" :gutter="18">暂无数据</el-row>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="screening-main screening-bottom">
          <div class="listtitle">
            <i></i>
            <div class="txt">即将超期任务</div>
          </div>
          <div>
            <ul class="renwulist">
              <li v-if="willDue.length > 0">
                <el-row
                  class="ycqlist"
                  :gutter="18"
                  v-for="(item, index) in willDue"
                  :key="index"
                >
                  <el-col :span="7">
                    <div class="time">{{ item.processCreateTime }}</div>
                  </el-col>
                  <el-col :span="13">
                    <div class="text">
                      <router-link
                        :to="'/waitDetail/' + item.orderId + '/2/2/0'"
                        >{{ item.artTitle }}</router-link
                      >
                    </div>
                  </el-col>
                  <el-col :span="2">
                    <el-button
                      class="cuiban"
                      plain
                      @click="
                        handlewarnbox(item.processId, 1, item.operatorDeptId)
                      "
                      >催办</el-button
                    >
                  </el-col>
                </el-row>
              </li>
              <li v-else>
                <el-row class="zwsj-txt" :gutter="18">暂无数据</el-row>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 催办督办弹出框 -->
    <el-dialog
      :title="warnTitle"
      :visible.sync="dialogVisible"
      width="38%"
      :before-close="handleClose"
    >
      <el-input
        type="textarea"
        v-model="warnparams.warnContent"
        placeholder="在这里填写意见"
        :autosize="{ minRows: 5, maxRows: 100 }"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handlewarn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getStatis,
  getTrend,
  getTimeLimitList,
  opinionwarn
} from "@/api/opinion/data";
import LineChart from "./dashboard/LineChart.vue";
import PieChart from "./dashboard/PieChart.vue";

export default {
  name: "Index",
  components: {
    LineChart,
    PieChart
  },
  data() {
    return {
      lineDataX: [],
      lineDataY: [],
      overDue: [],
      willDue: [],
      totalNum: 0,
      totalPer: 0,
      pendNum: 0,
      pendPer: 0,
      processNum: 0,
      processPer: 0,
      draftNum: 0,
      draftPer: 0,
      showPie: false,
      showLine: false,
      dialogVisible: false,
      warnTitle: "",
      warnparams: {
        processId: null,
        warnType: null,
        warnDeptId: null,
        warnContent: ""
      }
    };
  },
  created() {
    this.getStatis();
    this.initGeneralLine();
    this.showWarn();
  },
  methods: {
    getStatis() {
      getStatis().then(res => {
        this.totalNum = res.data.totalNum;
        this.pendNum = res.data.pendNum;
        this.pendPer =
          this.pendNum == 0
            ? 0
            : parseFloat(((this.pendNum / this.totalNum) * 100).toFixed(1));
        this.processNum = res.data.processNum;
        this.processPer =
          this.processNum == 0
            ? 0
            : parseFloat(((this.processNum / this.totalNum) * 100).toFixed(1));
        this.draftNum = res.data.draftNum;
        this.draftPer =
          this.draftNum == 0
            ? 0
            : parseFloat((100 - this.pendPer - this.processPer).toFixed(1));
        this.showPie = true;
      });
    },
    initGeneralLine() {
      var that = this;
      getTrend().then(res => {
        var data = res.data;
        for (var i = 0; i < data.length; i++) {
          that.lineDataX.push(data[i].createTime);
          that.lineDataY.push(data[i].pendNum);
        }
        that.showLine = true;
      });
    },
    showWarn() {
      getTimeLimitList().then(res => {
        const data = res.data;
        const len = data.length;
        for (var i = 0; i < len; i++) {
          if (data[i].timeStatus == 2) {
            this.overDue.push(data[i]);
          } else if (data[i].timeStatus == 1) {
            this.willDue.push(data[i]);
          }
        }
      });
    },
    handlewarnbox(processId, status, deptId) {
      this.dialogVisible = !this.dialogVisible;
      this.warnTitle = status == 1 ? "催办" : "督办";
      this.warnparams.processId = processId;
      this.warnparams.warnType = status;
      this.warnparams.warnDeptId = deptId;
      this.warnparams.warnContent = "";
    },
    handleClose() {
      this.dialogVisible = !this.dialogVisible;
      this.warnparams.warnContent = "";
    },
    handlewarn() {
      this.$confirm("确认是否进行" + this.warnTitle + "？", this.warnTitle, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          opinionwarn(this.warnparams)
            .then(res => {
              this.dialogVisible = !this.dialogVisible;
              this.warnparams.warnContent = "";
              if (res.code == 200) {
                this.$message.success(this.warnTitle + "成功");
              }
            })
            .catch(() => {
              this.dialogVisible = !this.dialogVisible;
              this.warnparams.warnContent = "";
              this.$$message.error(this.warnTitle + "失败");
            });
        })
        .catch(() => {
          this.dialogVisible = !this.dialogVisible;
          this.warnparams.warnContent = "";
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 20px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
.zwsj-txt {
  text-align: center;
  line-height: 300px;
}
.listtitle {
  margin-top: 15px;
  .txt {
    font-size: 16px;
    color: #333;
    font-weight: 600;
    display: inline-block;
    vertical-align: middle;
  }
  i {
    display: inline-block;
    width: 4px;
    height: 20px;
    background: #2d8cf0;
    vertical-align: middle;
    margin-right: 15px;
    margin-left: 15px;
  }
}
.screening-main {
  background: #fff;
  height: 410px;
  padding: 10px;
}
.screening-bottom {
  min-height: 560px;
}
.dqdb-list {
  padding: 0 30px;
  li {
    padding-top: 24px;
    border-bottom: 1px solid #eef0f9;
    &:nth-child(2) {
      .left {
        color: #fe931f;
      }
    }
    &:nth-child(3) {
      .left {
        color: #1bc91b;
      }
    }
    &:last-child {
      border-bottom: none;
    }
    .zrwltitle,
    .zrwltj {
      float: right;
      height: 60px;
      line-height: 30px;
    }
    .zrwltitle {
      font-size: 16px;
      color: #5c5c5c;
      margin-right: 26px;
    }
    .zrwltj {
      font-size: 40px;
      color: #333;
      font-weight: 600;
    }
    .left {
      height: 73px;
      line-height: 73px;
      text-align: left;
      font-size: 40px;
      color: #eb4339;
      font-weight: 600;
      width: 20%;
      display: inline-block;
      vertical-align: middle;
    }
    .center {
      width: 49%;
      display: inline-block;
      vertical-align: middle;
      margin-left: 30px;
      .c-top {
        font-size: 20px;
        color: #262626;
        font-weight: 600;
        margin-bottom: 9px;
        span {
          font-weight: normal;
          padding-left: 10px;
        }
      }
      .c-bottom {
        font-size: 14px;
        color: #8c8c8c;
        span {
          padding-left: 10px;
        }
      }
    }
    .right {
      height: 68px;
      width: 68px;
      float: right;
    }
  }
}
.qsfb-box {
  height: 435px;
}
.renwu-box {
  .screening-main {
    .renwulist {
      padding: 0 25px;
      height: 480px;
      overflow: auto;
      li {
        padding: 6px 0;
        .time {
          font-size: 14px;
          color: #999999;
          margin-top: 6px;
          width: 100%;
        }
        .text {
          font-size: 14px;
          color: #4383e4;
          margin-top: 6px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 100%;
        }
        .text:hover {
          color: #2d8cf0;
          text-decoration: underline;
          cursor: pointer;
        }
        .right-box {
          overflow: hidden;
          span {
            font-size: 14px;
            color: #4383e4;
            display: inline-block;
            vertical-align: middle;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 85%;
            margin-top: 6px;
          }
          .ivu-btn {
            float: right;
            border-radius: 3px;
          }
        }
        .duban {
          color: #eb7b16;
          border-color: #eb7b16;
          &:hover {
            color: #ffffff;
            border-color: #eb7b16;
            background-color: #eb7b16;
          }
          &:focus {
            color: #ffffff;
            border-color: #eb7b16;
            background-color: #eb7b16;
          }
        }
        .cuiban {
          color: #4383e4;
          border-color: #4383e4;
          &:hover {
            color: #ffffff;
            border-color: #4383e4;
            background-color: #4383e4;
          }
          &:focus {
            color: #ffffff;
            border-color: #4383e4;
            background-color: #4383e4;
          }
        }
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
.renwulist::-webkit-scrollbar-track {
  background-color: rgba(241, 241, 241, 0.637);
}
/*定义滚动条高宽及背景*/
.renwulist::-webkit-scrollbar {
  width: 4px;
  background-color: rgba(241, 241, 241, 0.637);
}
/*定义滚动条*/
.renwulist::-webkit-scrollbar-thumb {
  background-color: rgba(193, 193, 193, 0.3);
  border-radius: 2px;
}
.ycqlist {
  margin-bottom: 6px;
}
.dbtxmain {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  .dbtxbox {
    background: #fff;
    border-radius: 3px;
    margin: auto;
    padding: 40px;
    .topbox {
      overflow: hidden;
      border: 1px solid #e8e8e8;
      border-radius: 3px;
      width: 400px;
      .titlebox {
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 15px;
        color: #5d5d5d;
        border-bottom: 1px solid #e8e8e8;
      }
    }
  }
}
.topbox .btmbtn {
  text-align: center;
  padding: 20px 0;
  border-top: 1px solid #e8e8e8;
}
</style>
