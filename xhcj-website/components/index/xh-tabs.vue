<template>
  <div class="tabs-wrapper" ref="tabs">
    <div class="tabs-container">
      <div
        class="tab"
        :class="{activeTab:activeTabIndex === index}"
        @click="tabChange(index,false)"
        v-for="(tab,index) in tabs"
        :key="index"
      >
        {{ tab.label }}
      </div>
    </div>
    <div class="news-cards-container">
      <news-card :channelId="channelId" :info="article" v-for="(article,index) in articles.slice(0,6)"
                 :key="index"></news-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: "xh-tabs",
    inject: ["onHeadChange", "resetOriginalHead"],
    props: {
      tabs: Array,
      articles: Array,
      onTabChange: Function,
      channelId: String
    },

    data() {
      return {
        activeTabIndex: 0,
        tabsOffsetTop: 0
      }
    },
    mounted() {
      if (!process.client) return;
      // 测量
      this.tabsOffsetTop = this.$refs.tabs.offsetTop;
      document.addEventListener("scroll", this.onScroll);
    },
    beforeDestroy() {
      this.resetOriginalHead();
      document.removeEventListener("scroll", this.onScroll);
    },
    methods: {
      onScroll() {
        let scrollTop = (document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop);
        if (scrollTop >= this.tabsOffsetTop) {
          this.onHeadChange(this.tabs, this.activeTabIndex, (item, index) => this.tabChange(index, true));
        } else {
          this.resetOriginalHead();
        }
      },

      tabChange(index, fromOut = true) {
        this.activeTabIndex = index;
        this.onTabChange(this.tabs[index]);

        if (!fromOut) return;
        let option = {
          top: this.tabsOffsetTop,
          left: 0,
          behavior: "smooth"
        };

        window.scrollTo(option);
      }
    }
  }
</script>

<style scoped lang="less">
  .tabs-wrapper {
    width: 100%;
    margin-top: 40px;

    .tabs-container {
      width: 100%;
      height: 40px;
      line-height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #eaeaea;

      .tab {
        font-size: 16px;
        cursor: pointer;
        font-weight: 300;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      }

      .activeTab {
        font-weight: 600;
        border-bottom: 2px solid #222222;
      }
    }

    .news-cards-container {
      margin-top: 50px;
      padding-right: 40px;
    }
  }
</style>
