<template>
  <div class="video-detail-container">
    <h1>{{ info.title }}</h1>

    <div class="author-line" style="margin-bottom: 20px">
      <p class="author-left">
        <!--<span class="colored" v-if="info.source">{{ info.source }}</span>-->
        <span v-if="info.publicTime">{{ info.publicTime | dayFormat}}</span>
        <span v-if="info.keyword">&nbsp;&nbsp;·&nbsp;&nbsp;{{ info.keyword }}</span>
      </p>
    </div>

    <video
      id="myVideo"
      class="video-js vjs-default-skin vjs-big-play-centered"
      :poster="info.preImgPath"
    >
      <source
        :src="info.videoPath"
        :type="VideoType"
        id="target"
        :poster="info.preImgPath"
      >
    </video>

    <div class="desc" style="margin-top: 20px;">{{ info.description }}</div>

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
      <!--<p class="author-left">-->
      <!--<img :src="info.sourceLogo || defaultLogo" alt class="logo"/>-->
      <!--<span class="colored">{{ info.source }}</span>-->
      <!--</p>-->
    </div>

    <div class="comment-box" ref="commentBox" @click="goDownload">
      您可以在新华日报财经客户端写下评论
      <i class="fa fa-angle-right" style="position: relative;top: 1px;"></i>
    </div>
  </div>
</template>

<script>
  import videoDetailMixin from "../mixins/videoDetail";

  export default {
    name: "videoDetail-mob",
    layout: "default-mob",
    mixins: [videoDetailMixin]
  };
</script>

<style scoped lang="less">
  .video-detail-container {
    margin-top: 0.65rem;
    width: 100%;
    padding: 0 0.1rem;

    h1 {
      font-size: 22px;
      margin-bottom: 0.2rem;
    }

    .author-line {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .author-left {
        color: #b5b5b5;
        display: flex;
        align-items: center;
        font-size: 14px;

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
      margin: 0.2rem auto;
    }

    .desc {
      font-weight: 300;
      line-height: 22px;
      text-align: justify;
      font-size: 14px;
    }

    .copyright-container {
      color: #999999;
      font-size: 14px;
      text-align: center;
      line-height: 22px;
      margin-top: 0.2rem;
    }

    .bottom-author-line {
      margin-top: 0.2rem;
      color: #666;
      font-weight: 300;
      font-size: 14px;
    }

    .comment-box {
      margin-top: 0.2rem;
      width: 100%;
      height: 0.5rem;
      line-height: 0.5rem;
      border-radius: 4px;
      border: 1px solid #eaeaea;
      cursor: pointer;
      color: #0098ff;
      text-align: center;
      font-size: 16px;
      font-weight: 300;
      margin-bottom: 0.5rem;
    }

    .relation-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 25px;
      border-bottom: 1px solid #eaeaea;
      padding-bottom: 10px;
    }

    .relation-row {
      color: #222;
      font-weight: 300;
      margin-bottom: 20px;
      cursor: pointer;
      font-size: 14px;

      &:hover {
        color: #0098ff;
      }
    }

    .pre-and-next-box {
      width: 100%;
      padding: 0.2rem;
      border: 1px solid #eaeaea;
      color: #333;
      margin-bottom: 0.2rem;
      border-radius: 4px;

      .box-tip {
        color: #b5b5b5;
        font-size: 16px;
      }

      .box-no-name,
      .box-name {
        font-size: 16px;
        margin-top: 0.2rem;
        font-weight: 300;
        color: #333;
      }

      .box-name {
        cursor: pointer;

        &:hover {
          color: #0098ff;
        }
      }
    }
  }
</style>
