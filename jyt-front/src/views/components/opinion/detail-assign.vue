<template>
  <div style="width: 100%">
    <!-- 报送领导弹出框 -->
    <div class="dialogcontent">
      <el-dialog
        title="将本任务报送至领导账号"
        :visible.sync="dialogVisible"
        width="35%"
        :before-close="handleClose"
      >
        <div class="inputbox">
          <el-input
            type="textarea"
            placeholder="填写汇报内容"
            v-model="leaderInfo.leaderApplyContent"
            resize="none"
            :autosize="{ minRows: 11, maxRows: 10}"
          ></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="submitleader">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- ####################################### -->
    <el-row>
      <div class="listtitle">
        <i></i>
        <div class="txt">分发详情</div>
        <div class="bsleader">
          <el-link
            type="primary"
            @click="leaderboss"
            :disabled="leaderflag"
          >{{(data.leaderApplyUserName != null && data.leaderApplyUserName != '') ? '已报送领导' : '报送领导'}}</el-link>
        </div>
      </div>
    </el-row>
    <el-row class="formbox">
      <el-form :label-position="'right'" :rules="rules" label-width="110px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="接收单位：" prop="sendDepts">
              <el-cascader
                ref="cascaderAddr"
                placeholder="请选择接收单位"
                :options="deptOptions"
                :props="defaultProps"
                change-on-select
                filterable
                :show-all-levels="false"
                @change="bumenChange"
                v-model="sendDepts"
                style="width: 90%"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="舆情类别：" prop="opinionType">
              <el-select v-model="assignForm.opinionType" clearable style="width: 40%">
                <el-option
                  v-for="item in sorttype"
                  :key="item.dictCode"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="width: 70%">
          <el-col :span="12">
            <el-form-item label="上传附件：">
              <el-upload
                ref="upload"
                action=""
                :on-remove="handleRemove"
                :headers="headers"
                :file-list="myFileList"
                name="file"
                multiple
                :auto-upload="true"
                :http-request="uploadFile"
                :accept="fileformat"
                :on-success="handleUploadSuccess"
              >
              <div slot="trigger">
                <img src="../../../assets/image/upload.png" class="upimg"/>
                <span class="click-upload" >点击上传</span>
                <span class="click-ins">（支持上传图片/文档）</span>
              </div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 指导意见 -->
        <!-- <el-row class="zdyjtitle">指导意见：</el-row> -->
        <el-row style="width: 100%;">
          <!-- ******************* -->

          <div class="zdyjbox" v-for="(item, index) in assignForm.sendDepts">
            <el-row class="firstline">
              <div class="zdyjleft">请输入指导意见 (可填写处置意见)</div>
              <div class="zdyjright">{{ item.operatorDeptName }}</div>
            </el-row>
            <el-row>
              <el-input
                type="textarea"
                v-model="item.opinionInst"
                placeholder="在这里填写意见"
                :autosize="{ minRows: 5, maxRows: 100}"
              ></el-input>
            </el-row>
            <el-row class="disanhang">
              <div class="zdyjleft">
                <span>任务等级：</span>
                <el-select placeholder="请选择" v-model="item.taskLevel" style="width: 120px;">
                  <el-option
                    v-for="item in leveltype"
                    :key="item.dictCode"
                    :label="item.dictLabel"
                    :value="item.dictValue"
                  ></el-option>
                </el-select>
              </div>
              <div class="zdyjright">
                <span class="sanline">处置时限：</span>
                <el-select
                  placeholder=" "
                  style="width: 70px;"
                  v-model="item.day"
                  @change="dayschange(item.time, index)"
                >
                  <el-option v-for="item in days" :key="item" :label="item" :value="item"></el-option>
                </el-select>
                <span class="sanline">&nbsp天&nbsp</span>
                <el-select
                  placeholder=" "
                  style="width: 65px;"
                  v-model="item.time"
                  @change="timeschange(index)"
                >
                  <el-option
                    v-for="(item, index) in times"
                    :key="index"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
                <span class="sanline">&nbsp小时</span>
              </div>
            </el-row>
          </div>

          <!-- ******************* -->
        </el-row>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import { depttreeselect, leaderreport, uploadFile } from "@/api/opinion/data";
