<template>
  <div class="flash-mob-container">
    <div class="head">
      <div class="head-text">快讯</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "flash-mob",
    props: {
      indexList: Array,
      newsFlashList: Array
    },
  }
</script>

<style scoped lang="less">
  .flash-mob-container {
    .head {
      border-bottom: 1px solid #eaeaea;
      margin-bottom: 0.2rem;

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

  }
</style>
