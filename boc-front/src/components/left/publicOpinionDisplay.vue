<template>
  <BaseWidthTitle title="舆情展示">
    <div class="public-opinion-display">
      <div class="bad-container">
        <div class="tab">负面</div>
        <div class="origin-tab-line">
          <div class="origin-tab" :class="{'active-origin-tab':badActiveIndex === index}"
               @click="selectOriginTab(index,-1)" v-for="(item,index) in originTabs" :key="index" v-text="item"></div>
        </div>

        <div class="content-container" ref="scrollContainerBad">
          <div class="empty-container" v-if="badData.length === 0">
            <img src="../../asset/index/empty.png" alt="">
          </div>
          <publicOpinion v-for="(item,index) in badData" :showDetail="showDetailMid" :info="item" type="bad"
                         :key="index"/>
        </div>

      </div>
      <div class="divider"></div>
      <div class="good-container">
        <div class="tab">正面</div>
        <div class="origin-tab-line">
          <div class="origin-tab" :class="{'active-origin-tab':goodActiveIndex === index}"
               @click="selectOriginTab(index,1)" v-for="(item,index) in originTabs" :key="index" v-text="item"></div>
        </div>
        <div class="content-container" ref="scrollContainerGood">
          <div class="empty-container" v-if="goodData.length === 0">
            <img src="../../asset/index/empty.png" alt="">
          </div>
          <publicOpinion v-for="(item,index) in goodData" :showDetail="showDetailMid" :info="item" type="good"
                         :key="index"/>
        </div>
      </div>
    </div>
  </BaseWidthTitle>
</template>

<script>
  // TODO loading

  import publicOpinion from "./children/publicOpinion";

  export default {
    name: "publicOpinionDisplay",
    components: {publicOpinion},
    props: ["showDetail"],
    data() {
      return {
        originTabs: ["微博", "微信", "新闻", "其他"],
        badActiveIndex: 0,
        goodActiveIndex: 0,

        badData: [],
        goodData: []
      }
    },
    mounted() {
      this.getAllNews();
      this.autoScroll();

      this.$store.commit("addPolling", this.getAllNews);
    },
    methods: {
      getGoodNews() {
        this.$ajax.opinionList(this.goodActiveIndex + 1, 1).then(res => {
          if (res.data.code === 200) {
            // let keys = this.goodData.map(d => d.rowKey);
            // this.goodData = [...this.goodData, ...res.data.data.filter(d => !keys.includes(d.rowKey))];
            this.goodData = res.data.data;
          } else {
            setTimeout(this.getGoodNews, 5000)
          }
        })
      },

      getBadNews() {
        this.$ajax.opinionList(this.badActiveIndex + 1, -1).then(res => {
          if (res.data.code === 200) {
            // let keys = this.badData.map(d => d.rowKey);
            // this.badData = [...this.badData, ...res.data.data.filter(d => !keys.includes(d.rowKey))];
            this.badData = res.data.data; // TODO 追加更新
          } else {
            setTimeout(this.getBadNews, 5000)
          }
        })
      },

      selectOriginTab(index, n) {
        if (n === 1 && this.goodActiveIndex !== index) {
          // 正面
          this.$refs.scrollContainerGood.scrollTop = 0;
          this.goodData = [];
          this.goodActiveIndex = index;
          this.getGoodNews();
        } else if (n === -1 && this.badActiveIndex !== index) {
          // 负面
          this.$refs.scrollContainerBad.scrollTop = 0;
          this.badData = [];
          this.badActiveIndex = index;
          this.getBadNews();
        }
      },

      getAllNews() {
        this.getGoodNews();
        this.getBadNews();
      },

      autoScroll() {
        let goodContainer = this.$refs.scrollContainerGood;
        let badContainer = this.$refs.scrollContainerBad;

        scroll();

        function scroll() {
          let scrollLength = window.innerHeight / 900;

          goodContainer.scrollTop += scrollLength;
          badContainer.scrollTop += scrollLength;

          // 滚到底后操作
          if (goodContainer.scrollTop + goodContainer.offsetHeight === goodContainer.scrollHeight) {
            goodContainer.scrollTop = 0;
          }
          if (badContainer.scrollTop + badContainer.offsetHeight === badContainer.scrollHeight) {
            badContainer.scrollTop = 0;
          }

          setTimeout(scroll, 50);
        }
      },

      showDetailMid(info) {
        this.showDetail(info)
      }
    }
  }
</script>

<style scoped lang="less">
  .public-opinion-display {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 50px;
    position: relative;


    .divider {
      width: 1px;
      height: calc(100% - 96px);
      background: rgba(30, 97, 209, 1);
      margin: 0 120px;
      align-self: flex-end;
      flex-shrink: 0;
    }

    .bad-container,
    .good-container {
      flex: 1;
      height: 100%;
      overflow: auto;
      display: flex;
      flex-direction: column;

      .tab {
        width: 106px;
        height: 40px;
        background: url("../../asset/left/tabblue.png");
        background-size: 100% 100%;
        line-height: 38px;
        text-align: center;
        color: white;
        margin-bottom: 56px;
        flex-shrink: 0;
      }

      .origin-tab-line {
        height: 40px;
        display: flex;
        flex-shrink: 0;
        margin-bottom: 24px;

        .origin-tab {
          flex: 1;
          margin-right: 4px;
          background-image: url("../../asset/left/bluejuxing.png");
          background-size: 100% 100%;
          transition: all 0.3s;
          cursor: pointer;
          line-height: 40px;
          text-align: center;
          color: #141c3d;

          &:last-child {
            margin-right: 0;
          }
        }

        .active-origin-tab {
          background-image: url("../../asset/left/yellowjuxing.png");
        }
      }

      .content-container {
        width: 100%;
        flex: 1;
        overflow: auto;

        &::-webkit-scrollbar {
          background: #102568;
          width: 8px;
          border-radius: 10px;
        }

        &::-webkit-scrollbar-thumb {
          background: #1a4fbb;
          border-radius: 10px;
        }
      }
    }
  }

  .empty-container {
    width: 90%;
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;

  }
</style>
