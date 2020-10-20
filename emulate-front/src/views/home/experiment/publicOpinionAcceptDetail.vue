<template>
  <accept-header class="container ldasuqndsa">
    <div class="content_bg">
      <h4 class="detail_title">20岁学生食堂就餐后腹痛抽搐，抢救无效后去世——舆情上报</h4>
      <div class="detail_content">
        <div class="detail_other">
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
              <div class="t1">发 病 情 况：抽搐、口吐白沫</div>
            </el-col>
            <el-col :span="12">
              <div class="t1"></div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="t1">发 病 时 间：2020-09-28 12:34</div>
            </el-col>
            <el-col :span="12">
              <div class="t1">进 食 时 间：2020-09-27 19:36</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="t1">发 病 人 数：2人</div>
            </el-col>
            <el-col :span="12">
              <div class="t1">死 亡 人 数：1人</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="t1">诊 疗 情 况：属于食物中毒</div>
            </el-col>
            <el-col :span="12">
              <div class="t1"></div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="t1">上 报 时 间：{{reportTime}}</div>
            </el-col>
            <el-col :span="12"></el-col>
          </el-row>
        </div>
      </div>
      <div class="detail_btn" @click="goOnHandleClick">继续</div>
    </div>
    <el-dialog
      :visible.sync="dialogTableVisible"
      :show-close="false"
      :close-on-click-modal="true"
      :modal="false"
    >
      <div class="public">
        <p class="public_title">判断舆情是否严重</p>
        <el-row>
          <el-col :span="12">
            <div class="intro_btn not_report" @click="unSeriousHandleClick">不严重</div>
          </el-col>
          <el-col :span="12">
            <div class="intro_btn report" @click="seriousHandleClick">严重</div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="isDeal"
      :show-close="false"
      :close-on-click-modal="true"
      :modal="false"
    >
      <div class="public">
        <p class="public_title">判断是否需要处理该舆情</p>
        <el-row>
          <el-col :span="12">
            <div class="intro_btn not_report" @click="unDealHandleClick">不处理</div>
          </el-col>
          <el-col :span="12">
            <div class="intro_btn report" @click="dealHandleClick">处理</div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </accept-header>
</template>

<script>
import { subProcess } from "../../../api/progress";

export default {
  components: {
    acceptHeader: () => import("../../../components/acceptHeader")
  },
  name: "publicOpinionAcceptDetail",
  data() {
    return {
      dialogTableVisible: false,
      isDeal: false,
      reportTime: ""
    };
  },
  mounted() {
    this.reportTime = localStorage.getItem("time");
  },
  methods: {
    goOnHandleClick() {
      this.dialogTableVisible = true;
    },
    unSeriousHandleClick() {
      // 上报流程
      let userId = JSON.parse(localStorage.getItem("userInfo")).userId;
      let data = {
        userId,
        processNo: "22"
      };
      subProcess(data);
      this.dialogTableVisible = false;
      this.isDeal = true;
    },

    seriousHandleClick() {
      // 上报流程
      let userId = JSON.parse(localStorage.getItem("userInfo")).userId;
      let data = {
        userId,
        processNo: "41"
      };
      subProcess(data);
      this.$router.push({
        path: "/publicGovern",
        query: {
          signNo: "41"
        }
      });
      this.dialogTableVisible = true;
    },
    // 处理
    dealHandleClick() {
      //   // 上报流程
      //   let userId = JSON.parse(localStorage.getItem("userInfo")).userId
      //   let data = {
      //     userId,
      //     processNo: "31"
      //   }
      //   subProcess(data)
      this.$router.push({
        path: "/publicGovern",
        query: {
          signNo: "31"
        }
      });
      this.isDeal = false;
    },
    // 不处理
    unDealHandleClick() {
      // 上报流程
      let userId = JSON.parse(localStorage.getItem("userInfo")).userId;
      let data = {
        userId,
        processNo: "23"
      };
      subProcess(data);
      this.$router.push({
        path: "/publicSpread",
        query: {
          signNo: "23"
        }
      });
      this.isDeal = false;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  width: 100%;

  .content_bg {
    width: 60%;
    height: 3.5rem;
    background: url("../../../assets/image/experiment/acceptbg.png") no-repeat;
    background-size: 100%;
    margin: 0 auto;

    .detail_title {
      font-family: Source Han Sans CN;
      font-weight: 400;
      font-size: 0.1563rem;
      color: rgba(193, 243, 255, 1);
      padding-top: 0.3281rem;
      padding-left: 0.3698rem;
    }

    .detail_content {
      width: 5.4167rem;

      .detail_art {
        color: rgba(0, 184, 224, 1);
        font-size: 0.1042rem;
        line-height: 0.1875rem;
        padding-left: 0.3698rem;
        text-indent: 2em;
      }

      .detail_other {
        font-weight: 400;
        color: rgba(80, 162, 193, 1);
        font-size: 0.1042rem;
        // padding-top: 0.1833rem;
        padding-left: 0.3698rem;

        .t1 {
          margin-bottom: 0.125rem;

          .t2 {
            letter-spacing: 0.0179rem;
          }
        }
      }
    }

    .detail_btn {
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
      margin-left: 2.776rem;
      margin-top: 0.3333rem;
      cursor: pointer;
    }
  }

  .public {
    margin: -0.6198rem auto 0;

    .public_title {
      font-size: 0.1875rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(170, 240, 255, 1);
      text-align: center;
      padding-top: 0.5938rem;
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
.ldasuqndsa {
  .el-dialog__wrapper {
    background: url("../../../assets/image/model.png") no-repeat;
    background-size: 100% 100%;
  }
  .el-dialog {
    background: url("../../../assets/image/experiment/publicbg.png") no-repeat
      center center;
    width: 3.8021rem;
    height: 1.8438rem;
    background-size: 100%;
    margin-top: 30vh !important;
  }
}
</style>
