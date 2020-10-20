<template>
  <div class="report">
    <div class="report-title">
      <p class="title-bg">Reports</p>
      <p class="title">寻求报道</p>
    </div>
    <div class="report-info">
      <p>欢迎填写在线表格，我们会在第一时间回复您～</p>
      <p>
        您也可以直接发送邮件至：
        <span>wumengying@xhfmedia.com</span>
      </p>
      <p>
        或拨打咨询热线：
        <span>+86(25)58682476</span>
      </p>
    </div>
    <div class="report-form">
      <div class="report-input">
        <span>您的姓名:</span>
        <input class="re-input" type="text" v-model="reportInfo.name"/>
        <span class="star">*</span>
      </div>
      <div class="report-input">
        <span>您的公司:</span>
        <input class="re-input" type="text" v-model="reportInfo.company"/>
        <span class="star">*</span>
      </div>
      <div class="report-input">
        <span>您的邮箱:</span>
        <input class="re-input" type="text" v-model="reportInfo.email"/>
        <span class="star">*</span>
      </div>
      <div class="report-input">
        <span>您的电话:</span>
        <input class="re-input" type="text" v-model="reportInfo.phone"/>
        <span class="star">*</span>
      </div>
      <div class="report-textarea">
        <span style="background: white">报道需求:</span>
        <textarea
          rows="8"
          cols="20"
          class="re-input textarea-input"
          placeholder="您可以输入报道类型、报道内容等，帮助我们了解您的需求，以便我们能够更加快速准确的予以回复，谢谢～"
          v-model="reportInfo.reportneed"

        ></textarea>
      </div>
    </div>
    <div class="report-btn" @click="submit">
      完成并发送
    </div>
    <div class="mask-container" v-if="isShowMessage">
      <div class="message-box-container">
        <img src="../../assets/about/report/icon_fail@2x.png" style="width: 62px" alt="" v-show="!isMessageSuccess">
        <img src="../../assets/about/report/icon_succees@2x.png" style="width: 62px" alt="" v-show="isMessageSuccess">
        <p class="message-box-text" v-html="messageText"></p>
        <div class="message-bt" @click="isShowMessage = false">确认</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        isShowMessage: false,
        messageText: "",
        isMessageSuccess: false,
        reportInfo: {
          name: "",
          company: "",
          email: "",
          phone: "",
          reportneed: ""
        }
      };
    },

    head() {
      return {
        title: "新华日报财经-寻求报道",
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
      check() {
        if (!this.reportInfo.name) {
          this.messageText = "请输入您的姓名";
          this.isShowMessage = true;
          this.isMessageSuccess = false;
        } else if (!this.reportInfo.company) {
          this.messageText = "请输入您的公司";
          this.isShowMessage = true;
          this.isMessageSuccess = false;
        } else if (!this.reportInfo.email) {
          this.messageText = "请输入您的邮箱";
          this.isShowMessage = true;
          this.isMessageSuccess = false;
        } else if (!this.reportInfo.phone) {
          this.messageText = "请输入您的手机";
          this.isShowMessage = true;
          this.isMessageSuccess = false;
        } else if (!this.reportInfo.reportneed) {
          this.messageText = "请输入您的报道需求";
          this.isShowMessage = true;
          this.isMessageSuccess = false;
        }
        return !this.isShowMessage
      },

      submit() {
        let ok = this.check();
        if (!ok) return;
        this.$axios.post(`${this.$getBaseUrl()}/pc/seekReport/add`, this.reportInfo, {
          headers: {
            'Content-type': 'application/json'
          }
        }).then(res => {
          if (res.data.code === 200) {
            this.messageText = "<p>恭喜您，信息提交成功</p><p style='text-align: center'>我们会尽快回复您！</p>";
            this.isShowMessage = true;
            this.isMessageSuccess = true;
          } else {
          }
        }).catch(() => {
        })
      }
    }
  };
</script>
<style lang="less" scoped>
  .report {

    .report-title {
      text-align: center;
      margin-bottom: 55px;
      position: relative;
      font-weight: 300;

      .title {
        font-size: 36px;
        color: #222222;
        line-height: 50px;
        z-index: 20;
      }

      .title-bg {
        font-size: 72px;
        color: #f4f7f9;
        line-height: 80px;
        position: absolute;
        left: 38%;
        z-index: -1;
      }
    }

    .report-info {
      font-weight: 300;
      line-height: 1.6;
      text-align: center;
      color: #555555;
      margin-bottom: 30px;
      font-size: 15px;

      span {
        color: #1890ff;
      }
    }

    .report-form {
      width: 825px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin: 0 auto;

      .report-input {
        width: 400px;
        height: 48px;
        position: relative;
        margin-bottom: 14px;

        input {
          color: rgba(0, 0, 0, 0.7);
        }

        .re-input {
          width: 100%;
          height: 100%;
          border-radius: 8px;
          border: solid 1px #dcdcdc;
          outline: none;
          text-indent: 86px;
        }

        span:nth-child(1) {
          position: absolute;
          left: 16px;
          color: #555555;
          line-height: 48px;
          font-weight: 300;
          font-size: 14px;
        }

        .star {
          position: absolute;
          right: 0;
          top: 0;
          line-height: 48px;
          width: 50px;
          z-index: 99;
          text-align: center;
          font-weight: 300;
        }
      }

      .report-textarea {
        width: 100%;
        position: relative;
        margin-bottom: 20px;
        display: flex;
        justify-content: center;

        textarea {
          color: rgba(0, 0, 0, 0.7);
          font-size: 14px;
          line-height: 24px;
          padding: 8px 10px;
          resize: none;

          &::placeholder {
            color: #999;
          }
        }

        .re-input {
          width: 100%;
          border-radius: 8px;
          border: solid 1px #dcdcdc;
          outline: none;
          text-indent: 80px;
          margin: 0 auto;
        }

        span:nth-child(1) {
          position: absolute;
          left: 16px;
          color: #555555;
          top: 10px;
          font-weight: 300;
        }
      }
    }

    .report-btn {
      width: 74%;
      margin: 0 auto 100px;
      height: 52px;
      border-radius: 8px;
      background-color: #0098ff;
      text-align: center;
      line-height: 52px;
      display: block;
      color: #fff;
      font-size: 17px;
      transition: all ease 0.2s;
      cursor: pointer;

      &:hover {
        box-shadow: 0 5px 10px 0 rgba(0, 152, 255, 0.3);
      }
    }

    .mask-container {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.4);
      z-index: 3000;
      display: flex;
      align-items: center;
      justify-content: center;

      .message-box-container {
        width: 350px;
        height: 252px;
        background: white;
        box-shadow: 0 10px 12px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        animation: showFromBottom 0.2s forwards;

        .message-box-text {
          font-size: 18px;
          color: #333;
          margin: 20px auto;
        }

        .message-bt {
          width: 236px;
          height: 42px;
          border-radius: 8px;
          background: #0098ff;
          box-shadow: 0 5px 10px 0 rgba(0, 152, 255, 0.3);
          color: white;
          line-height: 42px;
          text-align: center;
          cursor: pointer;
        }
      }
    }
  }

  @keyframes showFromBottom {
    from {
      transform: translateY(50vh);
    }
  }
</style>
