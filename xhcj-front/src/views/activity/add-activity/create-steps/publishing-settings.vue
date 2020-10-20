<template>
  <div class="self-table derfewtg">
    <div class="setting-info">发布设置</div>
    <el-form ref="form" :model="publishForm" :inline="true" label-width="120px">
      <el-form-item label="是否发布至首页:">
        <template>
          <el-radio-group :disabled="!canPush" v-model="publishForm.isPushIndex" size="small">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: "publishSettings",
    props: {
      publishId: {
        type: String,
      }
    },
    data() {
      return {
        publishForm: {
          isPushIndex: "0"
        },

        canPush: false
      }
    },
    mounted() {
      this.getactivityDetail(this.publishId);
    },
    methods: {
      getactivityDetail(data) {
        this.$ajax.activity.getDetailSync(data).then(res => {
          this.canPush = !!res.contentimgpath;
          if (res.isPushIndex) {
            this.publishForm.isPushIndex = res.isPushIndex === 1 ? "1" : "0";
          }
        });
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../../../style/config";

  .self-table {
    .setting-info {
      font-size: 16px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      line-height: 22px;
      margin-bottom: 20px;
    }

    .setting-info:before {
      content: "";
      display: inline-block;
      width: 4px;
      height: 20px;
      background-color: @topNavBarBgColor;
      vertical-align: bottom;
      margin-right: 10px;
    }

    .live-address {
      width: 910px;
    }

    .item {
      width: 400px;
    }
  }
</style>
<style lang="less">
  @import "../../../../style/config";

  .derfewtg {
    .el-form {
      width: 75%;
    }

    .el-form-item__label {
      color: @leftNavBarBgColor;
    }
  }
</style>
