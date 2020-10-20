export default {
  async asyncData(context) {
    if (context.query.type === "5") {
      // 这是一个视频
      context.redirect({path: "/videoDetail", query: context.query});
      return
    }

    if (context.query.type === "6") {
      // 这是一个直播
      context.redirect({path: "/liveDetail", query: context.query});
      return
    }

    if (context.query.type === "7") {
      // 这是一个活动
      context.redirect({path: "/activityDetail", query: context.query});
      return
    }

    if (context.query.type === "8") {
      // 这是一个专题
      context.redirect({path: "/topicDetail", query: context.query});
      return
    }


    return context.$axios.get(`${context.app.$getBaseUrl()}/official/articleList/instance/${context.query.type}/${context.query.id}?channel=${context.query.channelId}`)
      .then(res => {
        if (res.data.code !== 200) return;
        if (res.data.data.info && res.data.data.info.linkUrl) {
          context.redirect(res.data.data.info.linkUrl);
          return
        }

        return {
          recommendList: res.data.data.recommendList || [],
          pre: res.data.data.pre,
          next: res.data.data.next,
          info: res.data.data.info || {},
        }
      }).catch(err => {
        console.log("err", err)
      })
  },

  async mounted() {
    if (process.client) {
      const wx = require("weixin-js-sdk");

      let wxData = await this.$registerWX();

      wx.config({
        debug: false,
        appId: wxData.appid,
        timestamp: wxData.timestamp,
        nonceStr: wxData.nonceStr,
        signature: wxData.signature,
        jsApiList: [
          "onMenuShareTimeline",
          "onMenuShareAppMessage"
        ]
      });

      wx.ready(() => {
        let wxData = {
          title: this.info.title,
          desc: this.info.desc || this.info.description || '新华日报财经',
          link: location.href,
          imgUrl: this.info.listPicOne || '',
        };
        wx.onMenuShareAppMessage(wxData);
        wx.onMenuShareTimeline(wxData);
      });
    }
  },

  data() {
    return {
      recommendList: [], // 推荐
      pre: null,
      next: null,
      info: {},
      linkUrl: "",

      defaultLogo: require("../assets/other/1-1avatar_default@2x.png")
    }
  },

  head() {
    return {
      title: this.info.title || "稿件详情"
    }
  },

  filters: {
    dayFormat(timeStamp, splitStr = '-') {
      timeStamp = parseInt(timeStamp);
      if (isNaN(timeStamp)) {
        return "";
      }
      let data = new Date(timeStamp);
      return `${data.getFullYear()}${splitStr}${(data.getMonth() + 1).toString().padStart(2, "0")}${splitStr}${data.getDate().toString().padStart(2, "0")}`
    }
  },

  computed: {
    fullSourceLogo() {
      if (!this.info.sourceLogo) return this.defaultLogo;
      return this.info.sourceLogo.startsWith("http") ? this.info.sourceLogo : `http://xhfmedia.com/${this.info.sourceLogo}`
    }
  },

  methods: {
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
    },

    goDownload() {
      if (process.isMob) {
        location.href = "/download-mob"
      } else {
        location.href = "/download"
      }
    },

    goPreOrNext(article) {

      if (process.isMob) {
        location.href = `./newsDetail-mob?id=${article.rid}&type=${article.articleType}`
      } else {
        location.href = `./newsDetail?id=${article.rid}&type=${article.articleType}`
      }
    },

    jumpRelation(recommend) {
      this.goPreOrNext(recommend)
    }
  }
}
