<template>
  <dialogTemplate
    ref="dialogTemplate"
    :onClose="onClose"
    :onSubmit="onSubmit"
    :title="id?'敏感词修改':'敏感词新增'"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="字典显示名" prop="name">
        <el-input v-model="form.name" placeholder="请输入字典显示名"></el-input>
      </el-form-item>
      <el-form-item label="对应字典值" prop="value">
        <el-input v-model="form.value" placeholder="请输入对应字典值"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" :rows="6" placeholder="请输入内容" v-model="form.memo"></el-input>
      </el-form-item>
    </el-form>
  </dialogTemplate>
</template>

<script>
export default {
  name: "sensitiveDialog",
  props: ["onClose", "id"],
  data() {
    return {
      form: {
        name: "",
        value: "",
        memo: "",
        parentCode: "FIX_SENSITIVE_WORD"
      },
      rules: {
        name: [
          { required: true, message: "请输入字典显示名", trigger: "blur" }
        ],
        value: [
          { required: true, message: "请输入对应字典值", trigger: "blur" }
        ]
      }
    };
  },
  async mounted() {
    if (this.id) {
      await this.getSettingDetail();
    }
  },
  methods: {
    async getSettingDetail() {
      let target = await this.$ajax.system.sensitiveDetail(this.id);
      this.form = target.data;
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (!this.id) {
            this.$ajax.system.addSensitive(this.form).then(res => {
              if (res.code === 200) {
                this.$message.success("新增成功");
                this.onClose();
              } else {
                this.$message.error(res.msg);
              }
            });
          } else {
            this.$ajax.system.updateSensitive(this.form).then(res => {
              if (res.code === 200) {
                this.$message.success("修改成功");
                this.onClose();
              } else {
                this.$message.error(res.msg);
              }
            });
          }
        }
      });
    }
  }
};
</script>

<style lang="less">
</style>