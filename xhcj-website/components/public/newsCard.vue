<template>
  <div class="news-card-container" @click="detailClick">
    <div class="img-container" v-if="info.listPicOne">
      <img :src="info.listPicOne" alt class="news-img"/>
    </div>
    <div class="content-container">
      <div class="title">{{ info.title }}</div>
      <div class="detail">{{ info.description | cutDetail }}</div>
      <div class="under-line">
        <img :src="fullSourceLogo" alt class="origin-logo-img"/>
        <span>
          <span>{{ info.source || "" }}</span>
          <span v-if="info.publicTime">&nbsp;&nbsp;·&nbsp;&nbsp;{{ getPassTimeStr(info.publicTime) }}</span>
          <span v-if="info.keyword">&nbsp;&nbsp;·&nbsp;&nbsp;{{ info.keyword || "" }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "newsCard",
    props: {
      info: {
        type: Object,
        // required: true,
        default: function () {
          return {
            listPicOne: "http://xhfmedia.oss-cn-hangzhou.aliyuncs.com/appimages/202007/bf2588a9-627e-4d35-a7b4-bc125c4d7b94_crop_r.jpg",
            title: "格力与美的间的“矛盾” 从抢占市场到酝酿行业变革",
            description: "格力与美的间的“矛盾” 从抢占市场到酝酿行业变革",
            source: "source",
            publicTime: 1594792232882,
            keyword: "keyword",
            id: 1,
            articleType: 1
          }
        }
      },
      channelId: String
    },
    data() {
      return {
        defaultLogo: require("../../assets/other/1-1avatar_default@2x.png")
      }
    },

    computed: {
      fullSourceLogo() {
        if (!this.info.sourceLogo) return this.defaultLogo;
        return this.info.sourceLogo.startsWith("http") ? this.info.sourceLogo : `http://xhfmedia.com/${this.info.sourceLogo}`
      }
    },

    filters: {
      cutDetail(val) {
        if (!val) return "";
        return `${val.substr(0, 80)}...`;
      }
    },
    methods: {
      detailClick() {
        let queryStr = `?id=${this.info.rid}&type=${this.info.articleType}`;
        if (this.channelId) {
          queryStr += `&channelId=${this.channelId}`
        }
        location.href = `./newsDetail${queryStr}`;
      },

      getPassTimeStr(timeStamp) {
        let commentTime = +new Date(timeStamp);
        if (+new Date() - commentTime >= 24 * 60 * 60 * 1000) {
          let date = new Date(timeStamp);
          return `${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`
        }

        let passTimeByMin = Math.ceil((+new Date() - commentTime) / 1000 / 60);

        let timeStr = "";
        let days = Math.floor(passTimeByMin / (24 * 60));
        if (days) {
          timeStr += `${days}天`;
          return `${timeStr}前`
        }

        passTimeByMin = passTimeByMin - days * 24 * 60;

        let hours = Math.floor(passTimeByMin / 60);
        if (hours) {
          timeStr += `${hours}小时`;
          return `${timeStr}前`
        }
        passTimeByMin = passTimeByMin - hours * 60;

        if (passTimeByMin) {
          timeStr += `${passTimeByMin}分钟`;
          return `${timeStr}前`
        }
        return `${timeStr}前`
      }
    }
  };
</script>

<style scoped lang="less">
  .news-card-container {
    width: 100%;
    display: flex;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eaeaea;

    &:last-child {
      border-bottom: none;
    }

    .img-container {
      width: 283px;
      height: 188px;
      margin-right: 24px;
      overflow: hidden;
      border-radius: 8px;

      .news-img {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.1);
        transition: all 0.5s;
        cursor: pointer;
        display: block;

        &:hover {
          transform: scale(1.1);
        }
      }
    }

    .content-container {
      flex: 1;
      /*height: 188px;*/
      min-height: 50px;
      overflow: hidden;
      display: flex;
      flex-direction: column;

      .title {
        color: #222222;
        font-weight: 600;
        font-size: 24px;
        line-height: 33px;
        cursor: pointer;

        &:hover {
          color: #0098ff;
        }
      }

      .detail {
        margin-top: 10px;
        color: #555;
        font-size: 14px;
        line-height: 20px;
        font-weight: 300;
      }

      .under-line {
        margin-top: auto;
        display: flex;
        align-items: center;
        color: #555;
        font-size: 12px;
        font-weight: 300;
        width: 100%;

        span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .origin-logo-img {
          height: 25px;
          margin-right: 16px;
          border-radius: 50%;
        }
      }
    }
  }

  .mob {
    margin-bottom: 0.2rem !important;
    padding-bottom: 0.2rem !important;
    flex-direction: row-reverse;

    &:last-child {
      border-bottom: none !important;
      margin-bottom: 0 !important;
    }

    .img-container {
      width: 1.2rem !important;
      height: 0.8rem !important;
      margin-left: 0.1rem;
      margin-right: 0;
    }

    .content-container {
      height: auto !important;

      .title {
        font-size: 15px !important;
        line-height: 20px;
        margin-bottom: 4px;
      }

      .detail {
        display: none;
      }

      .under-line {
        margin-top: auto;
        display: flex;
        align-items: center;
        color: #555;
        font-weight: 400;
        font-size: 12px;

        .origin-logo-img {
          height: 0.25rem;
          margin-right: 0.1rem;
          border-radius: 50%;
        }
      }
    }
  }

</style>
