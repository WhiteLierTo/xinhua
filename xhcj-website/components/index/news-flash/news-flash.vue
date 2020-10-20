<template>
  <div class="news-flash-container">
    <div class="head">
      <div class="head-text">快讯</div>
    </div>

    <div class="cards-container">
      <div class="index-card" :class="{'card-one':index === 0,'card-two':index === 1,'card-three':index === 2}"
           v-for="(indexItem,index) in indexList">
        <div class="index-card-name">{{ indexItem.name }}</div>
        <div class="index-card-content">
          <div class="big-number">{{ indexItem.price }}</div>
          <div class="small-numbers">
            <span>{{ indexItem.updown }}</span>
            <span>{{(indexItem.percent * 100).toString().substr(0,7) }}%</span>
          </div>
        </div>
      </div>
    </div>
    <div class="news-flash-list-container">
      <oneNewsFlash :info="newsFlashItem" v-for="(newsFlashItem,index) in newsFlashList" :key="index" class="pc-news"/>
      <oneNewsFlashMob :info="newsFlashItem" v-for="(newsFlashItem,index) in newsFlashList" :key="index"
                       class="mob-news"/>
    </div>

  </div>
</template>

<script>
  import oneNewsFlash from "./one-news-flash"
  import oneNewsFlashMob from "./one-news-flash-mob"

  export default {
    name: "news-flash",
    components: {oneNewsFlash, oneNewsFlashMob},
    props: {
      indexList: Array,
      newsFlashList: Array
    },
    data() {
      return {

      }
    }
  }
</script>

<style scoped lang="less">
  .news-flash-container {
    margin-top: 20px;

    .head {
      border-bottom: 1px solid #eaeaea;
      margin-bottom: 40px;

      .head-text {
        display: inline-block;
        width: auto;
        height: 100%;
        border-bottom: 2px solid #222222;
        font-size: 20px;
        font-weight: 600;
        position: relative;
        top: 2px;
        color: #222;
        padding-bottom: 6px;
      }
    }

    .cards-container {
      .index-card {
        margin-bottom: 10px;
        border-radius: 6px;
        padding: 15px;
        height: 75px;
        color: white;
        display: flex;
        align-items: center;

        &:last-child {
          margin-bottom: 30px;
        }

        .index-card-name {
          font-size: 16px;
          height: 100%;
          border-right: 2px solid rgba(255, 255, 255, 0.5);
          margin-right: 10px;
          padding-right: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .index-card-content {
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;

          .big-number {
            font-size: 20px;
            font-weight: 600;
          }

          .small-numbers {
            font-size: 12px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding-right: 30px;
          }
        }
      }

      .card-one {
        background: linear-gradient(129deg, #50c1fb, #9b78fb);
      }

      .card-two {
        background: linear-gradient(130deg, #72daff, #278ef6);
      }

      .card-three {
        background: linear-gradient(104deg, #00c6dd, #00eccf);
      }
    }

    .news-flash-list-container {
      width: 100%;

      .mob-news {
        display: none;
      }
    }
  }

  .mob {
    .head {
      margin-bottom: 0.2rem;
    }

    .news-flash-list-container {
      .pc-news {
        display: none;
      }

      .mob-news {
        display: flex;
      }
    }
  }
</style>
