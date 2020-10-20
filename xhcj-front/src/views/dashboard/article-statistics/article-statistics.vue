<template>
  <div class="article-statistics-container">

    <dashboardFilter
        :tabs="[]"
        :onTimeChange="onTimeChange"
        :onTabChange="onTabChange"
    >
      <!--'文章','活动','直播','视频'-->
    </dashboardFilter>

    <articlePart ref="article" v-if="activeTabIndex === 0"/>
    <activityPart ref="activity" v-if="activeTabIndex === 1"/>

  </div>
</template>

<script>
  import dashboardFilter from "../dashboard-filter/dashboard-filter"
  import articlePart from "./children/article-part"
  import activityPart from "./children/activity-part"

  export default {
    name: "article-statistics",
    components: {dashboardFilter, articlePart, activityPart},

    data() {
      return {
        activeTabIndex: 0
      }
    },

    methods: {

      onTimeChange(activeIndex, timeRange) {
        if (this.activeTabIndex === 0 && this.$refs.article) {
          this.$refs.article.onTimeChange(activeIndex, timeRange)
        }
      },

      onTabChange(index) {
        this.activeTabIndex = index;
      }

    }
  }
</script>

<style scoped lang="less">
  @import "../../../style/config.less";
  @import "../../../style/styles.less";

  .article-statistics-container {
    padding-right: @defaultPaddingY / 2;
  }
</style>
