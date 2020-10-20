<template>
  <div class="active-info-management">
    <tableWithFilter :filtersInfo="filtersInfo" :tableInfo="tableInfo" v-model="tableThis">
      <!--      <el-button type="primary" slot="table-right" @click="exportInfo">导出</el-button>-->
    </tableWithFilter>
  </div>
</template>

<script>
  // 签到管理
  // import setting from "../../../setting";

  export default {
    name: "ActivitySignIn",
    data() {
      return {
        filtersInfo: [
          {
            type: "input",
            placeholder: "请输入活动名称",
            submitName: "actName"
          },
          {
            type: "select",
            placeholder: "请选择活动状态",
            defaultValue: "",
            options: this.$utils.data.activity.getPartActStateOptionsByValues(["l3_hot", "l1_finish"]),
            submitName: "actState"
          },
          {
            type: "dateRange",
            placeholder: ["报名开始时间", "报名结束时间", "-"],
            beforeSubmit: d => +d,
            submitName: ["actAplStartTime", "actAplEndTime"]
          }
        ],
        tableInfo: {
          searchUrl: "/activity/siginIn/list",
          columns: [
            {
              prop: "title",
              label: "活动标题"
            },
            {
              prop: "startdate",
              label: "活动开始时间",
              beforeDisplay: row =>
                  this.$utils.format.timeStampToStandardStr(row.startdate)
            },
            {
              prop: "enddate",
              label: "活动结束时间",
              beforeDisplay: row =>
                  this.$utils.format.timeStampToStandardStr(row.enddate)
            },
            {
              prop: "state",
              label: "活动状态",
              beforeDisplay: row =>
                  this.$utils.data.activity.getActStateLabelByValue(row.state),
              presetStyle: {
                withPoint: {
                  show: true,
                  backgroundColor: row =>
                      this.$utils.data.activity.getActStateColorByValue(row.state)
                }
              }
            },
            {
              prop: "num",
              label: "预设报名数"
            },
            {
              prop: "applySum",
              label: "实际报名数"
            },
            {
              prop: "siginedInCount",
              label: "已签到"
            },
            {
              prop: "siginInCount",
              label: "未签到"
            },
            {
              type: "action",
              label: "明细",
              content: "查看",
              fixed: "right",
              onClick: row =>
                  this.$router.push(`/activity/signIn/signInDetail?id=${row.id}`)
            }
          ],
          hides: ["deleteAll", "create", "modify", "select"]
        },
        tableThis: null
      };
    },

    methods: {
      exportInfo() {
        // let path = this.$utils.gadgets.jsonToParams(this.tableThis.filter.getSearchMap(), `${setting.baseUrl}/activity/apply/exporAuditList`);
        // window.open(path, "_blank");
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