import { initRangeArray } from "@/utils/ruoyi";
import { getToken } from "@/utils/auth";
export default {
  props: {
    data: {
      type: Object
    },
    flow: {
      type: Array
    }
  },
  data() {
    return {
      // 报送领导
      dialogVisible: false,
      leaderflag: false,
      leaderInfo: {
        orderId: this.data.orderId,
        leaderApplyContent: ""
      },
      sorttype: [],
      leveltype: [],
      deptOptions: [],
      assignForm: {
        orderId: this.data.orderId,
        processId: this.data.processId,
        opinionType: "",
        // 文件上传地址
        resourceList: [],
        sendDepts: []
      },
      rules: {
        sendDepts: [
          { required: true, message: '', trigger: 'blur' }
        ],
        opinionType: [
          { required: true, message: '', trigger: 'blur' }
        ]
      },
      // 多选单位规则
      defaultProps: {
        children: "children",
        label: "label",
        value: "id",
        multiple: true,
        emitPath: false,
        disabled: "virtualShow",
        expandTrigger: "hover"
      },
      sendDepts: [],
      // 文件上传
      myFileList: [],
      headers: {
        Authorization: "Bearer " + getToken()
      },
      fileformat: ".doc, .docx, .xls, .xlsx, .jpg, .jpeg, .png, .pdf",
      days: initRangeArray(0, 30),
      times: initRangeArray(0, 23)
    };
  },
  created() {
    if (this.data.leaderApplyUserName != null && this.data.leaderApplyUserName != '') {
      this.leaderflag = true
    }
    this.gettype();
    this.getTreeselect();
  },
  methods: {
    // 舆情类别字典
    gettype() {
      this.getDicts("opinion_type").then(response => {
        this.sorttype = response.data;
      });
      this.getDicts("opinion_task_level").then(response => {
        this.leveltype = response.data;
      });
    },
    // 查询部门树
    getTreeselect() {
      depttreeselect({
        parentId: this.$store.getters.deptId
      }).then(res => {
        this.deptOptions = res.data
      })
    },
    // 选择单位变化
    bumenChange(val) {
      var isDel = true
      this.$refs['cascaderAddr'].getCheckedNodes().map(item => {
        var isAdd = true
        for (var i = 0; i < this.assignForm.sendDepts.length; i++) {
          var cur = this.assignForm.sendDepts[i]
          if (item.value == cur.operatorDeptId) {
            isAdd = false
            break
          }
        }
        if (isAdd) {
          this.assignForm.sendDepts.push({
            operatorDeptId: item.value,
            operatorDeptName: item.label,
            opinionInst: '',
            taskLevel: '',
            timeLimit: 0,
            day: 0,
            time: 0
          })
          isDel = false
        }
      })
      if (isDel) {
        for (var i = 0; i < this.assignForm.sendDepts.length; i++) {
          var cur = this.assignForm.sendDepts[i]
          if (this.sendDepts.indexOf(cur.operatorDeptId) == -1) {
            this.assignForm.sendDepts.splice(i, 1)
          }
        }
      }
    },
    // 上传成功的钩子函数
    handleUploadSuccess(response, file, fileList) {
      this.assignForm.resourceList.push(response.data[0]);
    },
    handleRemove(deleteimg) {
      var index = this.assignForm.resourceList.findIndex((item, index) => {
        if (item.resourceName == deleteimg.name) return index;
      });
      this.assignForm.resourceList.splice(index, 1);
    },
    uploadFile(fileobj) {
      var formData = new FormData()
      formData.append('file', fileobj.file)
      uploadFile(formData).then(res => {
        if (res.code == 200) {
          this.assignForm.resourceList.push({
            url: res.data[0].fileUrl,
            resourceName: res.data[0].fileName,
            resourcePath: res.data[0].resourcePath
          })
        } else {
          this.$message.error("上传文件失败")
          console.log(res.msg)
        }
      }).catch(e => {
        this.$message.error("上传文件失败")
        console.log(e)
      })
    },
    // 处置时限天处理
    dayschange(index) {
      if (0 == this.assignForm.sendDepts[index].time) {
        this.assignForm.sendDepts[index].timeLimit =
          this.assignForm.sendDepts[index].day * 1 * 24;
      } else {
        this.assignForm.sendDepts[index].timeLimit =
          this.assignForm.sendDepts[index].time * 1;
        this.assignForm.sendDepts[index].timeLimit +=
          this.assignForm.sendDepts[index].day * 1 * 24;
      }
    },
    // 处置时限小时处理
    timeschange(index) {
      if (this.assignForm.sendDepts[index].day == 0) {
        this.assignForm.sendDepts[index].timeLimit =
          this.assignForm.sendDepts[index].time * 1;
      } else {
        this.assignForm.sendDepts[index].timeLimit =
          this.assignForm.sendDepts[index].day * 1 * 24;
        this.assignForm.sendDepts[index].timeLimit +=
          this.assignForm.sendDepts[index].time * 1;
      }
    },
    handleClose() {
      this.dialogVisible = !this.dialogVisible;
      this.leaderInfo.leaderApplyContent = "";
    },
    leaderboss() {
      this.dialogVisible = !this.dialogVisible;
    },
    submitleader() {
      if (this.leaderInfo.leaderApplyContent == "") {
        this.$message.error("请填写汇报信息");
        return false;
      }
      this.$confirm("请确认是否汇报领导？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          leaderreport(this.leaderInfo).then(res => {
            if (res.code == 200) {
              this.$message.success("汇报领导成功");
              this.dialogVisible = !this.dialogVisible;
              this.leaderInfo.leaderApplyContent = "";
              this.leaderflag = true;
            } else {
              this.$message.error("汇报领导失败");
            }
          })
        })
        .catch(() => {
          this.$message.error("汇报领导失败");
          this.dialogVisible = !this.dialogVisible;
          this.leaderInfo.leaderApplyContent = "";
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.listtitle {
  position: relative;
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
  .bsleader {
    position: absolute;
    right: 20px;
    top: -8px;
  }
}
/deep/ .formbox {
  .el-form-item__label {
    color: #294874;
    font-weight: 500 !important;
  }
}
.zdyjtitle {
  width: 70px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 700;
  color: rgba(41, 72, 116, 1);
  line-height: 20px;
  margin-bottom: 15px;
  margin-left: 27px;
}
.zdyjbox {
  padding: 18px 16px 0 10px;
  float: left;
  width: 43%;
  height: auto;
  margin-left: 8px;
  margin-right: 40px;
  margin-bottom: 18px;
  border: 1px solid #999999;
  border-radius: 10px;
  .firstline {
    margin-bottom: 14px;
  }
  .zdyjleft {
    float: left;
    font-size: 14px;
    font-weight: 400;
    color: #294874;
    line-height: 20px;
  }
  .zdyjright {
    float: right;
    font-size: 14px;
    font-weight: 600;
    color: rgba(200, 69, 19, 1);
    line-height: 20px;
  }
  .disanhang {
    margin: 20px 0;
  }
  .sanline {
    font-size: 14px;
    font-weight: 400;
    color: rgba(41, 72, 116, 1);
    line-height: 20px;
  }
}
.upimg {
  width: 23px;
  height:19px;
}
.click-upload {
  color: #4383E4;
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
}
.click-ins {
  color: #999999;
  font-size: 14px;
  line-height: 20px;
}
.dialogcontent {
  /deep/ .el-dialog__header {
    border-bottom: 1px solid #E7E6EB;
  }
  /deep/ .el-dialog__footer {
    border-top: 1px solid #E7E6EB;
  }
  /deep/ .el-dialog__title {
    font-size: 16px;
    font-weight: 700;
    color: rgba(51, 51, 51, 1);
    line-height: 22px;
  }
  /deep/ .el-textarea__inner {
    border: 0;
    &:focus {
      border: 0;
    }
  }
}
</style>
