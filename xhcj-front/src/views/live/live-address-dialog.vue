<template>
  <div class="instance">
    <dialogTemplate ref="dialogTemplate" :onClose="onClose" title="查看直播推拉流地址">
      <p>
        <span>推流地址(上传):</span>
        {{instance.push}}
      </p>
      <p>
        <span>拉流地址1(播放):</span>
        {{instance.pull}}
      </p>
      <p>
        <span>拉流地址2(播放):</span>
        {{instance.pull2}}
      </p>
      <p>
        <span>拉流地址3(播放):</span>
        {{instance.pull3}}
      </p>
      <div slot="foot"></div>
    </dialogTemplate>
  </div>
</template>
<script>
  export default {
    name: "liveAddressDialog",
    props: ["onClose", "manuscript"],
    data() {
      return {
        instance: {}
      };
    },
    mounted() {
      this.getInstance();
    },
    methods: {
      getInstance() {
        this.$ajax.live.pushInstance(this.manuscript.id).then(res => {
          this.instance = res.data;
        });
      }
    }
  };
</script>
<style lang="less" scoped>
  .instance {
    span {
      font-weight: 700;
      font-size: 16px;
    }

    p {
      margin-bottom: 20px;
    }
  }
</style>
