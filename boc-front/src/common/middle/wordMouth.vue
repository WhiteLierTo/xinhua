<template>
  <div class="index">
    <div class="area">{{updateName}}</div>
    <div class="num">
      综合口碑指数：
      <span>{{(bankDetail.areaCompositiveGrades*20).toFixed(2)}}</span>
    </div>
    <ul>
      <li class="zhishu">
        <div class="title">服务态度</div>
        <div class="star" v-for="(item,index) of areaEfficientGrades" :key="'info2-'+index">
          <img src="../../asset/index/middle/starActive.png" />
        </div>
        <div class="star" v-for="(item,index) of 5-areaEfficientGrades" :key="index">
          <img src="../../asset/index/middle/star.png" />
        </div>
      </li>
      <li class="zhishu">
        <div class="title">环境卫生</div>
        <div class="star" v-for="(item,index) of areaServiceGrades" :key="'info2-'+index">
          <img src="../../asset/index/middle/starActive.png" />
        </div>
        <div class="star" v-for="(item,index) of 5-areaServiceGrades" :key="index">
          <img src="../../asset/index/middle/star.png" />
        </div>
      </li>
      <li class="zhishu">
        <div class="title">专业能力</div>
        <div class="star" v-for="(item,index) of areaSurroundingsGrades" :key="'info2-'+index">
          <img src="../../asset/index/middle/starActive.png" />
        </div>
        <div class="star" v-for="(item,index) of 5-areaSurroundingsGrades" :key="index">
          <img src="../../asset/index/middle/star.png" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "wordMouth",
  data() {
    return {
      areaEfficientGrades: "",
      areaServiceGrades: "",
      areaSurroundingsGrades: ""
    };
  },
  computed: {
    bankDetail() {
      return this.$store.state.bankDetail;
    },
    updateName() {
      return this.$store.state.name;
    }
  },
  watch: {
    bankDetail(val, oldVal) {
      this.areaEfficientGrades = Math.round(val.areaEfficientGrades);
      this.areaServiceGrades = Math.round(val.areaServiceGrades);
      this.areaSurroundingsGrades = Math.round(val.areaSurroundingsGrades);
    }
  },
  methods: {}
};
</script>

<style scoped lang="less">
.index {
  width: 470px;
  height: 434px;
  background: rgba(0, 29, 122, 0.6);
  margin-right: 15px;
  margin-top: 280px;
  .area {
    height: 90px;
    width: 100%;
    line-height: 90px;
    background: rgba(0, 29, 122, 1);
    color: #fff;
    font-size: 35px;
    text-align: center;
  }
  ul {
    padding-top: 30px;
  }
  .num {
    text-align: center;
    color: #38ffe1;
    font-size: 34px;
    padding-top: 30px;
    span {
      font-size: 54px;
    }
  }
  .zhishu {
    display: flex;
    margin-bottom: 15px;
    .title {
      color: #cbcbcb;
      font-size: 32px;
      padding-left: 59px;
      padding-right: 17px;
    }
    .star {
      display: inline;
      padding-top: 5px;
      padding-left: 6px;
    }
    img {
      width: 32px;
      height: 32px;
    }
  }
}
</style>