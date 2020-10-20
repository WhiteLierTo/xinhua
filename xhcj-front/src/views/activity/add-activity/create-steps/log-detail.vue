<template>
  <div>
    <tableWithFilter :tableInfo="tableInfo" :mock="false" :style="{height:height+'px'}">
    </tableWithFilter>
  </div>
</template>
    
<script> 
export default {
  name: "logDatail",
  props: ["id"],
  data() {
    return {
      height: window.innerHeight * 0.8,
      tableInfo: {
        searchUrl: "/activity/oper/list",
        defaultQuery: {
          id: () => this.$route.query.id
        },
        columns: [
          {
            prop: "operName",
            label: "操作人"
          },
          {
            prop: "operTime",
            label: "操作时间"
          },
          {
            prop: "title",
            label: "操作明细",
          },
        ],
        hides: ["create", "deleteAll", "modify", "select"],
      },
    }
  },

}
</script>
<style scoped lang="less">
.active-info-management {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>