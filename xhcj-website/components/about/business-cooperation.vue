<template>
  <div class="business">
    <div class="business-title">
      <p class="title-bg">Cooperation</p>
      <p class="title">商业合作</p>
    </div>

    <div class="signs-container">
      <div class="sign-container" v-for="(signItem,index) in signs" :key="index">
        <img :src="signItem.path" class="sign-img" alt/>
        <p class="sign-text"> {{ signItem.label }} </p>
        <p class="sign-text" style="font-size: 14px;margin-top: 10px;">{{ signItem.subLabel }}</p>
      </div>
    </div>

    <div class="business-title">
      <p class="title-bg">Location</p>
      <p class="title">公司位置</p>
    </div>

    <div class="business-map">
      <img src="../../assets/about/business/more4_map@2x.png" alt/>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        signs: [
          {
            label: "客服电话",
            subLabel: "+86(25)58682476",
            path: require("../../assets/about/business/more4_icon1@2x.png")
          },
          {
            label: "商务合作",
            subLabel: "wumengying@xhfmedia.com",
            path: require("../../assets/about/business/more4_icon2@2x.png")
          },
          {
            label: "加入我们",
            subLabel: "wumengying@xhfmedia.com",
            path: require("../../assets/about/business/more4_icon3@2x.png")
          }
        ]
      };
    },
    head() {
      return {
        title: "新华日报财经-商业合作",
        meta: [
          {
            hid: "description",
            name: "description",
            content: "My custom description"
          }
        ]
      };
    }
  };
</script>
<style lang="less" scoped>
  .business {

    .business-title {
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
        left: 34%;
        z-index: -1;
      }
    }


    .signs-container {
      padding: 40px 140px 60px;
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

    .business-map {
      height: 320px;
      margin-bottom: 80px;

      img {
        width: 100%;
      }
    }
  }
</style>
