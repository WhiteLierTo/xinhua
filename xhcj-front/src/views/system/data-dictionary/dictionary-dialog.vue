<template>
  <dialogTemplate :onClose="onClose" :onSubmit="onSubmit" :title="id?'修改字典类型':'添加字典类型'">
    <div class="content-container" v-loading="initLoading">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="字典名称" prop="name">
          <el-input v-model.trim="form.name" placeholder="请输入字典名称"></el-input>
        </el-form-item>
        <el-form-item label="字典类型" prop="code">
          <el-input v-model.trim="form.code" placeholder="请输入字典类型"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio :label="0">正常</el-radio>
            <el-radio :label="1">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" :rows="6" placeholder="请输入内容" v-model.trim="form.memo"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </dialogTemplate>
</template>

<script>
export default {
  name: "dictionaryDialog",
  props: ["onClose", "id"],
  data() {
    return {
      initLoading: false,
      form: {
        name: "",
        code: "",
        status: 1,
        memo: ""
      },
      rules: {
        name: [{ required: true, message: "请输入字典名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入字典类型", trigger: "blur" }]
      }
    };
  },
  mounted() {
    if (this.id) {
      this.getDictDetail();
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (!this.id) {
            this.$ajax.system.addDictList(this.form).then(res => {
              if (res.code === 200) {
                this.$message.success("新增成功");
                this.onClose();
              } else {
                this.$message.error(res.msg);
              }
            });
          } else {
            this.$ajax.system.updateDictList(this.form).then(res => {
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
    },
    getDictDetail() {
      this.$ajax.system.getDictDetail(this.id).then(res => {
        if (res.code === 200) {
          this.form = res.data;
          this.initLoading = false;
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.content-container {
  width: 100%;
}
</style>