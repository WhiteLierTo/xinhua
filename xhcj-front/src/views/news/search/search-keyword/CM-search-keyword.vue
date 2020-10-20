<template>
  <dialogTemplate :title="isModify?'关键词修改':'关键词新增'" :onClose="onCloseDialog" :onSubmit="onsubmitResource">

    <el-form ref="form" :model="tagInfo" label-width="100px" :rules="rules">
      <el-form-item label="关键词" prop="keyword">
        <el-input v-model.trim="tagInfo.keyword"></el-input>
      </el-form-item>

      <el-form-item label="关键词标签">
        <el-radio-group v-model="tagInfo.lable">
          <el-radio :label="1">最新</el-radio>
          <el-radio :label="2">最热</el-radio>
          <el-radio :label="0">无</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="创建时间" v-if="tagInfo.createTime">
        {{ this.$utils.format.timeStampToStandardStr(tagInfo.createTime) }}
      </el-form-item>

    </el-form>
  </dialogTemplate>
</template>

<script>
export default {
  props: ["onClose", "isModify", "detail"],
  name: "CM-search-keyword",
  data() {
    return {
      tagInfo: {
        keyword: "",
        lable: 0
      },
      rules: {
        keyword: [
          { required: true, message: '请输入关键词', trigger: 'blur' },
        ]
      }
    }
  },
  mounted() {
    if (this.isModify) {
      this.tagInfo = this.$utils.gadgets.deepClone(this.detail);
    }
  },
  methods: {

    onCloseDialog() {
      this.onClose(!!this.onCloseDialog.isSubmit);
    },

    async onsubmitResource() {
      let _handleFunc = this.isModify ? this.$ajax.news.search.updateKeywordSync : this.$ajax.news.search.createKeywordSync;

      return await this.$refs.form.validate().then(async () => {
        let ok = await _handleFunc(this.tagInfo);
        if (!ok) {
          this.$message.error("操作失败");
          return false
        } else {
          this.$message.success("操作成功");
          this.onCloseDialog.isSubmit = true;
          return true;
        }
      }).catch(() => false)
    }
  }
}
</script>