<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
<style rel="stylesheet/scss" lang="scss">
.el-message {
  min-width: 0.8854rem !important;
  height: 0.1302rem !important;
  border-radius: 0.1042rem;
  border-color: #000000 !important;
  background-color: #000000 !important;
}
.el-message__content {
  padding: 0.1042rem !important;
}
.el-message--info .el-message__content {
  color: #fff !important;
}
.el-icon-info:before {
  content: none !important;
}
.el-message p {
  margin: 0 0 0 -20px !important;
}
.el-select-dropdown__item {
  height: 70px !important;
  line-height: 70px !important;
}
.el-dialog {
  box-shadow: inherit !important;
}
.el-form-item__error {
  color: #c0a745 !important;
}
</style>
