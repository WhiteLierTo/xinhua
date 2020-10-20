<template>
  <div class="flash-news-container" :class="{'flash-news-show':isShow}" ref="flashNews">
    <div class="flash-news-content" v-html="coloredContent"></div>
    <div class="time">{{ info.publicTime | timeFormat }}</div>
  </div>
</template>

<script>
  export default {
    name: "flashNews",
    props: {
      info: Object,
      keyword: String
    },
    computed: {
      coloredContent() {
        if (!this.info.content) return;
        let reg = new RegExp(this.keyword, "gim");
        return this.info.content.replace(reg, `<span style="color:#0098ff">${this.keyword}</span>`)
      }
    },
    data() {
      return {
        flashNewsOffsetTop: 0,
        isShow: false
      }
    },
    mounted() {
      if (!process.client) return;
      this.flashNewsOffsetTop = this.$refs.flashNews.offsetTop;
      let needNotListen = this.onScroll();
      if (!needNotListen) {
        document.addEventListener("scroll", this.onScroll);
      }
    },
    beforeDestroy() {
      document.removeEventListener("scroll", this.onScroll);
    },

    methods: {
      onScroll() {
        let scrollTop = (document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop);
        if ((scrollTop + window.innerHeight) >= this.flashNewsOffsetTop) {
          this.isShow = true;
          document.removeEventListener("scroll", this.onScroll);
          return true
        }
        return false
      }
    }
  }
</script>

<style scoped lang="less">
  .flash-news-container {
    width: 100%;
    color: #555555;
    font-weight: 300;
    margin-bottom: 20px;
    text-align: justify;
    opacity: 0.5;
    transform: translateY(100px);

    .flash-news-content {
      margin-bottom: 6px;
    }

    .time {
      color: #b5b5b5;
      font-size: 14px;
    }
  }

  .flash-news-show {
    animation: showFromBottom 1s forwards;
  }

  @keyframes showFromBottom {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
