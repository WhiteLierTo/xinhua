<template>
  <div class="log-detail-container">
    <tableWithFilter
        :tableInfo="tableInfo"
    >
    </tableWithFilter>
  </div>
</template>

<script>
  export default {
    name: "log-details",
    props: ['rid', 'articleType'],
    data() {
      return {
        tableInfo: {
          searchUrl: "/integrate/instance/log",
          defaultQuery: {
            rid: this.rid,
            articleType: this.articleType,
          },
          columns: [
            {
              prop: "operTime",
              label: "操作时间",
              beforeDisplay: row =>
                  this.$utils.format.timeStampToStandardStr(row.operTime)
            },
            {
              prop: "curOperatorName",
              label: "操作人",
            },
            {
              prop: "articleStatus",
              label: "操作内容",
              beforeDisplay: row => row.articleStatus === 3 ? '审核通过' : row.articleStatus === 4 ? '撤稿' : '---'
            },
          ],

          hides: ["deleteAll", "create", 'modify', "select"]
        },
      }
    }
  }
</script>

<style scoped lang="less">
  .log-detail-container {
    width: 100%;
    height: 60vh;
  }
</style>
