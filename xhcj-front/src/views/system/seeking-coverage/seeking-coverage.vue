<template>
  <div class="demand-report-management">
    <tableWithFilter
        :filtersInfo="filtersInfo"
        :tableInfo="tableInfo"
        :mock="false"
    >
    </tableWithFilter>
  </div>
</template>

<script>
  export default {
    // 寻求报道
    name: "demand-report",
    components: {},
    data() {
      return {
        filtersInfo: [
          {
            type: "input",
            placeholder: "请输入姓名",
            submitName: "name"
          },
          {
            type: "input",
            placeholder: "请输入公司名称",
            submitName: "company"
          },
          {
            type: "input",
            placeholder: "请输入邮箱",
            submitName: "email"
          },
          {
            type: "number",
            placeholder: "请输入手机号",
            submitName: "phone"
          },

        ],
        tableInfo: {
          searchUrl: "/seekReport/list",
          deleteAllUrl:"/seekReport/del",
          columns: [
            {
              prop: "nickName",
              label: "姓名"
            },
            {
              prop: "company",
              label: "公司",
            },
            {
              prop: "email",
              label: "邮箱",
            },
            {
              prop: "phone",
              label: "手机号",
            },
            {
              prop: "reportNeed",
              label: "报道需求",
            },
            {
              prop: "ip",
              label: "提交IP",
            },
            {
              prop: "createDate",
              label: "提交日期",
              beforeDisplay: row => this.$utils.format.timeStampToStandardStr(row.createDate)
            },

          ],
          hides: ["create", "modify"]
        },
      }
          ;
    },
  };
</script>

<style scoped lang="less">
  @import "../../../style/config";
  @import "../../../style/styles";

  .demand-report-management {
    width: 100%;
    height: 100%;
  }
</style>

