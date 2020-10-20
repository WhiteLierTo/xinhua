<template>
  <div class="foot">
    <div class="foot-inner">
      <div class="foot-logo-container">
        <img src="../../assets/index/footer_logo_white@2x.png" alt="" class="foot-logo">
        <div class="foot-logo-text">版权所有© 2017 江苏新华财经传媒股份有限公司</div>
        <a href="http://www.beian.miit.gov.cn/" class="foot-logo-text">苏ICP备17064473号</a>
      </div>
      <div class="foot-list-container">
        <div class="foot-list-head">首页</div>
        <div class="foot-list-cell" @click="jump(item)" v-for="(item,index) in indexPageList" :key="index">
          {{ item.label }}
        </div>
      </div>
      <div class="foot-list-container">
        <div class="foot-list-head">关于我们</div>
        <div class="foot-list-cell" @click="jump(item)" v-for="(item,index) in aboutList" :key="index">
          {{ item.label }}
        </div>
      </div>
      <div class="foot-contact-container">
        <div class="row">
          <i class="fa fa-envelope" aria-hidden="true"></i>
          <span>service@xhfmedia.com</span>
        </div>
        <div class="row">
          <i class="fa fa-phone" aria-hidden="true"></i>
          <span>+86(25)58682476</span>
        </div>
        <div class="row">
          <i class="fa fa-globe" aria-hidden="true"></i>
          <span>http://www.xhfmedia.com/</span>
        </div>
      </div>
      <div class="divider-line"></div>
      <div class="qr-container">
        <p>APP下载</p>
        <img src="../../assets/index/footer_qrcode@2x.png" alt="" class="qr-img">
      </div>
    </div>

    <downLoadDialog v-show="dialogShow" @dialogHiddle="dialogHiddle"/>

  </div>

</template>

<script>
  import downLoadDialog from "./downLoadDialog";

  export default {
    name: "xh-foot",
    components: {downLoadDialog},

    data() {
      return {
        indexPageList: [
          {
            label: "新闻",
            path: "/"
          },
          {
            label: "活动",
            path: "/activity",
          },
          {
            label: "视频",
            path: ""
          },
          {
            label: "财经号",
            path: ""
          },
        ],
        aboutList: [
          {
            label: "公司概况",
            path: "about"
          },
          {
            label: "寻求报道",
            path: "about?default=1",
          },
          {
            label: "商业合作",
            path: "about?default=2"
          },
          {
            label: "核心业务",
            path: "about?default=3"
          },
          // {
          //   label: "加入我们",
          //   path: "about?default=4"
          // },
        ],
        dialogShow: false
      }
    },
    methods: {
      jump(item) {
        if (item.path) {
          location.href = item.path;
          return
        }
        this.dialogShow = true;
      },

      dialogHiddle() {
        this.dialogShow = false;
      },
    }
  }
</script>

<style scoped lang="less">
  .foot {
    width: 100%;
    background: #333743;
    padding-top: 80px;
    padding-bottom: 70px;

    .foot-inner {
      width: 1120px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;

      .foot-logo-container {

        .foot-logo {
          width: 192px;
          margin-bottom: 32px;
        }

        .foot-logo-text {
          font-size: 13px;
          font-weight: 300;
          line-height: 1.46;
          color: #9297a3;
        }
      }

      .foot-list-container {

        .foot-list-head {
          font-size: 16px;
          color: #fff;
          margin-bottom: 16px;
        }

        .foot-list-cell {
          color: #9297a3;
          line-height: 28px;
          cursor: pointer;

          &:hover {
            color: #fff;
          }
        }
      }

      .foot-contact-container {

        .row {
          color: #9297a3;
          font-size: 18px;
          margin-bottom: 10px;
          display: flex;
          align-items: center;

          span {
            margin-left: 8px;
          }
        }
      }

      .divider-line {
        border-left: 1px solid #9297a3;
      }

      .qr-container {
        overflow: hidden;
        width: 110px;

        p {
          font-size: 16px;
          color: #fff;
          margin-bottom: 16px;
          text-align: center;
        }

        .qr-img {
          border: 1px solid gray;
          width: 110px;
          height: 110px;
        }
      }
    }
  }
</style>
