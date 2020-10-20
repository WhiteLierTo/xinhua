<template>
  <div class="upload-video-container">
    <input
        type="file" ref="VideoInput"
        class="file-input" accept=".mp4,.MP4"
        @change="onFileInputChange"
        v-if="twinkle"
    >
    <dialogTemplate
        v-if="isShowSetting"
        :onClose="onDialogClose"
        title="上传视频"
        ref="settingDialog"
    >
      <div class="content-container">
        <div class="video-container">
          <video ref="videoPlayer" :src="videoFileUrl" :poster="posterPath" controls v-if="videoTwinkle"></video>
        </div>
        <div class="settings-container">
          <div class="setting-row">
            <div class="label">宽度</div>
            <div class="input-container">
              <el-input-number v-model="videoWidth" :min="1" :max="1920" label="视频宽度"></el-input-number>
            </div>
          </div>
          <div class="setting-row">
            <div class="label">高度</div>
            <div class="input-container">
              <el-input-number v-model="videoHeight" :min="1" :max="1920" label="视频高度"></el-input-number>
            </div>
          </div>
          <!--<div class="setting-row">-->
          <!--<div class="label">对齐方式</div>-->
          <!--<div class="input-container">-->
          <!--<el-radio v-model="alignType" :label="0">左浮动</el-radio>-->
          <!--<br>-->
          <!--<el-radio v-model="alignType" :label="1">右浮动</el-radio>-->
          <!--<br>-->
          <!--<el-radio v-model="alignType" :label="2">独占一行</el-radio>-->
          <!--<br>-->
          <!--<el-radio v-model="alignType" :label="3">环绕</el-radio>-->
          <!--</div>-->
          <!--</div>-->

          <!--<div class="setting-row">-->
          <!--<div class="label">封面图</div>-->
          <!--<div class="input-container">-->
          <!--<el-button icon="el-icon-upload" @click="clickUploadPoster" type="primary">上传</el-button>-->
          <!--</div>-->
          <!--</div>-->

          <div class="setting-row" style="margin-top: auto;">
            <el-button type="primary" @click="uploadVideo">
              <i class="el-icon-loading" v-show="isUploading"></i>
              <span v-show="!isUploading">上传</span>
            </el-button>
            <el-button @click="clickCancel">取消</el-button>
          </div>
        </div>
      </div>
      <div slot="foot"></div>
    </dialogTemplate>

    <uploadImg ref="uploadImg" :onSubmit="onGetPoster"/>
  </div>
</template>

<script>
  import uploadImg from "../uploadImg/uploadImg"

  export default {
    name: "uploadVideo",
    components: {uploadImg},
    data() {
      return {
        isShowSetting: false,
        editor: null,
        twinkle: true,
        videoTwinkle: true,
        videoFile: null,
        videoFileUrl: "",
        videoWidth: 420,
        videoHeight: 280,
        alignType: 0,
        posterPath: "",
        isUploading: false,
      }
    },
    methods: {
      act(editor) {
        this.editor = editor;
        this.$nextTick(() => {
          this.$refs.VideoInput.click();
        });
      },

      onFileInputChange() {
        this.videoFile = this.$refs.VideoInput.files[0];
        this.twinkle = false;
        this.$nextTick(() => {
          this.twinkle = true;
        });
        this.isShowSetting = true;

        const reader = new FileReader();
        reader.onload = evt => {
          this.videoFileUrl = evt.target.result;
        };
        reader.readAsDataURL(this.videoFile);
      },

      onDialogClose() {
        this.videoFile = null;
        this.videoFileUrl = "";
        this.posterPath = "";
        this.isShowSetting = false;
      },

      clickUploadPoster() {
        this.$refs.uploadImg.act(null, false);
      },

      onGetPoster(pathList) {
        this.posterPath = pathList[0];
        this.videoTwinkle = false;
        this.$nextTick(() => {
          this.videoTwinkle = true;
        })
      },

      async uploadVideo() {
        if (this.isUploading) return;
        this.isUploading = true;
        this.uploadFileToServer(this.videoFile).then(url => {
          this.editor.execCommand("insertvideo", {
            url,
            width: this.videoWidth,
            height: this.videoHeight,
            poster: this.posterPath,
          });
        }).finally(() => {
          this.isUploading = false;
          this.$refs.settingDialog.closeSelf();
        })
      },

      async uploadFileToServer(file) {
        let uploadFormData = new FormData();
        uploadFormData.append("file", file);
        let data = await this.$ajax.gadgets.uploadFileSync(uploadFormData, "/activity/upload");
        return data.url
      },

      clickCancel() {
        this.$refs.settingDialog.closeSelf();
      }
    }
  }
</script>

<style scoped lang="less">
  .upload-video-container {
    .file-input {
      display: none;
    }

    .content-container {
      display: flex;
      height: 500px;

      .video-container {
        flex: 1;
        overflow: hidden;
        margin-right: 20px;
        display: flex;
        align-items: flex-start;
        justify-content: center;

        video {
          width: 100%;
        }
      }

      .settings-container {
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;

        .setting-row {
          margin-bottom: 20px;
          display: flex;
          align-items: center;

          .label {
            width: 70px;
            margin-right: 10px;
            flex-shrink: 0;
          }

          .input-container {
            flex: 1;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>