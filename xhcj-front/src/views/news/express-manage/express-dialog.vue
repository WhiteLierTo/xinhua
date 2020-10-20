<template>
  <dialogTemplate :onClose="onClose" :onSubmit="onSubmit" :title="id?'快讯修改':'快讯添加'">
    <div class="content-container" v-loading="initLoading">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="快讯状态" prop="state">
          <el-select v-model="form.state" placeholder="请选择快讯状态" style="width:100%">
            <el-option
              v-for="item in stateList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="快讯内容" prop="content">
          <el-input type="textarea" :rows="6" placeholder="请输入内容" v-model.trim="form.content"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </dialogTemplate>
</template>

<script>
export default {
  name: "expressDialog",
  props: ["onClose", "id"],
  data() {
    return {
      initLoading: false,
      form: {
        state: "published",
        content: ""
      },
      rules: {
        content: [
          { required: true, message: "请输入快讯内容", trigger: "blur" }
        ]
      },
      stateList: this.$utils.data.news.newsStatusOptions()
    };
  },
  mounted() {
    if (this.id) {
      this.getdetailNewsFlash();
    }
  },
  methods: {
    onSubmit() {
      if (!this.id) {
        this.$ajax.news.express.addNewsFlash(this.form).then(res => {
          if (res.code === 200) {
            this.$message.success("新增成功");
            this.onClose();
          } else {
            this.$message.error(res.msg);
          }
        });
      } else {
        this.$ajax.news.express.updateNewsFlash(this.form).then(res => {
          if (res.code === 200) {
            this.$message.success("修改成功");
            this.onClose();
          } else {
            this.$message.error(res.msg);
          }
        });
      }
    },
    getdetailNewsFlash() {
      this.$ajax.news.express.detailNewsFlash(this.id).then(res => {
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