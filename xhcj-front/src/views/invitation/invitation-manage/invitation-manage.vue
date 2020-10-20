<template>
  <div class="invitation-management">
    <tableWithFilter :tableInfo="tableInfo" :filtersInfo="filtersInfo">
      <manageDialog slot="create" slot-scope="scope" :onClose="scope.onClose"/>
    </tableWithFilter>
  </div>
</template>
<script>


  import manageDialog from "./manage-dialog";

  export default {
    // 邀请管理
    name: "startUp",
    components: {
      manageDialog
    },
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
            type: "input",
            placeholder: "请输入邀请人手机号",
            submitName: "userMobile"
          },
          // {
          //   type: "input",
          //   placeholder: "请输入渠道编码",
          //   submitName: "channelCode"
          // },
          {
            type: "select",
            placeholder: "请选择被邀请操作类型",
            options: [{label: "访问", value: "view"}, {label: "安装", value: "install"}, {label: "注册", value: "regist"}],
            submitName: "type"
          },
          {
            type: "input",
            placeholder: "请输入URL",
            submitName: "url"
          },
          {
            type: "input",
            placeholder: "请输入IP",
            submitName: "ip"
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
        ],
        tableInfo: {
          searchUrl: "/inviteHist/list",
          deleteAllUrl: "/inviteHist/del",
          columns: [

            {
              prop: "userName",
              label: "邀请人姓名"
            },
            {
              prop: "userCompany",
              label: "邀请人公司",
            },
            {
              prop: "userMobile",
              label: "邀请人手机号",
            },
            {
              prop: "createDate",
              label: "邀请时间",
              beforeDisplay: row => this.$utils.format.timeStampToStandardStr(row.createDate)
            },
            {
              prop: "type",
              label: "被邀请操作类型",
              beforeDisplay: row => ({view: "访问", install: '安装', regist: "注册"}[row.type])
            },
            {
              type: "action",
              label: "访问的URL",
              content: row => row.url,
              styleConfig: {
                color: "rgba(67, 131, 228, 1)"
              },
              onClick: row => window.open(row.url, "_blank")

            },
            {
              prop: "deviceType",
              label: "客户端系统",
              beforeDisplay: row => ({android: "安卓", ios: 'IOS', other: "其他"}[row.deviceType])

            },
            {
              prop: "ip",
              label: "IP地址",
            },
            {
              prop: "deviceId",
              label: "设备ID",
            },
            {
              prop: "validNum",
              label: "是否有效邀请",
              beforeDisplay: row => row.validNum ? '有效' : '无效',
              styleConfig: {
                color: row => row.validNum ? '#515A6E' : '#DC4B41'
              }
            }
          ],
          hides: ["modify"]
        },

      };
    },
    methods: {}
  };
</script>
<style lang="less" scoped>
  @import "../../../style/config";
  @import "../../../style/styles";

  .invitation-management {
    width: 100%;
    height: 100%;
  }
</style>
