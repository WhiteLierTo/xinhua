<template xmlns:v-swiper="http://www.w3.org/1999/xhtml">
  <div class="core">
    <div class="sign">
      <ul>
        <li @click="businessChange(index)" v-for="(item,index) in swiperList" :key="index">
          <a href="javascript:void(0)">
            <span class="sign-img" :class="{'active':index==nowIndex}">
              <img :src="item.img" alt/>
            </span>
            <span class="sign-word" :class="{'active':index===nowIndex}">{{item.text}}</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="content">
      <div class="swiper">
        <div v-swiper:mySwiper="swiperOption" ref="mySwiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="swiper-item">
                <div class="item-left">
                  <img
                    src="http://www.xhfmedia.com/resources/front/xh/images/img_business1@2x.png"
                    alt
                  />
                </div>
                <div class="item-right">
                  <div class="right-title">财经全媒体</div>
                  <div
                    class="right-cont"
                  >新华财经传媒依托新华报业传媒集团资源，搭建以报纸、期刊、移动、视频、户外的全媒体传播平台，利用官方新闻资质、贴近新闻源头、优质内容生产等优势，为中国资本市场受众群体提供全面的资讯内容。
                  </div>
                  <div class="right-instr">
                    报纸媒体，权威媒体公信背书，主流舆论传播导向，财经新闻分众化差异化传播：
                    <br/>- 新华日报企业版
                    <br/>- 江苏金融报道
                    <br/>
                    <br/>网络媒体，全国重点新闻网站，重大决策传播阵地，财经网络资讯服务：
                    <br/>- 中国江苏网财经频道
                    <br/>- 新华财经传媒网全网
                    <br/>
                    <br/>移动端媒体，聚焦深度原创、把握实时快讯、直击财经现场、机构专家面对面：
                    <br/>- 新华日报财经客户端
                    <br/>- 交汇点客户端财经频道
                  </div>
                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="swiper-item">
                <div class="item-left">
                  <img
                    src="http://www.xhfmedia.com/resources/front/xh/images/img_business2@2x.png"
                    alt
                  />
                </div>
                <div class="item-right">
                  <div class="right-title">财经传播咨询</div>
                  <div
                    class="right-cont"
                  >新华财经传媒根据企业在资本市场所处不同生命周期和角色，通过媒体对于行业的洞见、深厚的专业认知、全方位的调研分析，帮助企业在财经传播成功转型。
                  </div>
                  <div class="right-instr">
                    - 传播舆情诊断
                    <br/>- 舆情监控与系统部署方案
                    <br/>- 投资者洞察和细分
                    <br/>- 传播渠道有效性和细分
                    <br/>- 分析支持传播策略制定
                    <br/>- 执行战略和部署决策方案
                    <br/>- 财经数字化传播与转型
                    <br/>- 深层次媒体互动
                    <br/>- 舆情智库培训课程
                  </div>
                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="swiper-item">
                <div class="item-left">
                  <img
                    src="http://www.xhfmedia.com/resources/front/xh/images/img_business3@2x.png"
                    alt
                  />
                </div>
                <div class="item-right">
                  <div class="right-title">财经公关管理</div>
                  <div
                    class="right-cont"
                  >新华财经传媒为企业提供公关及财经顾问服务，安排及管理一系列企业活动，从而为客户建立并保持良好企业形象，同时在舆情管理方面为企业量身定制解决方案。
                  </div>
                  <div class="right-instr">
                    - IPO财经公关协同管理
                    <br/>- 媒体关系管理及危机处理
                    <br/>- 路演活动策划与执行
                    <br/>- 峰会论坛策划与执行
                    <br/>- 答谢活动策划与执行
                    <br/>- 董监高媒体培训
                    <br/>- 户外广告投放策略与执行
                  </div>
                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="swiper-item">
                <div class="item-left">
                  <img
                    src="http://www.xhfmedia.com/resources/front/xh/images/img_business4@2x.png"
                    alt
                  />
                </div>
                <div class="item-right">
                  <div class="right-title">财经数字营销</div>
                  <div
                    class="right-cont"
                  >新华财经传媒通过基于专业捕捉与多媒体技术，为企业提供财经数字化营销的新体验、新智能技术和新互联方式，利用各种成熟技术和新兴科技打造前沿解决方案，为企业传播发展注入蓬勃动力。
                  </div>
                  <div class="right-instr">
                    - 微电影、微纪录、微访谈、微动画、宣传片创意制作与传播
                    <br/>- 业绩数据可视化创意制作与传播
                    <br/>- Website & HTML5 互动创意与营销
                    <br/>- VR 展示与传播
                    <br/>- 社会化媒体运营
                    <br/>- 平面动图创意制作与传播
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        swiperList: [
          {
            img:
              "http://www.xhfmedia.com/resources/front/xh/images/business1_on@2x.png",
            text: "财经全媒体"
          },
          {
            img:
              "http://www.xhfmedia.com/resources/front/xh/images/business2_on@2x.png",
            text: "财经传播咨询"
          },
          {
            img:
              "http://www.xhfmedia.com/resources/front/xh/images/business3_on@2x.png",
            text: "财经公关管理"
          },
          {
            img:
              "http://www.xhfmedia.com/resources/front/xh/images/business4_on@2x.png",
            text: "财经数字营销"
          }
        ],
        swiperOption: {
          slidesPerView: "auto",
          on: {
            slideChange: (() => {
              let _this = this;
              return function () {
                _this.nowIndex = this.activeIndex;
              };
            })(),
            tap() {
              console.log("onTap", this);
            }
          }
        },
        nowIndex: 0
      };
    },
    head() {
      return {
        title: "新华日报财经-核心业务",
        meta: [
          {
            hid: "description",
            name: "description",
            content: "My custom description"
          }
        ]
      };
    },
    methods: {
      businessChange(index) {
        this.$refs.mySwiper.swiper.slideTo(index, 1000, false);
        this.nowIndex = index;
      }
    }
  };
