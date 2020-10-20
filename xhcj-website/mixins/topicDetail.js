export default {
  asyncData(context) {
    return context.$axios.get(`${context.app.$getBaseUrl()}/official/special/instance/${context.query.id}?channel=${context.query.channelId}`)
      .then(res => {
        if (res.data.code !== 200) return;
        return {
          info: res.data.data,
          articles: res.data.data.articleList,
          childrenTopics: res.data.data.children || []
        }
      }).catch(err => {
        console.log('err', err)
      })
  },

  data() {
    return {
      info: {},
      articles: [],
      childrenTopics: [],
      activeChildTopicIndex: 0
    }
  },

  head() {
    return {
      title: "专题详情"
    }
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
          title: this.info.name || this.info.title,
          desc: this.info.desc || this.info.description || '新华日报财经',
          link: location.href,
          imgUrl: this.info.listPicOne || '',
        };
        wx.onMenuShareAppMessage(wxData);
        wx.onMenuShareTimeline(wxData);
      });
    }
  },

}
