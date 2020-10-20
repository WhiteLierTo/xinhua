<template>
  <div class="tabs-wrapper" ref="tabs">
    <div class="tabs-out-container">
      <div class="tabs-container" ref="specialRefApple">
        <div
          class="tab specialTab"
          :class="{activeTab:activeTabIndex === index}"
          @click="tabChange(index,false)"
          v-for="(tab,index) in tabs"
          :key="index"
        >
          {{ tab.label }}
        </div>
      </div>
    </div>
    <div class="news-cards-container">
      <news-card class="mob" :info="article" v-for="(article,index) in articles.slice(0,6)" :key="index"></news-card>
    </div>
  </div>

</template>

<script>
  export default {
    name: "xh-tabs-mob",
    inject: ["onHeadChange", "resetOriginalHead"],
    props: {
      tabs: Array,
      articles: Array,
      onTabChange: Function,
    },
    mounted() {
      if (!process.client) return;
      // 测量
      this.tabsOffsetTop = this.$refs.tabs.offsetTop;
      document.addEventListener("scroll", this.onScroll);
    },
    beforeDestroy() {
      document.removeEventListener("scroll", this.onScroll);
    },
    data() {
      return {
        activeTabIndex: 0,
        tabsOffsetTop: 0
      }
    },
    methods: {
      onScroll() {
        let scrollTop = (document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop);
        if (scrollTop >= this.tabsOffsetTop) {
          let activeDom = document.getElementsByClassName("specialTab")[this.activeTabIndex];
          let x = "";
          if (activeDom) {
            let activeDomLeft = activeDom.offsetLeft;
            x = (activeDomLeft - 2 - window.innerWidth * 0.02);
          }
          this.onHeadChange(this.tabs, this.activeTabIndex, (item, index) => this.tabChange(index, true), x);
        } else {
          this.resetOriginalHead();
        }
      },

      tabChange(index, fromOut = true) {
        this.activeTabIndex = index;
        this.onTabChange(this.tabs[index]);

        if (!fromOut) return;
        let activeDom = document.getElementsByClassName("specialTab")[this.activeTabIndex];
        if (activeDom) {
          let activeDomLeft = activeDom.offsetLeft;
          let x = (activeDomLeft - 2 - window.innerWidth * 0.02);
          this.$refs.specialRefApple && this.$refs.specialRefApple.scrollTo(x, 0);
        }
        this.$nextTick(this.goUp)
      },

      goUp() {
        let option = {
          top: this.tabsOffsetTop,
          left: 0,
        };

        window.scrollTo(option);
      },
    },
  }
</script>

<style scoped lang="less">
  .tabs-wrapper {
    width: 100%;
    margin-top: 0.2rem;

    .tabs-out-container {
      width: 100%;
      height: 0.34rem;
      overflow: hidden;
    }

    .tabs-container {
      width: 100%;
      height: 0.42rem;
      padding-bottom: 0.08rem;
      line-height: 0.34rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #eaeaea;
      overflow: auto;

      & ::-webkit-scrollbar {
        display: none;
      }

      .tab {
        font-size: 14px;
        cursor: pointer;
        flex-shrink: 0;
        margin-right: 0.1rem;
        height: 100%;
      }

      .activeTab {
        font-weight: 600;
        border-bottom: 1px solid #222222;
      }
    }

    .news-cards-container {
      margin-top: 0.2rem;
    }
  }
</style>
