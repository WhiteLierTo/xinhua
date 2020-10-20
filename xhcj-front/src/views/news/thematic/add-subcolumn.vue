<template>
  <div class="vvfdfvfsdv">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="所属专题:">
        <span>{{this.parentInfo.name}}</span>
      </el-form-item>
      <el-form-item label="子栏目名称:" prop="name">
        <el-input v-model="form.name" placeholder="请输入组织名称"></el-input>
      </el-form-item>

      <el-form-item label="是否显示:" prop="displayFlag">
        <el-radio-group v-model="form.displayFlag">
          <el-radio :label="1">显示</el-radio>
          <el-radio :label="0">隐藏</el-radio>
        </el-radio-group>

      </el-form-item>
      <el-form-item label="客户端:" prop="backShowFlag">
        <el-radio-group v-model="form.backShowFlag">
          <el-radio :label="1">显示</el-radio>
          <el-radio :label="0">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm" class="sure">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "addSubcolumn",
  props: ["parentInfo"],
  data() {
    return {
      form: {
        parentId: "",
        name: "",
        displayFlag: 1,
        backShowFlag: 1
      },
      rules: {
        name: [{ required: true, message: "请输入子栏目名称", trigger: "blur" }],
        displayFlag: [{ required: true, message: "请选择", trigger: "blur" }],
        backShowFlag: [{ required: true, message: "请选择", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.form.parentId = this.parentInfo.id
  },

  methods: {
    cancel() {
      this.$emit("dialog-show", false);
      this.$refs.form.resetFields();
    },
    //确定
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$ajax.news.thematic.addSubcolumn(this.form).then(res => {
            if (res.code === 200) {
              this.$emit("dialog-show", false);
              this.$message.success("新增子栏目成功");
            }
          })
            .catch(res => {
              this.$message({
                type: "error",
                message: res.msg
              });
            })
        };
      })

    }
  }
};
</script>

<style lang="less">
.vvfdfvfsdv {
  padding-bottom: 30px;
  .dialog-footer {
    float: right;
  }
  .el-input__prefix {
    top: 0px;
  }
}
</style>
