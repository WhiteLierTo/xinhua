<template xmlns:v-swiper="http://www.w3.org/1999/xhtml">
  <div class="download dsfjoppp">
    <div class="swiper-container ">
      <div v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
          <div class="swiper-slide section1 ">
            <div class="sec-top">
              <div class="sec-img1">
                <img src="http://www.xhfmedia.com/resources/front/xh/images/frame_appdownload@2x.png" alt=""
                     :class="show1?'sec-img1-animation':''">
              </div>
              <div class="sec-img2">
                <img src="../assets/download/1.png" alt=""
                     :class="show1?'sec-img2-animation':''">
              </div>
            </div>
            <div class="sec-bottom">
              <div class="sec-bottom-info" :class="show1?'sec-bottom-animation':''">
                历史见证权威媒体 <br/>新华日报财经上线
              </div>
              <a href="#" class="down-btn" :class="show1?'down-btn-animation':''" @click="download">点击下载</a>
            </div>
          </div>
          <div class="swiper-slide section2">
            <div class="sec-top">
              <div class="sec-top-info" :class="show2?'sec-top-animation':''">
                立场决定资讯态度<br/>我们精选信息源头
              </div>
            </div>
            <div class="sec-bottom">
              <div class="sec-img1" :class="show2?'sec-img1-animation':''">
                <img src="http://www.xhfmedia.com/resources/front/xh/images/element2-2_download@2x.png" alt="">
              </div>
              <div class="sec-img2" :class="show2?'sec-img2-animation':''">
                <img src="http://www.xhfmedia.com/resources/front/xh/images/element2-1_download@2x.png" alt="">
              </div>
            </div>
          </div>
          <div class="swiper-slide section3">
            <div class="sec-top">
              <div class="sec-top-info" :class="show3?'sec-top-animation':''">
                市场动向机构策略
                <br/>我们搜集实操观点
              </div>
            </div>
            <div class="sec-bottom">
              <div class="sec-img1" :class="show3?'sec-img1-animation':''">
                <img src="http://www.xhfmedia.com/resources/front/xh/images/element3-4_download@2x.png" alt="">
              </div>
              <div class="sec-img2">
                <div class="sec-img21" :class="show3?'sec-img21-animation':''">
                  <img src="http://www.xhfmedia.com/resources/front/xh/images/element3-1_download@2x.png" alt="">
                </div>
                <div class="sec-img22" :class="show3?'sec-img22-animation':''">
                  <img src="http://www.xhfmedia.com/resources/front/xh/images/element3-2_download@2x.png" alt="">
                </div>
                <div class="sec-img23" :class="show3?'sec-img23-animation':''">
                  <img src="http://www.xhfmedia.com/resources/front/xh/images/element3-3_download@2x.png" alt=""
                       :class="show1?'sec-img2-animation':''">
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-slide section4">
            <div class="sec-top">
              <div class="sec-top-info" :class="show2?'sec-top-animation':''">
                现场体验对话实录
                <br/>我们直通一手视角
              </div>
            </div>
            <div class="sec-bottom">
              <div class="sec-img1" :class="show4?'sec-img1-animation':''">
                <img src="http://www.xhfmedia.com/resources/front/xh/images/element4-7_download@2x.png" alt="">
              </div>
              <div class="sec-img2">
                <div class="sec-img21" :class="show4?'sec-img21-animation':''">
                  <img src="http://www.xhfmedia.com/resources/front/xh/images/element4-1_download@2x.png" alt="">
                </div>
                <div class="sec-img22" :class="show4?'sec-img22-animation':''">
                  <img src="http://www.xhfmedia.com/resources/front/xh/images/element4-2_download@2x.png" alt="">
                </div>
                <div class="sec-img23" :class="show4?'sec-img23-animation':''">
                  <img src="http://www.xhfmedia.com/resources/front/xh/images/element4-3_download@2x.png" alt="">
                </div>
                <div class="sec-img24" :class="show4?'sec-img24-animation':''">
                  <img src="http://www.xhfmedia.com/resources/front/xh/images/element4-4_download@2x.png" alt="">
                </div>
                <div class="sec-img25" :class="show4?'sec-img25-animation':''">
                  <img src="http://www.xhfmedia.com/resources/front/xh/images/element4-5_download@2x.png" alt="">
                </div>
                <div class="sec-img26" :class="show4?'sec-img26-animation':''">
                  <img src="http://www.xhfmedia.com/resources/front/xh/images/element4-6_download@2x.png" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination" slot="pagination"></div>
      </div>
    </div>
    <div class="wx-mask" @click="isShowWxDialog = false" v-if="isShowWxDialog">
      <p>点击右上角 跳转至浏览器打开</p>
    </div>
  </div>
