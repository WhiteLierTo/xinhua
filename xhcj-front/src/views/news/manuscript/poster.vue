<template>
  <dialogTemplate :onClose="closeDialog" title="生成海报" ref="dialog" width="550">
    <div class="poster-container" v-loading="isLoading">
      <div class="operations-container">
        <el-button
          class="bt"
          :disabled="textWithPicDisable"
          style="margin-top: auto;"
          @click="createPoster(2)"
        >生成图文海报</el-button>
        <el-button class="bt" :disabled="onlyTextDisable" @click="createPoster(1)">生成纯文本海报</el-button>
        <div class="tip">
          <p>备注:</p>
          <p>1.单图、三图、无图海报只能生成纯文本海报</p>
          <p>2.活动和视频稿件只能生成图文海报</p>
        </div>
        <el-button
          type="primary"
          style="margin-top: 50px;width: 100%;"
          @click="savePoster"
          :disabled="!file"
        >保存</el-button>
      </div>
      <div class="poster-img-container">
        <img :src="posterUrl" alt v-if="posterUrl" />
        <img src="../../../assets/nodata.png" style="width: 100px" alt v-else />

        <div class="poster-img-delete-container" v-if="posterUrl">
          <i class="el-icon-zoom-in" @click="isShowMask = true" style="margin-right: 10px;"></i>
          <i class="el-icon-delete" @click="deletePoster"></i>
        </div>
      </div>
      <div class="mask-container" @click="isShowMask = false" v-if="isShowMask">
        <img :src="posterUrl" alt draggable="false" />
      </div>
    </div>
    <div slot="foot"></div>
  </dialogTemplate>
</template>

<script>
export default {
  name: "posterImg",
  props: {
    article: Object,
    onClose: Function,
  },
  data() {
    return {
      noDataUrl: require("../../../assets/nodata.png"),
      isShowMask: false,
      posterDetail: {},
      posterUrl: "",
      isLoading: true,
      file: null,
    };
  },
  computed: {
    onlyTextDisable() {
      // 活动和视频不能生成纯文海报
      return this.article.articleType === 5 || this.article.articleType === 7;
    },

    textWithPicDisable() {
      // 只有大图文章稿件可以生成图文海报
      if (this.article.articleType && this.article.articleType > 4) {
        // 非文章稿件,可以生成图文
        return false;
      }
      return this.article.picType !== 2;
    },
  },

  async mounted() {
    await this.getPosterImg();
    this.isLoading = false;
  },

  methods: {
    async getPosterImg() {
      let path = "";
      switch (this.article.articleType) {
        case 5:
          path = "/video/instance";
          break;
        case 6:
          path = "/live/instance";
          break;
        case 7:
          path = "/integrate/relevance/activity";
          break;
        case 8:
          path = "/integrate/relevance/channelSpecial";
          break;
        default:
          path = "/article/instance";
      }

      this.posterDetail = await this.$ajax.news.manuscript.getPosterDetail(
        path,
        this.article.rid || this.article.id
      );
      this.posterUrl = this.posterDetail.posterUrl;
    },

    closeDialog() {
      this.onClose && this.onClose();
    },

    deletePoster() {
      this.$confirm("确定删除海报吗?删除后可以重新生成", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
      })
        .then(async () => {
          let [ok, data] = await this.$ajax.news.manuscript.savePoster({
            ...this.article,
            posterUrl: "",
          });
          if (ok) {
            this.$message.success("删除成功");
            this.posterUrl = "";
          } else {
            this.$message.error(`删除失败${data}`);
          }
        })
        .catch(() => {});
    },

    async createPoster(type) {
      let posterType;
      if (this.article.articleType === 7) {
        posterType = 3;
      } else {
        posterType = type;
      }

      // 1. 纯文 2. 图文  3. 活动
      return this.$utils.poster.drawPoster(
        {
          ...this.posterDetail,
          listPicOne: this.article.listPicOne,
        },
        this.article.articleType,
        posterType,
        (file) => {
          this.file = file;
          this.posterUrl = URL.createObjectURL(file);
        }
      );
    },

    async savePoster() {
      let uploadFormData = new FormData();
      uploadFormData.append("file", this.file);
      let res = await this.$ajax.gadgets.uploadFileSync(
        uploadFormData,
        "/activity/upload"
      );
      let posterUrl = res.url;

      let [ok, data] = await this.$ajax.news.manuscript.savePoster({
        ...this.article,
        posterUrl,
      });
      if (ok) {
        this.$message.success("保存成功");
      } else {
        this.$message.error(`生成失败${data}`);
      }
    },
  },
};
</script>

<style scoped lang="less">
.poster-container {
  height: 336px;
  display: flex;

  .operations-container {
    flex: 1;
    overflow: hidden;
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    padding: 0 3%;

    .bt {
      width: 100%;
      margin: 0 auto 30px;
    }

    .tip {
      font-size: 12px;
      color: #e4a33d;
      line-height: 18px;
    }
  }

  .poster-img-container {
    width: 189px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &:hover {
      .poster-img-delete-container {
        display: flex;
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: scale-down;
    }

    .poster-img-delete-container {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.3);
      display: none;
      align-items: center;
      justify-content: center;
      animation: slowShow 0.4s;

      i {
        color: white;
        font-size: 24px;
        cursor: pointer;
      }
    }
  }

  .mask-container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: scale-down;
    }
  }
}

@keyframes slowShow {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
