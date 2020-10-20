<template>
  <div class="one-news-flash-mob-container">
    <div class="time-line">
      <div class="circle"></div>
    </div>
    <div class="content">
      <div class="time">{{ info.publishDate | timeFormat }}</div>
      <div class="title">
        <div class="title-content" :style="{maxHeight:`${contentMaxHeight}px`}" ref="titleContent">{{ info.content }}
        </div>
        <div class="show-more-container" v-if="isShowShowMore" @click="openAndClose">
          <span>{{ contentMaxHeight === 60?'展开全文':'收起' }}</span>
          <i class="fa fa-angle-double-down icon" :class="{up:contentMaxHeight !== 60}"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "one-news-flash",

    props: ["info"],

    filters: {
      cutContent(content) {
        if (content.length <= 38) return content.trim();
        return `${content.substr(0, 35).trim()}...`
      }
    },


    data() {
      return {
        contentMaxHeight: 60,
        isShowShowMore: false
      }
    },

    mounted() {
      let contentDomHeight = this.$refs.titleContent.scrollHeight;
      this.isShowShowMore = contentDomHeight > this.contentMaxHeight;
    },

    methods: {
      openAndClose() {
        if (this.contentMaxHeight === 60) {
          this.contentMaxHeight = 300
        } else {
          this.contentMaxHeight = 60
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .one-news-flash-mob-container {
    width: 100%;
    /*margin-bottom: 12px;*/
    position: relative;
    display: flex;
    overflow: hidden;

    &:last-child {
      margin-bottom: 24px;

      .time-line {

        .circle {

          &:before {
            display: none;
          }
        }
      }
    }

    .time-line {
      width: 20px;
      /*border: 1px solid red;*/
      flex-shrink: 0;

      .circle {
        width: 12px;
        height: 12px;
        border: 1px solid #469FFE;
        border-radius: 50%;
        position: relative;

        &:after {
          content: "";
          position: absolute;
          left: calc(50% - 2px);
          top: calc(50% - 2px);
          width: 4px;
          height: 4px;
          background: #469FFE;
          border-radius: 50%;
        }

        &:before {
          content: "";
          position: absolute;
          left: 50%;
          top: 100%;
          border-left: 1px solid #469FFE;
          height: 200px;
        }
      }
    }

    .content {
      /*border: 1px solid red;*/
      flex: 1;

      .time {
        font-size: 12px;
        font-weight: 300;
        color: #22222299;
        position: relative;
        top: -1px;
        margin-bottom: 6px;
      }

      .title {
        width: 100%;
        font-size: 14px;
        line-height: 20px;
        cursor: pointer;
        color: #555555;
        font-weight: 300;
        background: #F6F6F6;
        border-radius: 6px;
        padding: 0.1rem 0.08rem;
        margin-bottom: 0.15rem;
        overflow: hidden;

        .title-content {
          width: 100%;
          overflow: hidden;
          transition: all 0.4s;
        }

        .show-more-container {
          width: 100%;
          color: #999999;
          text-align: center;
          font-size: 14px;
          margin-top: 12px;
          -webkit-tap-highlight-color: rgba(255, 0, 0, 0);

          .icon {
            font-size: 12px;
            position: relative;
            transition: all 0.4s;
            margin-left: 4px;
            vertical-align: center;
          }

          .icon.up {
            transform: rotate(180deg);
          }
        }
      }
    }
  }
</style>
