<template xmlns:v-swiper="http://www.w3.org/1999/xhtml">
  <div class="download-box hjvjhjhvi">
    <div class="swiper-container">
      <div v-swiper:mySwiper="swiperOption" class="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide section1">
            <div class="sec-content">
              <div class="section1-left">
                <div class="section1-left-info" :class="{'section1-left-animation':show1}">
                  历史见证权威媒体
                  <br/>新华日报财经上线
                </div>
                <div class="section1-left-btn" :class="{'sec-animation':show1}">
                  <div ref="download" id="download" @click="download">
                    <i class="fa fa-download" style="font-size: 15px"></i>点击下载
                  </div>
                </div>
              </div>
              <div class="section1-right">
                <img
                  src="../assets/download/1.png"
                  alt
                  width="471"
                  :class="{'sec-img1':show1}"
                />
                <div class="animation-right">
                  <img
                    src="http://www.xhfmedia.com/resources/front/xh/images/frame_appdownload@2x.png"
                    alt
                    :class="{'sec-img2':show1}"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-slide section2">
            <div class="sec-content">
              <div class="section1-left">
                <div class="section1-left-info" :class="{'section2-left-animation':show2}">
                  立场决定资讯态度
                  <br/>我们精选信息源头
                </div>
              </div>
              <div class="section1-right">
                <img src="http://www.xhfmedia.com/resources/front/xh/images/element2-2_download@2x.png" alt width="500"
                     :class="{'sec1-img1':show2}"/>
                <div class="animation-right">
                  <img src="http://www.xhfmedia.com/resources/front/xh/images/element2-1_download@2x.png" alt
                       :class="{'sec1-img2':show2}"/>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-slide section3">
            <div class="sec-content">
              <div class="section1-left">
                <div class="section1-left-info" :class="{'section2-left-animation':show3}">
                  市场动向机构策略
                  <br/>我们搜集实操观点
                </div>
              </div>
              <div class="section1-right">
                <img src="http://www.xhfmedia.com/resources/front/xh/images/element3-4_download@2x.png" alt width="446"
                     :class="{'sec2-img1':show3}"/>
                <div class="animation-right">
                  <div class="animation-a">
                    <img src="http://www.xhfmedia.com/resources/front/xh/images/element3-1_download@2x.png" alt
                         width="62" :class="{'sec2-img2':show3}"/>
                  </div>
                  <div class="animation-b">
                    <img src="http://www.xhfmedia.com/resources/front/xh/images/element3-2_download@2x.png" alt
                         width="62" :class="{'sec2-img3':show3}"/>
                  </div>
                  <div class="animation-c">
                    <img src="http://www.xhfmedia.com/resources/front/xh/images/element3-3_download@2x.png" alt
                         width="62" :class="{'sec2-img4':show3}"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-slide section4">
            <div class="sec-content">
              <div class="section1-left">
                <div class="section1-left-info" :class="{'section2-left-animation':show4}">
                  现场体验对话实录
                  <br/>我们直通一手视角
                </div>
              </div>
              <div class="section1-right">
                <img src="http://www.xhfmedia.com/resources/front/xh/images/element4-7_download@2x.png" alt width="411"
                     :class="{'sec3-img1':show4}"/>
                <div class="animation-right">
                  <div class="animation-a">
                    <img src="http://www.xhfmedia.com/resources/front/xh/images/element4-1_download@2x.png" alt
                         width="57" :class="{'sec3-img2':show4}"/>
                  </div>
                  <div class="animation-b">
                    <img src="http://www.xhfmedia.com/resources/front/xh/images/element4-2_download@2x.png" alt
                         width="57" :class="{'sec3-img3':show4}"/>
                  </div>
                  <div class="animation-c">
                    <img src="http://www.xhfmedia.com/resources/front/xh/images/element4-3_download@2x.png" alt
                         width="57" :class="{'sec3-img4':show4}"/>
                  </div>
                  <div class="animation-d">
                    <img src="http://www.xhfmedia.com/resources/front/xh/images/element4-4_download@2x.png" alt
                         width="57" :class="{'sec3-img5':show4}"/>
                  </div>
                  <div class="animation-e">
                    <img src="http://www.xhfmedia.com/resources/front/xh/images/element4-5_download@2x.png" alt
                         width="57" :class="{'sec3-img6':show4}"/>
                  </div>
                  <div class="animation-f">
                    <img src="http://www.xhfmedia.com/resources/front/xh/images/element4-6_download@2x.png" alt
                         width="57" :class="{'sec3-img7':show4}"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-pagination" slot="pagination"></div>
      </div>
    </div>
  </div>
