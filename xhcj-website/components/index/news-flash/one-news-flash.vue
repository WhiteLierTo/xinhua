<template>
  <div class="one-news-flash-container">
    <div class="title">
      {{ info.content | cutContent }}
      <div class="dialog-container">
        <p>{{ info.content }}</p>
        <span class="time">{{ info.publishDate | timeFormat }}</span>
      </div>
    </div>
    <div class="time">{{ info.publishDate | timeFormat }}</div>
  </div>
</template>

<script>
  export default {
    name: "one-news-flash",
    props: ["info"],
    filters: {
      cutContent(content) {
        if (content.length <= 38) return content;
        return `${content.substr(0, 35)}...`
      }
    }
  }
</script>

<style scoped lang="less">
  .one-news-flash-container {
    width: 100%;
    margin-bottom: 12px;
    position: relative;

    &:last-child {
      margin-bottom: 24px;
    }

    .title {
      font-size: 14px;
      line-height: 20px;
      cursor: pointer;
      color: #555555;
      font-weight: 300;

      .dialog-container {
        position: absolute;
        right: calc(100% + 20px);
        top: -42px;
        width: 275px;
        padding: 24px;
        border-radius: 5px;
        border: 1px solid rgba(204, 204, 204);
        background: white;
        box-shadow: 0 20px 30px 0 rgba(0, 0, 0, 0.1);
        display: none;
        color: #555;
        line-height: 22px;


        &:after {
          content: "";
          position: absolute;
          transform: rotate(45deg);
          background: white;
          border-right: 1px solid rgba(204, 204, 204);
          border-top: 1px solid rgba(204, 204, 204);
          width: 12px;
          height: 12px;
          left: calc(100% - 6px);
          top: 44px;
        }
      }

      &:hover {
        color: #0098ff;

        .dialog-container {
          display: block;
        }
      }
    }

    .time {
      margin-top: 4px;
      font-size: 12px;
      font-weight: 300;
      color: #22222299;
    }

  }
</style>
