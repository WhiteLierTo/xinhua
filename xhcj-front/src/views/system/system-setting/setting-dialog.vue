<template>
  <dialogTemplate ref="dialogTemplate" :onClose="onClose" :onSubmit="onSubmit" :title="id?'修改参数':'新增参数'">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="参数名称" prop="configName">
        <el-input v-model="form.configName" placeholder="请输入参数名称"></el-input>
      </el-form-item>
      <el-form-item label="参数键名" prop="configKey">
        <el-input v-model="form.configKey" placeholder="请输入参数键名"></el-input>
      </el-form-item>
      <el-form-item label="参数键值" prop="configValue">
        <el-input type="textarea" :rows="6" v-model="form.configValue" placeholder="请输入参数键值"></el-input>
      </el-form-item>
      <el-form-item label="系统内置">
        <el-radio v-model="form.configType" label="Y">是</el-radio>
        <el-radio v-model="form.configType" label="N">否</el-radio>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" :rows="6" placeholder="请输入内容" v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
  </dialogTemplate>
</template>

<script>
export default {
  name: "settingDialog",
  props: ["onClose", "id"],
  data() {
    return {
      form: {
        configName: "",
        configKey: "",
        configValue: "",
        configType: "",
        remark: ""
      },
      rules: {
        configName: [{ required: true, message: "请输入参数名称", trigger: "blur" }],
        configKey: [
          { required: true, message: "请输入参数键名", trigger: "blur" }
        ],
        configValue: [
          { required: true, message: "请输入参数键值", trigger: "blur" }
        ]
      },
      submitLoading: false, // 防抖
    };
  },
  async mounted() {
    if (this.id) {
      await this.getSettingDetail()
    }
  },
  methods: {
    async  getSettingDetail() {
      this.form = await this.$ajax.system.getSettingDetail(this.id);
    },
    //确定
    async onSubmit() {
      if (this.submitLoading) return;
      let flag;
      this.submitLoading = true;
      this.$refs.form.validate(async valid => {
        if (valid) {
          if (this.id) {
            this.$ajax.system.updateSetting(this.form).then(res => {
              if (res.code === 200) {
                this.$message.success(res.msg)
                this.$refs.dialogTemplate.closeSelf()
                flag = true
              } else {
                this.$message.error(res.msg);
              }
            });


          } else {
            this.$ajax.system.createSetting(this.form).then(res => {
              if (res.code === 200) {
                this.$message.success(res.msg)
                this.$refs.dialogTemplate.closeSelf()
                flag = true
              } else {
                this.$message.error(res.msg);
              }
            });

          }

        }
      })
      this.submitLoading = false;
      return flag
    },

  }
};
</script>

<style lang="less">
</style>
