<template>
  <div class="mask" :class="{maskClose:isClose}">
    <div class="dialog-template-container" :class="{close:isClose}" :style="{width:`${width}px`}">
      <slot name="head">
        <div class="head">
          <span>{{ title }}</span>
          <i class="el-icon-close close-icon" @click="closeSelf"></i>
        </div>
      </slot>
      <div class="content">
        <slot></slot>
      </div>
      <slot name="foot">
        <div class="foot" :class="{center:footAlign === 'center'}">
          <el-button type="primary" :class="{right:footAlign === 'right'}" @click="submitSelf">
            <span v-if="!loading">确定</span>
            <i class="el-icon-loading" v-else></i>
          </el-button>
          <el-button @click="closeSelf">取消</el-button>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
// TODO 当屏幕宽度过小,将消失 不知道为什么
export default {
  name: "dialogTemplate",
  props: {
    width: {
      default: "",
    },
    title: {
      default: "标题",
    },
    onClose: {
      required: true,
    },
    footAlign: {
      default: "right",
    },
    onSubmit: {
      default: () => "",
    },
    submitText: {
      default: "确定",
    },
    closeText: {
      default: "取消",
    },
  },
  data() {
    return {
      isClose: false, // 是否关闭状态,用来做动画
      loading: false, // 防抖
    };
  },
  methods: {
    closeSelf() {
      this.isClose = true;
      setTimeout(() => {
        this.onClose();
        this.isClose = false;
      }, 300);
    },

    async submitSelf() {
      this.loading = true;
      let bool = await this.onSubmit();
      this.loading = false;
      bool && this.closeSelf();
    },
  },
};
</script>

<style scoped lang="less">
@import "../../style/config";
@import "../../style/styles";

.mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1900;
  overflow: auto;
  animation: slowShow @defaultAnimationTime;
  .flexCenter();
}

.maskClose {
  animation: slowHide @defaultAnimationTime forwards;
}

@keyframes slowShow {
  from {
    background: rgba(0, 0, 0, 0);
  }
}

@keyframes slowHide {
  to {
    background: rgba(0, 0, 0, 0);
  }
}

.dialog-template-container {
  width: 750px;
  max-height: 95vh;
  overflow: hidden;
  padding: @defaultPaddingX;
  background: white;
  border-radius: 4px;
  align-items: flex-end;
  flex-shrink: 0;
  animation: showFromTop @defaultAnimationTime;
  display: flex;
  flex-direction: column;

  @media (min-width: 1400px) {
    padding: @defaultPaddingX * 2;
  }

  .head {
    font-size: @middleFontSize;
    display: flex;
    justify-content: space-between;
    color: @lightBlack;
    margin-bottom: @defaultPaddingX;
    width: 100%;
    flex-shrink: 0;

    .close-icon {
      font-size: 20px;
      cursor: pointer;
    }
  }

  .foot {
    margin-top: 40px;
    padding-right: @defaultPaddingX;
    display: flex;
    align-items: center;
    width: 100%;
    flex-shrink: 0;

    @media (min-width: 1400px) {
      padding-right: @defaultPaddingX * 2;
    }

    .right {
      margin-left: auto;
    }
  }

  .content {
    flex: 1;
    overflow: auto;
    width: 100%;
    overflow-x: hidden;
  }

  .center {
    justify-content: center;
    flex: 1;
    overflow: auto;
    border: 1px solid red;
  }
}

.close {
  animation: hideToTop @defaultAnimationTime forwards;
}

@keyframes showFromTop {
  from {
    opacity: 0;
    transform: translateY(-40px);
  }
}

@keyframes hideToTop {
  to {
    opacity: 0;
    transform: translateY(-40px);
  }
}
</style>
