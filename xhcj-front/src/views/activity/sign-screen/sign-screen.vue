<template>
  <div class="screen qff">
    <h1 v-show="title">【{{title}}签到目录】</h1>
    <ul>
      <li class="card" v-for="(item,index) in screenList" :key="index">
        <img v-if="item.headImage" :src="item.headImage" />
        <img v-else src="../../../assets/avtor.png" />
        <dl>
          <dt>{{item.name}}</dt>
          <dd>座位：{{item.seat}}</dd>
        </dl>
        <div class="card-bottom">{{item.signintime}}</div>
      </li>
    </ul>
    <div class="nodata" v-show="screenList.length===0">
      <img src="../../../assets/nodata.png" />
      <p>没有查到任何数据</p>
    </div>
    <!-- <vue-ueditor-wrap v-model="value" :config="myConfig"></vue-ueditor-wrap>
    <el-button @click="getContent">提交</el-button>
    <div v-html="table"></div>-->
  </div>
</template>

<script>
import VueUeditorWrap from "vue-ueditor-wrap";

export default {
  name: "signScreen",
  components: {
    VueUeditorWrap
  },
  data() {
    return {
      value: "",
      myConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 350,
        // 初始容器宽度
        initialFrameWidth: 1024,
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        // serverUrl: "http://35.201.165.105:8000/controller.php",
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        UEDITOR_HOME_URL: "/ueditor/"
      },
      screenList: [], //投屏列表
      title: "",
      table:
        '<table><tbody><tr class="firstRow"><td width="246" valign="top" style="border-width: 1px; border-style: solid; word-break: break-all;">姓名</td><td width="246" valign="top" style="border-width: 1px; border-style: solid; word-break: break-all;">年纪</td><td width="246" valign="top" style="border-width: 1px; border-style: solid; word-break: break-all;">性别</td><td width="246" valign="top" style="border-width: 1px; border-style: solid; word-break: break-all;">地址</td></tr><tr><td width="246" valign="top" style="border-width: 1px; border-style: solid; word-break: break-all;">李超</td><td width="246" valign="top" style="border-width: 1px; border-style: solid; word-break: break-all;">25</td><td width="246" valign="top" style="border-width: 1px; border-style: solid; word-break: break-all;">男</td><td width="246" valign="top" style="border-width: 1px; border-style: solid; word-break: break-all;">江苏南京</td></tr></tbody></table><p><br/></p>'
    };
  },
  mounted() {
    const id = this.$route.query.id;
    // const id = "4a627d11-4fc4-4c5e-a0cb-944d30c66e8c";
    this.getScreenList(id);
  },
  methods: {
    getContent() {
    },
    getScreenList(id) {
      this.$ajax.activity.getSiginInScreenList(id).then(res => {
        if (res.data.list) {
          this.screenList = res.data.list;
          this.title = res.data.title;
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
@import "../../../style/config";

.screen {
  position: relative;
  h1 {
    text-align: center;
    font-size: 32px;
    padding-top: 32px;
    color: @defaultTileColor;
    width: 60%;
    margin: 0 auto;
  }
  ul {
    list-style-type: none;
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
  }
  li {
    width: 192px;
    height: 236px;
    background: #fff;
    margin-bottom: 41px;
    border-radius: 6px;
  }
  .card {
    margin-left: 37px;
    text-align: center;
    img {
      width: 90px;
      height: 90px;
      margin: 0 auto;
      display: block;
      margin-top: 21px;
    }
    dt {
      color: @defaultTileColor;
      font-size: @bigFontSize;
      padding-top: 18px;
    }
    dd {
      padding-top: 10px;
    }
    .card-bottom {
      width: 100%;
      height: 46px;
      background: rgba(67, 131, 228, 0.07);
      line-height: 46px;
      margin-top: 10px;
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
      color: #999;
    }
  }
  .nodata {
    width: 245px;
    height: 185px;
    margin: 150px auto 0;
    p {
      text-align: center;
      color: #6f6f6f;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
<style lang="less">
.qff {
  .el-button {
    background: transparent;
  }
}
</style>
