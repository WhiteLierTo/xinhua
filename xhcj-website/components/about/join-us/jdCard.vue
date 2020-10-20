<template>
  <div class="jd-card-container" ref="jdCard" :class="{startShowSelf:startShowSelf}">
    <div class="jd-card-left-container">
      <div class="jd-name">{{ info.name }}</div>
      <div class="id-info">
        本科及以上
        <br/>3-5年工作经验
        <br/>
        <br/>北京
      </div>
      <div class="apply-bt">
        <i class="fa fa-envelope" style="margin-right: 4px;" aria-hidden="true"></i>
        <a href="mailto:service@xhfmedia.com">申请该职位</a>
      </div>
    </div>
    <div class="jd-card-content-container">
      <div class="jd-card-content-part">
        <div class="job-text">岗位职责</div>
        <p class="job-content" v-for="(text,index) in info.duty" :key="index">{{ index + 1 }}. {{ text }}</p>
      </div>
      <div class="jd-card-content-part">
        <div class="job-text">任职要求</div>
        <p class="job-content" v-for="(text,index) in info.requirement" :key="index">{{ index + 1 }}. {{ text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "jdCard",
    props: {
      info: Object,
    },
    data() {
      return {
        startShowSelf: false
      }
    },
    mounted() {
      if (process.server) return;
      this.selfOffsetTop = this.$refs.jdCard.offsetTop;
      // this.selfHalfHeight = this.$refs.jdCard.offsetHeight / 2;
      this.selfHalfHeight = window.innerHeight / 5;


      let scrollTop = (document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop);
      if (
        scrollTop + window.innerHeight - this.selfHalfHeight >=
        this.selfOffsetTop
      ) {
        this.startShowSelf = true;
      } else {
        document.addEventListener("scroll", this.onScroll);
      }
    },
    beforeDestroy() {
      document.removeEventListener("scroll", this.onScroll);
    },
    methods: {
      onScroll() {
        let scrollTop = (document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop);
        if (
          scrollTop + window.innerHeight - this.selfHalfHeight >=
          this.selfOffsetTop
        ) {
          this.startShowSelf = true;
          document.removeEventListener("scroll", this.onScroll);
        }
      },
    }
  }
</script>

<style scoped lang="less">
  .jd-card-container {
    padding: 40px 30px;
    background: #fff;
    margin-bottom: 60px;
    display: flex;
    justify-content: space-between;
    transition: all 1s;
    transform: translateY(150px);
    opacity: 0;
    border: 2px solid transparent;

    &:hover {
      border: 2px solid rgb(0, 152, 255);
      box-shadow: 0 5px 10px 0 rgba(0, 152, 255, 0.3);
    }

    &:last-child {
      margin-bottom: 0;
    }

    .jd-card-left-container {
      margin-right: 55px;
      flex-shrink: 0;

      .jd-name {
        font-size: 36px;
        font-weight: 300;
        text-align: left;
        color: rgb(0, 152, 255);
        padding-bottom: 24px;
      }

      .id-info {
        font-size: 18px;
        font-weight: 300;
        line-height: 36px;
        text-align: left;
        color: rgb(85, 85, 85);
      }

      .apply-bt {
        width: 230px;
        height: 49px;
        border-radius: 8px;
        background-color: rgb(0, 152, 255);
        box-shadow: 0 5px 10px 0 rgba(0, 152, 255, 0.3);
        color: #fff;
        margin-top: 36px;
        text-align: center;
        line-height: 49px;
        cursor: pointer;

        a {
          color: #fff;
          text-decoration: none;
        }
      }
    }

    .jd-card-content-container {
      flex: 1;
      display: flex;

      .jd-card-content-part {
        flex: 1;

        &:first-child {
          margin-right: 55px;
        }

        .job-text {
          font-size: 24px;
          margin-bottom: 27px;
          font-weight: 600;
        }

        .job-content {
          font-size: 14px;
          margin-bottom: 24px;
          font-weight: 300;
          letter-spacing: 1px;
        }
      }
    }
  }

  .startShowSelf {
    animation: showFromBottom 1.5s forwards;
  }

  .mob {
    padding: 0.2rem 0.1rem;
    margin-bottom: 0.2rem;
    flex-direction: column;

    .jd-card-left-container {
      .jd-name {
        font-size: 22px;
        padding-bottom: 0.1rem;
      }

      .id-info {
        font-size: 14px;
        padding-bottom: 0.1rem;
        line-height: 22px;
      }

      .apply-bt {
        width: 2.3rem;
        height: 0.5rem;
        margin-top: 0.3rem;
        line-height: 0.5rem;
        margin-bottom: 0.3rem;
      }
    }

    .jd-card-content-container {
      flex-direction: column;
    }
  }

  @keyframes showFromBottom {
    to {
      transform: unset;
      opacity: 1;
    }
  }
</style>
