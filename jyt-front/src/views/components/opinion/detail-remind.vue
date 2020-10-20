<template>
  <div>
    <el-row>
      <div class="listtitle">
        <i></i>
        <div class="txt">提醒记录</div>
      </div>
    </el-row>
    <el-row>
      <el-table :data="reminds" stripe :header-cell-style="{backgroundColor: '#F4F9FF'}">
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="operatorDeptName" label="提醒单位" align="center"></el-table-column>
        <el-table-column prop="warnDeptName" label="接收单位" align="center"></el-table-column>
        <el-table-column prop="createTime" label="提醒时间" align="center"></el-table-column>
        <el-table-column prop="timeLimit" label="处置时限" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.timeLimit | timeLimitFmt}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="warnType" label="提醒类型" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.warnType == 1 ? '催办' : '督办' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="提醒内容" align="center">
          <template slot-scope="scope">
            <el-link :underline="false" @click="handletxnr(scope.row.warnType, scope.row.warnContent)" class="warn-label" v-if="scope.row.warnContent != '' && scope.row.warnContent != null">查看</el-link>
            <span v-else>-</span>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ["reminds"],
  data() {
    return {};
  },
  methods: {
    handletxnr(warnType, warnContent) {
      this.$alert(warnContent, warnType == 1 ? '催办信息' : '督办信息', {
        confirmButtonText: '确定'
      })
    }
  }
}
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
.warn-label {
  color: #4383E4;
  cursor: pointer;
}
</style>
