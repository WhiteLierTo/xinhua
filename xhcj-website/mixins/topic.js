export default {
  asyncData(context) {

    return context.$axios.post(`${context.app.$getBaseUrl()}/official/specialList`, {pageNum: 1, pageSize: 12}, {
      headers: {
        'Content-type': 'application/json'
      }
    }).then(res => {
      if (res.data.code === 200) {
        return {
          topics: res.data.rows,
          total: res.data.total
        }
      }
    }).catch(err => {
      console.log("err", err)
    })
  },

  data() {
    return {
      topics: [],
      pageNum: 2,
      pageSize: 12,
      total: 0
    };
  },

  head() {
    return {
      title: "专题列表"
    }
  },

  methods: {
    findMore() {
      this.$axios.post(`${this.$getBaseUrl()}/official/specialList`, {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }, {
        headers: {
          'Content-type': 'application/json'
        }
      }).then(res => {
        if (res.data.code !== 200) return;
        this.pageNum++;
        this.topics = this.topics.concat(res.data.rows);
        this.total = res.data.total;
      }).catch(err => {
        console.log("err", err)
      })
    },

    showDetail(id) {
      if (process.isMob) {
        location.href = `./topicDetail-mob?id=${id}`;
      } else {
        location.href = `./topicDetail?id=${id}`;
      }
    }
  }
};
