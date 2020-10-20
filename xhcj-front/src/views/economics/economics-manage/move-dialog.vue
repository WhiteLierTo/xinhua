<template>
  <div class="jkbjddd">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-col :span="24">
        <el-form-item label="移动至" prop="sortNumber">
          <el-input v-model="form.sortNumber" placeholder="请输入移动位置的排序序号" />
        </el-form-item>
      </el-col>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm" class="sure">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "moveDialog",
  data() {
    return {
      form: { sortNumber: "" },
      rules: {} //表单校验
    };
  },
  methods: {
    cancel() {
      this.$emit("dialog-show", false);
    },
    submitForm() {}
  }
};
</script>
<style lang='less'>
.jkbjddd {
  overflow: hidden;
  .dialog-footer {
    float: right;
    padding-top: 30px;
  }
}
</style>