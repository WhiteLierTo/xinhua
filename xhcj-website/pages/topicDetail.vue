<template>
  <div class="topic-detail-container">
    <news-card :info="article" v-for="article in articles" :key="article.id"></news-card>

    <div class="child-topics-tab-container">
      <div
        class="tab-cell-container" :class="{'tab-cell-active':index === activeChildTopicIndex}"
        v-for="(child,index) in childrenTopics" :key="index" @click="activeChildTopicIndex = index">{{ child.name }}
      </div>
    </div>

    <div v-if="childrenTopics.length">
      <news-card
        :info="article" v-for="article in childrenTopics[activeChildTopicIndex].articleList"
        :key="article.id"
      ></news-card>
    </div>

    <div class="empty-container" v-if="articles.length === 0 && childrenTopics.length === 0">
      <img src="../assets/other/nodata.png" alt="">
      <p>该专题下无内容</p>
    </div>

  </div>
</template>

<script>
  import topicDetailMixin from "../mixins/topicDetail"

  export default {
    name: "topicDetail",
    mixins: [topicDetailMixin]
  }
</script>

<style scoped lang="less">
  .topic-detail-container {
    width: 1120px;
    margin: 80px auto 20px;

    .child-topics-tab-container {
      margin-top: 50px;
      margin-bottom: 30px;
      display: flex;

      .tab-cell-container {
        font-size: 20px;
        font-weight: 300;
        margin-right: 20px;
        flex-shrink: 0;
        cursor: pointer;
      }

      .tab-cell-active {
        font-weight: 600;
      }
    }

    .empty-container {
      width: 100%;
      height: 40vh;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      img {
        width: 300px;
      }

      p {
        color: #222;
        font-weight: 300;
      }
    }
  }
</style>
