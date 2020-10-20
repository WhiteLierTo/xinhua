<template>
  <div class="report">
    <div class="inner">
      <div class="gakuanbx">
        <div class="gakuanbx-1 gakuanbx-1-tac">
          <div class="gakuanbx-1a">寻求报道</div>
          <div class="gakuanbx-1b">Reports</div>
        </div>
        <div class="baodao">
          <div class="baodao-wz">
            欢迎填写在线表格，我们会在第一时间回复您～
            <br/>您也可以直接发送邮件至：
            <span>wumengying@xhfmedia.com</span>
            <br/>或拨打咨询热线：
            <span>+86(25)58682476</span>
          </div>
        </div>
        <div class="baodao-1">
          <div class="baodao-1a">
            <span class="baodao-1a-1">您的姓名：</span>
            <input type="text" class="baodao-1a-2" v-model="reportInfo.name"/>
            <span class="baodao-1a-3">*</span>
          </div>
          <div class="baodao-1a">
            <span class="baodao-1a-1">您的公司：</span>
            <input type="text" class="baodao-1a-2" v-model="reportInfo.company"/>
            <span class="baodao-1a-3">*</span>
          </div>
          <div class="baodao-1a">
            <span class="baodao-1a-1">您的邮箱：</span>
            <input type="text" class="baodao-1a-2" v-model="reportInfo.email"/>
            <span class="baodao-1a-3">*</span>
          </div>
          <div class="baodao-1a">
            <span class="baodao-1a-1">您的电话：</span>
            <input type="text" class="baodao-1a-2" v-model="reportInfo.phone"/>
            <span class="baodao-1a-3">*</span>
          </div>
          <div class="baodao-1b">
            <div class="baodao-1a-1">报道需求：</div>
            <textarea
              class="baodao-1a-2 baodao-1a-2txt"
              placeholder="您可以输入报道类型、报道内容等，帮助我们了解您的需求，以便我们能够更加快速准确的予以回复，谢谢～"
              v-model="reportInfo.reportneed"
            ></textarea>
          </div>
          <div class="baodao-1b">
            <!--<a href="#" class="baodao-submit">完成并发送</a>-->
            <div class="baodao-submit" @click="submit">
              完成并发送
            </div>
          </div>
        </div>
      </div>
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

        .baodao {
          max-width: 8.25rem;
          margin: 0 auto;

          .baodao-wz {
            margin-bottom: 0.2rem;
            font-size: 0.15rem;
            font-weight: 300;
            line-height: 1.67;
            text-align: center;
            color: #555555;

            span {
              color: #0098ff;
            }
          }
        }

        .baodao-1 {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;

          .baodao-1a {
            width: 100%;
            position: relative;
            margin-bottom: 0.15rem;

            .baodao-1a-1 {
              position: absolute;
              left: 0.16rem;
              color: #555555;
              line-height: 0.48rem;
            }

            .baodao-1a-2 {
              width: 100%;
              height: 0.48rem;
              border-radius: 0.08rem;
              border: solid 1px #dcdcdc;
              outline: none;
              text-indent: 0.86rem;
            }

            .baodao-1a-3 {
              position: absolute;
              right: 0.16rem;
              line-height: 0.48rem;
              top: 0px;
            }
          }

          .baodao-1b {
            width: 100%;
            position: relative;
            margin-bottom: 0.15rem;

            .baodao-1a-1 {
              position: absolute;
              left: 0.16rem;
              color: #555555;
              line-height: 0.48rem;
            }

            .baodao-1a-2txt {
              height: 1.6rem;
              padding: 0.13rem 0.1rem;
              line-height: 22px;
              resize: none;
            }

            .baodao-1a-2 {
              width: 100%;
              border-radius: 0.08rem;
              border: solid 1px #dcdcdc;
              outline: none;
              text-indent: 0.86rem;
            }

            .baodao-submit {
              height: 0.52rem;
              border-radius: 0.08rem;
              background-color: #0098ff;
              text-align: center;
              line-height: 0.52rem;
              display: block;
              color: #fff;
              font-size: 0.17rem;
              transition: all ease 0.2s;
            }
          }
        }
      }
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
      width: 3.5rem;
      height: 2.5rem;
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
        margin: 0.2rem auto;
      }

      .message-bt {
        width: 2.3rem;
        height: 0.42rem;
        border-radius: 8px;
        background: #0098ff;
        box-shadow: 0 5px 10px 0 rgba(0, 152, 255, 0.3);
        color: white;
        line-height: 0.42rem;
        text-align: center;
        cursor: pointer;
      }
    }
  }

  @keyframes showFromBottom {
    from {
      transform: translateY(50vh);
    }
  }
</style>
