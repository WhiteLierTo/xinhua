<template>
  <div>
    <el-button icon="el-icon-plus" type="text" @click="isShowSelectTable = true">选择人员</el-button>
    <dialogTemplate title="选择人员" ref="selectPerson" :width="1200" v-if="isShowSelectTable" :onClose="()=>isShowSelectTable = false">
      <personSelectorTable :onSelect="onSelectMid" :userDataResource="userDataResource" :isSingleChoice="isSingleChoice" :defaultQuery="defaultQuery" :isSelectReporter=isSelectReporter />
      <div slot="foot"></div>
    </dialogTemplate>
  </div>
</template>

<script>
import personSelectorTable from "./personSelector-table"

export default {
  name: "personSelector",
  components: { personSelectorTable },
  props: {
    onSelect: {
      type: Function,
      required: true,
    },
    userDataResource: { // 人员请求地址
      type: String,
      default: "/system/user/app/list"
    },
    isSingleChoice: {
      type: Boolean,
      default: true
    },
    defaultQuery: {
      type: Object,
      default: () => ({})
    },
    isSelectReporter: {
      type: Boolean,
      default: false
    },
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