</template>
<script>
  import downloadMixin from "../mixins/download"

  export default {
    layout: "downloadDefault-mob",
    data() {
      return {
        swiperOption: {
          // slidesPerView: "auto",
          direction: 'vertical',
          //显示分页
          pagination: {
            el: '.swiper-pagination',
            paginationClickable: true,
          },
          on: {  //滑动调用该方法
            slideChange: (() => {
              let _this = this;
              return function () {
                if (this.activeIndex === 0) {
                  _this.show1 = true;
                  _this.show2 = false;
                  _this.show3 = false;
                  _this.show4 = false;
                } else if (this.activeIndex === 1) {
                  _this.show1 = false;
                  _this.show2 = true;
                  _this.show3 = false;
                  _this.show4 = false;
                } else if (this.activeIndex === 2) {
                  _this.show1 = false;
                  _this.show2 = false;
                  _this.show3 = true;
                  _this.show4 = false;
                } else if (this.activeIndex === 3) {
                  _this.show1 = false;
                  _this.show2 = false;
                  _this.show3 = false;
                  _this.show4 = true;
                }
              }
            })()
          },
        },
        show1: true,
        show2: false,
        show3: false,
        show4: false,
        isShowWxDialog: false
      }
    },
    mixins: [downloadMixin]
  }
