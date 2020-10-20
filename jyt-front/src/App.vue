<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";

export default {
  name: "App",
  data() {
    return {
      timer: null //定时器名称
    };
  },
  mounted() {
    // this.timer = setInterval(() => {
    //   if (getToken()) {
    //     this.$notify({
    //       title: "新消息",
    //       message: "右下角弹出的消息",
    //       position: "bottom-right"
    //     });
    //   }
    // }, 1000 * 60);
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  }
};
</script>
