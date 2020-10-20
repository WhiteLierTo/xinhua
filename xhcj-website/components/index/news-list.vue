<template>
  <div class="news-list-container" :class="{'news-list-mob-container':isMob}">
    <div>
      <news-card
        :info="article" :total="articles.slice(6,articles.length).length"
        v-for="(article,index) in articles.slice(6,articles.length)" :class="{mob:isMob}"
        :key="index"
        :channelId="channelId"
      ></news-card>
    </div>
    <div class="show-more-container" @click="loadMore" v-if="total > articles.length">加载更多</div>
  </div>
</template>

<script>
  export default {
    name: "newsList",
    props: {
      isMob: {
        type: Boolean,
        default: false
      },
      articles: Array,
      total: Number,
      loadMore: Function,
      channelId: String
    },
    data() {
      return {
        fakeCardInfo: {
          title: "2020无锡市百企干才高校行云对接和锡望你来&云聘行动启动!",
          detail:
            "6月15日，国家统计局发布了5月份相关经济数据。国家统计局新闻发言人付凌晖表示，5月份，复工复产复商复市全面推进，生产需求继续改善，就业物价总体平稳，积极因素逐步增",
          img:
            "http://xhfmedia.oss-cn-hangzhou.aliyuncs.com/appimages/202005/84412f29-edc0-47d3-ab6b-3378898834d4_crop_r.jpg",
          originLogo: "http://www.xhfmedia.com/logo.png",
          origin: "新华日报财经",
          publishTime: "05-12",
          author: "创造社"
        },
      };
    },
    methods: {}
  };
</script>

<style scoped lang="less">
  .news-list-container {
    width: 100%;
    padding-right: 40px;

    .show-more-container {
      background: rgba(238, 244, 250, 0.5);
      color: rgb(0, 152, 255);
      height: 56px;
      line-height: 56px;
      text-align: center;
      width: 100%;
      margin-top: 30px;
      cursor: pointer;
      font-weight: 300;
      font-size: 14px;
    }
  }

  .news-list-mob-container {
    padding-right: 0;
  }
</style>
