<template>
  <div class="hot-topic-container" ref="hotTopicContainer">
    <div class="hot-topic-inner">
      <div class="head">
        <div class="title">热点专题</div>
        <div class="a-jump" @click="hotClick">全部专题 &gt;</div>
      </div>
      <div class="content">
        <div
          class="hot-img-container"
          :class="{'hot-img-container-animation':startShowSelf}"
          v-for="(specialItem,index) in hotSpecials"
          :key="index"
          @click="jumpTopicDetail(specialItem)"
        >
          <img :src="specialItem.topPicUrl" alt class="hot-img"/>
          <!--indexPicUrl-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "hot-topic",
    props: {
      topicList: {
        type: Array,
        default: function () {
          return Array(3).fill(
            "http://xhfmedia.oss-cn-hangzhou.aliyuncs.com/appimages/202006/f81463ba-f7d3-44d8-b6bf-77fd1054f9a5_crop_r.jpg"
          );
        }
      },
      hotSpecials: Array
    },
    data() {
      return {
        selfOffsetTop: 0,
        selfHalfHeight: 0,
        startShowSelf: false, // 是否进入了视口
        scrollTop: 0
      };
    },
    mounted() {
      if (process.server) return;

      this.selfOffsetTop = this.$refs.hotTopicContainer.offsetTop;
      this.selfHalfHeight = this.$refs.hotTopicContainer.offsetHeight / 2;


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
      hotClick() {
        if (process.isMob) {
          location.href = "/topic-mob"
        } else {
          location.href = "/topic"
        }
      },

      jumpTopicDetail(specialItem) {
        if (process.isMob) {
          location.href = `./topicDetail-mob?id=${specialItem.id}`;
        } else {
          location.href = `./topicDetail?id=${specialItem.id}`;
        }
      }
    }
  };
</script>

<style scoped lang="less">
  .hot-topic-container {
    width: 100%;
    background: #eef4fa;
    padding: 56px 0 80px;
    margin-top: 10px;

    .hot-topic-inner {
      width: 1120px;
      margin: 0 auto;

      .head {
        display: flex;

        .title {
          font-size: 20px;
          font-weight: 600;
          color: #222;
        }

        .a-jump {
          margin-left: auto;
          color: #0098ffaa;
          font-size: 12px;
          transition: all 0.4s;
          cursor: pointer;

          &:hover {
            font-size: 13px;
          }
        }
      }

      .content {
        margin-top: 32px;
        display: flex;
        justify-content: space-between;

        .hot-img-container {
          width: 360px;
          height: 202px;
          overflow: hidden;
          transform: translateY(100px);
          opacity: 0;
          border-radius: 8px;

          .hot-img {
            width: 100%;
            height: 100%;
            /*object-fit: contain;*/
            cursor: pointer;
            transition: all 0.5s;
            display: block;
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: 8px;

            &:hover {
              transform: scale(1.1);
            }
          }
        }

        .hot-img-container-animation {
          animation: showFromBottom 1s forwards;
        }
      }
    }
  }

  .mob {
    padding: 0.2rem 0.1rem;

    .hot-topic-inner {
      width: 100%;
    }

    .content {
      margin-top: 0.32rem;
      flex-direction: column;

      .hot-img-container {
        width: 100% !important;
        height: auto !important;
        transform: translateY(0.5rem);
        margin-bottom: 0.1rem;
        border-radius: 4px !important;
      }
    }
  }

  @keyframes showFromBottom {
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>
