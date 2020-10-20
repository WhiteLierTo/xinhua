<template>
  <div class="about" :class="{joinUsBg: isShow5 === 'block'}">
    <div class="subxban subxban-2" v-if="isShow1=='block'"></div>
    <div class="subxban subxban-3" v-else-if="isShow2=='block'"></div>
    <div class="subxban subxban-4" v-else-if="isShow3=='block'"></div>
    <div class="subxban subxban-5" v-else-if="isShow4=='block'"></div>
    <div class="subxban subxban-6" v-else-if="isShow5=='block'"></div>
    <div class="henvbnv">
      <div class="inner">
        <ul>
          <li @click="changeClick(1)">
            <a
              href="#"
              :style="{'--display': isShow1}"
              :class="[isShow1=='block'?'colorSty':'']"
              class="cur"
            >公司概况</a>
          </li>
          <li @click="changeClick(2)">
            <a
              href="#"
              :style="{'--display': isShow2}"
              :class="[isShow2=='block'?'colorSty':'']"
              class="cur"
            >寻求报道</a>
          </li>
          <li @click="changeClick(3)">
            <a
              href="#"
              :style="{'--display': isShow3}"
              :class="[isShow3=='block'?'colorSty':'']"
              class="cur"
            >商业合作</a>
          </li>
          <li @click="changeClick(4)">
            <a
              href="#"
              :style="{'--display': isShow4}"
              :class="[isShow4=='block'?'colorSty':'']"
              class="cur"
            >核心业务</a>
          </li>
          <!-- <li @click="changeClick(5)">
            <a
              href="#"
              :style="{'--display': isShow5}"
              :class="[isShow5=='block'?'colorSty':'']"
              class="cur"
            >加入我们</a>
          </li> -->
        </ul>
      </div>
    </div>
    <div class="content">
      <!-- <div class="inner">
      <div class="gakuanbx">-->
      <companyProfileMob v-if="isShow1=='block'"/>
      <seekingToReportMob v-else-if="isShow2=='block'"/>
      <businessCooperationMob v-else-if="isShow3=='block'"/>
      <coreBusinessMob v-else-if="isShow4=='block'"/>
      <joinUsMob v-else-if="isShow5=='block'"/>
    </div>
    <!-- </div>
    </div>-->
  </div>
</template>
<script>
  import companyProfileMob from "../components/about-mob/company-profile-mob";
  import seekingToReportMob from "../components/about-mob/seeking-to-report-mob";
  import businessCooperationMob from "../components/about-mob/business-cooperation-mob";
  import coreBusinessMob from "../components/about-mob/core-business-mob";
  import joinUsMob from "../components/about-mob/join-us-mob";

  export default {
    layout: "default-mob",
    components: {
      companyProfileMob,
      seekingToReportMob,
      businessCooperationMob,
      joinUsMob,
      coreBusinessMob
    },
    data() {
      return {
        isShow1: "block",
        isShow2: "none",
        isShow3: "none",
        isShow4: "none",
        isShow5: "none"
      };
    },
    methods: {
      changeClick(idx) {
        switch (idx) {
          case 1:
            this.isShow1 = "block";
            this.isShow2 = "none";
            this.isShow3 = "none";
            this.isShow4 = "none";
            this.isShow5 = "none";
            break;
          case 2:
            this.isShow1 = "none";
            this.isShow2 = "block";
            this.isShow3 = "none";
            this.isShow4 = "none";
            this.isShow5 = "none";
            break;
          case 3:
            this.isShow1 = "none";
            this.isShow2 = "none";
            this.isShow3 = "block";
            this.isShow4 = "none";
            this.isShow5 = "none";
            break;
          case 4:
            this.isShow1 = "none";
            this.isShow2 = "none";
            this.isShow3 = "none";
            this.isShow4 = "block";
            this.isShow5 = "none";
            break;
          case 5:
            this.isShow1 = "none";
            this.isShow2 = "none";
            this.isShow3 = "none";
            this.isShow4 = "none";
            this.isShow5 = "block";
            break;
          default:
            break;
        }
      }
    }
  };
</script>
<style lang="less" scoped>
  .about {
    .subxban {
      height: 3.6rem;
    }

    .subxban-2 {
      background: url("../assets/about/banner.png") no-repeat center top;
      background-size: cover;
    }

    .subxban-3 {
      background: url("../assets/about/more2_banner@2x.png") no-repeat center top;
      background-size: cover;
    }

    .subxban-4 {
      background: url("../assets/about/more4_banner@2x.png") no-repeat center top;
      background-size: cover;
    }

    .subxban-5 {
      background: url("../assets/about/banner_more_hexinyewu@2x.png") no-repeat center top;
      background-size: cover;
    }

    .subxban-6 {
      background: url("../assets/about/bannerXH3-1@2x.png") no-repeat center top;
      background-size: cover;
      height: 4.4rem;
    }

    .henvbnv {
      background: #fff;
      position: relative;
      box-shadow: 0 0.06rem 0.2rem 0 rgba(0, 0, 0, 0.1);

      .inner {
        width: 100%;
        max-width: 7.68rem;
        padding: 0 0.1rem;
        margin: 0 auto;

        ul {
          display: flex;
          align-items: center;
          justify-content: space-between;
          list-style-type: none;
          padding: 0;

          li {
            position: relative;
            text-align: center;
            flex: 1;
            font-size: 0.16rem;
            letter-spacing: 0.6px;
            color: #333333;
            line-height: 0.5rem;

            .cur {
              font-size: 13px;
              letter-spacing: -0.5px;
              display: block;
              color: #333333;
              font-weight: 300;
              text-decoration: none;

              &::after {
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                border: 8px solid transparent;
                border-bottom-color: #0098ff;
                content: "";
                display: var(--display);
              }
            }

            .colorSty {
              color: #0098ff;
            }
          }
        }
      }
    }

    .content {
      padding-top: 0.32px;

      .inner {
        width: 100%;
        max-width: 7.68rem;
        padding: 0px 0.1rem;
        margin: 0 auto;

        .gakuanbx {
          padding-top: 0.15rem;
          margin-bottom: 0.8rem;
        }
      }
    }
  }

  .joinUsBg {
    background: #f7f7fb;
  }
</style>