</script>
<style lang="less" scoped>
  .core {
    margin-top: 0.4rem;

    .sign {
      max-width: 7.68rem;
      margin: 0 auto;
      padding: 0 0 0.2rem;

      ul {
        list-style-type: none;
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding-left: 0;

        li {
          width: 25%;
          margin: 0 auto;

          a {
            color: #555;
            text-decoration: none;

            span {
              display: block;
            }

            .sign-img {
              display: block;
              width: 0.6rem;
              height: 0.6rem;
              margin: 0 auto 0.1rem;
              border-radius: 100%;
              background-color: #0098ff;
              box-shadow: 0px 0.05rem 0.1rem 0px rgba(0, 152, 255, 0.3);
              opacity: 0.5;

              img {
                display: block;
                width: 100%;
                height: 100%;
              }
            }

            .active {
              opacity: 1;
              color: #0098ff;
            }

            .sign-word {
              font-size: 13px;
              font-weight: 300;
              line-height: 1.67;
              text-align: center;
            }

            .sign-word1 {
              font-size: 14px;
              text-align: center;
              padding-top: 0.1rem;
            }
          }
        }

        li a:hover {
          color: #0098ff;
        }
      }
    }

    .content {
      width: 95%;
      height: 100%;
      box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.1);
      background-color: #ffffff;
      margin: 0 auto 0.6rem;
      font-size: 14px;

      .swiper {
        height: 100%;
        overflow: hidden;

        .swiper-item {
          .item-left {
            display: block;
            border-radius: 3px;
            overflow: hidden;

            img {
              width: 100%;
              height: 100%;
              transition: all ease 0.5s;
            }

            img:hover {
              transform: scale(1.1);
            }
          }

          .item-right {
            padding: 0.1rem;

            .right-title {
              font-size: 25px;
              color: #0098ff;
              line-height: 0.5rem;
            }

            .right-cont {
              line-height: 1.71;
              text-align: justify;
              color: #666666;
              margin-bottom: 18px;
              font-weight: 300;
            }

            .right-instr {
              line-height: 1.71;
              color: #222222;
              font-weight: 400;
            }
          }
        }
      }
    }
  }
</style>
