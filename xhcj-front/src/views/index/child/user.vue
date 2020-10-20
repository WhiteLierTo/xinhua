<template>
  <div class="user-container">
    <!-- <div class="ava-container">
      {{ $store.state.userDetail.name?$store.state.userDetail.name[0]:"" }}
    </div> -->
    <el-dropdown trigger="click" class="drop-down-container" @command="jump">
      <span class="user-name-span">
        {{ $store.state.userDetail.name }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="info">个人信息</el-dropdown-item>
        <el-dropdown-item command="password">修改密码</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="logout-container" @click="logout">
      <i class="el-icon-switch-button"></i>
      <span>退出</span>
    </div>
  </div>

</template>

<script>
  export default {
    name: "user",
    methods: {
      logout() {
        this.$utils.cookie.delete();
        this.$router.push("/login")
      },

      jump(command) {
        this.$router.push(`/person/personCenter?type=${command}`);
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../style/config";
  @import "../../../style/styles";

  .user-container {
    margin-left: auto;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 12px;

    .user-name-span {
      font-size: 12px;
    }

    .ava-container {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 10px;
      font-size: @bigFontSize;
      border: 1px solid @defaultBorderColor;
      .flexCenter();

      img {
        width: 100%;
        height: 100%;
        object-fit: scale-down;
      }
    }

    span:first-child {
      color: white;
    }

    .logout-container {
      height: 100%;
      margin-left: 30px;
      cursor: pointer;
      display: flex;
      align-items: center;
      color: white;

      i {
        font-size: 14px;
        margin-right: 6px;
        position: relative;
        top: 1px;
      }
    }
  }

  .drop-down-container {
    cursor: pointer;
  }
</style>
