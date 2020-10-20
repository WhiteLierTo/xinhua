<template>
  <div class="active-info-management sdaassda">
    <tableWithFilter
      v-model="tableThis"
      :filtersInfo="filtersInfo"
      :tableInfo="tableInfo"
      :mock="false"
    >
      <el-button
        type="info"
        icon="el-icon-delete"
        slot="table-left"
        @click="backHandle"
        :disabled="isMultiple"
      >还原</el-button>
      <el-button
        type="danger"
        icon="el-icon-refresh"
        slot="table-left"
        @click="deleteHandle"
        :disabled="isMultiple"
      >删除</el-button>
    </tableWithFilter>
  </div>
</template>
<script>
export default {
  name: "systemSetting",
  data() {
    return {
      filtersInfo: [
        {
          type: "input",
          placeholder: "请输入快讯内容",
          submitName: "content"
        }
      ],
      tableInfo: {
        searchUrl: "/newsFlash/list",
        defaultQuery: {
          content: "",
          beginTime: "",
          endTime: "",
          type: 2
        },
        columns: [
          {
            prop: "content",
            label: "快讯内容",
            maxWidth: "40%"
          },
          {
            prop: "publishDate",
            label: "发布时间",
            beforeDisplay: row =>
              this.$utils.format.timeStampToStandardStr(row.publishDate)
          },
          {
            prop: "createDate",
            label: "抓取时间",
            beforeDisplay: row =>
              this.$utils.format.timeStampToStandardStr(row.createDate)
          },
          {
            prop: "state",
            label: "状态",
            beforeDisplay: row =>
              this.$utils.data.news.getNewsStatusLabelByValue(row.state),
            presetStyle: {
              withPoint: {
                show: true,
                backgroundColor: row =>
                  this.$utils.data.news.getNewsStateColorByValue(row.state)
              }
            }
          },
          {
            prop: "num",
            label: "点赞数"
          }
        ],
        hides: ["create", "deleteAll", "modify"]
      },
      tableThis: ""
    };
  },
  computed: {
    isMultiple() {
      return (
        !this.tableThis ||
        !this.tableThis.table ||
        this.tableThis.table.multipleSelection.length === 0
      );
    },
    getId() {
      const ids = this.tableThis.table.multipleSelection.map(item => item.id);
      return ids;
    }
  },
  methods: {
    backHandle() {
      this.$confirm("确定还原吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          const form = {
            ids: this.getId,
            operateType: 1
          };
          this.updateRecycle(form);
        })
        .catch(() => {});
    },
    deleteHandle() {
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          const form = {
            ids: this.getId,
            operateType: 2
          };
          this.updateRecycle(form);
        })
        .catch(() => {});
    },
    updateRecycle(data) {
      this.$ajax.news.express.recycle(data).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg);
          this.tableThis.table.refresh();
        } else {
          this.$message.error(res.msg);
        }
      });
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

<style lang='less'>
.sdaassda {
  .el-button--danger {
    color: #fff;
    background-color: #8dbbd6;
    border-color: #8dbbd6;
  }
  .el-button--danger.is-disabled {
    background-color: #aecfe2;
    border-color: #aecfe2;
  }
  .el-button--info {
    color: #fff;
    background-color: #597088;
    border-color: #597088;
  }
  .el-button--info.is-disabled {
    background-color: #8497ab;
    border-color: #8497ab;
  }
}
</style>