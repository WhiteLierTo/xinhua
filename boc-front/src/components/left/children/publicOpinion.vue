<template>
  <div class="public-opinion-container" @click="showDetail(info)">
    <div class="head-and-foot">
      <span>{{ info.showTime }}</span>
      <span>{{ info.siteName }}</span>
    </div>
    <div class="content" v-html="info.content">
    </div>
    <div class="head-and-foot">
      <span>{{ info.author }}</span>
      <span style="color: #FD1036" v-if="type === 'bad'">负面</span>
      <span style="color: #376AFF" v-else>正面</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "publicOpinion",
    props: ["info", "type", "showDetail"]
  }
</script>

<style scoped lang="less">
  .public-opinion-container {
    color: white;
    padding-bottom: 30px;
    border-bottom: 1px #1E61D1 dashed;
    margin-bottom: 24px;
    margin-right: 24px;
    cursor: pointer;

    &:last-child {
      border-bottom: none;
    }

    .head-and-foot {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      font-size: 18px;
      margin-bottom: 15px;
    }

    .content {
      color: rgba(54, 229, 255, 1);
      line-height: 29px;
      font-size: 16px;
      margin-bottom: 15px;
      word-break: break-word;
      overflow: hidden;
      max-height: 84px;

      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      display: -webkit-box;
    }
  }
</style>
