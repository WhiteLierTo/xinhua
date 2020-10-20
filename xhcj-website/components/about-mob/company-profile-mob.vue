<template>
  <div class="company">
    <div class="inner">
      <div class="gakuanbx">
        <div class="gakuanbx-1">
          <div class="gakuanbx-1a">新华财经传媒简介</div>
          <div class="gakuanbx-1b">Introduction</div>
        </div>
        <div class="gakuanbx-2">
          <div class="gakuanbx-2a">
            <p>
              <span class="fwb">江苏新华财经传媒股份有限公司</span>
              （以下简称“新华财经传媒”）成立于2016年4月1日，注册地位于江苏南京，注册资本6,000万元人民币，由江苏新华日报传媒有限公司等多家公司、机构共同出资成立。同时设有常州、徐州两家分公司，并出资共同成立上海翱翰投资管理有限公司，专注股权投资等金融业务。
            </p>
            <p>
              <span class="fwb">致力于为投资者提供深度价值资讯</span>
              ，为客户提供全生命周期综合传播服务，逐步形成财经全媒体新闻、财经传播咨询、公关活动管理、财经数字营销的业务形态。
            </p>
          </div>
          <div class="gakuanbx-2b">
            <img src="http://www.xhfmedia.com/resources/front/xh/images/more1img@2x.png" alt/>
          </div>
        </div>
        <div class="gakuanbx-3">
          <ul>
            <li>
              <a href="#">
                <span class="gakuanbx-3a">
                  <img
                    src="http://www.xhfmedia.com/resources/front/xh/images/more1_icon1@2x.png"
                    alt
                  />
                </span>
                <span class="gakuanbx-3b">全媒体新闻</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="gakuanbx-3a">
                  <img
                    src="http://www.xhfmedia.com/resources/front/xh/images/more1_icon2@2x.png"
                    alt
                  />
                </span>
                <span class="gakuanbx-3b">财经传播资讯</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="gakuanbx-3a">
                  <img
                    src="http://www.xhfmedia.com/resources/front/xh/images/more1_icon3@2x.png"
                    alt
                  />
                </span>
                <span class="gakuanbx-3b">公关活动管理</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="gakuanbx-3a">
                  <img
                    src="http://www.xhfmedia.com/resources/front/xh/images/more1_icon4@2x.png"
                    alt
                  />
                </span>
                <span class="gakuanbx-3b">财经数字营销</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {};
    }
  };
</script>
<style lang="less" scoped>
  .company {
    .inner {
      width: 100%;
      max-width: 7.68rem;
      padding: 0px 0.1rem;
      margin: 0 auto;

      .gakuanbx {
        padding-top: 0.15rem;
        margin-bottom: 0.8rem;

        .gakuanbx-1 {
          margin-bottom: 0;

          .gakuanbx-1a {
            font-size: 0.28rem;
            position: relative;
            z-index: 20;
            color: #666;
            line-height: 0.5rem;
          }

          .gakuanbx-1b {
            font-size: 0.45rem;
            color: #f4f7f9;
            line-height: 0.8rem;
            margin-top: -0.5rem;
          }
        }

        .gakuanbx-2 {
          display: block;

          .gakuanbx-2a {
            width: 100%;
            margin-bottom: 0.2rem;

            p {
              font-size: 0.16rem;
              line-height: 0.26rem;
              text-align: justify;
              color: #555555;
              padding-bottom: 0.14rem;

              .fwb {
                font-weight: 700;
              }
            }
          }

          .gakuanbx-2b {
            width: 100%;

            img {
              width: 100%;
            }
          }
        }

        .gakuanbx-3 {
          padding-top: 0.2rem;

          ul {
            list-style-type: none;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0;

            li {
              width: 25%;

              a {
                display: flex;
                flex-direction: column;
                align-items: center;
                color: #555;
                text-decoration: none;

                .gakuanbx-3a {
                  width: 0.6rem;
                  height: 0.6rem;
                  margin-bottom: 0.2rem;
                  border-radius: 100%;
                  background-color: #0098ff;
                  box-shadow: 0 0.05rem 0.1rem 0 rgba(0, 152, 255, 0.3);

                  img {
                    display: block;
                    width: 100%;
                    height: 100%;
                    max-width: 100%;
                  }
                }

                .gakuanbx-3b {
                  font-size: 14px;
                  letter-spacing: -0.5px;
                  font-weight: 300;
                  line-height: 1.67;
                  text-align: center;
                  text-decoration: none;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
