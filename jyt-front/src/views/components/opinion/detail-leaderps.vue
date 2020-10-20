<template>
  <el-row>
    <el-row>
      <el-row>
        <div class="listtitle">
          <i></i>
          <div class="txt">批示申请</div>
        </div>
      </el-row>
      <el-row class="learderps">
        <el-row class="sq-row">
          <el-col><span class="sq-label">申请人：</span><span class="sq-txt">{{data.leaderApplyUserName}}</span></el-col>
          <el-col><span class="sq-label">申请时间：</span><span class="sq-txt">{{data.leaderApplyTime}}</span></el-col>
        </el-row>
        <el-row>
          <el-col class="content">
            {{data.leaderApplyContent}}
          </el-col>
        </el-row>
      </el-row>
    </el-row>
    <el-row>
      <el-row>
        <div class="listtitle">
          <i></i>
          <div v-if="data.leaderReplyContent == null" class="txt">批示意见</div>
          <div v-else class="txt">领导批示</div>
        </div>
      </el-row>
      <el-row class="learderps">
        <el-input v-if="data.leaderReplyContent == null" type="textarea" v-model="leaderReplyContent" placeholder="请输入批示意见" :autosize="{ minRows: 7, maxRows: 100}"></el-input>
        <el-col v-else class="content">
          {{data.leaderReplyContent}}
        </el-col>
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      leaderReplyContent: ''
    };
  },
  methods: {
    handletxnr(val) {
      this.tixingtxt = val;
      this.dialogVisible = !this.dialogVisible;
    },
    handleClose() {
      this.dialogVisible = !this.dialogVisible;
    }
  }
};
</script>

<style lang="scss" scoped>
.listtitle {
  margin-top: 15px;
  margin-bottom: 20px;
  padding-bottom: 6px;
  border-bottom: 1px solid #eee;
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
    margin-right: 10px;
    margin-left: 10px;
  }
}
.apply-row {
  margin-bottom: 25px;
}
.learderps {
  .sq-row {
    padding: 0 25px;
    height: 35px;
    font-size: 14px;
    line-height: 25px;
    display: flex;
  }
  .sq-label {
    color: #666;
  }
  .sq-txt {
    color: #4383e4;
  }
  /deep/ .el-textarea__inner {
    border: 0 !important;
    color: #606266 !important;
  }
}
.content {
  padding: 0 25px;
  word-break: break-all;
  text-align: justify;
  color: #515A6E;
  font-size: 14px;
  line-height: 25px;
}
</style>
