<template>
  <div class="start-up-management">
    <tableWithFilter :tableInfo="tableInfo" :filtersInfo="filtersInfo">
    </tableWithFilter>
  </div>
</template>
<script>
  export default {
    // 邀请统计
    name: "startUp",
    components: {},
    data() {
      return {
        filtersInfo: [
          {
            type: "input",
            placeholder: "请输入邀请人姓名",
            submitName: "userName"
          },
          {
            type: "input",
            placeholder: "请输入邀请人公司",
            submitName: "userCompany"
          },
          {
            type: "number",
            placeholder: "请输入邀请人手机号",
            submitName: "userMobile"
          },
          {
            type: "input",
            placeholder: "请输入渠道编码",
            submitName: "channelCode"
          },
          {
            type: "select",
            placeholder: "请选择被邀请操作设备",
            options: [{label: "安卓", value: "android"}, {label: "IOS", value: "ios"}, {label: "其他", value: "other"}],
            submitName: "deviceType"
          },
          {
            type: "dateRange",
            placeholder: ["查询开始时间", "查询结束时间", "-"],
            beforeSubmit: d => +d,
            submitName: ["beginTime", "endTime"]
          },
          {
            type: "select",
            placeholder: "请选择是否有效邀请",
            options: [{label: "有效邀请", value: 1}, {label: "无效邀请", value: 0}],
            submitName: "validNum"
          },
          {
            type: "select",
            placeholder: "请选择排序方式",
            options: [
              {label: "点击量降序", value: 1},
              {label: "点击量升序", value: 2},
              {label: "安装量降序", value: 3},
              {label: "安装量升序", value: 4},
              {label: "注册量降序", value: 5},
              {label: "注册量升序", value: 6},
            ],
            submitName: "sort"
          },
        ],
        tableInfo: {
          searchUrl: "/inviteHist/reprotList",
          columns: [
            {
              prop: "userName",
              label: "姓名"
            },
            {
              prop: "userCompany",
              label: "公司",
            },
            {
              prop: "userMobile",
              label: "手机号",
            },
            {
              prop: "channelCode",
              label: "渠道编码",
            },

            {
              prop: "viewNum",
              label: "点击量",
            },
            {
              prop: "installNum",
              label: "安装量",
            },
            {
              prop: "registNum",
              label: "注册量",
            },

          ],

          hides: ["deleteAll", "modify", "create", "select"]
        },

      };
    },
    methods: {}
  };
</script>
<style lang="less" scoped>
  @import "../../../style/config";
  @import "../../../style/styles";

  .start-up-management {
    width: 100%;
    height: 100%;
  }
</style>