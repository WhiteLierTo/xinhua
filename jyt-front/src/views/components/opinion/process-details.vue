<template>
  <div style="width: 100%;">
    <el-row>
      <div class="listtitle">
        <i></i>
        <div class="txt">流程明细</div>
      </div>
    </el-row>
    <el-row class="processBox">
      <el-table :data="flow" style="width: 100%;margin-bottom: 20px;" :header-cell-style="{background: '#EDEDF6', color: '#515A6E'}" row-key="index" default-expand-all :row-style="isColor" :tree-props="tableprops">
        <el-table-column type="index" label="序号" min-width="1" align="center"></el-table-column>
        <el-table-column label="流程节点" prop="operatorDeptName" align="left" min-width="5">
          <template slot-scope="scope">
            {{scope.row.operatorDeptName | spacechange(scope.row.level)}}
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="operatorTypeName" align="center" min-width="3">
          <template slot-scope="scope">
            <span>{{scope.row.operatorType | formatOperatorType}}</span>
          </template>
        </el-table-column>
        <el-table-column label="接收单位" prop="receiveDeptName" align="center" min-width="3"/>
        <el-table-column label="时间" align="center" min-width="4">
          <template slot-scope="scope">
            <span v-if="scope.row.processOrTask == 'P'">
              {{scope.row.updateTime}}
            </span>
            <span v-else>
              {{scope.row.createTime}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="任务类型" prop="taskLevelName" align="center" min-width="2" >
          <template slot-scope="scope">
            <span v-if="scope.row.taskLevelName == null || scope.row.taskLevelName == ''">-</span>
            <span v-else>{{scope.row.taskLevelName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="处置时限" prop="timeLimit" align="center" min-width="2">
          <template slot-scope="scope">
            <span>{{scope.row.timeLimit | timeLimitFmt}}</span>
          </template>
        </el-table-column>
        <el-table-column label="任务状态" align="center" min-width="2" v-if="searchType != 3">
          <template slot-scope="scope">
            <span><el-badge is-dot :class="scope.row.timeStatus == 1 ? 'dot-pend' : 'dot-over'" v-if="scope.row.timeStatus > 0"/>{{(scope.row.timeStatus == null || scope.row.timeStatus == 0) ? "-" : (scope.row.timeStatus == 1 ? "即将超期" :"已超期")}}</span>
          </template>
        </el-table-column>
        <el-table-column label="指导意见" align="center" min-width="2">
          <template slot-scope="scope">
            <span v-if="scope.row.opinionInst == null">-</span>
            <el-button v-else type="text" class="link-label" @click="informationbox('指导意见', scope.row.opinionInst, scope.row.resources)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column label="处置说明" align="center" min-width="2">
          <template slot-scope="scope">
            <span v-if="scope.row.operatorContent == null || scope.row.operatorContent == ''">-</span>
            <el-button v-else type="text" class="link-label" @click="informationbox('处置说明', scope.row.operatorContent, scope.row.resources)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="8" v-if="showDeal">
          <template slot-scope="scope">
            <div v-if="showDealBtn && userDeptId == scope.row.receiveDeptId">
              <el-button size="mini" class="verify" plain @click="approve(scope.row.processId, 8)" v-hasPermi="['opinion:verify:submit']" v-if="['8', '9'].indexOf(scope.row.operatorType) != -1 && scope.row.showDeal == 'Y'">提交上级</el-button>
              <el-button size="mini" class="verify" plain @click="approve(scope.row.processId, 4)" v-hasPermi="['opinion:verify:resend']" v-if="scope.row.operatorType == 10 && scope.row.showDeal == 'Y'">重新分发</el-button>
              <el-button size="mini" class="verify" plain @click="approve(scope.row.processId, 5)" v-hasPermi="['opinion:verify:over']" v-if="['8', '9'].indexOf(scope.row.operatorType) != -1 && scope.row.showDeal == 'Y'">办结</el-button>
              <el-button size="mini" class="verify" plain @click="approve(scope.row.processId, 7)" v-hasPermi="['opinion:verify:revoke']" v-if="scope.row.operatorType == 10 && scope.row.showDeal == 'Y'">撤销</el-button>
              <el-button size="mini" class="verify" plain @click="approve(scope.row.processId, 6)" v-hasPermi="['opinion:verify:reject']" v-if="['8', '9', '10'].indexOf(scope.row.operatorType) != -1 && scope.row.showDeal == 'Y'">驳回下级</el-button>
              <el-button size="mini" class="verify" plain @click="approve(scope.row.processId, 6)" v-hasPermi="['opinion:verify:reject']" v-if="scope.row.operatorType == 6 && scope.row.showDeal == 'Y' && scope.row.showReject == 'Y'">驳回下级</el-button>
            </div>
            <div v-if="(scope.row.operatorType == 3) && (scope.row.lastOperatorDeptId == userDeptId)">
              <el-button size="mini" class="cuiban" plain @click="handlewarnbox(scope.row.processId, scope.row.timeStatus, scope.row.operatorDeptId)" v-hasPermi="['opinion:verify:warn']" v-if="scope.row.timeStatus == 1">催办</el-button>
              <el-button size="mini" class="duban" plain @click="handlewarnbox(scope.row.processId, scope.row.timeStatus, scope.row.operatorDeptId)" v-hasPermi="['opinion:verify:supervise']" v-if="scope.row.timeStatus == 2">督办</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <!-- 催办督办弹出框 -->
    <el-dialog :title="warnTitle" :visible.sync="dialogVisible" width="38%">
      <el-input type="textarea" v-model="warnparams.warnContent" placeholder="在这里填写意见" :autosize="{ minRows: 5, maxRows: 100}" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handlewarn">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 撤销、驳回输入理由 -->
    <el-dialog :title="rejectTitle" :visible.sync="dialogReject" width="38%">
      <el-form :model="rejectForm" ref="rejectForm" :rules="rejectRules">
          <el-form-item :label="rejectLabel" prop="operatorContent" label-width="120px">
            <el-input type="textarea" :placeholder="rejectHolder" v-model="rejectForm.operatorContent" resize="none" :autosize="{ minRows: 11, maxRows: 10}"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelWithContent">取 消</el-button>
          <el-button type="primary" @click="approveWithContent">确 定</el-button>
        </div>
    </el-dialog>

    <!-- 指导意见、处置说明 -->
    <el-dialog :title="insTitle" :visible.sync="dialogIns" class="ins-dialog">
      <el-row :gutter="5">
        <el-col :span="3" class="ins-label">
          {{insTitle}}：
        </el-col>
        <el-col :span="20">
          {{insContent}}
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="3" class="ins-label">
          查看附件：
        </el-col>
        <el-col :span="20">
          <el-link v-for="item in insResources" :key="item.resourceId" class="resbtn" @click="downloadFile(item.url, item.resourceId)">
            {{item.resourceName}}
          </el-link>
        </el-col>
      </el-row>
      <div slot="footer">
          <el-button type="primary" @click="closeInformationBox">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import { opinionapprove, opinionwarn, downloadFile } from "@/api/opinion/data";
import checkPermission from '@/utils/permission.js'
import Vue from 'vue'
Vue.filter('spacechange', (value, level) => {
  var str = "";
  for (var i = level; i > 0; i--) {
    str += "    ";
  }
  return str + value;
})
export default {
  filters: {
    formatOperatorType: function (value) {
      // 1-提交 2-上报 3-分发 4-重新分发 5-办结 6-驳回下级 7-撤销 8-提交上级 9-处置 10-退回上级 11-强制撤销
      var label = ""
      if (value != null && value != '') {
        switch (value) {
          case '1': label = '提交'; break;
          case '2': label = '上报'; break;
          case '3': label = '分发'; break;
          case '4': label = '重新分发'; break;
          case '5': label = '办结'; break;
          case '6': label = '驳回下级'; break;
          case '7': label = '撤销'; break;
          case '8': label = '提交上级'; break;
          case '9': label = '处置'; break;
          case '10': label = '退回上级'; break;
          case '11': label = '强制撤回'; break;
        }
      }
      return label
    }
  },
  props: {
    flow: {
      type: Array,
      default: []
    },
    searchType: String
  },
  data() {
    return {
      showDealBtn: false,
      showDeal: false,
      tableprops: {
        children: "children",
        hasChildren: 0
      },
      params: {
        processId: this.flow[0].processId,
        operatorType: "",
        operatorContent: ""
      },
      warnTitle: '',
      warnparams: {
        processId: null,
        warnType: null,
        warnDeptId: null,
        warnContent: ''
      },
      dialogVisible: false,
      dialogReject: false,
      dialogIns: false,
      userDeptId: this.$store.getters.deptId,
      rejectTitle: '',
      rejectLabel: '',
      rejectHolder: '',
      rejectForm: {
        processId: null,
        operatorType: null,
        operatorContent: ''
      },
      rejectRules: {
        operatorContent: [{ required: true, message: '请输入理由', trigger: 'blur' }]
      },
      insTitle: '',
      insContent: '',
      insResources: []
    }
  },
  created() {
    var roleFlag = checkPermission(['admin', 'top', 'middle'])
    var searchFlag = this.searchType == 1
    this.showDealBtn = roleFlag && searchFlag
    this.showDeal = roleFlag && (this.searchType == 1 || this.searchType == 2)
  },
  methods: {
    // 表格颜色控制
    isColor(row, column, rowIndex, columnIndex) {
      var color = {
        color: '#515A6E'
      }
      if (row.row.processOrTask == "P" && rowIndex != 0) {
        color.backgroundColor = "#FAFAFA"
      }
      return color
    },
    approve(id, statustype) {
      if (statustype == 6 || statustype == 7) {
        this.rejectTitle = statustype == 6 ? '驳回下级' : '撤销'
        this.rejectLabel = statustype == 6 ? '驳回理由：' : '撤销理由：'
        this.rejectHolder = statustype == 6 ? '请输入驳回理由' : '请输入撤销理由'
        this.rejectForm.processId = id
        this.rejectForm.operatorType = statustype
        this.dialogReject = true
      } else {
        this.$confirm("确认是否进行此操作？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.params.processId = id;
          this.params.operatorType = statustype;
          opinionapprove(this.params).then(res => {
              if (res.code == 200) {
                this.$message.success("操作成功");
                this.$router.push("/wait");
              }
            }).catch(() => {
              this.$message.error("操作失败");
            })
        }).catch(() => {

        })
      }
    },
    approveWithContent() {
      this.$refs['rejectForm'].validate(valid => {
        if (valid) {
          opinionapprove(this.rejectForm).then(res => {
              if (res.code == 200) {
                this.$message.success("操作成功");
                this.$router.push("/wait");
              }
            }).catch(() => {
              this.$message.error("操作失败");
            })
        }
      })
    },
    cancelWithContent() {
      this.dialogReject = false
      this.rejectForm = {
        processId: null,
        operatorType: null,
        operatorContent: ''
      }
    },
    handlewarnbox(processId, status, deptId) {
      this.dialogVisible = !this.dialogVisible;
      this.warnTitle = status == 1 ? '催办' : '督办'
      this.warnparams.processId = processId
      this.warnparams.warnType = status
      this.warnparams.warnDeptId = deptId
      this.warnparams.warnContent = ''
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
      }).then(() => {
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
    },
    informationbox(title, content, resources) {
      this.insTitle = title
      this.insContent = content
      this.insResources = resources
      this.dialogIns = true
    },
    downloadFile(url, id) {
      downloadFile(id)
    },
    closeInformationBox() {
      this.dialogIns = false
      this.insTitle = ''
      this.insContent = ''
      this.insResources = []
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
.link-label {
  color: #4383E4;
  font-weight: 400;
}
.verify {
  background-color: #FFFFFF;
  color: #4383E4;
  border-color: #4383E4;
  &:hover {
    background-color: #4383E4;
    border-color: #4383E4;
    color: #FFFFFF;
  }
}
.cuiban {
  background-color: #ECF5FF;
  color: #4383E4;
  border-color: #4383E4;
  &:hover {
    background-color: #4383E4;
    border-color: #4383E4;
    color: #FFFFFF;
  }
  &:focus {
    background-color: #ECF5FF;
    border-color: #4383E4;
    color: #4383E4;
  }
}
.duban {
  background-color: #FDF6EC;
  color: #EB7B16;
  border-color: #EB7B16;
  &:hover {
    background-color: #EB7B16;
    border-color: #EB7B16;
    color: #FFFFFF;
  }
  &:focus {
    background-color: #FDF6EC;
    border-color: #EB7B16;
    color: #EB7B16;
  }
}
.dot-pend {
  height: 12px;
  margin-right: 8px;
  >>> .el-badge__content {
    background-color: #EB7B16 !important;
  }
}
.dot-over {
  height: 12px;
  margin-right: 8px;
  >>> .el-badge__content {
    background-color: #DD021B !important;
  }
}
.ins-dialog {
  font-size: 14px;
  line-height: 25px;
  text-align: justify;
  .ins-label {
    text-align: right;
    color: #294874;
  }
  .el-row {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .resbtn {
    color: #333333;
    padding-top: 0;
    margin-left: 0;
    margin-right: 40px;
    &:hover {
      color: #4383E4;
    }
  }
  /deep/ .el-dialog__header {
    border-bottom: 1px solid #EDEDF6 !important;
  }
  /deep/ .el-dialog__footer {
    border-top: 1px solid #EDEDF6 !important;
  }
}

</style>

<style lang="scss">
.processBox {
  .el-table [class*="el-table__row--level"] .el-table__expand-icon {
    display: inline-block !important;
  }
}
.dialogcontent {
  .el-dialog__title {
    font-size: 16px;
    font-weight: 700;
    color: rgba(51, 51, 51, 1);
    line-height: 22px;
  }
  .el-dialog__body {
    padding: 0 !important;
  }
  .inputbox {
    width: 100%;
    height: 250px;
    .el-textarea__inner {
      border-radius: 0 !important;
    }
    .el-textarea__inner:focus {
      outline: none !important;
      border-color: rgba(51, 51, 51, 1) !important;
    }
  }
}

</style>
