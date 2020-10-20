<template>
  <dialogTemplate ref="dialogTemplate" :onClose="onCloseDialog" :onSubmit="onSubmit" title="邀请记录添加">
    <el-form ref="form" :model="invitationInfo" :rules="rules" label-width="90px" class="invitation-container">
      <el-form-item label="邀请人">
        <el-input v-model="invitationInfo.userName" style="width:230px;margin-right:20px;float: left;"
                  disabled></el-input>
        <personSelector :onSelect="onSelectPerson" style="float: left"/>
        <!--<el-button icon="el-icon-plus" type="text" @click="isShowSelect = true">选择人员</el-button>-->
      </el-form-item>

      <el-form-item label="渠道编码">
        <el-input v-model.trim="invitationInfo.channelCode" clearable></el-input>
      </el-form-item>

      <el-form-item label="操作日期">
        <el-date-picker
            v-model="invitationInfo.createdate"
            type="datetime" clearable
            value-format="timestamp"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item label="被邀请操作类型" style="width: 48%;float: left">
        <el-select v-model="invitationInfo.type" style="width: 100%;" clearable>
          <el-option label="访问" value="view"></el-option>
          <el-option label="安装" value="install"></el-option>
          <el-option label="注册" value="regist"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="被邀请操作设备类型" style="width: 48%;float: right">
        <el-select v-model="invitationInfo.deviceType" style="width: 100%;" clearable>
          <el-option label="安卓" value="android"></el-option>
          <el-option label="IOS" value="ios"></el-option>
          <el-option label="其他" value="other"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="访问URL" style="width: 48%;float: left">
        <el-input v-model.trim="invitationInfo.url" clearable></el-input>
      </el-form-item>

      <el-form-item label="IP地址" style="width: 48%;float: right">
        <el-input v-model.trim="invitationInfo.ip" clearable></el-input>
      </el-form-item>

      <div style="clear: both"></div>

      <el-form-item label="设备ID">
        <el-input v-model.trim="invitationInfo.deviceId" clearable></el-input>
      </el-form-item>

      <el-form-item label="是否有效邀请" style="width: 48%;float: left">
        <el-select v-model="invitationInfo.validNum" style="width: 100%;" clearable>
          <el-option label="有效邀请" :value="1"></el-option>
          <el-option label="无效邀请" :value="0"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="邀请次数" style="width: 48%;float: right">
        <el-input v-model.number="invitationInfo.num" type="number" clearable></el-input>
      </el-form-item>
    </el-form>

  </dialogTemplate>
</template>

<script>

  export default {
    name: "userDialog",
    props: ["onClose"],
    data() {
      return {
        invitationInfo: {
          userId: "", // 邀请人ID
          userName: "", // 邀请人名字
          channelCode: "", // 渠道编码
          type: "", // 访问安装注册
          createdate: "", // 操作日期 时间戳
          deviceType: "", // 机型
          deviceId: "", // 设备ID
          url: "", // 访问的url
          ip: "", // 访问的ip
          validNum: "", // 是否有效邀请
          num: "", // 邀请次数
        },
        rules: {},
      };
    },
    methods: {
      async onSubmit() {
        let [ok, msg] = await this.$ajax.invitation.create(this.invitationInfo);
        if (ok) {
          this.$message.success("操作成功");
          this.onCloseDialog.isSubmit = true;
        } else {
          this.$message.error(`操作失败,${msg}`);
        }
        return ok
      },

      onSelectPerson(row) {
        // 选择了用户
        this.invitationInfo.userId = row.id;
        this.invitationInfo.userName = row.name;
      },

      onCloseDialog() {
        this.onClose(!!this.onCloseDialog.isSubmit);
      }
    }
  }


</script>

<style lang="less" scoped>

</style>


<style lang="less">

  .invitation-container {
    .el-form-item {
      display: flex;
      align-items: center;

      .el-date-editor {
        width: 100% !important;
      }

      .el-form-item__label {
        line-height: 20px !important;
      }

      .el-form-item__content {
        margin-left: 10px !important;
        flex: 1 !important;
      }

    }
  }
</style>