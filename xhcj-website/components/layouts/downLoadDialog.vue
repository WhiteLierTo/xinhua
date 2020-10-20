<template>
  <div class="dialog">
    <div class="dialog-info">
      <div class="dialog-title">立即查看</div>
      <div class="dialog-code">
        <img src="../../assets/other/QRcodeXH2-5@2x.png" alt/>
      </div>
      <div class="explain">手机扫一扫新华日报财经客户端立即查看</div>
      <div class="submit" @click="submitHandle">OK</div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ["dialogHiddle"],
    data() {
      return {};
    },
    methods: {
      submitHandle() {
        this.$emit("dialogHiddle", false);
      }
    }
  };
</script>
<style lang="less" scoped>
  .dialog {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;

    .dialog-info {
      width: 100%;
      max-width: 550px;
      height: 95vh;
      -webkit-backdrop-filter: blur(5px);
      backdrop-filter: blur(5px);
      background-image: linear-gradient(
        144deg,
        rgba(22, 198, 255, 0.9),
        rgba(0, 114, 255, 0.9)
      );
      box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      display: flex;
      flex-direction: column;

      .dialog-title {
        font-size: 36px;
        text-align: center;
        color: rgb(255, 255, 255);
        line-height: 50px;
        padding-bottom: 30px;
        padding-top: 10vh;
      }

      .dialog-code {
        padding: 10px;
        background: #fff;
        border-radius: 10px;
        width: 200px;
        height: 200px;
        margin: 0 auto;

        img {
          display: block;
          width: 100%;
        }
      }

      .explain {
        margin-bottom: 30px;
        margin-top: 30px;
        font-size: 16px;
        letter-spacing: 1px;
        text-align: center;
        color: rgb(255, 255, 255);
      }

      .submit {
        display: block;
        width: 220px;
        height: 50px;
        border-radius: 30px;
        box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2);
        border: solid 2px rgb(255, 255, 255);
        font-size: 20px;
        letter-spacing: 1px;
        text-align: center;
        color: rgb(255, 255, 255);
        line-height: 50px;
        transition: all ease 0.5s;
        -webkit-transition: all ease 0.5s;
        -moz-transition: all ease 0.5s;
        -o-transition: all ease 0.5s;
        margin: auto auto 30px;

        &:hover {
          box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2),
          0 5px 10px 0 rgba(0, 152, 255, 0.3);
          color: #0098ff;
          background: #fff;
          cursor: pointer;
        }
      }
    }
  }

  .mob {
    overflow: hidden;

    .dialog-info {
      width: 100%;
      height: 100%;
      margin: 0;
      border-radius: 0;

      .dialog-title {
        font-size: 22px;
        padding-bottom: 0.1rem !important;
        font-weight: 400;
      }

      .explain {
        font-size: 13px;
        margin: 0.1rem 0 0.2rem;
      }

      .submit {
        width: 2.2rem;
        height: 0.44rem;
        line-height: 0.4rem;
        font-weight: 400;
      }
    }
  }
</style>
