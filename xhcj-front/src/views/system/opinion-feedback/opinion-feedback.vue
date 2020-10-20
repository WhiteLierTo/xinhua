<template>
  <div class="opinion-feedback-management">
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
    // 意见反馈
    name: "opinion-feedback",
    components: {},
    data() {
      return {
        filtersInfo: [
          {
            type: "input",
            placeholder: "请输入用户名",
            submitName: "nickName"
          },
          {
            type: "number",
            placeholder: "请输入手机号",
            submitName: "mobile"
          },

        ],
        tableInfo: {
          searchUrl: "/userSuggest/list",
          columns: [
            {
              prop: "nickName",
              label: "用户名"
            },
            {
              prop: "mobile",
              label: "手机号",
            },
            {
              prop: "content",
              label: "意见反馈",
            },
          ],
          hides: ["create", "modify", "deleteAll", "select"]
        },
      };
    },
  };
</script>

<style scoped lang="less">
  @import "../../../style/config";
  @import "../../../style/styles";

  .opinion-feedback-management {
    width: 100%;
    height: 100%;
  }
</style>
