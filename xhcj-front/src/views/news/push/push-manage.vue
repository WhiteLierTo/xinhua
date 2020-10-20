<template>
  <div class="active-info-management">
    <tableWithFilter :filtersInfo="filtersInfo" :tableInfo="tableInfo">
    </tableWithFilter>
  </div>
</template>

<script>
  export default {
    // 推送管理
    name: "pushManage",
    data() {
      return {
        filtersInfo: [
          {
            type: "input",
            placeholder: "请输入标题",
            submitName: "pushTitle",
          },
        ],
        tableInfo: {
          searchUrl: "/push/list",
          deleteAllUrl: "/push/del",
          columns: [
            {
              prop: "type",
              label: "类型",
              beforeDisplay: (row) => (row.type === 1 ? "稿件消息" : " "),
            },
            {
              prop: "articleType",
              label: "稿签类型",
              beforeDisplay: (row) =>
                  this.$utils.data.manuscript.getManuscriptStatusLabelByValue(
                      row.articleType
                  ),
            },
            {
              prop: "pushTitle",
              label: "标题",
            },
            {
              prop: "pushBody",
              label: "内容",
            },
            {
              prop: "pushTime",
              label: "推送时间",
              beforeDisplay: (row) =>
                  this.$utils.format.timeStampToStandardStr(row.pushTime),
            },
            {
              prop: "pushFlag",
              label: "推送状态",
              beforeDisplay: row => ["未推送", "推送成功", "推送失败"][row.pushFlag],
            },
            {
              prop: "createTime",
              label: "创建时间",
              beforeDisplay: (row) =>
                  this.$utils.format.timeStampToStandardStr(row.createTime),
            },
            {
              prop: "pushUserName",
              label: "推送人",
            },
          ],
          hides: ["create", "modify", "deleteAll", "select"],
          operations: {
            delete: {
              show: true,
            },
          },
        },
      };
    },

    methods: {},
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
