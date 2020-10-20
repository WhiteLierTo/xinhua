<template>
  <div class="index-mob-container">
    <div class="index-has-padding-container">
      <xhCarouselMob :carousels="pcBannerList" class="radius"/>
      <xhTabsMob :tabs="normalList" :articles="articles" :onTabChange="onTabChange"/>
      <videoRecord :videos="liveInfoList" class="mob" style="margin-top: 0.3rem;"/>
      <newsFlash class="mob" style="margin-top: 0.1rem;" :indexList="businessList" :newsFlashList="newsFlashList"/>
    </div>
    <hotTopic class="mob" :hotSpecials="hotSpecials" v-if="hotSpecials.length"/>
    <div class="index-has-padding-container" style="margin-top: 0.3rem">
      <newsList :isMob="true" :articles="articles" :total="articlesTotal" :loadMore="loadMore"/>
      <hotArticles class="mob" :hotArticles="hotArticleList" v-if="hotArticleList.length"/>
    </div>
  </div>
</template>

<script>
  import xhCarouselMob from "../components/index-mob/xh-carousel-mob"
  import xhTabsMob from "../components/index-mob/xh-tabs-mob"
  import videoRecord from "../components/index/video-record"
  import newsFlash from "../components/index/news-flash/news-flash";
  import hotTopic from "../components/index/hot-topic";
  import newsList from "../components/index/news-list";
  import hotArticles from "../components/index/hot-articles/hot-articles";
  import goodSelected from "../components/index/good-selected";
  import indexMixin from "../mixins/index"

  import flashMob from "../components/index-mob/flash-mob"


  export default {
    name: "index-mob",
    layout: "default-mob",
    components: {
      xhCarouselMob,
      xhTabsMob,
      videoRecord,
      newsFlash,
      hotTopic,
      newsList,
      hotArticles,
      goodSelected,
      flashMob
    },
    mixins: [indexMixin]

  }
</script>

<style scoped lang="less">
  .index-mob-container {
    padding: 0.7rem 0 0.3rem;

    .index-has-padding-container {
      width: 100%;
      padding: 0 0.1rem;
    }
  }
</style>
