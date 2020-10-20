<template>
  <div class="component-container">
    <div class="head">{{ title }}</div>
    <div class="content" :style="`padding-top:${padding}px`">
      <slot></slot>
    </div>
  </div>
</template>

<script>

  export default {
    name: "baseWithTitle",
    props: {
      title: {
        default: ""
      },
      padding: {
        default: 0
      }
    }
  }
</script>

<style scoped lang="less">
  .component-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .head {
      width: 100%;
      height: 96px;
      background: linear-gradient(to right,
      rgba(0, 75, 255, 0.5),
      rgba(29, 16, 85, 0.5));
      line-height: 96px;
      padding-left: 50px;
      font-size: 32px;
      color: rgba(222, 252, 252, 1);
      flex-shrink: 0;

      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    .content {
      flex: 1;
      width: 100%;
      overflow: auto;

      &::-webkit-scrollbar {
        background: #102568;
        width: 18px;
        border-radius: 10px;
      }

      &::-webkit-scrollbar-thumb {
        background: #1a4fbb;
        border-radius: 10px;
      }
    }
  }
</style>
