<template>
  <div class="left-container">

    <div class="left-top">
      <div class="left-top-left">
        <imageScore
            @onChangeEmotionTrendSearchType="onChangeEmotionTrendSearchType"
            :emotionTrendSearchType="emotionTrendSearchType"
            :emotionTrendData="emotionTrendData"
            ref="imageScore"
        />
      </div>

      <div class="col-divider">
        <div class="arrow-container"></div>
        <div class="dash-line"></div>
      </div>

      <div class="left-top-right">
        <publicOpinionDisplay :showDetail="showDetail"/>
      </div>
    </div>

    <div class="row-divider"></div>

    <div class="left-bottom">

      <div class="left-bottom-left">
        <div class="left-bottom-left-part">
          <div class="left-bottom-left-part-left">
            <trend
                @onChangeEmotionTrendSearchType="onChangeEmotionTrendSearchType"
                :emotionTrendSearchType="emotionTrendSearchType"
                :emotionTrendData="emotionTrendData"
                ref="trend"
            />
          </div>
          <div class="col-divider">
            <div class="arrow-container"></div>
            <div class="dash-line"></div>
          </div>

          <div class="left-bottom-left-part-right">
            <wordCloud/>
          </div>
        </div>
        <div class="row-divider"></div>
        <div class="left-bottom-left-part">
          <div class="left-bottom-left-part-left">
            <media/>
          </div>
          <div class="col-divider"></div>
          <div class="left-bottom-left-part-right">
            <topicDistribution/>
          </div>
        </div>
      </div>

      <div class="col-divider">
        <div class="arrow-container"></div>
        <div class="dash-line"></div>
      </div>

      <div class="left-bottom-right">
        <opinionArea/>
      </div>

    </div>

    <div class="dialog-container" v-if="isShowDetail">
      <div class="dialog">
        <div class="close-icon" @click="isShowDetail = false"></div>
        <p class="title">{{ opinionInfo.title }}</p>
        <p class="sub-title">
          <span class="showTime">{{ opinionInfo.showTime }}</span>
          <span class="side-good" v-if="opinionInfo.side === 1">正面</span>
          <span class="side-bad" v-if="opinionInfo.side === -1">负面</span>
        </p>
        <p class="content" v-html="opinionInfo.content"></p>
        <p class="origin">原文链接:&nbsp;&nbsp; <a :href="opinionInfo.url" target="_blank">{{ opinionInfo.url }}</a></p>
      </div>
    </div>

  </div>
</template>

<script>
  import imageScore from "../components/left/imageScore";
  import publicOpinionDisplay from "../components/left/publicOpinionDisplay";
  import trend from "../components/left/trend";
  import wordCloud from "../components/left/wordCloud";
  import media from "../components/left/media";
  import opinionArea from "../components/left/opinionArea";
  import topicDistribution from "../components/left/topicDistribution"

  export default {
    name: "left",
    components: {imageScore, publicOpinionDisplay, trend, wordCloud, media, opinionArea, topicDistribution},
    data() {
      return {
        emotionTrendSearchType: 1,
        emotionTrendData: {},
        opinionInfo: {},
        isShowDetail: false,
      }
    },
    mounted() {
      this.getEmotionTrendInfo();
      this.$store.commit("addPolling", this.getEmotionTrendInfo);
    },
    methods: {
      getEmotionTrendInfo() {
        // TODO loading
        // 左上角俩格子
        this.$ajax.emotionTrend(this.emotionTrendSearchType).then(res => {
          if (res.data.code === 200) {
            this.emotionTrendData = res.data.data;
            this.$nextTick(() => {
              this.$refs.imageScore.onUpdate();
              this.$refs.trend.onUpdate();
            })
          } else {
            // 请求错误重新请求
            setTimeout(this.getEmotionTrendInfo, 5000)
          }
        })
      },

      onChangeEmotionTrendSearchType(newType) {
        this.emotionTrendSearchType = newType;
        this.getEmotionTrendInfo();
      },

      showDetail(info) {
        this.opinionInfo = info;
        this.opinionInfo.title = this.opinionInfo.title || this.opinionInfo.content.substr(0, 20) + " ...";
        this.isShowDetail = true;
      }
    }
  }
</script>

<style scoped lang="less">
  .left-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;

    .dialog-container {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.85);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 999999;

      .dialog {
        width: 1038px;
        background: rgba(34, 76, 223, 0.25);
        padding: 50px;
        position: relative;

        .close-icon {
          position: absolute;
          right: 0;
          top: -104px;
          width: 60px;
          height: 60px;
          background: url("../asset/index/close.png");
          background-size: 100% 100%;
          cursor: pointer;
        }

        .title {
          color: rgba(255, 255, 255, 1);
          font-size: 35px;
          text-align: center;
          margin-bottom: 40px;
        }

        .sub-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 27px;
          margin-bottom: 20px;

          .showTime {
            color: rgba(146, 146, 146, 1);
          }

          .side-good {
            color: rgba(41, 255, 232, 1);
          }

          .side-bad {
            color: rgba(253, 16, 54, 1)
          }
        }

        .content {
          color: rgba(142, 142, 255, 1);
          line-height: 47px;
          font-size: 27px;
          word-break: break-word;
          max-height: 700px;
          margin-bottom: 40px;
          overflow: auto;
          padding-right: 20px;

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

        .origin {
          font-size: 27px;
          color: rgba(156, 156, 156, 1);

          a {
            color: rgba(53, 120, 255, 1);
            text-decoration: none;
          }
        }
      }
    }

    .left-top {
      width: 100%;
      height: 650px;
      display: flex;
      justify-content: space-between;
      overflow: hidden;

      .left-top-left {
        height: 100%;
        width: 1300px;
      }

      .left-top-right {
        height: 100%;
        width: 1255px;
      }
    }

    .left-bottom {
      width: 100%;
      height: 1194px;
      display: flex;
      justify-content: space-between;
      overflow: hidden;


      .left-bottom-left {
        height: 100%;
        width: 1750px;
        display: flex;
        flex-direction: column;

        .left-bottom-left-part {
          width: 100%;
          flex: 1;
          display: flex;
          justify-content: space-between;

          .left-bottom-left-part-left {
            width: 1024px;
            height: 100%;
          }

          .left-bottom-left-part-right {
            width: 628px;
            height: 100%;
          }
        }
      }

      .left-bottom-right {
        height: 100%;
        width: 784px;
      }
    }
  }

  .row-divider {
    width: 100%;
    margin: 30px 0;
    border-top: 2px #376AFF dashed;
    flex-shrink: 0;
  }

  .col-divider {
    width: 90px;
    flex-shrink: 0;
    padding-top: 130px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .arrow-container {
      width: 24px;
      height: 86px;
      background: url("../asset/left/arrows.png");
      background-size: 100% 100%;
      margin-bottom: 4px;
    }

    .dash-line {
      flex: 1;
      border-left: 2px #1E61D1 dashed;
    }
  }

</style>
