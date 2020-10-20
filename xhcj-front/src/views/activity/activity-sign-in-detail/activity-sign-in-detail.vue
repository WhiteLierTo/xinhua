<template>
  <div class="active-info-management" v-loading="initLoading">
    <tableWithFilter
        :filtersInfo="filtersInfo"
        :tableInfo="tableInfo"
        v-model="tableThis"
        v-if="hasExtraTableHead"
    >
      <template slot="table-right">
        <el-button @click="projectionScreen">投屏</el-button>
        <!--<el-button type="primary" @click="exportInfo">导出</el-button>-->
      </template>
    </tableWithFilter>
  </div>
</template>

<script>
  // 签到明细
  import setting from "../../../setting";

  export default {
    name: "ActivitySignInDetail",
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
            placeholder: "请选择签到状态",
            options: this.$utils.data.activity.signInStatusOptions(),
            submitName: "signInStatus"
          }
        ],
        tableInfo: {
          searchUrl: "/activity/siginIn/userList",
          defaultQuery: {
            artId: this.$route.query.id
          },
          columns: [
            {
              prop: "name",
              label: "姓名",
            },
            {
              prop: "sex",
              label: "性别",
              beforeDisplay: row => this.$utils.data.activity.getSexLabelByValue(row.sex)
            },
            {
              prop: "mobile",
              label: "手机号",
            },
            {
              prop: "company",
              label: "公司",
            },
            {
              prop: "profession",
              label: "职业",
            },
            {
              prop: "post",
              label: "职务",
            },
            {
              prop: "remark",
              label: "备注",
            }
          ],
          hides: ["deleteAll", "create", "modify", "select"]
        },
        tableThis: null,
        afterExtraTableHead: [
          {
            prop: "signInStatus",
            label: "签到状态",
            beforeDisplay: row =>
                this.$utils.data.activity.getSignInStatusLabelByValue(row.signInStatus),
            presetStyle: {
              withPoint: {
                show: true,
                backgroundColor: row =>
                    this.$utils.data.activity.getSignInStatusColorByValue(row.signInStatus)
              }
            }
          },
          {
            prop: "signInTime",
            label: "签到时间",
            beforeDisplay: row =>
                this.$utils.format.timeStampToStandardStr(row.signInTime)
          }
        ],
        hasExtraTableHead: false, // 是否请求到了额外表头
        initLoading: true
      };
    },
    async created() {
      await this.getExtraTableHead();
      this.hasExtraTableHead = true;
      this.initLoading = false;
    },

    methods: {
      projectionScreen() {
        let routeUrl = this.$router.resolve({
          path: `/signScreen?id=${this.$route.query.id}`,
        });
        window.open(routeUrl.href, "_blank");
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
            `${setting.baseUrl}/activity/siginIn/userExport`
        );
        window.open(path, "_self");
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
