<template>
  <el-form-item :label="typeMapping[type].label" :required="isRequire">
    <div class="upload-file-container">
      <div class="upload-bt" @click="onUploadBtClick">
        <i class="el-icon-loading" v-if="isLoading"></i>
        <i class="el-icon-upload" v-else></i>
        <span>上传</span>
      </div>
      <span class="tip">{{ typeMapping[type].tip }}</span>
    </div>

    <div class="content-container">

      <div class="img-container">
        <div class="progress-container" v-if="uploadPercent < 100">
          <div class="progress" :style="{width:`${uploadPercent}%`}"></div>
        </div>

        <img :src="fileInfo.url" alt="" v-if="type === 'image' && fileInfo.type === 'image' &&  fileInfo.url">
        <img :src="fileInfo.coverUrl" alt=""
             v-else-if="type === 'cover' && (fileInfo.type === 'cover' || fileInfo.type === 'video') && fileInfo.coverUrl">
        <img :src="$utils.data.file.getImageByDocExtension(fileInfo.ext || fileInfo.name || fileInfo.originalFileName)"
             alt="" v-else-if="type === 'word' && fileInfo.type === 'word' && fileInfo.url">
        <video :src="fileInfo.url"
               :controls="showControl"
               @mouseleave="showControl = false"
               @mouseenter="showControl = true"
               v-else-if="type === 'video' && fileInfo.type === 'video' && fileInfo.url" ref="video"
        >
        </video>

        <img src="../../../assets/nopic-small.png" alt="" v-else>
      </div>

      <div class="file-detail" v-if="$utils.gadgets.isSpecialTrue(fileInfo.fileSize)">
        <div>文件大小：{{ $utils.format.bTOHigherCompany(fileInfo.fileSize) }}</div>
        <div>文件扩展名：{{ fileInfo.extName || fileInfo.ext }}</div>
        <div v-if="$utils.format.timeStampToStandardStr(fileInfo.createDate)">上传时间：{{
          $utils.format.timeStampToStandardStr(fileInfo.createDate) }}
        </div>
        <div v-if="fileInfo.userName">上传人：{{ fileInfo.userName }}</div>
      </div>

    </div>
    <input type="file" ref="fileInput" class="file-input" :accept="typeMapping[type].accept" @change="onFileInputChange"
           v-if="twinkle">
  </el-form-item>
</template>

<script>
  export default {
    name: "uploadFromItem",
    props: {
      type: String,
      onSuccess: {
        require: true,
        type: Function
      },
      detail: Object,
      setFileName: Function,
      isRequire: {
        type: Boolean,
        default: true
      },
    },
    data() {
      return {
        typeMapping: {
          image: {
            label: "图片",
            accept: ".jpg,.png,.jpeg,.bmp,.gif",
            tip: "（仅支持上传jpeg、jpg、png、bmp、gif格式图片，且不超过1500kb）",
            maxSize: 1500 * 1024
          },
          word: {
            label: "文档",
            accept: ".doc,.docx,.pdf,.txt,.xls,.xlsx,.pptx",
            tip: "（仅支持上传doc、docx、pdf、txt、xls、pptx等格式）",
            maxSize: 0
          },
          video: {
            label: "视频",
            accept: ".mp4,.MP4",
            tip: "（仅支持上传mp4格式视频，且不超过1G）",
            maxSize: 1024 * 1024 * 1024
          },
          cover: {
            label: "封面图",
            accept: ".jpg,.png,.jpeg,.bmp,.gif",
            tip: "（仅支持上传jpeg、jpg、png、bmp、gif格式图片，且不超过1500kb）",
            maxSize: 1500 * 1024
          }
        },
        twinkle: true,
        uploadPercent: 0,
        fileInfo: {}, // 上传完的文件
        file: {},

        showControl: false,

        isLoading: false

      }
    },

    mounted() {
      if (this.detail && this.detail.name) {
        this.onModifyInit();
      }
    },

    methods: {
      onModifyInit() {
        // 如果是修改的初始化
        this.fileInfo = this.$utils.gadgets.deepClone(this.detail);
      },

      onUploadBtClick() {
        this.$refs.fileInput.click();
      },

      async onFileInputChange() {
        let file = this.$refs.fileInput.files[0];
        this.twinkle = false;
        this.$nextTick(() => {
          this.twinkle = true
        });

        if (this.typeMapping[this.type].maxSize && file.size > this.typeMapping[this.type].maxSize) {
          this.$message.error(`最大支持上传${this.$utils.format.bTOHigherCompany(this.typeMapping[this.type].maxSize)}的文件`);
          return
        }

        this.isLoading = true;

        this.file = file;

        this.setFileName && this.setFileName(this.file.name);

        this.uploadPercent = 0;
        this.fileInfo.url = "";
        this.fileInfo.coverUrl = "";
        this._onFileUpload(this.file);
      },

      async _onFileUpload(file, path = "/resource/upload") {
        let formData = new FormData();
        formData.append("file", file);
        this.fileInfo = await this._upload(formData, path);
        this.fileInfo.type = this.type;
        if (this.type === 'cover') {
          this.fileInfo.coverUrl = this.fileInfo.url;
        }

        this.onSuccess && this.onSuccess(this.fileInfo);
        this.isLoading = false;
      },

      getVideoDuration() {
        return this.$refs.video.duration || false
      },

      async _upload(formData, path) {
        return await this.$ajax.gadgets.uploadFileSync(formData, path, progressEvent => {
          this.uploadPercent = (progressEvent.loaded / progressEvent.total) * 100;
        })
      }
    }
  }
</script>


<style scoped lang="less">
  @import "../../../style/config";
  @import "../../../style/styles";

  .upload-file-container {
    display: flex;
    align-items: center;

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

    .tip {
      color: @darkOrange;
    }
  }

  .content-container {
    display: flex;
    align-items: flex-start;
    height: 120px;
    margin-top: 10px;

    .img-container {
      width: 210px;
      height: 100%;
      flex-shrink: 0;

      background: @defaultBgColor;
      .flexCenter();
      position: relative;

      video {
        width: 100%;
        height: 100%;
        border: none;
        overflow: hidden;
      }

      .progress-container {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 4px;
        overflow: hidden;

        .progress {
          height: 100%;
          background: @successGreen;
          transition: all @defaultAnimationTime;
        }
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: scale-down;
      }
    }

    .file-detail {
      color: @lightGray;
      margin-left: 20px;

      div {
        margin-bottom: 0;
        line-height: 24px;
      }
    }
  }

  .file-input {
    display: none;
  }
</style>
