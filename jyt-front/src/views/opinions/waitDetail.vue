<template>
  <div class="contentbox">
    <!-- 基本信息 -->
    <el-card class="basecard"
      ><detail-baseinfo
        :data="baseInfo"
        :flow="flowInfo"
        v-if="baseInfo != null"
      ></detail-baseinfo
    ></el-card>
    <!-- 领导批示展示 -->
    <el-card
      class="basecard"
      v-if="baseInfo != null && baseInfo.leaderFlag == 1"
    >
      <detail-leaderps :data="baseInfo" ref="leaderps"></detail-leaderps>
    </el-card>
    <!-- 流程明细 -->
    <el-card class="basecard"
      ><process-details
        :data="baseInfo"
        :flow="flowInfo"
        :searchType="searchType"
        v-if="flowInfo.length != 0"
      ></process-details
    ></el-card>
    <!-- 提醒记录 -->
    <el-card class="basecard" v-if="remindInfo.length != 0"
      ><detail-remind :reminds="remindInfo"></detail-remind
    ></el-card>
    <!-- 分发详情 -->
    <el-card
      class="basecard"
      v-hasPermi="['opinion:pend:send']"
      v-if="
        searchType == 1 &&
          baseInfo != null &&
          ['1', '2', '3', '4', '6'].indexOf(baseInfo.lastOperatorType) > -1
      "
    >
      <detail-assign
        :data="baseInfo"
        :flow="flowInfo"
        ref="fenfaref"
        v-if="flowInfo.length != 0 && baseInfo != null"
      ></detail-assign>
    </el-card>
    <!-- 处置信息 -->
    <el-card
      class="basecard"
      v-hasPermi="['opinion:pend:deal']"
      v-if="
        searchType == 1 &&
          baseInfo != null &&
          ['3', '6'].indexOf(baseInfo.lastOperatorType) > -1
      "
    >
      <detail-approve
        ref="chuzhitxt"
        v-if="flowInfo.length != 0"
      ></detail-approve>
    </el-card>
    <!-- 领导批示输入 -->
    <el-card
      class="basecard"
      v-hasRole="['leader']"
      v-if="
        baseInfo != null &&
          searchType == 4 &&
          baseInfo.leaderReplyContent == null
      "
    >
      <detail-leaderps :data="baseInfo" ref="leaderps"></detail-leaderps>
    </el-card>
    <!-- 底部按钮组 -->
    <el-row v-if="searchType == 1" class="footBtn">
      <el-col :span="24">
        <el-button
          type="primary"
          plain
          v-if="baseInfo != null && baseInfo.lastOperatorType == 2"
          @click="shangbao"
          v-hasPermi="['opinion:pend:report']"
          >上报</el-button
        >
        <el-button
          type="primary"
          plain
          v-if="
            baseInfo != null &&
              ['1', '2', '3', '4', '6'].indexOf(baseInfo.lastOperatorType) != -1
          "
          @click="yuqingfenfa"
          v-hasPermi="['opinion:pend:send']"
          >分发</el-button
        >
        <el-button
          type="primary"
          plain
          v-if="
            baseInfo != null &&
              ['3', '6'].indexOf(baseInfo.lastOperatorType) != -1
          "
          @click="yuqingchuzhi"
          v-hasPermi="['opinion:pend:deal']"
          >处置</el-button
        >
        <el-button
          type="primary"
          plain
          v-if="
            baseInfo != null &&
              ['1', '2', '4'].indexOf(baseInfo.lastOperatorType) != -1
          "
          @click="revoke"
          v-hasPermi="['opinion:pend:revoke']"
          >撤销</el-button
        >
        <el-button
          type="primary"
          plain
          v-if="
            baseInfo != null &&
              ['3', '6'].indexOf(baseInfo.lastOperatorType) != -1
          "
          @click="returnBoss"
          v-hasPermi="['opinion:pend:back']"
          >退回上级</el-button
        >
      </el-col>
    </el-row>
    <el-row
      v-if="
        baseInfo != null &&
          isLeaderType == -1 &&
          baseInfo.leaderReplyContent == null
      "
      class="footBtn"
    >
      <el-col :span="24">
        <el-button type="primary" plain @click="submitReply"
          >领导批示</el-button
        >
      </el-col>
    </el-row>
    <el-row v-if="baseInfo != null && searchType == 3" class="footBtn">
      <el-col :span="24">
        <el-button type="primary" plain @click="exportReport"
          >导出报告</el-button
        >
      </el-col>
    </el-row>
    <el-row
      v-if="
        baseInfo != null &&
          baseInfo.firstSendDeptId == userDeptId &&
          searchType < 3
      "
      class="footBtn"
    >
      <el-col :span="24">
        <el-button type="primary" plain @click="revokeForce"
          >强制撤销</el-button
        >
      </el-col>
    </el-row>

    <el-dialog :title="rejectTitle" :visible.sync="dialogReject" width="38%">
      <el-form :model="rejectForm" ref="rejectForm" :rules="rejectRules">
        <el-form-item
          :label="rejectLabel"
          prop="operatorContent"
          label-width="120px"
        >
          <el-input
            type="textarea"
            :placeholder="rejectHolder"
            v-model="rejectForm.operatorContent"
            resize="none"
            :autosize="{ minRows: 11, maxRows: 10 }"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelWithContent">取 消</el-button>
        <el-button type="primary" @click="approveWithContent">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getbaseopinionWithProcess,
  getflowopinion,
  getremindd,
  opinionsend,
  opinionapprove,
  leaderreply,
  exportReport,
  revokeForce
} from "@/api/opinion/data";
import DetailBaseinfo from "../components/opinion/detail-baseinfo";
import DetailAssign from "../components/opinion/detail-assign";
import DetailRemind from "../components/opinion/detail-remind";
import ProcessDetails from "../components/opinion/process-details";
import DetailApprove from "../components/opinion/detail-approve";
import DetailLeaderps from "../components/opinion/detail-leaderps";
export default {
  components: {
    DetailBaseinfo,
    DetailAssign,
    ProcessDetails,
    DetailRemind,
    DetailApprove,
    DetailLeaderps
  },
  data() {
    return {
      searchType: this.$route.params.searchType,
      isLeaderType: this.$route.params.processId,
      userDeptId: this.$store.getters.deptId,
      dialogReject: false,
      rejectTitle: "",
      rejectLabel: "",
      rejectHolder: "",
      baseInfo: null,
      flowInfo: [],
      remindInfo: [],
      rejectForm: {
        processId: null,
        operatorType: null,
        operatorContent: ""
      },
      rejectRules: {
        operatorContent: [
          { required: true, message: "请输入理由", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getBaseInfo();
  },
  methods: {
    // 获取基础信息 流程信息 提醒记录
    getBaseInfo() {
      getbaseopinionWithProcess(
        this.$route.params.orderId,
        this.$route.params.processId
      )
        .then(res => {
          if (res.code == 200) {
            this.baseInfo = res.data;
          }
        })
        .catch(() => {
          this.$message.error("获取基本信息失败");
        });
      getflowopinion(this.$route.params.orderId)
        .then(res => {
          if (res.code == 200) {
            this.flowInfo = res.data;
          }
        })
        .catch(() => {
          this.$message.error("获取流程信息失败");
        });
      getremindd(this.$route.params.orderId)
        .then(res => {
          if (res.code == 200) {
            this.remindInfo = res.data;
          }
        })
        .catch(() => {
          this.$message.error("获取提醒记录失败");
        });
    },
    // 上报
    shangbao() {
      this.$confirm("确认上报上级？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        const params = {
          processId: this.baseInfo.processId,
          operatorType: 2,
          operatorContent: ""
        };
        opinionapprove(params)
          .then(res => {
            if (res.code == 200) {
              this.$message.success("上报上级成功");
              this.$router.push("/wait");
            }
          })
          .catch(() => {
            this.$message.error("上报上级失败");
          });
      });
    },
    // 分发
    yuqingfenfa() {
      const params = this.$refs["fenfaref"].assignForm;
      if (params.sendDepts.length == 0) {
        this.$message.error("请至少选择一个接收单位");
        return false;
      }
      if (params.opinionType == "") {
        this.$message.error("请选择一项舆情类别");
        return false;
      }
      this.$confirm("确认是否分发？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          opinionsend(params)
            .then(res => {
              if (res.code == 200) {
                this.$message.success("分发成功");
                this.$router.push("/wait");
              }
            })
            .catch(() => {
              this.$message.error("分发失败");
            });
        })
        .catch(() => {});
    },
    approveWithContent() {
      this.$refs["rejectForm"].validate(valid => {
        if (valid) {
          opinionapprove(this.rejectForm)
            .then(res => {
              if (res.code == 200) {
                this.$message.success("操作成功");
                this.$router.push("/wait");
              }
            })
            .catch(() => {
              this.$message.error("操作失败");
            });
        }
      });
    },
    cancelWithContent() {
      this.dialogReject = false;
      this.rejectForm = {
        processId: null,
        operatorType: null,
        operatorContent: ""
      };
    },
    // 撤销
    revoke() {
      this.rejectForm.processId = this.baseInfo.processId;
      this.rejectForm.operatorType = 7;
      this.rejectTitle = "撤销";
      this.rejectLabel = "撤销理由：";
      this.rejectHolder = "请输入撤销理由";
      this.dialogReject = true;
    },
    // 退回上级
    returnBoss() {
      this.rejectForm.processId = this.baseInfo.processId;
      this.rejectForm.operatorType = 10;
      this.rejectTitle = "退回上级";
      this.rejectLabel = "退回理由：";
      this.rejectHolder = "请输入退回理由";
      this.dialogReject = true;
    },
    // 处置
    yuqingchuzhi() {
      var approveObj = this.$refs["chuzhitxt"];
      var operatorContent = approveObj.tixingtxt;
      var resourceList = approveObj.resourceList;
      if (operatorContent == null || operatorContent == "") {
        this.$message.error("请输入处置说明");
        return;
      }
      this.$confirm("确认处置该舆情信息？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const params = {
            processId: this.baseInfo.processId,
            operatorType: 9,
            operatorContent: operatorContent,
            resourceList: resourceList
          };
          opinionapprove(params)
            .then(res => {
              if (res.code == 200) {
                this.$message.success("处置成功");
                this.$router.push("/wait");
              }
            })
            .catch(() => {
              this.$message.error("处置失败");
            });
        })
        .catch(() => {});
    },
    // 领导批示
    submitReply() {
      var leaderReplyContent = this.$refs["leaderps"].leaderReplyContent;
      if (leaderReplyContent == "") {
        this.$message.error("请输入批示意见");
        return;
      }
      this.$confirm("确认提交批示意见？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        leaderreply({
          orderId: this.$route.params.orderId,
          leaderReplyContent: leaderReplyContent
        })
          .then(res => {
            if (res.code == 200) {
              this.$message.success("提交成功");
              this.$router.push("/verify");
            } else {
              this.$message.error("提交失败");
            }
          })
          .catch(() => {
            this.$message.error("提交失败");
          });
      });
    },
    // 导出报告
    exportReport() {
      exportReport(this.$route.params.orderId);
    },
    revokeForce() {
      revokeForce(this.$route.params.orderId)
        .then(res => {
          if (res.code == 200) {
            this.$message.success("提交成功");
            this.$router.push("/wait");
          } else {
            this.$message.error("提交失败");
          }
        })
        .catch(() => {
          this.$message.error("提交失败");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.contentbox {
  background-color: rgb(240, 242, 245);
  padding: 15px;
}
.listtitle {
  margin-top: 15px;
  margin-bottom: 20px;
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
.basecard {
  margin-bottom: 15px !important;
  .el-card__body {
    padding: 15px 20px 10px 20px !important;
  }
}
.el-card {
  border-radius: 0px !important;
  border: none !important;
}
.el-card.is-always-shadow {
  box-shadow: none !important;
}
.footBtn {
  margin-top: 30px;
  margin-bottom: 30px;
  text-align: center;
  button {
    margin: 0 10px;
    color: #4383e4;
    border-color: #1f83eb;
    &:hover {
      color: #ffffff;
      border-color: #4383e4;
      background-color: #4383e4;
    }
  }
}
</style>
