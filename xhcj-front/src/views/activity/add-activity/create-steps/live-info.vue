<template>
  <div class="self-table vbhgdrg">
    <div class="setting-info">直播信息</div>
    <el-form ref="form" :model="liveForm" :inline="true" label-width="100px">
      <el-form-item label="直播地址:">
        <el-input v-model="liveForm.liveUrl" placeholder="请输入直播地址" class="live-address"></el-input>
      </el-form-item>
      <el-form-item label="开始时间:" class="left-box">
        <el-date-picker v-model="liveForm.liveStartTime" type="datetime" :picker-options="liveStartTime" placeholder="请选择直播开始时间" class="item"></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间:">
        <el-date-picker v-model="liveForm.liveEndTime" type="datetime" :picker-options="liveEndTime" placeholder="请选择直播结束时间" class="item"></el-date-picker>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "liveIfo",
  props: {
    liveId: {
      type: String,
    }
  },
  data() {
    return {
      liveForm: {
        liveUrl: "",
        liveStartTime: "",
        liveEndTime: "",
      },
      // 开始时间
      liveStartTime: {
        disabledDate: this.checkStartTime
      },
      // 结束时间
      liveEndTime: {
        disabledDate: this.checkEndTime
      }
    };
  },
  mounted() {
    this.getactivityDetail(this.liveId);
  },
  methods: {
    getactivityDetail(data) {
      this.$ajax.activity.getDetailSync(data).then(res => {
        this.liveForm = res
      });
    },
    checkStartTime(time) {
      if (this.liveForm.liveEndTime) {
        return (
          time.getTime() < Date.now() - 8.64e7 ||
          time.getTime() >= new Date(this.liveForm.liveEndTime).getTime() - 8.64e7
        );
      } else {
        // 不能小于于当前日期  - 8.64e7则表示包当天
        return time.getTime() < Date.now() - 8.64e7;
      }
    },
    checkEndTime(time) {
      if (this.liveForm.liveStartTime) {
        return (
          time.getTime() < Date.now() - 8.64e7 ||
          time.getTime() <= new Date(this.liveForm.liveStartTime).getTime() - 8.64e7
        );
      } else {
        // 不能小于于当前日期  - 8.64e7则表示包当天
        return time.getTime() < Date.now() - 8.64e7;
      }
    }
  }
};
</script>
<style lang="less" scoped >
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
<style lang="less" >
@import "../../../../style/config";
.vbhgdrg {
  .el-form {
    width: 75%;
  }
  .el-form-item__label {
    color: @leftNavBarBgColor;
  }
}
</style>