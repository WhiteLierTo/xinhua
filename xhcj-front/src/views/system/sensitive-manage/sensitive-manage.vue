<template>
  <div class="active-info-management ccxvcxcv">
    <tableWithFilter :filtersInfo="filtersInfo" :tableInfo="tableInfo" :mock="false" v-model="tableThis">
      <el-upload
        class="upload-demo"
        action
        :http-request="uploadFile"
        :file-list="fileList"
        :show-file-list="false"
        accept=".xlsx"
        slot="table-left"
      >
        <el-button plain icon="el-icon-upload2" type="primary">批量导入</el-button>
      </el-upload>
      <el-button
        type="primary"
        plain
        slot="table-left"
        @click="downLoad"
        icon="el-icon-download"
      >下载模板</el-button>
      <sensitiveDialog slot="create" slot-scope="scope" :onClose="scope.onClose" />
      <sensitiveDialog
        slot="modify"
        slot-scope="scope"
        :id="scope.row.id"
        :onClose="scope.onClose"
      />
    </tableWithFilter>
  </div>
</template>
<script>
import sensitiveDialog from "./sensitive-dialog";
export default {
  name: "sensitiveManage",
  components: {
    sensitiveDialog
  },
  data() {
    return {
      filtersInfo: [
        {
          type: "input",
          placeholder: "请输入字典显示名",
          submitName: "name"
        },
        {
          type: "input",
          placeholder: "请输入对应字典值",
          submitName: "value"
        }
      ],
      tableInfo: {
        searchUrl: "/system/dict/data/list",
        deleteAllUrl: "/system/dict/data/del",
        defaultQuery: {
          parentCode: "FIX_SENSITIVE_WORD"
        },
        columns: [
          {
            prop: "name",
            label: "字典显示名"
          },
          {
            prop: "value",
            label: "对应字典值"
          },
          {
            prop: "memo",
            label: "描述"
          }
        ]
      },
      fileList: [],
      tableThis: ""
    };
  },
  methods: {
    uploadFile(item) {
      let fileObj = item.file;
      const form = new FormData();
      form.append("file", fileObj);
      this.$ajax.system.import(form).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg);
          this.tableThis.table.refresh();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    downLoad() {
      window.location.href = "/敏感词.xlsx";
    }
  }
};
</script>

<style lang="less" scoped>
.active-info-management {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>

<style lang="less">
.ccxvcxcv {
  .el-button--primary.is-plain {
    margin-left: 10px;
  }
}
</style>