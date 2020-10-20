<template>
  <div class="menu-container">
    <div class="theme-list-container">
      <div
        class="theme-cell-container"
        v-for="(theme,index) in themes"
        :class="{active:theme.isEfficient}"
        :key="index"
      >
        <img :src="theme.picUrl" alt class="theme-pic" />
        <div class="title">{{ theme.themeName }}</div>
        <div class="time-line">
          <span>
            生效时间: {{ $utils.format.timeStampToStandardStr(theme.takeEffectStartTime) }}
            <span style="margin-left: 10px;">至</span>
          </span>
          <br />
          <span
            style="margin-left: 34px;"
          >{{ $utils.format.timeStampToStandardStr(theme.takeEffectEndTime) }}</span>
        </div>
        <div class="bts-row-container">
          <el-button
            type="primary"
            round
            style="margin-right: 20px"
            v-if="!theme.isEfficient"
            :disabled="!theme.canImmediateEffect"
            @click="onImmediateEffect(theme.id)"
          >立即生效</el-button>
          <el-button type="primary" round style="margin-right: 20px" disabled v-else>生效中</el-button>
          <el-button
            type="primary"
            round
            plain
            v-if="!theme.isEfficient"
            @click="modifyTime(theme)"
          >修改时间</el-button>
          <div class="isEfficient-bt" v-else>修改时间</div>
        </div>
      </div>
    </div>
    <dialogTemplate
      title="修改时间"
      :width="680"
      v-if="isShowModifyTime"
      :onClose="onTimeModifyClose"
      :onSubmit="onTimeModifySubmit"
    >
      <div style="height: 385px;">
        <el-date-picker
          v-model="modifyTimeList"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 100%"
        ></el-date-picker>
      </div>
    </dialogTemplate>
  </div>
</template>

<script>
export default {
  name: "menu-entry",
  data() {
    return {
      themes: [],
      themesTypeToPic: {
        0: require("../../assets/theme/moren.png"), // 默认
        1: require("../../assets/theme/xinian.png"), // 新年
        2: require("../../assets/theme/gongjiri.png"), // 黑白
        3: require("../../assets/theme/duanwu.png"), // 端午
        4: require("../../assets/theme/guoqing.png"), // 国庆
      },
      isShowModifyTime: false,
      modifyThemeId: "",
      modifyTimeList: [],
    };
  },

  mounted() {
    this.getThemeList();
  },
  methods: {
    getThemeList() {
      return this.$ajax.menu
        .themeList({
          pageNum: 1,
          pageSize: 1000,
        })
        .then((res) => {
          if (res.code !== 200) return;
          let themes = res.rows;
          this.themes = themes
            .map((theme) => {
              theme.picUrl = this.themesTypeToPic[theme.themeType];
              theme.canImmediateEffect = new Date() < theme.takeEffectEndTime;
              if (theme.picUrl) return theme;
            })
            .filter(Boolean);
        });
    },

    onImmediateEffect(id) {
      this.$ajax.menu.themeEffect(id).then((res) => {
        if (res.code !== 200) {
          this.$message.error("更新失败");
        }
        this.getThemeList();
      });
    },

    modifyTime(theme) {
      this.modifyThemeId = theme.id;
      this.modifyTimeList = [
        theme.takeEffectStartTime,
        theme.takeEffectEndTime,
      ];
      this.isShowModifyTime = true;
    },

    onTimeModifyClose() {
      this.isShowModifyTime = false;
    },

    async onTimeModifySubmit() {
      let res = await this.$ajax.menu.updateTime({
        takeEffectStartTime: +new Date(this.modifyTimeList[0]),
        takeEffectEndTime: +new Date(this.modifyTimeList[1]),
        id: this.modifyThemeId,
      });
      if (res.code !== 200) {
        this.$message.error(`修改失败,${res.msg}`);
      }
      if (res.code === 200) {
        await this.getThemeList();
        this.$message.success("修改成功");
        this.modifyTimeList = [];
        this.modifyThemeId = "";
      }

      return res.code === 200;
    },
  },
};
</script>

<style scoped lang="less">
@import "../../style/config.less";

.menu-container {
  width: 100%;
  height: 100%;

  .theme-list-container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    .theme-cell-container {
      margin-right: 30px;
      margin-bottom: @defaultPaddingX;

      .theme-pic {
        width: 277px;
        height: 493px;
        border: 2px solid transparent;
      }

      .title {
        width: 100%;
        color: rgba(51, 51, 51, 1);
        text-align: center;
        line-height: 50px;
        font-size: 24px;
      }

      .time-line {
        font-size: 14px;
        font-weight: 300;
        line-height: 25px;
        text-align: center;
      }

      .bts-row-container {
        margin-top: 10px;
        padding: 0 20px;
        justify-content: center;
        display: flex;

        .isEfficient-bt {
          width: 80px;
          height: 32px;
          color: #999999;
          border: 1px solid rgba(153, 153, 153, 1);
          border-radius: 20px;
          font-size: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    .active {
      .theme-pic {
        border: 2px solid @defaultBlueClick;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      }
    }
  }
}


</style>
