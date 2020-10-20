<template xmlns:v-swiper="http://www.w3.org/1999/xhtml">
  <div class="xh-carousel-mob-container">
    <div v-swiper:mySwiper="swiperOption" ref="mySwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(carouselItem,index) in carousels" :key="index">
          <div class="swiper-item">
            <img :src="carouselItem.path" alt="">
            <div class="carousel-text-container">
              <p>{{ carouselItem.name }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-pagination" slot="pagination"></div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "xh-carousel-mob",
    props: {
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
            })()
          },
          pagination: {
            el: '.swiper-pagination',
          }
        },

      }
    },
  }
</script>

<style scoped lang="less">
  .xh-carousel-mob-container {
    height: calc((100vw - 0.2rem) * 9 / 16);
    overflow: hidden;

    .swiper-item {
      width: 100%;
      height: calc((100vw - 0.2rem) * 9 / 16);
      position: relative;

      img {
        width: 100%;
      }

      .carousel-text-container {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 80%;
        color: white;
        font-weight: 600;
        padding: 0 0.1rem 0.25rem;
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), #000000);
        display: flex;
        align-items: flex-end;
      }
    }
  }

  .radius {
    border-radius: 8px;
  }
</style>

<style lang="less">
  .xh-carousel-mob-container {
    .swiper-pagination-bullet {
      background: white !important;
    }
  }

</style>
