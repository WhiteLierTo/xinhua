<template>
  <div id="pano" class="pano-box"></div>
</template>

<script>

export default {
  name: "schoolPano",
  data() {
    return {
    };
  },
  mounted() {
    embedpano({xml:"/model/school.xml", target:"pano", html5:"auto", mobilescale:1.0, consolelog: true, passQueryParameters:true});
  },
  methods: {

  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.pano-box {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
}
</style>
