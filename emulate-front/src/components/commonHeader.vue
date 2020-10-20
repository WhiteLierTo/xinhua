<template>
  <div class="container">
    <div class="container-box">
      <div class="container_titlebg">
        <p class="container_title">公共卫生安全舆情与风险监管虚拟仿真平台</p>
        <div class="user">
          <div class="icon" @click="showPersonal()">
            <img src="../assets/image/index_img/user.png" alt />
            <span>{{userInfo.userName}}</span>
          </div>
        </div>
        <div class="list" v-show="flag">
          <ul>
            <li @click="loginOut()">退出登录</li>
          </ul>
        </div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "commonBox",
  data() {
    return {
      flag: false,
      isShow: true,
      userInfo: {}
    };
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const status = this.userInfo.isShow;
    if (status) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  },
  methods: {
    showPersonal() {
      this.flag = !this.flag;
      const status = this.$route.params.status;
    },
    // 退出
    loginOut() {
      localStorage.removeItem("userInfo");
      this.$router.push({
        path: "/login"
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  width: 100%;
  .container-box {
    width: 100%;
    background-size: 102%;
    background-attachment: fixed;
    display: flex;
    z-index: 1;
    .container_titlebg {
      width: 98%;
      height: 0.7552rem;
      z-index: 2;
      background: url("../assets/image/index_img/commonbg.png") no-repeat center
        center;
      background-size: 100%;
      margin: 0 auto;
      overflow: hidden;
      .container_title {
        float: left;
        width: 4.0417rem;
        font-size: 0.1667rem;
        font-family: Source Han Sans CN;
        font-weight: 550;
        color: rgba(255, 255, 255, 1);
        line-height: 0.4688rem;
        text-align: left;
        margin-top: 0.0833rem;
        margin-left: 0.3229rem;
        font-family: Source Han Sans CN;
        background: linear-gradient(#00d6ff 32%, #003a91);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .info {
        overflow: hidden;
        float: right;
        margin-top: 0.2135rem;
        margin-right: 0.3698rem;
        .info_left {
          float: left;
          .avtor {
            width: 0.3125rem;
            height: 0.3125rem;
          }
        }
        .info_right {
          float: left;
          font-size: 0.1563rem;
          font-family: Adobe Heiti Std;
          font-weight: normal;
          color: rgba(170, 240, 255, 1);
          line-height: 0.25rem;
          margin-left: 0.0781rem;
          margin-top: 0.0417rem;
        }
      }
      .user {
        position: absolute;
        right: 0.414rem;
        top: 0.28rem;
        font-size: 0.0833rem;
        cursor: pointer;
        .icon {
          display: flex;
          justify-content: flex-start;
          width: auto;
          height: 0.2188rem;
          img {
            width: 0.2188rem;
            height: 0.2188rem;
          }
          span {
            line-height: 0.2188rem;
            background: linear-gradient(#00d6ff 52%, #003a91);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }
      .list {
        position: absolute;
        right: 0.314rem;
        top: 0.5458rem;
        display: block;
        width: 0.5365rem;
        height: 0.5313rem;
        border-radius: 0.0521rem;
        margin: 0;
        padding: 0;
        background: rgba(0, 110, 197, 0.34);
        border: 0.0104rem solid #227dd9;
        box-shadow: 0.0167rem 0.0083rem 0.0417rem #227dd9;
        cursor: pointer;
        ul {
          margin: 0;
          padding: 0;
          padding-top: 0.0521rem;
          li {
            display: block;
            height: 0.1521rem;
            padding-left: 0.0521rem;
            font-size: 0.0833rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: rgba(40, 158, 255, 1);
            line-height: 0.1521rem;
          }
          li:before {
            content: "";
            display: inline-block;
            width: 0.026rem;
            height: 0.026rem;
            margin-right: 0.026rem;
            margin-bottom: 0.0177rem;
            border-radius: 50%;
            background-color: rgba(40, 158, 255, 1);
          }
          li:hover {
            background-color: #227dd9;
          }
        }
      }
    }
  }
}
</style>
