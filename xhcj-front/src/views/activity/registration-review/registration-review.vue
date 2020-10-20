<template>
  <div class="active-info-management" v-loading="initLoading">
    <tableWithFilter :filtersInfo="filtersInfo" :tableInfo="tableInfo" v-model="tableThis" v-if="isShowTable">
      <!--<el-button type="primary" slot="table-right" @click="exportInfo">导出</el-button>-->

      <template slot="table-left" v-if="activityState === 'l3_hot'">
        <el-button type="primary" :disabled="isMultiple" @click="applyAll(1)">批量通过</el-button>
        <el-button :disabled="isMultiple" @click="applyAll(2)">批量不通过</el-button>
      </template>
    </tableWithFilter>
  </div>
</template>

<script>
  import setting from "../../../setting";

  export default {
    // 报名审核
    name: "RegistrationReview",
    data() {
      return {
        filtersInfo: [
          {
            type: "input",
            placeholder: "请输入姓名",
            submitName: "name"
          },
          {
            type: "select",
            placeholder: "请选择性别",
            defaultValue: "",
            options: this.$utils.data.activity.sexOptions(),
            submitName: "sex"
          },
          {
            type: "input",
            placeholder: "请输入手机号",
            submitName: "mobile"
          },
          {
            type: "input",
            placeholder: "请输入公司名称",
            submitName: "company"
          },
          {
            type: "input",
            placeholder: "请输入职务",
            submitName: "post"
          },
          {
            type: "select",
            placeholder: "请选择审核状态",
            defaultValue: "",
            options: this.$utils.data.activity.applyStatusOptions(),
            submitName: "applyStatus"
          }
        ],
        tableInfo: {
          searchUrl: "/activity/apply/auditList",
          defaultQuery: {
            artId: this.$route.query.id
          },
          columns: [
            {
              prop: "name",
              label: "姓名",
            },
            {
              label: "性别",
              beforeDisplay: row => this.$utils.data.activity.getSexLabelByValue(row.sex)
            },
            {
              prop: "mobile",
              label: "手机号"
            },
            {
              prop: "company",
              label: "公司",
            },
            {
              prop: "profession",
              label: "职业"
            },
            {
              prop: "post",
              label: "职务"
            },
            {
              prop: "remark",
              label: "备注"
            }
          ],
          hides: ["create", "deleteAll", "modify"],
          modifyConfig: {
            onInSituModify: this.onSeatChange
          }
        },
        afterExtraTableHead: [
          {
            prop: "applyStatus",
            label: "审核状态",
            beforeDisplay: row =>
                this.$utils.data.activity.getApplyStatusLabelByValue(row.applyStatus),
            presetStyle: {
              withPoint: {
                show: true,
                backgroundColor: row =>
                    this.$utils.data.activity.getApplyStatusColorByValue(row.applyStatus)
              }
            }
          },
          {
            prop: "seat",
            label: "添加座次",
            canModify: false,
            beforeDisplay: row => (row.applyStatus !== 1 ? "无" : row.seat),
            disable: row => row.applyStatus !== 1,
            minWidth: this.activityState === "l3_hot" ? 140 : ""
          }
        ],
        tableThis: null,

        isShowTable: false, // 是否请求到了额外表头切判断了活动状态
        activityState: "", // 活动状态
        initLoading: true,
      };
    },
    async created() {
      await Promise.all([this.getExtraTableHead(), this.getArtivityState()]).then(() => {
        this.isShowTable = true;
        this.initLoading = false;
      })
    },

    computed: {
      isMultiple() {
        // 是否有元素被选中
        return (
            !this.tableThis ||
            !this.tableThis.table ||
            this.tableThis.table.multipleSelection.length === 0

        );
      }
    },

    methods: {
      async getArtivityState() {
        this.activityState = await this.$ajax.activity.getStateSync(this.$route.query.id);
        this.afterExtraTableHead[1].canModify = this.activityState === "l3_hot"
      },

      async getExtraTableHead() {
        let extraTableHead = await this.$ajax.gadgets.getExtraTableHeadSync(
            this.$route.query.id
        );
        this.tableInfo.columns = [
          ...this.tableInfo.columns,
          ...extraTableHead.map(head => ({
            prop: head.name.toString(),
            label: head.value,
          })),
          ...this.afterExtraTableHead
        ];
      },

      exportInfo() {
        let path = this.$utils.gadgets.jsonToParams(
            {...this.tableThis.filter.getSearchMap(), actId: this.$route.query.id},
            `${setting.baseUrl}/activity/apply/exporAuditList`
        );
        window.open(path, "_self");
      },

      async applyAll(applyStatus) {
        let ids = this.tableThis.table.multipleSelection.map(d => d.id);
        if (await this.$ajax.activity.applyAuditSync(applyStatus, ids)) {
          this.tableThis.table.refresh();
          this.$message.success("批量操作成功");
        } else {
          this.$message.success("批量操作失败");
        }
      },

      async onSeatChange(oldRow, col, val, refresh) {
        if (col.prop === "seat") {
          if (!this.$utils.gadgets.isSpecialTrue(val)) {
            this.$message.error("座位信息不可为空");
            return;
          }
          if (await this.$ajax.activity.addAndModifySeat(oldRow.id, val)) {
            this.$message.success("修改成功");
            refresh();
          } else {
            this.$message.error("修改失败");
          }
        }
      }
    }
  };
</script>

<style scoped lang="less">
  .active-info-management {
    width: 100%;
    height: 100%;
  }
</style>
