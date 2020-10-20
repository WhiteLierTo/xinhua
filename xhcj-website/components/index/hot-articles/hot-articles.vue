<template>
  <div class="hot-articles-container">
    <div class="head">
      <div class="head-text">热门文章</div>
    </div>

    <!--<div class="hot-img-container">-->
    <!--<div class="top-card">1</div>-->
    <!--<img-->
    <!--:src="hotArticles[0].img"-->
    <!--alt="">-->
    <!--</div>-->

    <!--<div class="hot-text" @click="goArticleDetail">-->
    <!--{{ hotArticles[0].title }}-->
    <!--</div>-->
    <!--<div class="time">{{ hotArticles[0].time | timeFormat }}</div>-->

    <div class="articles-container">
      <xhArticle v-for="(ArticleItem,index) in hotArticles.filter((art,index)=> index !== -1)" :key="index"
                 :info="ArticleItem" :index="index + 1"/>
    </div>
  </div>
</template>

<script>
  import xhArticle from "./xh-article"

  export default {
    name: "hot-articles",
    components: {xhArticle},
    props: {
      hotArticles: Array
    },

    data() {
      return {
        fakeArticleInfo: {
          title: "最前线 · 一线丨对口精准驰援抗击新型冠状病毒，越来越多江苏企业在行动",
          img: "http://xhfmedia.oss-cn-hangzhou.aliyuncs.com/appimages/201912/339ff965-a08f-4de1-9dcc-283b9167c795_crop_r.png",
          time: "2020-01-28"
        }
      }
    },

    methods: {
      goArticleDetail() {
        if (process.isMob) {
          location.href = `./newsDetail-mob?id=${this.hotArticles[0].id}&type=${this.hotArticles[0].articleType}`;
        } else {
          location.href = `./newsDetail?id=${this.hotArticles[0].id}&type=${this.hotArticles[0].articleType}`;
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .hot-articles-container {
    .head {
      border-bottom: 1px solid #eaeaea;
      margin-bottom: 24px;
      margin-top: -2px;

      .head-text {
        display: inline-block;
        width: auto;
        height: 100%;
        border-bottom: 2px solid #222222;
        font-size: 20px;
        font-weight: 600;
        position: relative;
        top: 2px;
        color: #222;
        padding-bottom: 6px;
      }
    }

    .hot-img-container {
      width: 265px;
      height: calc(265px * 188 / 283);
      overflow: hidden;
      border-radius: 4px;
      position: relative;

      .top-card {
        background: #f75e5e;
        position: absolute;
        left: 10px;
        top: 0;
        border-radius: 4px;
        width: 34px;
        height: 36px;
        line-height: 34px;
        text-align: center;
        color: white;
        font-size: 18px;
        z-index: 100;
        transform: translateY(-2px);
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: fill;
        transition: all 0.5s;
        cursor: pointer;
        display: block;

        &:hover {
          transform: scale(1.1);
        }
      }
    }

    .hot-text {
      color: #222;
      font-weight: 300;
      line-height: 24px;
      font-size: 20px;
      margin-top: 16px;
      cursor: pointer;

      &:hover {
        color: #0098ff;
      }
    }

    .time {
      font-size: 12px;
      margin-top: 10px;
      font-weight: 300;
      color: #b5b5b5;
    }

    .articles-container {
      margin-top: 20px;
    }
  }

  .mob {
    margin-top: 0.4rem;

    .hot-img-container {
      width: 100%;
      height: calc((100vw - 0.2rem) * 188 / 283);
    }
  }
</style>
