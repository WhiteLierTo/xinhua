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
    layout: "default-mob",
    mixins: [topicMixin]
  };
</script>
<style lang="less" scoped>
  .topics-container {
    width: 100%;
    margin-top: 0.53rem;

    .topics-title {
      width: 100%;
      height: 1.2rem;
      background: url("../assets/topic/XH6-1banner@2x.png") no-repeat center top;
      background-size: cover;
      text-align: center;
      line-height: 1.2rem;
      font-size: 22px;
      color: white;
      font-weight: 300;
      letter-spacing: 4px;
    }

    .topics-content-container {
      width: 100%;
      padding: 0 0.1rem;
      margin: 0.2rem auto;

      .topic-cell-container {
        width: 100%;
        height: auto;
        margin-bottom: 0.2rem;

        .enlarge-img-container {
          box-shadow: 0 5px 6px rgba(0, 0, 0, 0.2);
          border-radius: 8px;
          height: auto !important;
        }

        .topic-name {
          margin-top: 10px;
          color: #027DB4;
          font-size: 16px;
        }
      }
    }

    .show-more-container {
      background: rgba(238, 244, 250, 0.5);
      color: rgb(0, 152, 255);
      height: 0.4rem;
      line-height: 0.4rem;
      text-align: center;
      width: 100%;
      margin: 0.3rem auto;
      cursor: pointer;
    }
  }

</style>
