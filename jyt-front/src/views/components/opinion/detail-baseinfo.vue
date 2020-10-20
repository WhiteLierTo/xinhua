<template>
  <div>
    <el-row>
      <div class="listtitle">
        <i></i>
        <div class="txt">基本信息</div>
      </div>
    </el-row>
    <el-row style="margin-left: 10px;">
      <el-row class="arttitle">{{ data.artTitle }}</el-row>
      <el-row>
        <el-col :span="5" class="jichu">
          发布时间：
          <span>{{ data.artPublishTime }}</span>
        </el-col>
        <el-col :span="3" class="jichu">
          数据来源：
          <span>{{ data.artSourceName }}</span>
        </el-col>
        <el-col :span="5" class="jichu">
          来源渠道：
          <span>{{ data.siteName }}</span>
        </el-col>
        <el-col :span="5" v-if="data.opinionTypeName != '' && data.opinionTypeName != null" class="jichu">
          舆情类别：
          <span class="leibie">{{ data.opinionTypeName }}</span>
        </el-col>
        <el-col :span="5" v-if="data.orderStatus == 3 || data.orderStatus == 5" class="jichu">
          状态：
          <span class="leibie">{{ data.orderStatus == 3 ? '办结' : '强制撤销' }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" class="jichu urlstyle">
          原文链接：
          <a :href="data.artUrl" target="blank">{{ data.artUrl }}</a>
        </el-col>
      </el-row>
      <el-row class="textcontent">
        <div ref="artContent" :class="isopflag ? 'heightguding': 'heightaotu'">{{ data.artContent }}</div>
        <div class="isexbtn" v-if="showOp">
          <button @click="isExpand">{{ isopflag ? '展开全文' : '收起全文' }}</button>
          <img src="../../../assets/image/op-jt.png" :class="isopflag == true ? '' : 'isopflagstyle'" />
        </div>
      </el-row>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ['data', 'flow'],
  data() {
    return {
      showOp: false,
      isopflag: false
    }
  },
  mounted() {
    var height = this.$refs.artContent.offsetHeight
    if (height > 120) {
      this.isopflag = true
      this.showOp = true
    }
  },
  methods: {
    isExpand() {
      this.isopflag = !this.isopflag;
    }
  }
};
</script>

<style lang="scss" scoped>
.listtitle {
  margin-top: 15px;
  margin-bottom: 20px;
  padding-bottom: 6px;
  border-bottom: 1px solid #eee;
  .txt {
    font-size: 16px;
    color: #333;
    font-weight: 600;
    display: inline-block;
    vertical-align: middle;
  }
  i {
    display: inline-block;
    width: 4px;
    height: 20px;
    background: #2d8cf0;
    vertical-align: middle;
    margin-right: 10px;
    margin-left: 10px;
  }
}
.arttitle {
  height: 22px;
  font-size: 16px;
  font-weight: 700;
  color: rgba(51, 51, 51, 1);
  margin-bottom: 10px;
}
.jichu {
  font-size: 14px;
  font-weight: 400;
  height: 25px;
  color: rgba(102, 102, 102, 1);
  span {
    color: rgba(67, 131, 228, 1);
  }
  .leibie {
    color: #1da362;
  }
}
.urlstyle {
  margin-top: 5px;
  a {
    color: #4383e4;
    word-break: break-all;
    text-align: justify;
    line-height: 25px;
  }
}
.textcontent {
  position: relative;
  margin-top: 5px;
  padding: 12px 20px;
  width: 92%;
  background: #f7f7f7;
  font-size: 14px;
  line-height: 25px;
  .heightaotu {
    margin-bottom: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 10000;
    -webkit-box-orient: vertical;
  }
  .heightguding {
    margin-bottom: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
  }
  .isexbtn {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-64%, -5px);
    button {
      border: 0;
      font-size: 14px;
      color: #6980ab;
      cursor: pointer;
      background-color: transparent;
      outline: none;
    }
    img {
      position: absolute;
      top: 4px;
    }
    .isopflagstyle {
      transform: rotateX(180deg);
    }
  }
}
</style>
