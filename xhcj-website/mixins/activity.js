export default {
  asyncData(context) {
    return context.$axios.get(`${context.app.$getBaseUrl()}/pc/activity/list/1`).then(res => {
      if (res.data.code !== 200) {
        return {}
      }
      while ((res.data.data.activityList.length % 3) !== 0) {
        res.data.data.activityList.push(null)
      }
      return {
        banners: res.data.data.advList,
        allActives: res.data.data.activityList
      }
    }).catch(err => {
      return {}
    })
  },
  data() {
    return {
      activeTabIndex: 0,
      tabsOffsetTop: 0,
      tabs: [
        {
          label: "全部活动"
        },
        {
          label: "即将到来"
        },
        {
          label: "已经结束"
        }
      ],
      showActives: [], // 当前展示的活动
      banners: [],
      allActives: [], // 全部活动
      willActives: [], // 即将到来
      beforeActives: [], // 已经发生
    }
  },
  inject: ["onHeadChange", "resetOriginalHead"],

  head() {
    return {
      title: "活动",
    };
  },

  mounted() {
    if (!process.client) return;
    // 测量
    this.showActives = this.allActives;
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
        this.onHeadChange(this.tabs, this.activeTabIndex, (item, index) => {
          this.selectTab(index);
        });
      } else {
        this.resetOriginalHead();
      }
    },

    selectTab(index) {
      this.activeTabIndex = index;
      switch (index) {
        case 0:
          this.showActives = this.allActives; // 全部活动,一定获取
          break;
        case 1:
          this.setWillActives();
          break;
        case 2:
          this.setBeforeActives();
          break;
      }
    },

    async setWillActives() {
      if (this.willActives.length === 0) {
        let res = await this.$axios.get(`${this.$getBaseUrl()}/pc/activity/list/l2_coming`);
        if (!res.data || res.data.code !== 200) return;
        this.willActives = this.makeUpToThree(res.data.data.activityList);
      }
      this.showActives = this.willActives;
    },

    async setBeforeActives() {
      if (this.willActives.length === 0) {
        let res = await this.$axios.get(`${this.$getBaseUrl()}/pc/activity/list/l1_finish`);
        if (!res.data || res.data.code !== 200) return;
        this.beforeActives = this.makeUpToThree(res.data.data.activityList);
      }
      this.showActives = this.beforeActives;
    },

    makeUpToThree(rows) {
      // 补齐到3的倍数
      while ((rows.length % 3) !== 0) {
        rows.push(null)
      }
      return rows
    }
  }
}
