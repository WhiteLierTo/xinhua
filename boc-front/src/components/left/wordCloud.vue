<template>
  <BaseWidthTitle title="舆论热词">
    <div class="word-cloud-container" ref="word">
      <wordcloud
          :data="words"
          nameKey="word"
          valueKey="value"
          :color="myColors"
          fontScale="n"
          :fontSize="[20,80]"
          :rotate="{from: -10, to: 10, numOfOrientation: 5 }"
          :showTooltip="false"
      >
      </wordcloud>
    </div>
  </BaseWidthTitle>
</template>

<script>
  import wordcloud from 'vue-wordcloud'

  export default {
    components: {wordcloud},
    name: "wordCloud",
    data() {
      return {
        wordCloudChart: null,
        myColors: ["#FF5050", "#F5AE3D", "#3DA9F5", "#BBFFEB", "#7CFFC3", "#FDBBFF", "#FFADAD"],
        defaultWords: [
          {
            "name": "项目",
            "value": 26
          },
          {
            "name": "有限公司",
            "value": 19
          },
          {
            "name": "电子",
            "value": 18
          },
          {
            "name": "项目",
            "value": 16
          },
          {
            "name": "鸡蛋",
            "value": 15
          },
          {
            "name": "进行",
            "value": 9
          },
          {
            "name": "know",
            "value": 9
          },
          {
            "name": "good",
            "value": 9
          },
          {
            "name": "play",
            "value": 6
          }
        ],
        words: []
      }
    },
    mounted() {
      this.getHotWord();
      this.$store.commit("addPolling", this.getHotWord);
    },
    methods: {
      getHotWord() {
        this.$ajax.hotWord().then(res => {
          if (res.data.code === 200) {
            this.words = res.data.data;
          } else {
            setTimeout(this.getHotWord, 5000)
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .word-cloud-container {
    width: 100%;
    height: 100%;

  }
</style>
