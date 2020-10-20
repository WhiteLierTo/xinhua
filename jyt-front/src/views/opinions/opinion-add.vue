<template>
  <div class="containerbox">
    <el-card style="height: 99%">
      <el-row>
        <div class="listtitle">
          <i></i>
          <div class="txt">基本信息</div>
        </div>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form ref="addForm" :rules="addFormRules" :model="addForm" label-position="right" label-width="120px">
            <el-form-item label="文章标题：" prop="artTitle" class="label-title">
              <el-input v-model="addForm.artTitle" placeholder="请输入文章标题" />
            </el-form-item>
            <el-row>
              <el-col :span="6">
                <el-form-item label="数据来源：" prop="artSource">
                  <el-select v-model="addForm.artSource" placeholder="请选择" clearable>
                    <el-option v-for="item in type" :key="item.dictCode" :label="item.dictLabel" :value="item.dictValue" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="18">
                <el-form-item label="来源渠道：" prop="siteName">
                  <el-input v-model="addForm.siteName" placeholder="请输入来源平台名称" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="原文链接：" prop="artUrl">
              <el-input v-model="addForm.artUrl" placeholder="请输入文章的原文链接" />
            </el-form-item>
            <el-form-item label="发布时间：" prop="artPublishTime">
              <el-date-picker v-model="addForm.artPublishTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择发布时间" clearable style="width: 50%" />
            </el-form-item>
            <el-form-item label="上报单位：" prop="parentId" v-if="isSuportDept">
              <el-cascader ref="cascaderAddr" placeholder="请选择上报单位" :options="deptOptions" :props="defaultProps" change-on-select filterable :show-all-levels="false" clearable v-model="addForm.parentId" style="width: 50%" />
            </el-form-item>

            <el-form-item label="文章内容：" prop="artContent" class="maxheight">
              <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 1000 }" placeholder="请输入内容" v-model="addForm.artContent" />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row style="text-align: center;">
        <el-col :span="2" :offset="5">
          <el-button :disabled="isDisable" @click="submit(1)">保存草稿</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" :disabled="isDisable" v-if="addForm.submitType == 1 || addForm.orderStatus == 1" @click="submit(2)">提交</el-button>
          <el-button type="primary" :disabled="isDisable" v-else @click="submit(3)">上报</el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="cancel">取消</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="resetForm">重置</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { reportDeptTree } from "@/api/opinion/data";

import { saveCommit, getdraftdetail } from '@/api/opinion/data';
export default {
  data() {
    return {
      isDisable: false,
      editFlag: true,
      addForm: {
        orderId: '',
        artTitle: '',
        artSource: '',
        siteName: '',
        artUrl: '',
        artPublishTime: '',
        parentId: "",
        artContent: '',
        saveType: null,
        submitType: 0 // 0-上报 1-新增
      },
      //   部门来源
      deptOptions: [],
      isSuportDept: false,
      // 多选单位规则
      defaultProps: {
        children: "children",
        label: "label",
        value: "id",
        multiple: false,
        emitPath: false,
        disabled: "virtualShow",
        expandTrigger: "hover"
      },
      // 来源字典
      type: [],
      addFormRules: {
        artTitle: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
        artSource: [{ required: true, message: '请选择数据来源', trigger: 'blur' }],
        siteName: [{ required: true, message: '请输入来源平台名称', trigger: 'blur' }],
        artUrl: [{ required: true, message: '请输入原文链接', trigger: 'blur' }],
        artPublishTime: [{ required: true, message: '请选择发布时间', trigger: 'blur' }],
        parentId: [{ required: true, message: '请选择上报单位', trigger: 'blur' }],
        artContent: [{ required: true, message: '请输入文章内容', trigger: 'blur' }]
      }
    };
  },
  created() {
    let path = this.$route.path
    this.isSuportDept = path.endsWith(0)
    if (path.endsWith(0) && this.isSuportDept) this.getTreeselect();

    this.getSubmitType();
    this.getType();
    setTimeout(() => {
      this.getDraftDetail();
    }, 100);
  },
  methods: {
    // 查询部门树
    getTreeselect() {
      reportDeptTree().then(res => {
        this.deptOptions = res.data
      })
    },


    getSubmitType() {
      var path = this.$route.path;
      if (path.indexOf('add') != -1) {
        var i = path.lastIndexOf('/') + 1;
        this.addForm.submitType = path.substr(i);
      }
    },

    getType() {
      this.getDicts('opinion_source').then(response => {
        this.type = response.data;
      });
    },
    // 初始化草稿信息
    getDraftDetail() {
      var orderId = this.$route.params.orderId;
      if (orderId != undefined) {
        getdraftdetail(this.$route.params.orderId).then(res => {
          if (res.code == 200) {
            this.addForm = {
              orderId: res.data.orderId,
              artTitle: res.data.artTitle,
              artSource: res.data.artSource + '',
              siteName: res.data.siteName,
              artUrl: res.data.artUrl,
              artPublishTime: res.data.artPublishTime,
              artContent: res.data.artContent,
              saveType: null,
              orderStatus: res.data.orderStatus,
              submitType: res.data.orderStatus
            }
            this.editFlag = false
          }
        })
      }
    },
    resetForm() {
      this.$refs['addForm'].resetFields();
    },
    // 提交成功跳转到待处理
    submit(saveType) {
      this.$refs['addForm'].validate(valid => {
        if (valid) {
          this.isDisable = true;
          var tips = '';
          var url = '/wait';
          this.addForm.saveType = saveType;
          if (saveType == 1) {
            tips = '保存草稿';
            url = '/draft';
          } else if (saveType == 2) {
            tips = '提交';
          } else if (saveType == 3) {
            tips = '确认上报';
          }
          saveCommit(this.addForm)
            .then(res => {
              if (res.code == 200) {
                this.$message.success(tips + '成功');
                this.$router.push(url);
              }
            })
            .catch(() => {
              this.isDisable = false;
              this.$message.error(tips + '失败');
            });
        }
      });
    },
    // 取消重定向到首页
    cancel() {
      if (this.editFlag) {
        this.$router.push('/index');
      } else {
        this.$router.push('/draft');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.containerbox {
  min-height: 85vh;
  background-color: rgb(240, 242, 245);
  padding: 15px;
}
.label-title {
  font-weight: 400;
  color: #294874;
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
.el-card {
  border-radius: 0px !important;
  border: none !important;
}
.el-card.is-always-shadow {
  box-shadow: none !important;
}
</style>
<style lang="scss">
.el-form-item__label {
  color: #294874;
  font-weight: 500;
}
.maxheight {
  .el-textarea__inner {
    max-height: 400px !important;
  }
  .el-textarea__inner::-webkit-scrollbar-track {
    background-color: rgba(241, 241, 241, 0.637);
  }
  /*定义滚动条高宽及背景*/
  .el-textarea__inner::-webkit-scrollbar {
    width: 4px;
    background-color: rgba(241, 241, 241, 0.637);
  }
  /*定义滚动条*/
  .el-textarea__inner::-webkit-scrollbar-thumb {
    background-color: rgba(193, 193, 193, 0.3);
    border-radius: 2px;
  }
}
</style>
