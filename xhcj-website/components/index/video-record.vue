<template>
  <div class="video-records-container">
    <div
      class="video-img-container"
      v-for="(video,index) in videos"
      :key="index"
      @click="videoClick(video)"
    >
      <div class="video-text">视频回放</div>
      <div class="video-title">{{ video.title }}</div>
      <img :src="video.preImgPath" alt class="video-cover"/>
    </div>
    <downLoadDialog v-show="dialogShow" @dialogHiddle="dialogHiddle"/>
  </div>
</template>

<script>
  import downLoadDialog from "../layouts/downLoadDialog";

  export default {
    name: "video-record",
    components: {
      downLoadDialog
    },
    props: {
      videos: Array
    },
    data() {
      return {
        fakeVideoList: [
          {
            title: "南京校区实施最严封闭式管理：疫情最重地区人员不得入内",
            img:
              "http://xhfmedia.oss-cn-hangzhou.aliyuncs.com/appimages/202002/7d488fa8-4e57-40a6-8bb6-08e70e7da5e9_crop_r.jpg"
          },
          {
            title: "南京校区实施最严封闭式管理：疫情最重地区人员不得入内",
            img:
              "http://xhfmedia.oss-cn-hangzhou.aliyuncs.com/appimages/202002/7d488fa8-4e57-40a6-8bb6-08e70e7da5e9_crop_r.jpg"
          }
        ],
        dialogShow: false
      };
    },
    methods: {
      videoClick(video) {
        location.href = `/videoDetail?id=${video.id}`
      },
      dialogHiddle() {
        this.dialogShow = false;
      }
    }
  };
</script>

<style scoped lang="less">
  .video-records-container {
    width: 100%;
    display: flex;
    flex-direction: column;

    .video-img-container {
      overflow: hidden;
      margin-bottom: 22px;
      position: relative;
      border-radius: 8px;
      cursor: pointer;

      &:hover .video-cover {
        transform: scale(1.1);
      }

      .video-cover {
        width: 100%;
        transition: all 0.5s;
        display: block;
      }

      .video-text {
        position: absolute;
        left: 10px;
        top: 10px;
        background: rgba(0, 0, 0, 0.25);
        color: white;
        font-size: 12px;
        padding: 2px 10px;
        border-radius: 12px;
        z-index: 30;
      }

      .video-title {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        border-radius: 4px;
        padding: 20px;
        color: white;
        font-size: 20px;
        font-weight: 600;
        line-height: 28px;
        background-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0),
          rgba(0, 0, 0, 0.7)
        );
        z-index: 30;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    .mob {
      .video-img-container {
        margin-bottom: 0.2rem;
        border-radius: 0.05rem;
      }

      .video-title {
        font-size: 15px !important;
        line-height: 22px;
      }
    }
  }
</style>
