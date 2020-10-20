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
        <div class="time">{{time}}</div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { dateFormat } from "../utils/filter";

export default {
  name: "commonBox",
  data() {
    return {
      flag: false,
      userInfo: {},
      time: ""
    };
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let date = new Date();
    this.time = dateFormat("YYYY/mm/dd", date);
  },
  methods: {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  .container-box {
    width: 100%;
    height: 100%;
    background: url("../assets/image/loginbg.png") no-repeat;
    background-size: 102%;
    background-attachment: fixed;
    display: flex;
    z-index: 1;
    .container_titlebg {
      width: 100%;
      height: 0.7552rem;
      z-index: 2;
      background: url("../assets/image/titlebg.png") no-repeat center center;
      background-size: 100%;
      .user {
        position: absolute;
        right: 0.414rem;
        top: 0.08rem;
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
      .time {
        position: absolute;
        left: 0.35rem;
        top: 0.15rem;
        color: rgba(40, 158, 255, 1);
        font-size: 0.0833rem;
      }

      .container_title {
        height: 0.4688rem;
        font-size: 0.2604rem;
        font-weight: 550;
        line-height: 0.4688rem;
        text-align: center;
        margin-top: 0.0781rem;
        padding-left: 1%;
        font-family: Source Han Sans CN;
        background: linear-gradient(#00d6ff 52%, #003a91);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
}
</style>
