// TODO Loading

export default {
  data() {
    return {
      hotKeys: [],
      searchArticleResults: [],
      searchNewsFlashResults: [],
      searchNewsSpecialResults: [],

      total: "",

      tabs: [
        {
          label: "文章"
        },
        {
          label: "快讯"
        },
        {
          label: "专题"
        }
      ],
      activeTabIndex: 0,
      keyword: "",

      pageNum: 2,
      pageSize: 10,
      pcType: "article",

      loading: true,
      ajaxRandomId: 0
    }
  },

  head() {
    return {
      title: "搜索"
    }
  },

  async mounted() {
    this.keyword = this.$route.query.keyword;

    if (process.client) {
      let selfAjaxRandomId = Math.random();
      this.ajaxRandomId = selfAjaxRandomId;
      try {
        let hotKeysRes = await this.$axios.get(`${this.$getBaseUrl()}/official/search/keyword`);
        this.hotKeys = hotKeysRes.data.code === 200 ? hotKeysRes.data.data : [];
        if (!this.keyword) return;


        let searchRes = await this.$axios.post(`${this.$getBaseUrl()}/official/search`, {
          pageNum: 1,
          pageSize: 10,
          pcType: "article",
          searchValue: this.keyword
        }, {
          headers: {
            'Content-type': 'application/json'
          }
        });
        if (this.ajaxRandomId !== selfAjaxRandomId) return;
        let searchArticleResults = searchRes.data.code === 200 ? searchRes.data.rows.map(row => {
          row.listPicOne = row.listPicOne || row.image;
          return row
        }) : [];
        let total = searchRes.data.code === 200 ? searchRes.data.total : 0;

        this.searchArticleResults = searchArticleResults;
        this.total = total;
      } catch (e) {
      } finally {
        if (this.ajaxRandomId === selfAjaxRandomId) {
          this.loading = false;
        }
      }
    }
  },

  methods: {
    showMore() {
      switch (this.activeTabIndex) {
        case 0:
          this.pcType = "article";
          this.getSearchResults("searchArticleResults", true, false);
          break;
        case 1:
          this.pcType = "newsflash";
          this.getSearchResults("searchNewsFlashResults", true, false);
          break;
        case 2:
          this.pcType = "special";
          this.getSearchResults("searchNewsSpecialResults", true, false);
          break;
      }
    },

    onTabSelect(tabItem, index) {
      if (this.activeTabIndex === index) return;
      this.pageNum = 1;
      this.activeTabIndex = index;
      this.searchArticleResults = [];
      this.searchNewsFlashResults = [];
      this.searchNewsSpecialResults = [];
      this.total = "";

      switch (this.activeTabIndex) {
        case 0:
          this.pcType = "article";
          this.getSearchResults("searchArticleResults");
          break;
        case 1:
          this.pcType = "newsflash";
          this.getSearchResults("searchNewsFlashResults");
          break;
        case 2:
          this.pcType = "special";
          this.getSearchResults("searchNewsSpecialResults");
          break;
      }
    },

    getSearchResults(targetResultsKey, isConcat = false, isLoading = true) {

      let selfAjaxRandomId = Math.random();
      this.ajaxRandomId = selfAjaxRandomId;

      if (isLoading) {
        this.loading = true;
      }
      this.$axios.post(`${this.$getBaseUrl()}/official/search`, {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        pcType: this.pcType,
        searchValue: this.keyword
      }, {
        headers: {
          'Content-type': 'application/json'
        }
      }).then(res => {
        if (selfAjaxRandomId !== this.ajaxRandomId) return;
        if (res.data.code !== 200) return;
        this.pageNum++;
        if (isConcat) {
          this[targetResultsKey] = this[targetResultsKey].concat(res.data.rows.map(row => {
            row.listPicOne = row.listPicOne || row.image;
            return row
          }))
        } else {
          this[targetResultsKey] = res.data.rows.map(row => {
            row.listPicOne = row.listPicOne || row.image;
            return row
          })
        }
        this.total = res.data.total;
      }).finally(() => {
        if (selfAjaxRandomId !== this.ajaxRandomId) return;
        if (isLoading) {
          this.loading = false
        }
      })
    },

    search() {
      if (!this.keyword) return;
      this.pageNum = 1;
      this.searchArticleResults = [];
      this.searchNewsFlashResults = [];
      this.searchNewsSpecialResults = [];
      this.total = "";
      switch (this.activeTabIndex) {
        case 0:
          this.pcType = "article";
          this.getSearchResults("searchArticleResults");
          break;
        case 1:
          this.pcType = "newsflash";
          this.getSearchResults("searchNewsFlashResults");
          break;
        case 2:
          this.pcType = "special";
          this.getSearchResults("searchNewsSpecialResults");
          break;
      }
    },

    onSelectHot(keyword) {
      this.keyword = keyword;
      this.search();
    }
  }
}
