<template>
  <div class="live-detail-container">
    <h1>{{ info.title }}</h1>

    <div class="author-line" style="margin-bottom: 40px">
      <p class="author-left">
        <!--<span class="colored">{{ info.source }}</span>-->
        <span v-if="info.publicTime">{{ info.publicTime | dayFormat}}</span>
        <span v-if="info.keyword">&nbsp;&nbsp;·&nbsp;&nbsp;{{ info.keyword }}</span>
      </p>
      <shareWx/>
    </div>

    <img :src="info.preImgPath" alt="" style="width: 100%" v-if="info.state === 'l2_coming'">

    <video
      id="myVideo"
      class="video-js vjs-default-skin vjs-big-play-centered"
      style="width: 1120px"
      v-else
      :poster="info.preImgPath"
    >
      <source
        :src="info.videoPath"
        :type="VideoType"
        id="target"
        :poster="info.preImgPath"
      >
    </video>

    <div class="desc">{{ info.description }}</div>

    <div class="copyright-container">
      <p>版权声明：</p>
      <p>『 新华日报财经客户端 』保留本文所有权利，</p>
      <p>如需转发，请注明来源和作者；</p>
      <p>新闻热线 / 维权爆料 / 商务合作：18705165119</p>
    </div>

    <div class="bottom-author-line">
      <span style="margin-right: 30px" v-if="info.editorUserName">编辑:{{ info.editorUserName }}</span>
      <span v-if="info.proofreadUserName">审校:{{ info.proofreadUserName }}</span>
    </div>

    <div class="author-line" style="margin-top: 15px;">
      <p class="author-left">
        <!--<img :src="info.sourceLogo || defaultLogo" alt class="logo"/>-->
        <!--<span class="colored">{{ info.source }}</span>-->
      </p>
      <shareWx/>
    </div>

    <div class="comment-box" @click="goDownload">
      您可以在新华日报财经客户端写下评论
      <i class="fa fa-angle-right" style="position: relative;top: 1px;"></i>
    </div>
  </div>
</template>

<script>
  import liveDetailMixin from "../mixins/liveDetail";
  import shareWx from "../components/public/shareWx";

  export default {
    name: "videoDetail",
    components: {shareWx},
    mixins: [liveDetailMixin]
  };
</script>

<style scoped lang="less">
  .live-detail-container {
    width: 1120px;
    margin: 80px auto 20px;

    h1 {
      color: #222222;
      font-size: 24px;
      margin-bottom: 20px;
    }

    .author-line {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .author-left {
        color: #b5b5b5;
        display: flex;
        align-items: center;

        .colored {
          color: #666;
        }

        .logo {
          height: 25px;
          margin-right: 16px;
          border-radius: 50%;
        }
      }
    }

    .video {
      width: 100%;
      margin: 40px auto;
    }

    .desc {
      font-weight: 300;
      line-height: 26px;
      text-align: justify;
      margin-top: 40px;
    }

    .copyright-container {
      color: #999999;
      font-size: 14px;
      text-align: center;
      line-height: 30px;
      margin-top: 40px;
    }

    .author-line {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .author-left {
        color: #b5b5b5;
        display: flex;
        align-items: center;

        .colored {
          color: #666;
        }

        .logo {
          height: 25px;
          margin-right: 16px;
          border-radius: 50%;
        }
      }
    }

    .bottom-author-line {
      margin-top: 20px;
      color: #666;
      font-weight: 300;
    }

    .comment-box {
      margin-top: 50px;
      width: 100%;
      height: 56px;
      line-height: 56px;
      border-radius: 4px;
      border: 1px solid #eaeaea;
      cursor: pointer;
      color: #0098ff;
      text-align: center;
      font-size: 16px;
      font-weight: 300;
    }
  }
</style>
