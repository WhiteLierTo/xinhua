<template>
  <common-box class="container">
    <div class="center-box">
      <!-- <img class="center-img" src="../../../assets/image/index_img/center.png" alt=""> -->
      <div class="center-title">
        <div class="zhuye" @click="back()">
          <img src="../../../assets/image/index_img/zhuye.png" alt="">
          <span>主页</span>
        </div>
        <div class="title">
          实验方法与须知
        </div>
        <img class="title-img" src="../../../assets/image/index_img/title.png" alt="">
        <div class="content">
          <div class="content-word">
            <div class="purpose">(一)实验方法与操作步骤</div>
            <p>本实验：由7个阶段，5大模块，12个主要步骤，若干次要步骤组成。具体包括以下内容</p>
            <p>1.实验自测</p>
            <p>2.实验场景登入</p>
            <p>3.实验操作步骤（具体要根据实验开发任务与手册确定）</p>
            <p>4.实验报告</p>
            <div class="purpose">(二)实验须知</div>
            <p>每一位学生在做实验前，应认真、仔细地阅读好实验指导书和实验操作过程，然后进入到虚拟实验里，根据虚拟实验上面的操作提示一步一步的完成计算机的模拟实验。要点：</p>
            <p>1.先看实验指导书和教材，了解实验的要求后再进入实验部分。</p>
            <p>2.进入实验部分应一步一步的仔细阅读，实验过程中记录一些重要的信息、数据和要素。</p>
            <p>3.仔细看、听视频中实验指导老师演示的实验内容和提到的实验基本要领。</p>
            <p>4.在实验报告提交前先阅览一下，确认后再提交。</p>
          </div>
        </div>
        <div class="btn" @click="back()">了解了，继续</div>
      </div>
    </div>
  </common-box>
</template>

<script>
import commonBox from "../../../components/commonBox"

export default {
  components: {
    commonBox
  },
  name: "Login",
  data() {
    return {

    };
  },
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  .center-box {
    position: relative;
    width: 8.3594rem;
    height: 3.9063rem;
    margin: 0 auto;
    background: url("../../../assets/image/index_img/center1.png") no-repeat;
    background-size: 100%;
    .center-img {
      width: 100%;
      height: 100%;
    }
    .center-title {
      position: absolute;
      left: 0.599rem;
      top: 0.2604rem;
      width: 86%;
      margin: 0 auto;
      .zhuye {
        position: relative;
        margin-left: -0.2604rem;
        font-size: 0.125rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(40, 158, 255, 1);
        line-height: 0.1563rem;
        vertical-align: bottom;
        cursor: pointer;
        img {
          width: 0.151rem;
          height: 0.1406rem;
        }
        span {
          position: absolute;
          top: 0.0052rem;
          left: 0.1771rem;
        }
      }
      .title {
        display: flex;
        justify-content: space-around;
        font-size: 0.1875rem;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: rgba(170, 240, 255, 1);
        line-height: 0.0729rem;
      }
      .title-img {
        width: 6.7917rem;
        margin: 0.1042rem 0 0 0.1563rem;
      }
    }
    .content {
      padding-left: 0.4365rem;
      .content-word {
        width: 6.1927rem;
        height: 1.776rem;
        font-size: 0.1146rem;
        padding: 0.0521rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(0, 184, 224, 1);
        line-height: 0.2083rem;
        background-color: transparent;
        resize: none;
        outline: none;
        overflow-y: scroll;
        .purpose {
          margin: 0.0521rem 0;
          font-size: 0.1563rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(170, 240, 255, 1);
        }
        p {
          display: block;
          width: 100%;
          text-indent: 2em;
        }
      }

      .content-word::-webkit-scrollbar {
        border-radius: 0.0521rem;
        width: 0.0417rem;
        background-color: #233865;
      }
      .content-word::-webkit-scrollbar-thumb {
        height: 0.0417rem;
        border-radius: 0.0521rem;
        -webkit-box-shadow: inset 0 0 0.0313rem rgba(0, 0, 0, 0.3);
        background-color: #289eff;
      }
    }
    .btn {
      width: 1.151rem;
      height: 0.3906rem;
      line-height: 0.3906rem;
      text-align: center;
      margin: 0 auto;
      margin-top: 0.1875rem;
      background: url("../../../assets/image/index_img/continue.png") no-repeat;
      background-size: contain;
      font-size: 0.125rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(40, 158, 255, 1);
      cursor: pointer;
    }
  }
}
</style>