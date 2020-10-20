<template>
  <div class="uploadFile-container">
    <input type="file" ref="fileInput"
           class="file-input" :accept="accept"
           @change="onFileInputChange"
           v-if="twinkle"
    >
    <div class="upload-bt" @click="uploadFile" :class="{disable:isLoading}">
      <i class="el-icon-upload" v-if="!isLoading"></i>
      <i class="el-icon-loading" v-else></i>
      <span>上传</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "uploadFile",
    data() {
      return {
        twinkle: true,
        isLoading: false
      }
    },
    props: {
      maxSize: {
        default: 0
      },
      uploadPath: {
        required: true
      },
      accept: {
        type: String,
        default: ".jpg,.png,.jpeg"
      },
      onProgress: {
        type: Function,
        default: function () {
        }
      }
    },
    methods: {

      uploadFile() {
        if (this.isLoading) return;
        this.$refs.fileInput.click();
      },

      onFileInputChange() {
        let file = this.$refs.fileInput.files[0];
        if (this.maxSize && file.size > this.maxSize) {
          this.$message.error(`最大支持上传${this.$utils.format.bTOHigherCompany(this.maxSize)}的文件`);
          return
        }
        this.isLoading = true;
        this.twinkle = false;
        this.$nextTick(() => {
          this.twinkle = true;
        });
        this.uploadFileToServer(file);
      },

      async uploadFileToServer(file) {
        let uploadFormData = new FormData();
        uploadFormData.append("file", file);
        let data = await this.$ajax.gadgets.uploadFileSync(uploadFormData, this.uploadPath, this.onProgress);
        let path = data.url;
        if (!path) {
          this.$message.error("上传失败");
        } else {
          this.$message.success("上传成功");
        }
        this.isLoading = false;
        this.$emit('input', path);
        return path
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../style/config";
  @import "../../style/styles";

  .uploadFile-container {
    .file-input {
      display: none;
    }

    .upload-bt {
      width: 80px;
      height: 30px;
      border-radius: 6px;
      border: 1px solid @defaultBlueClick;
      .flexCenter();
      color: @defaultBlueClick;
      cursor: pointer;

      i {
        font-size: 20px;
        margin-right: 4px;
        position: relative;
        top: 1px;
      }
    }
  }

  .disable {
    cursor: no-drop !important;
  }
</style>