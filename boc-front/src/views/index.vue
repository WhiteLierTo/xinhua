<template>
  <div class="container" :style="`top:${top}px`" ref="container">
    <div class="head">
      <div class="head-inner">
        中国银行苏州分行舆情监测中心
      </div>
    </div>
    <div class="content" v-if="isLogin">
      <div class="left">
        <Left/>
      </div>
      <div class="divider"></div>

      <div class="mid">
        <Middle/>
      </div>
      <div class="divider"></div>

      <div class="right">
        <Right/>
      </div>
    </div>
  </div>
</template>

<script>
  import Left from "./left";
  import Right from "./right";
  import Middle from "./middle";

  export default {
    name: "index",
    components: {Left, Right, Middle},
    data() {
      return {
        top: 0,
        isLogin: false
      };
    },
    created() {
      this.login();
    },
    mounted() {
      this.setContainerPosition();
      window.onresize = () => {
        this.setContainerPosition();
        this.$store.commit("chartsResize");
      };
      // 开始轮询
      setInterval(() => {
        if (this.$store.state.pollingFunctions.length > 100) {
          throw new Error("内存泄漏!!")
        }
        this.$store.state.pollingFunctions.forEach(func => func());
      }, 10 * 60 * 1000)
    },
    methods: {
      login() {
        this.$ajax.login()
          .then(res => {
            if (res.data.code === 200) {
              this.isLogin = true;
            } else {
              setTimeout(this.login, 2000)
            }
          }).catch(() => {
          setTimeout(this.login, 2000)
        })

      },

      setContainerPosition() {
        let top = (window.innerHeight - this.$refs.container.offsetHeight) / 2
        this.top = Math.max(0, top);
      },
    }
  }

</script>
<style lang="less" scoped>
  .container {
    width: 7630px;
    height: 2160px;
    flex-shrink: 0;
    margin: 0 auto;
    position: relative;
    display: flex;
    flex-direction: column;
    background: url("../asset/index/bg.png");
    background-size: 100% 100%;

    transform: scaleX(0.25) scaleY(0.5);
    transform-origin: 0 0 0;

    /*translateX(-150%) translateY(-50%)*/

    .head {
      width: 100%;
      height: 207px;
      flex-shrink: 0;
      background: url("../asset/index/header.png");
      background-size: 100% 100%;

      .head-inner {
        width: 100%;
        height: 100%;
        line-height: 190px;
        text-align: center;
        font-weight: 600;
        font-size: 110px;
        background: linear-gradient(0deg, #1765ff, #1765ff, #49d9fe, #8fefff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .content {
      flex: 1;
      overflow: hidden;
      width: 100%;
      padding: 30px 60px 50px;
      display: flex;

      .divider {
        margin: 0 50px;
        width: 2px;
        height: 100%;
        flex-shrink: 0;
        position: relative;

        &:after {
          content: "";
          position: absolute;
          left: 50%;
          height: 100%;
          border-left: 2px #376aff dashed;
        }
      }

      .left {
        height: 100%;
        width: 2644px;
        overflow: hidden;
      }

      .mid {
        height: 100%;
        width: 2845px;
        overflow: hidden;
      }

      .right {
        height: 100%;
        width: 1867px;
        overflow: hidden;
      }
    }
  }
</style>
