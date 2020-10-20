<template xmlns:v-swiper="http://www.w3.org/1999/xhtml">
  <div class="xh-new-carousel-container" :style="{height:`${height}px`}">
    <div v-swiper:mySwiper="swiperOption" ref="mySwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(carouselItem,index) in carousels" :key="index">
          <div class="swiper-item">
            <img :src="carouselItem.path" alt="">
          </div>
        </div>
      </div>
      <div class="swiper-pagination" slot="pagination"></div>
    </div>
    <div class="mask-container">
      <div
        class="mask-cell"
        :class="{activeCell:activeCarouselIndex === index}"
        v-for="(item,index) in carousels" :key="index"
        @click="changeCarouse(index)"
      >
        <div class="grow-container">
          <div class="grow-bar"></div>
        </div>
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "xh-new-carousel",
    props: {
      height: {
        type: Number,
        default: 556
      },
      carousels: Array
    },
    data() {
      return {
        swiperOption: {
          loop: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false
          },
          on: {
            tap: (() => {
              const _this = this;
              return function () {
                let article = _this.carousels[this.realIndex];
                if (process.isMob) {
                  location.href = `./newsDetail-mob?id=${article.id}&type=${article.articleType}`;
                } else {
                  location.href = `./newsDetail?id=${article.id}&type=${article.articleType}`;
                }
              }
            })(),
            slideChangeTransitionStart: this.slideChangeTransitionStartHigher()
          }
        },
        activeCarouselIndex: 0,
        swiperInstance: null
      }
    },
    mounted() {
      if (process.client) {
      }
    },
    methods: {
      changeCarouse(index) {
        this.$refs.mySwiper.swiper.slideTo(index + 1);
      },

      slideChangeTransitionStartHigher() {
        const vue = this;
        return function () {
          vue.activeCarouselIndex = this.realIndex;
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .xh-new-carousel-container {
    position: relative;
    overflow: hidden;

    .swiper-item {
      width: 100%;
      overflow: hidden;
      cursor: pointer;

      img {
        width: 100%;
      }
    }

    .mask-container {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 230px;
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));
      z-index: 20;
      display: flex;
      padding: 140px 40px 5px;
      pointer-events: none;

      .mask-cell {
        height: 100%;
        flex: 1;
        overflow: hidden;
        flex-shrink: 0;
        color: white;
        opacity: 0.5;
        font-size: 12px;
        line-height: 17px;
        margin-right: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        padding-top: 10px;
        cursor: pointer;
        pointer-events: all;

        .grow-container {
          animation: delayShow 0s forwards;
          animation-delay: 4s;
          opacity: 0;

          .grow-bar {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background-color: white;
            animation: barHide 5s forwards;
          }
        }
      }

      .activeCell {
        opacity: 0.9;

        .grow-container {
          opacity: 1 !important;

          .grow-bar {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background-color: white;
            animation: barGrow 5s;
          }
        }
      }
    }
  }

  .radius {
    border-radius: 8px;
  }

  @keyframes barGrow {
    from {
      width: 0;
    }
  }

  @keyframes barHide {
    to {
      width: 0;
    }
  }

  @keyframes delayShow {
    to {
      opacity: 1;
    }
  }
</style>
