<template>
  <dialogTemplate
      :width="resourcePollWidth"
      v-if="isShowResourcePoolDialog"
      :onClose="onResourcePoolClose"
      ref="resourcePoolDialog"
      title="从资源库选择"
  >
    <resourcePool
        isSelectMode="true"
        :onSelect="onResourcePoolSelectImg"
        type="image"
        style="height:80vh"
    ></resourcePool>
    <div slot="foot"></div>
  </dialogTemplate>
</template>

<script>
  import resourcePool from "../../../views/news/resource/resource"

  export default {
    name: "resource-pool-selector",
    components: {resourcePool},
    data() {
      return {
        resourcePollWidth: innerWidth * 0.8,
        ueditor: null,
        isShowResourcePoolDialog: false
      }
    },
    methods: {
      act(ueditor) {
        this.ueditor = ueditor;
        this.isShowResourcePoolDialog = true
      },

      onResourcePoolClose() {
        this.isShowResourcePoolDialog = false;
      },

      onResourcePoolSelectImg(objList) {
        let target = objList[0];
        if (target.type === "word") {
          this.$message.warn("请选择图片或者视频");
          return
        }
        if (target.type === "video") {
          this.$refs.resourcePoolDialog.closeSelf();
          this.ueditor.execCommand("insertvideo", {
            url: target.url,
            poster: target.coverUrl
          });
        }

        if (target.type === "image") {
          this.$refs.resourcePoolDialog.closeSelf();
          this.ueditor.execCommand("insertimage", {
            src: target.url
          });
        }
      },

    }
  }
</script>

<style scoped>

</style>