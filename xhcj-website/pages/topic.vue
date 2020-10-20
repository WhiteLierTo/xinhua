<template>
  <div class="topics-container">
    <div class="topics-title">专题</div>
    <div class="topics-content-container">
      <div class="topic-cell-container" v-for="topic in topics" :key="topic.id" @click="showDetail(topic.id)">
        <div class="enlarge-img-container">
          <img :src="topic.topPicUrl" alt class="topic-img">
        </div>
        <p class="topic-name">{{ topic.name }} <i class="fa fa-angle-right"></i></p>
      </div>
    </div>
    <div class="show-more-container" @click="findMore" v-if="total > topics.length">查看更多
    </div>
  </div>
</template>
<script>
  import topicMixin from "../mixins/topic"

  export default {
    mixins: [topicMixin]
  };
</script>
<style lang="less" scoped>
  .topics-container {
    width: 100%;
    margin-top: 53px;

    .topics-title {
      width: 100%;
      height: 190px;
      background: url("../assets/topic/XH6-1banner@2x.png") no-repeat center top;
      background-size: cover;
      text-align: center;
      line-height: 190px;
      font-size: 36px;
      color: white;
      font-weight: 300;
      letter-spacing: 4px;
    }

    .topics-content-container {
      width: 1120px;
      margin: 20px auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .topic-cell-container {
        width: calc((1120px - 40px) / 3);
        height: auto;
        margin-bottom: 20px;
        cursor: pointer;


        .enlarge-img-container {
          box-shadow: 0 5px 6px rgba(0, 0, 0, 0.2);
          border-radius: 8px;
          /*height: auto !important;*/
          height: 202px;


          .topic-img {
            width: 100%;
            height: 100%;
            object-fit: fill !important;
          }
        }

        .topic-name {
          margin-top: 10px;
          color: #027DB4;
          font-size: 18px;
        }
      }
    }

    .show-more-container {
      background: rgba(238, 244, 250, 0.5);
      color: rgb(0, 152, 255);
      height: 56px;
      line-height: 56px;
      text-align: center;
      width: 1120px;
      margin: 30px auto;
      cursor: pointer;
    }
  }

</style>
