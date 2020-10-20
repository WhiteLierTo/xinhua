<template>
  <div class="active-info-management">
    <tableWithFilter :filtersInfo="filtersInfo" :tableInfo="tableInfo">
    </tableWithFilter>
  </div>
</template>

<script>
  export default {
    // 报名管理
    name: "ActivitySignUp",
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
          searchUrl: "/activity/apply/list",
          columns: [
            {
              prop: "title",
              label: "活动标题",
            },
            {
              prop: "startdate",
              label: "开始时间",
              align: "center",
              beforeDisplay: row => this.$utils.format.timeStampToStandardStr(row.startdate)
            },
            {
              prop: "enddate",
              label: "结束时间",
              beforeDisplay: row => this.$utils.format.timeStampToStandardStr(row.enddate)
            },
            {
              prop: "state",
              label: "活动状态",
              beforeDisplay: row => this.$utils.data.activity.getActStateLabelByValue(row.state),
              presetStyle: {
                withPoint: {
                  show: true,
                  backgroundColor: row => this.$utils.data.activity.getActStateColorByValue(row.state),
                }
              }
            },
            {
              prop: "num",
              label: "预设报名数",
            },
            {
              prop: "applySum",
              label: "总报名数",
            },
            {
              prop: "applyHandingCount",
              label: "未审核人数",
            },
            {
              prop: "applyAuditSucCount",
              label: "审核通过人数",
            },
            {
              type: "action",
              label: "操作",
              fixed: "right",
              content: row => row.state === 'l3_hot' ? '开始审核' : row.state === 'l1_finish' ? '查看' : this.$utils.data.activity.getActStateLabelByValue(row.state),
              disable: row => row.state !== 'l1_finish' && row.state !== 'l3_hot',
              onClick: this.startExamine
            }
          ],
          hides: ["select", "create", "deleteAll", "modify"],
        },

      }
    },
    methods: {
      startExamine(row) {
        this.$router.push(`/activity/signUp/registrationReview?id=${row.id}`)
      }
    }
  }
</script>

<style scoped lang="less">
  .active-info-management {
    width: 100%;
    height: 100%;
  }
</style>
