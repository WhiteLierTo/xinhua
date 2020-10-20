<template>
  <div class="topic-detail-container">
    <div class="topic-img-container">
      <img :src="info.topPicUrl" alt="">
      <div class="title">{{ info.name }}</div>
    </div>

    <div class="articles-container">
      <news-card class="mob" :info="article" v-for="article in articles" :key="article.id"></news-card>
    </div>

    <div class="children-articles-container">
      <div class="child-topics-tab-container">
        <div
          class="tab-cell-container" :class="{'tab-cell-active':index === activeChildTopicIndex}"
          v-for="(child,index) in childrenTopics" :key="index" @click="activeChildTopicIndex = index">{{ child.name }}
        </div>
      </div>

      <div v-if="childrenTopics.length">
        <news-card
          class="mob"
          :info="article"
          v-for="article in childrenTopics[activeChildTopicIndex].articleList"
          :key="article.id"
        ></news-card>
      </div>
    </div>
  </div>
</template>

<script>
  import topicDetailMixin from "../mixins/topicDetail"

  export default {
    name: "topicDetail-mob",
    layout: "default-mob",
    mixins: [topicDetailMixin]
  }
</script>

<style scoped lang="less">
  .topic-detail-container {
    margin-top: 0.53rem;
    width: 100%;
    background: #f6f6f6;

    .topic-img-container {
      width: 100%;
      position: relative;
      margin-bottom: 0.2rem;

      img {
        width: 100%;
        display: block;
      }

      .title {
        position: absolute;
        bottom: 0;
        font-weight: 600;
        letter-spacing: 1px;
        width: 100%;
        background: rgba(255, 255, 255, 0.2);
        padding: 0.05rem 0.1rem;
      }
    }

    .articles-container {
      width: 100%;
      padding: 0.1rem 0.1rem 0;
      background: white;
    }

    .children-articles-container {
      margin-top: 0.2rem;
      padding: 0.1rem 0.1rem 0.1rem;
      background: white;

      .child-topics-tab-container {
        display: flex;
        margin-bottom: 0.15rem;

        .tab-cell-container {
          font-size: 15px;
          font-weight: 300;
          margin-right: 0.15rem;
          flex-shrink: 0;
          cursor: pointer;
        }

        .tab-cell-active {
          font-weight: 600;
        }
      }
    }


  }
</style>
