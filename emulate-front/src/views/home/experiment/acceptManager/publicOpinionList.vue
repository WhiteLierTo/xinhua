<template>
  <div class="content_bg">
    <ul class="public_ul">
      <li class="public_list" @click="publicHandleClick">
        <div class="public_status">待办</div>
        <h4>20岁学生食堂就餐后腹痛抽搐，抢救无效后去世——舆情上报</h4>
        <el-row>
          <el-col :span="10">
            <div class="t1">事故发生单位：南京科技大学</div>
          </el-col>
          <el-col :span="10">
            <div class="t1">
              <span class="t2">地 点</span>：南京市建邺区
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <div class="t1">发 病 时 间：11-21 10:34</div>
          </el-col>
          <el-col :span="10">
            <div class="t1">进 食 时 间：11-21 09:32</div>
          </el-col>
        </el-row>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    publicHandleClick() {
      this.$router.push({
        path: "/publicOpinionAcceptDetail"
      });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.content_bg {
  width: 8.1094rem;
  height: 4.1667rem;
  background: url("../../../../assets/image/experiment/acceptbg.png") no-repeat;
  background-size: 91%;
  margin: 0rem 0 0 0.1rem;
  position: relative;
  .public_ul {
    position: absolute;
    left: 0.2083rem;
    top: 0.2969rem;
    .public_list {
      cursor: pointer;
      width: 6.9323rem;
      height: 1.2969rem;
      border: 0.0052rem solid rgba(11, 97, 178, 1);
      border-radius: 0.1042rem;
      background: #012c88;
      margin-bottom: 0.1563rem;
      .public_status {
        width: 0.625rem;
        height: 0.2552rem;
        background: #8a7126;
        text-align: center;
        line-height: 0.2552rem;
        color: #fff;
        font-size: 0.125rem;
        border-top-left-radius: 0.1042rem;
      }
      h4 {
        font-size: 0.1563rem;
        font-weight: 400;
        color: #c1f3ff;
        line-height: 0.0417rem;
        margin-left: 0.3958rem;
      }
      .t1 {
        font-size: 0.1146rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(0, 184, 224, 1);
        margin-left: 0.2813rem;
        margin-top: 0.0333rem;
        padding-left: 0.125rem;
        .t2 {
          letter-spacing: 0.0179rem;
        }
      }
    }
  }
}
</style>
