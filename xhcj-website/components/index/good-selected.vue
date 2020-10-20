<template>
  <div class="good-selected-container">
    <div class="part-head-container">
      <div class="part-head-text">精选栏目</div>
    </div>
    <div class="content">
      <div class="selected-cell" v-for="(item,index) in goodSelectedList" :key="index">
        <div class="enlarge-img-container">
          <img :src="item.img" alt="">
        </div>
        <div class="mask">
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "good-selected",
    data() {
      return {
        goodSelectedList: [
          {
            label: "疫情",
            img: require("../../assets/index/goodSelected/1-1avatar_default@2x.png")
          },
          {
            label: "宏观",
            img: require("../../assets/index/goodSelected/bba07a9d-91c3-46b4-b031-43e148db8636.png")
          },
          {
            label: "证券",
            img: require("../../assets/index/goodSelected/4a251821-4458-4b98-85d4-f58bb7ade34a.png")
          },
          {
            label: "创造社",
            img: require("../../assets/index/goodSelected/c4712f83-cf1a-407b-a755-ecb6327f6f4e_crop_r.png")
          },
          {
            label: "产经",
            img: require("../../assets/index/goodSelected/f6e12237-c24d-47ae-b311-e1e41606a57a.png")
          },
          {
            label: "金融",
            img: require("../../assets/index/goodSelected/ee5d60f1-f361-47f9-9665-ed373463a769_crop.jpg")
          },
        ]
      }
    }
  }
</script>

<style scoped lang="less">
  .good-selected-container {
    margin-top: 40px;

    .content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .selected-cell {
        width: 125px;
        height: 125px;
        margin-bottom: 20px;
        border-radius: 4px;
        overflow: hidden;
        position: relative;


        .mask {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;
          background: rgba(0, 0, 0, 0.3);
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          pointer-events: none;
        }
      }
    }
  }

  .mob {
    margin-top: 0.4rem;

    .content {
      .selected-cell {
        width: 45vw;
        height: 45vw;
        margin-bottom: 0.16rem;
      }
    }
  }
</style>
