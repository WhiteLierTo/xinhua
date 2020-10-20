<template>
  <div class="join-us-container">
    <jdCard v-for="(jdItem,index) in jdInfo" :key="index" :info="jdItem"/>
  </div>
</template>
<script>
  import jdCard from "./jdCard"

  export default {
    components: {jdCard},
    data() {
      return {
        selfOffsetTop: 0,
        selfHalfHeight: 0,
        startShowSelf: false, // 是否进入了视口
        jdInfo: [
          {
            name: "理财编辑主编",
            duty: [
              "负责理财频道原创内容的规划与撰写。频道内容涉及境内境外各种理财方式，包括但不限于基金、保险、p2p、贵金属投资、跨境资产配置等；",
              "负责客户定制内容的生产，根据客户需求对产品内容、形式进行优化；",
              "运营理财公众号、头条号等社交账号，吸引粉丝；",
              "拓展外部内容合作伙伴，获取相关资讯内容授权。"
            ],
            requirement: [
              "对投资赚钱这件事充满好奇心，在理财这件事儿上有比较广泛的知识储备；",
              "文字表达力强，能把专业的事情说简单，思维活跃、有创意；",
              "英语阅读能力强，能独立快速编译投资类文章；",
              "具有良好的理解、沟通力，执行力强，有抗压能力；",
              "有三年以上工作经验，财经编辑经验优先。"
            ]
          },
          {
            name: "高级产品经理",
            duty: [
              "负责理财频道原创内容的规划与撰写。频道内容涉及境内境外各种理财方式，包括但不限于基金、保险、p2p、贵金属投资、跨境资产配置等；",
              "负责客户定制内容的生产，根据客户需求对产品内容、形式进行优化；",
              "运营理财公众号、头条号等社交账号，吸引粉丝；",
              "拓展外部内容合作伙伴，获取相关资讯内容授权。"
            ],
            requirement: [
              "对投资赚钱这件事充满好奇心，在理财这件事儿上有比较广泛的知识储备；",
              "文字表达力强，能把专业的事情说简单，思维活跃、有创意；",
              "英语阅读能力强，能独立快速编译投资类文章；",
              "具有良好的理解、沟通力，执行力强，有抗压能力；",
              "有三年以上工作经验，财经编辑经验优先。"
            ]
          },
          {
            name: "理财编辑主编",
            duty: [
              "负责理财频道原创内容的规划与撰写。频道内容涉及境内境外各种理财方式，包括但不限于基金、保险、p2p、贵金属投资、跨境资产配置等；",
              "负责客户定制内容的生产，根据客户需求对产品内容、形式进行优化；",
              "运营理财公众号、头条号等社交账号，吸引粉丝；",
              "拓展外部内容合作伙伴，获取相关资讯内容授权。"
            ],
            requirement: [
              "对投资赚钱这件事充满好奇心，在理财这件事儿上有比较广泛的知识储备；",
              "文字表达力强，能把专业的事情说简单，思维活跃、有创意；",
              "英语阅读能力强，能独立快速编译投资类文章；",
              "具有良好的理解、沟通力，执行力强，有抗压能力；",
              "有三年以上工作经验，财经编辑经验优先。"
            ]
          },
          {
            name: "理财编辑主编",
            duty: [
              "负责理财频道原创内容的规划与撰写。频道内容涉及境内境外各种理财方式，包括但不限于基金、保险、p2p、贵金属投资、跨境资产配置等；",
              "负责客户定制内容的生产，根据客户需求对产品内容、形式进行优化；",
              "运营理财公众号、头条号等社交账号，吸引粉丝；",
              "拓展外部内容合作伙伴，获取相关资讯内容授权。"
            ],
            requirement: [
              "对投资赚钱这件事充满好奇心，在理财这件事儿上有比较广泛的知识储备；",
              "文字表达力强，能把专业的事情说简单，思维活跃、有创意；",
              "英语阅读能力强，能独立快速编译投资类文章；",
              "具有良好的理解、沟通力，执行力强，有抗压能力；",
              "有三年以上工作经验，财经编辑经验优先。"
            ]
          }
        ]
      };
    },

    head() {
      return {
        title: "新华日报财经-加入我们",
        meta: [
          {
            hid: "description",
            name: "description",
            content: "My custom description"
          }
        ]
      };
    },
    beforeDestroy() {
      document.removeEventListener("scroll", this.onScroll);
    },
    methods: {
      onScroll() {
        let scrollTop = (document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop);
        if (
          scrollTop + window.innerHeight - this.selfHalfHeight >=
          this.selfOffsetTop
        ) {
          this.startShowSelf = true;
          document.removeEventListener("scroll", this.onScroll);
        }
      },
    }
  };
</script>
<style lang="less" scoped>
  .join-us-container {
    padding-bottom: 60px;
  }
</style>
