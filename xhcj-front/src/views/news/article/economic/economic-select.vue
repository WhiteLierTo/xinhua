<template>
  <div>
    <el-button icon="el-icon-plus" type="text" @click="isShowSelectTable = true">点击关联</el-button>

    <dialogTemplate title="选择财经号" ref="selectPerson" :width="900" v-if="isShowSelectTable" :onClose="()=>isShowSelectTable = false">
      <economicSelectorTable :onSelect="onSelectMid" />
      <div slot="foot"></div>
    </dialogTemplate>
  </div>
</template>

<script>
import economicSelectorTable from "./economicSelector-table"

export default {
  name: "economicSelector",
  components: { economicSelectorTable },
  props: {
    onSelect: {
      type: Function,
      required: true
    }
  },

  data() {
    return {
      isShowSelectTable: false
    }
  },
  methods: {
    onSelectMid(params) {
      this.onSelect(params);
      this.$refs.selectPerson.closeSelf();
    }
  }
}
</script>

<style scoped>
</style>