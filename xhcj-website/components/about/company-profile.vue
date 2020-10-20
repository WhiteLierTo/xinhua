<template>
  <div class="profile-container">

    <div class="profile-title">
      <p class="title-bg">Introduction</p>
      <p class="title">新华财经传媒简介</p>
    </div>

    <div class="intro">
      <div class="intro-word">
        <p>
          <span>江苏新华财经传媒股份有限公司</span>（以下简称“新华财经传媒”）成立于2016年4月1日，注册地位于江苏南京，注册资本6,000万元人民币，由江苏新华日报传媒有限公司等多家公司、机构共同出资成立。同时设有常州、徐州两家分公司，并出资共同成立上海翱翰投资管理有限公司，专注股权投资等金融业务。
        </p>
        <p>
          <span>致力于为投资者提供深度价值资讯</span>，为客户提供全生命周期综合传播服务，逐步形成财经全媒体新闻、财经传播咨询、公关活动管理、财经数字营销的业务形态。
        </p>
      </div>
      <div class="intro-img">
        <img src="../../assets/about/joinUs/more1img@2x.png" alt/>
      </div>
    </div>

    <div class="signs-container">
      <div class="sign-container" v-for="(signItem,index) in signs" :key="index">
        <img :src="signItem.path" class="sign-img" alt/>
        <p class="sign-text"> {{ signItem.label }} </p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        signs: [
          {
            label: "全媒体新闻",
            path: require("../../assets/about/joinUs/more1_icon1@2x.png")
          },
          {
            label: "财经传播资讯",
            path: require("../../assets/about/joinUs/more1_icon2@2x.png")
          },
          {
            label: "公关活动管理",
            path: require("../../assets/about/joinUs/more1_icon3@2x.png")
          },
          {
            label: "财经数字营销",
            path: require("../../assets/about/joinUs/more1_icon4@2x.png")
          }
        ]
      };
    },
    head() {
      return {
        title: "新华日报财经-公司概况",
        meta: [
          {
            hid: "description",
            name: "description",
            content: "My custom description"
          }
        ]
      };
    },
  };
</script>
<style lang="less" scoped>
  .profile-container {
    width: 100%;
    overflow: hidden;

    .profile-title {
      margin-bottom: 50px;
      position: relative;

      .title {
        font-size: 36px;
        color: #222222;
        z-index: 20;
        font-weight: 300;
        position: relative;
      }

      .title-bg {
        font-size: 72px;
        color: #f4f7f9;
        position: absolute;
        z-index: 1;
        top: -10px;
        font-weight: 300;
      }
    }

    .intro {
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;

      .intro-word {
        width: 44%;

        p {
          font-size: 18px;
          line-height: 34px;
          text-align: justify;
          color: #555555;
          padding-bottom: 14px;
          font-weight: 300;

          span {
            font-weight: 700;
          }
        }
      }

      .intro-img {
        width: 529px;
        height: 313px;

        img {
          max-width: 100%;
        }
      }
    }

    .signs-container {
      padding: 93px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .sign-container {
        flex: 1;
        overflow: hidden;
        color: #555;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &:hover {
          color: #0098ff;
        }

        .sign-img {
          display: block;
          width: 80px;
          height: 80px;
          margin: 0 auto 20px;
          border-radius: 100%;
          background-color: #0098ff;
          box-shadow: 0 5px 10px 0 rgba(0, 152, 255, 0.3);
        }

        .sign-text {
          font-size: 18px;
          font-weight: 300;
          line-height: 1.67;
          text-align: center;
        }
      }
    }
  }
</style>
