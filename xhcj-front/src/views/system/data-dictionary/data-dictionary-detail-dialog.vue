<template>
  <dialogTemplate :onClose="onClose" :onSubmit="onSubmit" :title="id?'修改字典数据':'添加字典数据'">
    <div class="content-container">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="字典类型" prop="parentCode">
          <el-input v-model.trim="form.parentCode" placeholder="请输入字典类型" disabled></el-input>
        </el-form-item>
        <el-form-item label="数据标签" prop="name">
          <el-input v-model.trim="form.name" placeholder="请输入数据标签"></el-input>
        </el-form-item>
        <el-form-item label="数据键值" prop="value">
          <el-input v-model.trim="form.value" placeholder="请输入数据键值"></el-input>
        </el-form-item>
        <el-form-item label="显示排序" prop="sortId">
          <el-input-number v-model="form.sortId" controls-position="right" :min="0" />
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
      {{id}}
    </div>
  </dialogTemplate>
</template>

<script>
export default {
  name: "dictionaryDetailDialog",
  props: ["onClose", "id", "code"],
  data() {
    return {
      initLoading: true,
      form: {
        name: "",
        parentCode: this.code,
        status: 1,
        memo: "",
        value: "",
        sortId: ""
      },
      rules: {
        name: [{ required: true, message: "请输入数据标签", trigger: "blur" }],
        value: [{ required: true, message: "请输入数据键值", trigger: "blur" }],
        sortId: [{ required: true, message: "请输入显示排序", trigger: "blur" }]
      }
    };
  },
  mounted() {
    if (this.id) {
      this.getLogDictDetail();
    }
  },
  methods: {
    onSubmit() {
      if (!this.id) {
        this.$ajax.system.addLogDictList(this.form).then(res => {
          if (res.code === 200) {
            this.$message.success("新增成功");
            this.onClose();
          } else {
            this.$message.error(res.msg);
          }
        });
      } else {
        this.$ajax.system.updateLogDictList(this.form).then(res => {
          if (res.code === 200) {
            this.$message.success("修改成功");
            this.onClose();
          } else {
            this.$message.error(res.msg);
          }
        });
      }
    },
    getLogDictDetail() {
      this.$ajax.system.getLogDictDetail(this.id).then(res => {
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
