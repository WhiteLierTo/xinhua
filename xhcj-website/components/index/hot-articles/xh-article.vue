<template>
  <div class="article-container">
    <div class="img-container">
      <div class="index-card" :class="{'first-card':index === 1,'second-card':index === 2,'third-card':index === 3}">{{
        index }}
      </div>
      <img :src="info.img" alt="">
    </div>
    <div class="content">
      <div class="title" @click="goArticleDetail">{{ info.title | cutTitle }}</div>
      <div class="time">{{ info.time | timeFormat }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "xhArticle",
    props: {
      index: Number,
      info: Object
    },
    filters: {
      cutTitle(text) {
        let maxLength = process.isMob ? 35 : 23;
        if (text.length <= maxLength) {
          return text
        } else {
          return `${text.substr(0, maxLength - 3)}...`
        }
      }
    },

    methods: {
      goArticleDetail() {
        if (process.isMob) {
          location.href = `./newsDetail-mob?id=${this.info.id}&type=${this.info.articleType}`;
        } else {
          location.href = `./newsDetail?id=${this.info.id}&type=${this.info.articleType}`;
        }
      }
    }

  }
</script>

<style scoped lang="less">
  .article-container {
    width: 100%;
    overflow: hidden;
    display: flex;
    margin-bottom: 20px;

    .img-container {
      width: 94px;
      height: calc(94px * 188 / 283);
      /*max-height: 64px;*/
      overflow: hidden;
      position: relative;
      border-radius: 4px;

      img {
        width: 100%;
        height: 100%;
        object-fit: fill;
        transition: all 0.5s;
        cursor: pointer;
        display: block;

        &:hover {
          transform: scale(1.1);
        }
      }

      .index-card {
        background: #666666;
        position: absolute;
        left: 4px;
        top: 0;
        border-radius: 2px;
        width: 19px;
        height: 19px;
        line-height: 19px;
        text-align: center;
        color: white;
        font-size: 10px;
        z-index: 20;
      }

      .first-card {
        background: #f75e5e;
      }


      .second-card {
        background: #cc79f0;
      }

      .third-card {
        background: #609bf1;
      }
    }

    .content {
      flex: 1;
      overflow: hidden;
      margin-left: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .title {
        font-weight: 300;
        color: #222;
        font-size: 14px;
        cursor: pointer;

        &:hover {
          color: #0098ff;
        }
      }

      .time {
        font-size: 12px;
        margin-top: 10px;
        font-weight: 300;
        color: #b5b5b5;
      }
    }
  }

  .mob {
    .article-container {
      flex-direction: row-reverse !important;

      .img-container {
        width: 1rem;
        height: 0.67rem;

        .index-card {
          right: 4px !important;
          left: unset !important;
        }
      }

      .content {
        margin-right: 14px !important;
        margin-left: 0 !important;

        .title {
          font-weight: 600;
        }
      }
    }
  }
</style>


<!--background: #f75e5e;-->
