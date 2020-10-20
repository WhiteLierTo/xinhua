<template>
  <div class="active-info-management">
    <tableWithFilter :filtersInfo="filtersInfo" :tableInfo="tableInfo">
      <createAndModify slot="create" slot-scope="scope" :onClose="scope.onClose"></createAndModify>
      <createAndModify slot="modify" slot-scope="scope" :id="scope.row.id" :onClose="scope.onClose"></createAndModify>
    </tableWithFilter>
  </div>
</template>

<script>
  import createAndModify from "./createAndModify";

  export default {
    // 活动管理
    name: "checkInManagement",
    components: {
      createAndModify
    },
    data() {
      return {
        filtersInfo: [
          {
            type: "input",
            placeholder: "请输入角色名称",
            submitName: "roleName"
          }
        ],
        tableInfo: {
          searchUrl: "/system/role/list",
          deleteAllUrl: "/system/role/batchDel",
          columns: [
            {
              prop: "name",
              label: "角色名称"
            },
            {
              prop: "status",
              label: "状态",
              beforeDisplay: row => !row.status ? '正常' : '停用'
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
        },
      };
    },

    methods: {}
  };
</script>

<style scoped lang="less">
  @import "../../../style/config";
  @import "../../../style/styles";

  .active-info-management {
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>