</template>
<script>

  // TODO 替换图片源
  import downloadMixin from "../mixins/download"


  export default {
    layout: "downloadDefault",
    data() {
      return {
        swiperOption: {
          direction: "vertical",
          mousewheel: true,
          speed: 1000,
          fade: {
            crossFade: true
          },
          pagination: {
            el: '.swiper-pagination',
            paginationClickable: true,
          },
          on: {
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
              };
            })(),
          }
        },
        show1: true,
        show2: false,
        show3: false,
        show4: false,

        openInstallInstance: null
      };
    },
    mixins: [downloadMixin]

  };
</script>
<style scoped lang="less">
  .download-box {
    position: relative;
    height: 100vh;

    .swiper-container {
      width: 100%;
      height: 100%;

      .section1 {
        background: url("http://www.xhfmedia.com/resources/front/xh/images/bg1_appdownload@2x.png") no-repeat;
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .sec-content {
          width: 100%;
          max-width: 1120px;
          height: auto;
          display: flex;

          .section1-left {
            position: relative;
            z-index: 40;
            top: 180px;

            &-info {
              font-size: 48px;
              font-weight: 600;
              line-height: 72px;
              color: #0098ff;
              margin-bottom: 48px;
            }

            &-btn {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;

              #download {
                width: 150px;
                border-radius: 24.5px;
                background-color: #0098ff;
                box-shadow: 0 5px 10px 0 rgba(0, 152, 255, 0.3);
                color: #fff;
                font-size: 18px;
                text-align: center;
                margin-bottom: 24px;
                line-height: 48px;
                transition: all ease 0.2s;
                -webkit-transition: all ease 0.2s;
                -moz-transition: all ease 0.2s;
                -o-transition: all ease 0.2s;
                cursor: pointer;

                &:hover {
                  box-shadow: 0 5px 10px 0 rgba(0, 152, 255, 0.6);
                }
              }
            }

            &-animation {
              animation: 2s fadeInLeft;
            }

            .sec-animation {
              animation: 2s fadeInTop;
            }
          }

          .section1-right {
            flex: 1;
            padding-left: 165px;
            position: relative;

            .sec-img1 {
              animation: 2s fadeInTop;
            }

            img {
              max-width: 100%;
            }

            .animation-right {
              position: absolute;
              top: 100px;
              left: 115px;
              width: 462px;
              height: 205px;

              .sec-img2 {
                animation: 2s fadeInTop1,
                2.4s alternate none infinite running Updown;
              }

              img {
                max-width: 100%;
              }
            }
          }
        }
      }

      .section2 {
        background: #0175ff url("http://www.xhfmedia.com/resources/front/xh/images/bg2_appdownload@2x.png") no-repeat right top;
        background-size: auto 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .sec-content {
          width: 100%;
          max-width: 1120px;
          height: auto;
          display: flex;

          .section1-left {
            position: relative;
            z-index: 40;
            top: 180px;

            &-info {
              font-size: 48px;
              font-weight: 600;
              line-height: 72px;
              color: #fff;
              margin-bottom: 48px;
            }

            .section2-left-animation {
              animation: 2s fadeInTop;
            }
          }

          .section1-right {
            flex: 1;
            padding-left: 250px;
            position: relative;

            .sec1-img1 {
              animation: 2s fadeInTop;
            }

            img {
              max-width: 100%;
            }

            .animation-right {
              position: absolute;
              top: 0px;
              right: 36px;
              width: 405px;
              height: 333px;

              img {
                max-width: 100%;
                animation: 2.4s 0s alternate none infinite running Updown;
              }
            }
          }
        }
      }

      .section3 {
        background: #0175ff url("http://www.xhfmedia.com/resources/front/xh/images/bg2_download@2x.png") no-repeat left bottom;
        background-size: 714px 630px;
        display: flex;
        justify-content: center;
        align-items: center;

        .sec-content {
          width: 100%;
          max-width: 1120px;
          height: auto;
          display: flex;

          .section1-left {
            position: relative;
            z-index: 40;
            top: 180px;

            &-info {
              font-size: 48px;
              font-weight: 600;
              line-height: 72px;
              color: #fff;
              margin-bottom: 48px;
            }

            .section2-left-animation {
              animation: 2s fadeInTop;
            }
          }

          .section1-right {
            flex: 1;
            padding-left: 290px;
            position: relative;

            .sec2-img1 {
              animation: 2s fadeInTop;
            }

            img {
              max-width: 100%;
            }

            .animation-right {
              .animation-a {
                position: absolute;
                top: 90px;
                left: 327px;

                .sec2-img2 {
                  animation: 2.4s 0s alternate none infinite running Updown;
                }
              }

              .animation-b {
                position: absolute;
                bottom: 150px;
                right: 236px;

                .sec2-img3 {
                  animation: 2.4s 0s alternate none infinite running Updown;
                }
              }

              .animation-c {
                position: absolute;
                top: 28px;
                right: 43px;

                .sec2-img4 {
                  animation: 2.4s 0s alternate none infinite running Updown;
                }
              }
            }
          }
        }
      }

      .section4 {
        background: #0175ff url(http://www.xhfmedia.com/resources/front/xh/images/bg2_appdownload@2x.png) no-repeat right top;
        background-size: auto 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .sec-content {
          width: 100%;
          max-width: 1120px;
          height: auto;
          display: flex;

          .section1-left {
            position: relative;
            z-index: 40;
            top: 180px;

            &-info {
              font-size: 48px;
              font-weight: 600;
              line-height: 72px;
              color: #fff;
              margin-bottom: 48px;
            }

            .section2-left-animation {
              animation: 3s fadeInTop;
            }
          }

          .section1-right {
            flex: 1;
            padding-left: 290px;
            position: relative;

            .sec3-img1 {
              animation: 2s fadeInTop;
            }

            img {
              max-width: 100%;
            }

            .animation-right {
              animation: 1s all ease-in;

              .animation-a {
                position: absolute;
                top: 133px;
                left: 361px;

                .sec3-img2 {
                  animation: 2.5s fadeInTop;
                }
              }

              .animation-b {
                position: absolute;
                bottom: 31px;
                left: 302px;

                .sec3-img2 {
                  animation: 3s fadeInTop;
                }
              }

              .animation-c {
                position: absolute;
                bottom: -18px;
                left: 379px;

                .sec3-img2 {
                  animation: 3.5s fadeInTop;
                }
              }

              .animation-d {
                position: absolute;
                bottom: -22px;
                right: 200px;

                .sec3-img2 {
                  animation: 4s fadeInTop;
                }
              }

              .animation-e {
                position: absolute;
                bottom: -3px;
                right: 99px;

                .sec3-img2 {
                  animation: 4.5s fadeInTop;
                }
              }

              .animation-f {
                position: absolute;
                bottom: 56px;
                right: 35px;

                .sec3-img2 {
                  animation: 5s fadeInTop !important;
                }
              }
            }
          }
        }
      }
    }
  }

  @keyframes fadeInLeft {
    0% {
      opacity: 0;
      transform: translateX(-120px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fadeInTop {
    0% {
      opacity: 0;
      transform: translateY(100px);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  @keyframes fadeInTop1 {
    0% {
      opacity: 0;
      transform: translateY(-180px);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  @keyframes Updown {
    0% {
      transform: translateY(25px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  a {
    text-decoration: none;
  }
</style>
<style lang="less">
  .hjvjhjhvi {
    .swiper-container-vertical
    > .swiper-pagination-bullets
    .swiper-pagination-bullet {
      margin: 12px !important;
    }

    i {
      padding-right: 5px;
    }

    .swiper-pagination-bullet-active {
      background-color: #fff;
    }
  }
</style>
