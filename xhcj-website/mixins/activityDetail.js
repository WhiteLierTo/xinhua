let dayToZH = ["一", "二", "三", "四", "五", "六", "日"];

function formatTime(startTime, endTime) {
  if (!startTime || !endTimeStr) {
    return ""
  }
  startTime = new Date(startTime);
  endTime = new Date(endTime);
  let yearMouthDay = `${startTime.getFullYear()}年${(startTime.getMonth() + 1).toString().padStart(2, "0")}月${data.getDate().toString().padStart(2, "0")}日`;
  let day = `星期${dayToZH[startTime.getDay()]}`;
  let startTimeStr = `${startTime.getHours().toString().padStart(2, '0')}:${startTime.getMinutes().toString().padStart(2, '0')}`;
  let endTimeStr = `${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`;
  return `${yearMouthDay} ${day} <br /> ${startTimeStr} - ${endTimeStr}`
}

export default {
  asyncData(context) {
    if (process.client) return {};
    return context.$axios.get(`${context.app.$getBaseUrl()}/pc/activity/instance/${context.query.id}?channel=${context.query.channelId}`).then(res => {
      if (res.data.code !== 200) return {};
      return {
        detail: res.data.data
      }
    }).catch(err => {
      return {}
    })
  },


  data() {
    return {
      detail: {}
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
          title: this.detail.title,
          desc: this.detail.desc || this.detail.description || '新华日报财经',
          link: location.href,
          imgUrl: this.detail.listPicOne || '',
        };
        wx.onMenuShareAppMessage(wxData);
        wx.onMenuShareTimeline(wxData);
      });
    }
  },


  methods: {
    getFormatTime(startTime, endTime, join = "<br />") {
      startTime = new Date(startTime);
      endTime = new Date(endTime);
      let yearMouthDay = `${startTime.getFullYear()}年${(startTime.getMonth() + 1).toString().padStart(2, "0")}月${startTime.getDate().toString().padStart(2, "0")}日`;
      let day = `星期${dayToZH[startTime.getDay()]}`;
      let startTimeStr = `${startTime.getHours().toString().padStart(2, '0')}:${startTime.getMinutes().toString().padStart(2, '0')}`;
      let endTimeStr = `${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`;
      return `${yearMouthDay} ${day} ${join} ${startTimeStr} - ${endTimeStr}`
    },

    getMobFormatTime(startTime, endTime) {
      return `${this.getOneMobFormatTime(startTime)} ～ ${this.getOneMobFormatTime(endTime)}`
    },

    getOneMobFormatTime(time) {
      let dateInstance = new Date(time);
      let mouthDay = `${(dateInstance.getMonth() + 1).toString().padStart(2, "0")}/${dateInstance.getDate().toString().padStart(2, "0")}`;
      let hourMin = `${dateInstance.getHours().toString().padStart(2, '0')}:${dateInstance.getMinutes().toString().padStart(2, '0')}`;
      return `${mouthDay} ${hourMin}`
    },


    getFormatTime2(startTime, endTime) {
      return `起：&nbsp;&nbsp;${this.getOneDayFormat(startTime)}<br />止：&nbsp;&nbsp;${this.getOneDayFormat(endTime)}`
    },

    getOneDayFormat(time) {
      let dateInstance = new Date(time);
      let yearMouthDay = `${dateInstance.getFullYear()}年${(dateInstance.getMonth() + 1).toString().padStart(2, "0")}月${dateInstance.getDate().toString().padStart(2, "0")}日`;
      let day = `星期${dayToZH[dateInstance.getDay()]}`;
      let hourMin = `${dateInstance.getHours().toString().padStart(2, '0')}:${dateInstance.getMinutes().toString().padStart(2, '0')}`;
      return `${yearMouthDay} ${day} ${hourMin}`
    }
  }
}
