<template>
  <div class="sdaassda">
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
          v-allow="'news:newsFlash:delete:recycle'"
      >放入回收站
      </el-button>
      <el-button
          type="danger"
          icon="el-icon-refresh"
          slot="table-left"
          @click="holdHandle"
          :disabled="isMultiple"
          v-allow="'news:newsFlash:grash:promptly'"
      >立即执行快讯抓取
      </el-button>
      <expressDialog slot="create" slot-scope="scope" :onClose="scope.onClose"/>
      <expressDialog slot="modify" slot-scope="scope" :id="scope.row.id" :onClose="scope.onClose"/>
    </tableWithFilter>
  </div>
</template>
<script>
  import expressDialog from "./express-dialog";

  export default {
    name: "systemSetting",
    components: {
      expressDialog
    },
    data() {
      return {
        filtersInfo: [
          {
            type: "input",
            placeholder: "请输入快讯内容",
            submitName: "content"
          },
          {
            type: "select",
            placeholder: "请选择快讯状态",
            options: this.$utils.data.news.newsStatusOptions(),
            submitName: "state"
          },
          {
            type: "dateRange",
            placeholder: ["发布开始时间", "发布结束时间", "-"],
            beforeSubmit: d => +d,
            submitName: ["beginTime", "endTime"]
          }
        ],
        tableInfo: {
          permissionHead: "news:newsFlash",
          searchUrl: "/newsFlash/list",
          defaultQuery: {
            content: "",
            beginTime: "",
            endTime: "",
            type: 1
          },
          columns: [
            {
              prop: "content",
              label: "快讯内容",
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
          hides: ["deleteAll"]
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
        return this.tableThis.table.multipleSelection.map(item => item.id);
      }
    },

    methods: {
      backHandle() {
        this.$confirm("确定放入回收站吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        })
            .then(() => {
              const form = {
                ids: this.getId,
                operateType: 3
              };
              this.updateRecycle(form);
            })
            .catch(() => {
            });
      },
      holdHandle() {
        this.$confirm("确定要立即执行抓取么？请勿频繁抓取！", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        })
            .then(() => {
            })
            .catch(() => {
            });
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
  .sdaassda {
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
