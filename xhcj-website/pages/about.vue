<template>
  <div class="about-container" :class="{joinUsBg: activeTabIndex === 4}">
    <div
      class="banner-container"
      :style="{backgroundImage: `url(${tabs[activeTabIndex].background})`,height:`${tabs[activeTabIndex].height}px`}"
    ></div>
    <div class="about-switch">
      <div
        class="tab-container"
        :class="{'tab-active-container':activeTabIndex === index}"
        v-for="(tabItem,index) in tabs"
        :key="index"
        v-text="tabItem.label"
        @click="activeTabIndex = index"
      ></div>
    </div>
    <div class="about-content">
      <companyProfile v-if="activeTabIndex === 0" />
      <seekingToReport v-if="activeTabIndex === 1" />
      <businessCooperation v-if="activeTabIndex === 2" />
      <coreBusiness v-if="activeTabIndex === 3" />
      <joinUs v-if="activeTabIndex === 4" />
    </div>
  </div>
</template>
<script>
import companyProfile from "../components/about/company-profile";
import seekingToReport from "../components/about/seeking-to-report";
import businessCooperation from "../components/about/business-cooperation";
import coreBusiness from "../components/about/core-business";
import joinUs from "../components/about/join-us/join-us";

export default {
  components: {
    companyProfile,
    seekingToReport,
    businessCooperation,
    coreBusiness,
    joinUs,
  },
  data() {
    return {
      tabs: [
        {
          label: "公司概况",
          background: require("../assets/about/banner.png"),
          height: 360,
        },
        {
          label: "寻求报道",
          background: require("../assets/about/more2_banner@2x.png"),
          height: 360,
        },
        {
          label: "商业合作",
          background: require("../assets/about/more4_banner@2x.png"),
          height: 360,
        },
        {
          label: "核心业务",
          background: require("../assets/about/banner_more_hexinyewu@2x.png"),
          height: 360,
        },
        // {
        //   label: "加入我们",
        //   background: require("../assets/about/bannerXH3-1@2x.png"),
        //   height: 440
        // }
      ],
      activeTabIndex: 0,
    };
  },

  mounted() {
    if (this.$route.query.default) {
      this.activeTabIndex = parseInt(this.$route.query.default);
    }
  },
  head() {
    return {
      title: "新华日报财经-公司概况",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "My custom description",
        },
      ],
    };
  },
};
</script>
<style scoped lang="less">
.about-container {
  width: 100%;

  .banner-container {
    width: 100%;
    height: 360px;
    background-repeat: no-repeat;
    background-position: center top;
    background-size: cover;
  }

  .about-switch {
    width: 100%;
    height: 80px;
    background: #fff;
    box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    padding: 0 calc(50vw - 500px);
    overflow: hidden;

    .tab-container {
      height: 100%;
      flex: 1;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #333333;
      font-weight: 300;

      &:hover {
        color: #0098ff;
      }
    }

    .tab-active-container {
      color: #0098ff;
      position: relative;

      &:after {
        content: "";
        width: 18px;
        height: 18px;
        background: #0098ff;
        position: absolute;
        bottom: -12px;
        left: calc(50% - 9px);
        transform: rotate(45deg);
      }
    }
  }

  .about-content {
    width: 1120px;
    margin: 78px auto 0;
  }
}

.joinUsBg {
  background: #f7f7fb;
}
</style>
