<template>
  <div class="business">
    <div class="inner">
      <div class="gakuanbx">
        <div class="gakuanbx-1 gakuanbx-1-tac">
          <div class="gakuanbx-1a">商业合作</div>
          <div class="gakuanbx-1b">Cooperation</div>
        </div>
        <div class="hezuos">
          <div class="gakuanbx-3">
            <ul>
              <li>
                <a href="#">
                  <span class="gakuanbx-3a">
                    <img
                      src="http://www.xhfmedia.com/resources/front/xh/images/more4_icon1@2x.png"
                      alt
                    />
                  </span>
                  <span class="gakuanbx-3b">客服电话</span>
                  <span class="gakuanbx-3c">+86(25)58682476</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span class="gakuanbx-3a">
                    <img
                      src="http://www.xhfmedia.com/resources/front/xh/images/more4_icon1@2x.png"
                      alt
                    />
                  </span>
                  <span class="gakuanbx-3b">商务合作</span>
                  <span class="gakuanbx-3c">wumengying@xhfmedia.com</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span class="gakuanbx-3a">
                    <img
                      src="http://www.xhfmedia.com/resources/front/xh/images/more4_icon1@2x.png"
                      alt
                    />
                  </span>
                  <span class="gakuanbx-3b">加入我们</span>
                  <span class="gakuanbx-3c">wumengying@xhfmedia.com</span>
                </a>
              </li>
            </ul>
          </div>
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
  .business {
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
          text-align: center;

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

        .hezuos {
          max-width: 8.5rem;
          margin: 0 auto;

          .gakuanbx-3 {
            padding-top: 0.4rem;

            ul {
              display: flex;
              justify-content: space-between;
              padding: 0;
              list-style-type: none;

              li {
                width: 33.33%;
                word-break: break-all;
                padding: 0 5px;

                a {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  color: #555;
                  text-decoration: none;

                  .gakuanbx-3a {
                    width: 0.6rem;
                    height: 0.6rem;
                    display: block;
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
                  }

                  .gakuanbx-3c {
                    margin-top: 0.1rem;
                    white-space: pre-wrap;
                    font-size: 12px;
                    font-weight: 300;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