</script>
<style lang="less" scoped>
  .download {
    height: 100vh;

    .swiper-container {
      width: 100%;
      height: 100%;

      .section1 {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        background: url("http://www.xhfmedia.com/resources/front/xh/images/bg1_download_phone@2x.png");
        background-size: 100%;
        padding: 0 0.1rem;

        .sec-top {
          flex: 1;
        }

        .sec-img1 {
          position: absolute;
          top: 1.6rem;
          left: 0.1rem;
          width: 3.12rem;
          height: 1.34rem;
          z-index: 99;

          img {
            width: 100%;
            height: 100%;
          }

          &-animation {
            //alternate 反向播放
            animation: 2.4s alternate none infinite running Updown;
          }
        }

        .sec-img2 {
          position: absolute;
          left: 15%;
          top: .66rem;
          width: 2.62rem;
          height: 3.43rem;

          img {
            width: 100%;
            height: 100%;
          }

          &-animation {
            animation: 2s FadeInTop1;
          }
        }

        .sec-bottom {
          height: 2.31rem;
          text-align: center;

          &-info {
            font-size: 0.25rem;
            font-weight: 600;
            line-height: 0.35rem;
            color: #0098ff;
            margin-bottom: 0.24rem;
          }

          &-animation {
            animation: 2s FadeInLeft;
          }

          .down-btn {
            display: block;
            width: 1.5rem;
            height: 0.36rem;
            margin: 0 auto;
            font-size: 0.14rem;
            font-weight: 300;
            line-height: 0.36rem;
            border-radius: 0.245rem;
            background-color: #0098ff;
            box-shadow: 0 5px 10px 0 rgba(0, 152, 255, 0.3);
            color: #fff;

            &-animation {
              animation: 2s FadeInTop;
            }
          }
        }
      }

      .section2 {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        background: #0175ff url("http://www.xhfmedia.com/resources/front/xh/images/bg2_appdownload@2x.png");
        background-size: auto 100%;
        padding: 0 0.1rem;

        .sec-top {
          text-align: center;

          &-info {
            position: relative;
            z-index: 40;
            top: 1.3rem;
            font-size: 0.25rem;
            font-weight: 600;
            line-height: 0.35rem;
            color: #fff;
          }

          &-animation {
            animation: 2s FadeInTop;
          }

        }

        .sec-bottom {
          flex: 1;
          text-align: center;

          .sec-img1 {
            position: absolute;
            top: 2.6rem;
            left: 0.6rem;
            width: 2.64rem;
            height: 2.84rem;
            z-index: 99;

            img {
              width: 100%;
              height: 100%;
            }

            &-animation {
              animation: 2s FadeInTop;
            }
          }

          .sec-img2 {
            position: absolute;
            top: 2.6rem;
            left: 0.4rem;
            width: 3rem;
            height: 2.46rem;
            z-index: 999;

            img {
              width: 100%;
              height: 100%;
            }

            &-animation {
              animation: 2.9s 0s alternate none infinite running Updown1;
            }
          }
        }
      }

      .section3 {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        background: #0175ff url("http://www.xhfmedia.com/resources/front/xh/images/bg2_download@2x.png");
        background-size: auto 100%;
        padding: 0 0.1rem;

        .sec-top {
          text-align: center;

          &-info {
            position: relative;
            z-index: 40;
            top: 1.3rem;
            font-size: 0.25rem;
            font-weight: 600;
            line-height: 0.35rem;
            color: #fff;
          }

          &-animation {
            animation: 2s FadeInTop;
          }

        }

        .sec-bottom {
          flex: 1;
          text-align: center;

          .sec-img1 {
            position: absolute;
            top: 2.6rem;
            left: 0.6rem;
            width: 2.64rem;
            height: 2.84rem;
            z-index: 99;

            img {
              width: 100%;
              height: 100%;
            }

            &-animation {
              animation: 2s FadeInTop;
            }
          }

          .sec-img2 {
            .sec-img21 {
              position: absolute;
              width: .62rem;
              height: .79rem;
              top: 3.30rem;
              left: 0.70rem;
              z-index: 999;

              img {
                width: 100%;
                height: 100%;
              }

              &-animation {
                animation: 2.9s 0s alternate none infinite running Updown1;
              }
            }

            .sec-img22 {
              position: absolute;
              width: .62rem;
              height: .72rem;
              top: 4.45rem;
              left: 1.95rem;
              z-index: 999;

              img {
                width: 100%;
                height: 100%;
              }

              &-animation {
                animation: 3.4s 0s alternate none infinite running Updown1;
              }
            }

            .sec-img23 {
              position: absolute;
              width: .35rem;
              height: .4rem;
              top: 3.25rem;
              left: 2.99rem;
              z-index: 999;

              img {
                width: 100%;
                height: 100%;
              }

              &-animation {
                animation: 2.5s 0s alternate none infinite running Updown1;
              }
            }
          }
        }
      }

      .section4 {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        background: #0175ff url("http://www.xhfmedia.com/resources/front/xh/images/bg2_appdownload@2x.png");
        background-size: auto 100%;
        padding: 0 0.1rem;

        .sec-top {
          height: 3.31rem;
          text-align: center;

          &-info {
            position: relative;
            z-index: 40;
            top: 1.3rem;
            font-size: 0.25rem;
            font-weight: 600;
            line-height: 0.35rem;
            color: #fff;
          }

          &-animation {
            animation: 2s FadeInTop;
          }

        }

        .sec-bottom {
          flex: 1;
          text-align: center;

          .sec-img1 {
            position: absolute;
            top: 2.6rem;
            left: 0.6rem;
            width: 2.64rem;
            height: 2.84rem;
            z-index: 99;

            img {
              width: 100%;
              height: 100%;
            }

            &-animation {
              animation: 2s FadeInTop;
            }
          }

          .sec-img2 {
            .sec-img21 {
              position: absolute;
              width: .57rem;
              height: 1.41rem;
              top: 3.30rem;
              left: 0.40rem;
              z-index: 999;

              img {
                width: 100%;
                height: 100%;
              }

              &-animation {
                animation: 1s 0s FadeInTop;
              }
            }

            .sec-img22 {
              position: absolute;
              width: .52rem;
              height: 1.37rem;
              top: 4.3rem;
              left: 0.65rem;
              z-index: 999;

              img {
                width: 100%;
                height: 100%;
              }

              &-animation {
                animation: 1s 0.2s FadeInTop;
              }
            }

            .sec-img23 {
              position: absolute;
              width: .54rem;
              height: 1.27rem;
              top: 4.7rem;
              left: 1.2rem;
              z-index: 999;

              img {
                width: 100%;
                height: 100%;
              }

              &-animation {
                animation: 1s 0.4s FadeInTop;
              }
            }

            .sec-img24 {
              position: absolute;
              width: .66rem;
              height: 1.48rem;
              top: 4.45rem;
              left: 1.9rem;
              z-index: 999;

              img {
                width: 100%;
                height: 100%;
              }

              &-animation {
                animation: 1s 0.6s FadeInTop;
              }
            }

            .sec-img25 {
              position: absolute;
              width: .52rem;
              height: 1.34rem;
              top: 4.3rem;
              left: 2.7rem;
              z-index: 999;

              img {
                width: 100%;
                height: 100%;
              }

              &-animation {
                animation: 1s 0.8s FadeInTop;
              }
            }

            .sec-img26 {
              position: absolute;
              width: .52rem;
              height: 1.29rem;
              top: 3.7rem;
              left: 2.95rem;
              z-index: 999;

              img {
                width: 100%;
                height: 100%;
              }

              &-animation {
                animation: 1s 1s FadeInTop;
              }
            }
          }
        }
      }
    }
  }

  a {
    text-decoration: none;
  }

  @keyframes Updown {
    0% {
      transform: translateY(0.3rem);
    }
    100% {
      transform: translateY(0);
    }
  }

  @keyframes Updown1 {
    0% {
      transform: translateY(-0.35rem);
    }
    100% {
      transform: translateY(0);
    }
  }

  @keyframes FadeInTop {
    0% {
      opacity: 0;
      transform: translateY(1rem);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  @keyframes FadeInTop1 {
    0% {
      opacity: 0;
      transform: translateY(1.8rem);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  @keyframes FadeInLeft {
    0% {
      opacity: 0;
      transform: translateX(-50%);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .wx-mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 99999;

    p {
      width: 100%;
      text-align: center;
      margin-top: 0.4rem;
      color: #fff;
      font-size: 14px;
      font-weight: 300;
      letter-spacing: 1px;
    }
  }
</style>
<style lang='less'>
  .dsfjoppp {
    .swiper-container-vertical
    > .swiper-pagination-bullets
    .swiper-pagination-bullet {
      margin: 0.12rem !important;
    }

    i {
      padding-right: 0.05rem;
    }

    .swiper-pagination-bullet-active {
      background-color: #fff;
    }
  }
</style>
