<template>
  <div class="index-page-container">
    <div class="column-container">
      <div class="left-container">
        <xhCarousel :carousels="pcBannerList" class="radius"/>
        <xhTabs :channelId="activeChannelId" :tabs="normalList" :articles="articles" :onTabChange="onTabChange"/>
      </div>
      <div class="right-container">
        <videoRecord :videos="liveInfoList"/>
        <newsFlash :indexList="businessList" :newsFlashList="newsFlashList"/>
      </div>
    </div>
    <hotTopic :hotSpecials="hotSpecials" v-if="hotSpecials.length"/>
    <div class="column-container">
      <div class="left-container">
        <newsList :channelId="activeChannelId"  :articles="articles" :total="articlesTotal" :loadMore="loadMore"/>
      </div>
      <div class="right-container">
        <hotArticles :hotArticles="hotArticleList" v-if="hotArticleList.length"/>
        <!--<goodSelected/>-->
      </div>
    </div>
  </div>
</template>

<script>
  import xhTabs from "../components/index/xh-tabs";
  import videoRecord from "../components/index/video-record";
  import newsFlash from "../components/index/news-flash/news-flash";
  import hotTopic from "../components/index/hot-topic";
  import newsList from "../components/index/news-list";
  import hotArticles from "../components/index/hot-articles/hot-articles";
  import goodSelected from "../components/index/good-selected";
  import xhCarousel from "../components/index/xh-carousel"
  import indexMixin from "../mixins/index"

  export default {
    components: {
      xhTabs,
      videoRecord,
      newsFlash,
      hotTopic,
      newsList,
      hotArticles,
      goodSelected,
      xhCarousel
    },
    mixins: [indexMixin]
  };
</script>

<style lang="less">
  .index-page-container {
    width: 100%;
    margin-bottom: 20px;

    .column-container {
      width: 1120px;
      margin: 0 auto;
      display: flex;

      .left-container {
        flex: 1;
        margin-right: 22px;
        overflow: hidden;
        margin-top: 70px;
      }

      .right-container {
        width: 265px;
        margin-top: 70px;
      }
    }
  }
</style>
