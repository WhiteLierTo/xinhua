<template>
  <div class="upload-img-video-container">
    <div class="upload-file-container">
      <uploadFile upload-path="/system/theme/upload" accept=".MP4,.mp4" :maxSize="500 * 1000 * 1000" v-model="url"
                  :onProgress="onProgress"/>
      <span class="upload-tips">（仅支持上传mp4格式视频，且不超过500mb）</span>
    </div>
    <div class="show-image-container">
      <div class="progress-container" v-if="uploadPercent < 100">
        <div class="progress" :style="{width:`${uploadPercent}%`}"></div>
      </div>

      <img class="empty-img" src="../../assets/nopic.png" v-if="!videoUrl" alt/>
      <video :src="videoUrl"
             :controls="showControl"
             @mouseleave="showControl = false"
             @mouseenter="showControl = true"
             ref="video" v-else
      >
      </video>
    </div>
  </div>
</template>

<script>
  export default {
    name: "uploadImgVideo",
    props: {
      videoUrl: {
        type: String
      }
    },
    model: {
      prop: "videoUrl",
      event: "input"
    },
    data() {
      return {
        url: "",
        uploadPercent: 0,
        showControl: false
      }
    },

    watch: {
      url() {
        this.$emit("input", this.url)
      }
    },

    methods: {
      onProgress(progressEvent) {
        this.uploadPercent = (progressEvent.loaded / progressEvent.total) * 100;
      },

      getVideoDuration() {
        return this.$refs.video ? this.$refs.video.duration : 0
      },
    }

  }
</script>

<style scoped lang="less">
  @import "../../style/config";
  @import "../../style/styles";

  .show-image-container {
    width: 212px;
    height: 119px;
    text-align: center;
    background: #eee;
    margin: 10px 0;
    .flexCenter();
    position: relative;

    .empty-img {
      width: 50px;
    }

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
  }

  .upload-file-container {
    display: flex;
    align-items: center;

    .upload-tips {
      font-size: 14px;
      color: #d38416;
    }
  }
</style>
