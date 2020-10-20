export default {
  async asyncData(context) {
    if (process.client) return;

    if ((process.isMob && context.req.path !== "/index-mob") || (!process.isMob && context.req.path !== "/")) {
      // 不匹配,直接走
      return
    }

    try {
      let sharesRes = await context.$axios.get(`${context.app.$getBaseUrl()}/official/stock`);

      let res = await context.$axios.get(`${context.app.$getBaseUrl()}/official/data`);
      let mainDetail = res.data.code !== 200 ? {} : {
        normalList: res.data.data.normalList.map(tab => {
          tab.label = tab.id !== "recommend" ? tab.name : "最新文章";
          return tab
        }),
        liveInfoList: res.data.data.liveInfoList,
        pcBannerList: res.data.data.pcBannerList.map(banner => {
          banner.name = banner.title;
          banner.path = banner.contentImgPath.startsWith("http") ? banner.contentImgPath : `http://xhfmedia.com/${banner.contentImgPath}`;
          return banner
        }),
        hotArticleList: res.data.data.hotArticleList.map(article => {
          if (article) {
            article.img = article.listPicOne;
            article.time = article.publishDate;
            return article
          }
        }).filter(Boolean),
        newsFlashList: res.data.data.newsFlashList,
        businessList: sharesRes.data.data
      };

      let hotSpecialRes = await context.$axios.post(`${context.app.$getBaseUrl()}/official/specialList`, {
        pageNum: 1,
        pageSize: 3
      }, {
        headers: {
          'Content-type': 'application/json'
        }
      });


      let specialDetail = hotSpecialRes.data.code !== 200 ? {} : {
        hotSpecials: hotSpecialRes.data.rows
      };

      let articlesDetail = {};

      if (mainDetail.normalList) {
        // 去找第一条
        // this.activeChannelId = "recommend";
        let articlesRes = await context.$axios.post(`${context.app.$getBaseUrl()}/official/articleList`, {
          pageNum: 1,
          pageSize: 18,
          channelId: "recommend"  // mainDetail.normalList[0].id
        }, {
          headers: {
            'Content-type': 'application/json'
          }
        });
        if (articlesRes.data.code === 200) {
          articlesDetail = {
            articles: articlesRes.data.rows,
            articlesTotal: articlesRes.data.total,
            activeChannelId: "recommend"
          }
        } else {
          articlesDetail = {
            activeChannelId: "recommend"
          }
        }
      }
      // TODO promise并发
      return {
        ...mainDetail,
        ...specialDetail,
        ...articlesDetail
      }
    } catch (e) {
      console.log("e", e);
      return {}
    }
  },
  data() {
    return {
      normalList: [],
      liveInfoList: [],
      pcBannerList: [],
      hotArticleList: [],
      newsFlashList: [],
      businessList: [],
      hotSpecials: [],
      articles: [],
      articlesTotal: 0,

      pageSize: 18,
      pageNum: 2,
      activeChannelId: "",
    }
  },

  methods: {
    onTabChange(tab) {
      this.pageNum = 1;
      this.activeChannelId = tab.id;
      this.articlesTotal = 0;
      this.getArticles();
    },

    loadMore() {
      this.getArticles(true);
    },

    getArticles(isConcat = false) {
      this.$axios.post(`${this.$getBaseUrl()}/official/articleList`, {
        pageNum: this.pageNum,
        pageSize: 18,
        channelId: this.activeChannelId  // mainDetail.normalList[0].id
      }, {
        headers: {
          'Content-type': 'application/json'
        }
      }).then(res => {
        if (res.data.code !== 200) return;
        this.pageNum++;
        if (!isConcat) {
          this.articles = res.data.rows;
        } else {
          this.articles = this.articles.concat(res.data.rows);
        }
        this.articlesTotal = res.data.total;
      }).catch(() => {
      });
    }
  }
}
