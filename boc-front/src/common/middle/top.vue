<template>
  <div class="box">
    <BaseWidthTitle title="网点口碑排行TOP5">
      <ul class="top">
        <li
          v-for="(item,index) in bankList"
          :class="gernerateClass(index)"
          :key="index"
          @click="itemHandleClick(item)"
        >
          <span>0{{index+1}}</span>
          {{item.bankName}}
        </li>
      </ul>
    </BaseWidthTitle>
  </div>
</template>

<script>
export default {
  name: "Top",
  data() {
    return {
      bankList: [],
      top: true
    };
  },
  mounted() {
    this.getBankList();
    this.$store.commit("addPolling", this.getBankList);
  },
  methods: {
    itemHandleClick(item) {
      const {
        efficientGrades,
        serviceGrades,
        surroundingsGrades,
        tags,
        bankName
      } = item;
      const valList = [efficientGrades, surroundingsGrades, serviceGrades];
      this.$store.commit("updateValList", valList);
      this.$store.commit("updateBankName", bankName);
      this.$store.commit("updateItemList", tags || []);
    },
    getBankList() {
      this.$ajax.bankList().then(res => {
        this.bankList = res.data.rows;
      });
    },
    //根据索引获取不同class
    gernerateClass(index) {
      return "top" + (index + 1);
    }
  }
};
</script>

<style scoped lang="less">
.box {
  width: 788px;
  height: 700px;
  .top {
    width: 673px;
    height: 250px;
    margin: 37px auto 0;
    li {
      width: 100%;
      height: 71px;
      font-size: 27px;
      color: #fff;
      line-height: 71px;
      margin-bottom: 30px;
      padding-left: 28px;
      cursor: pointer;
    }
    .top1 {
      background: url("../../asset/index/middle/top1.png");
      background-size: 100% 100%;
    }
    .top2 {
      background: url("../../asset/index/middle/top2.png");
      background-size: 100% 100%;
    }
    .top3 {
      background: url("../../asset/index/middle/top3.png");
      background-size: 100% 100%;
    }
    .top4 {
      background: url("../../asset/index/middle/top4.png");
      background-size: 100% 100%;
    }
    .top5 {
      background: url("../../asset/index/middle/top5.png");
      background-size: 100% 100%;
    }
    span {
      padding-right: 28px;
    }
  }
}
</style>