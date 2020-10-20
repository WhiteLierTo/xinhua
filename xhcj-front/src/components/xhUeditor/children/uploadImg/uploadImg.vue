<template>
  <div class="uploadImg-container">
    <input
        type="file" ref="fileInput"
        class="file-input" accept=".jpg,.png,.jpeg"
        :multiple="isMultiple"
        @change="onFileInputChange"
        v-if="twinkle"
    >
    <watermark ref="watermark" :onSubmit="onSubmitWatermark"/>
  </div>
</template>

<script>
  import watermark from "./children/watermark"

  export default {
    name: "uploadImg",
    components: {watermark},
    props: {
      onSubmit: Function
    },
    data() {
      return {
        editor: null,
        twinkle: true,
        isMultiple: false
      }
    },
    methods: {
      act(editor, isMultiple) {
        this.editor = editor;
        this.isMultiple = isMultiple;
        this.$nextTick(() => {
          this.$refs.fileInput.click();
        })
      },

      onFileInputChange() {
        let files = this.$refs.fileInput.files;
        this.twinkle = false;
        this.$nextTick(() => {
          this.twinkle = true;
        });
        this.$refs.watermark.act(files);
      },

      onSubmitWatermark(pathList) {
        if (this.editor) {
          this.editor.execCommand("insertimage", pathList.map(path => ({
            src: path
          })));
        } else if (this.onSubmit) {
          this.onSubmit(pathList)
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .uploadImg-container {
    .file-input {
      display: none;
    }
  }
</style>