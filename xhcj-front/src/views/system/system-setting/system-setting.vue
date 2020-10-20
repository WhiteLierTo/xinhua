<template>
  <div class="active-info-management">
    <tableWithFilter :filtersInfo="filtersInfo" :tableInfo="tableInfo" :mock="false">
      <settingDialog slot="create" slot-scope="scope" :onClose="scope.onClose"/>
      <settingDialog slot="modify" slot-scope="scope" :id="scope.row.id" :onClose="scope.onClose"/>
    </tableWithFilter>
  </div>
</template>
<script>
  import settingDialog from "./setting-dialog";

  export default {
    name: "systemSetting",
    components: {
      settingDialog
    },
    data() {
      return {
        filtersInfo: [
          {
            type: "input",
            placeholder: "请输入参数名称",
            submitName: "configName"
          },
          {
            type: "input",
            placeholder: "请输入参数键名",
            submitName: "configKey"
          },
          {
            type: "select",
            placeholder: "请选择系统内置",
            options: this.$utils.data.system.sysStatusOptions(),
            submitName: "configType"
          },
          {
            type: "dateRange",
            placeholder: ["创建开始时间", "创建结束时间", "-"],
            beforeSubmit: d => +d,
            submitName: ["beginTime", "endTime"]
          }
        ],
        tableInfo: {
          searchUrl: "/system/config/list",
          deleteAllUrl: "/system/config/del",
          columns: [
            {
              prop: "configName",
              label: "参数名称"
            },
            {
              prop: "configKey",
              label: "参数键名"
            },
            {
              prop: "configValue",
              label: "参数键值"
            },
            {
              prop: "configType",
              label: "系统内置",
              beforeDisplay: row => (row.configType === "Y" ? "是" : "否")
            },

            {
              prop: "remark",
              label: "备注"
            },
            {
              prop: "createTime",
              label: "创建时间",
              beforeDisplay: row => this.$utils.format.timeStampToStandardStr(row.createTime)
            }
          ],
          operations: {
            delete: {
              show: true
            }
          }
        }
      };
    },
    methods: {}
  };
</script>
<style lang="less" scoped>
  @import "../../../style/config";
  @import "../../../style/styles";

  .active-info-management {
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>
