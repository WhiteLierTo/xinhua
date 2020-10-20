<template>
  <div
      v-if="isExternal"
      :style="styleExternalIcon"
      class="svg-external-icon svg-icon"
      v-on="$listeners"
  />
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName"/>
  </svg>
</template>

<script>
  export default {
    name: "SvgIcon",
    props: {
      iconClass: {
        //图标类名
        type: String,
        required: false
      },
      className: {
        //图标名称
        type: String,
        default: ""
      }
    },
    mounted() {
    },
    computed: {
      isExternal() {
        return this.$utils.validate.isExternal(this.iconClass);
      },
      iconName() {
        return `#icon-${this.iconClass}`;
      },
      svgClass() {
        if (this.className) {
          return "svg-icon " + this.className;
        } else {
          return "svg-icon";
        }
      },
      styleExternalIcon() {
        return {
          mask: `url(${this.iconClass}) no-repeat 50% 50%`,
          "-webkit-mask": `url(${this.iconClass}) no-repeat 50% 50%`
        };
      }
    }
  };
</script>

<style scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    margin-top: 5px;
  }

  .svg-external-icon {
    background-color: currentColor;
    mask-size: cover !important;
    display: inline-block;
  }
</style>
