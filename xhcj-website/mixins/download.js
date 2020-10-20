export default {
  head() {
    return {
      title: "App下载",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "My custom description"
        }
      ]
    };
  },
  mounted() {
    this.initOpenInstall();
    if (process.client) {
      this.onShare();
    }
  },
  methods: {
    initOpenInstall() {
      const _this = this;
      new OpenInstall({
        appKey: "v2t7d4",
        onready: function () {
          _this.openInstallInstance = this;
        }
      }, this.$route.query)
    },

    download() {
      if (!this.openInstallInstance) return;
      this.openInstallInstance.wakeupOrInstall();
    },

    onShare() {
      // 当别人点分享按钮进入时
      let userId = this.$route.query.uid;
      if (!userId) return;
      this.$axios.post(`${this.$getBaseUrl()}/official/inviteHist/add`, {
        userId,
        type: "view",
        deviceType: "other",
        param: JSON.stringify(this.$route.query),
        userAgent: navigator.userAgent
      })
    }
  }
}
