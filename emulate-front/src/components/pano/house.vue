<template>
  <div id="pano" style="width: 100%; height: 100%;"></div>
</template>

<script>

export default {
  name: "schoolPano",
  data() {
    return {
    };
  },
  mounted() {
    embedpano({xml:"/model/house.xml", target:"pano", html5:"auto", mobilescale:1.0, consolelog: true, passQueryParameters:true});
  },
  methods: {

  }
};
</script>
