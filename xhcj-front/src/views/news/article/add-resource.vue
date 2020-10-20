<template>
  <dialogTemplate ref="dialogTemplate" :onClose="onClose" :onSubmit="onSubmit" :title="id?'修改来源':'新增来源'">
    <el-form ref="form" :model="form" :rules="rules" label-width="90px">
      <el-form-item label="来源名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入文章来源名称"></el-input>
      </el-form-item>
      <el-form-item label="来源logo" prop="ext1">
        <div class="upload-box">
          <picCutting proportion="3:2" class="pic-cutting" uploadPath="/system/theme/upload" v-model="form.ext1" :max-size="1500000"></picCutting>
          <span class="upload-tips">（仅支持上传ipeg、jpg、png、bmp、gif格式图片，且不超过1500kb）</span>
          <div class="no-pic-cover-left">
            <img class="empty-img" src="../../../assets/nopic.png" v-if="!form.ext1" alt />
            <img class="nopic-img" :src="form.ext1" alt v-else />
          </div>
        </div>
      </el-form-item>
    </el-form>
  </dialogTemplate>
</template>

<script>
export default {
  name: "userDialog",
  props: ["onClose", "id"],
  data() {
    return {
      form: {
        name: "",
        ext1: ""
      },

      rules: {
        name: [
          { required: true, message: "请输入文章来源名称", trigger: "blur" }
        ],
        ext1: [
          { required: true, message: "请上传文章来源logo", trigger: "blur" }
        ],
      },



    };
  },
  async mounted() {
    if (this.id) {
      this.$ajax.news.article.resourceDetail(this.id).then(res => {
        this.form = res.data;
      });
    }

  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          if (this.id) {
            this.$ajax.news.article.resourceUpdate(this.form).then(res => {
              if (res.code === 200) {
                this.$message.success(res.msg)
                this.$refs.dialogTemplate.closeSelf()
                flag = true
              } else {
                this.$message.error(res.msg);
              }
            });

          } else {
            this.$ajax.news.article.addResource(this.form).then(res => {
              if (res.code === 200) {
                this.$message.success(res.msg)
                this.$refs.dialogTemplate.closeSelf()
              } else {
                this.$message.error(res.msg);
              }
            });
          }
        }

      })

    },

  }
}





</script>

<style lang="less" scoped>
@import "../../../style/config";
@import "../../../style/styles";
.upload-box {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  width: 530px;
}
.upload-tips {
  font-size: 14px;
  color: #d38416;
}
.no-pic-cover-left {
  width: 108px;
  height: 108px;
  line-height: 135px;
  text-align: center;
  background: rgba(238, 238, 238, 1);
  margin: 10px 0;
  border-radius: 50%;
  .empty-img {
    width: 50px;
  }

  .nopic-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
</style>