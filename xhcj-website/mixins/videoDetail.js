import VideoJs from "video.js";

export default {
  asyncData(context) {
    return context.$axios.get(`${context.app.$getBaseUrl()}/official/articleList/instance/5/${context.query.id}`)
      .then(res => {
        if (res.data.code !== 200) return;
        return {
          info: res.data.data.info
        }
      }).catch(err => {
        console.log("err", err)
      })
  },

  data() {
    return {
      defaultLogo: require("../assets/other/1-1avatar_default@2x.png"),
      info: {}
    }
  },

  computed: {
    /**
     * @return {string}
     */
    VideoType() {
      if (this.info && this.info.videoPath && this.info.videoPath.toLowerCase().split("?")[0].endsWith('m3u8')) {
        return "application/x-mpegURL"
      }
      return ""
    }
  },

  async mounted() {
    if (process.client) {
      this.$nextTick(() => {
        this.initVideo()
      });
    }

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

  methods: {
    goDownload() {
      if (process.isMob) {
        location.href = "/download-mob"
      } else {
        location.href = "/download"
      }
    },

    initVideo() {
      let width;
      if (process.isMob) {
        width = this.$refs.commentBox.offsetWidth
      } else {
        width = 1120
      }


      VideoJs("myVideo", {
        bigPlayButton: true,
        width: `${width}px`,
        controls: true
      });
    }
  }

}
