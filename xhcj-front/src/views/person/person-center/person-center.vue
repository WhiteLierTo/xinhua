<template>
  <div class="self-form sadadsadsd">
    <template v-if="type==='info'">
      <div class="base-info">个人信息</div>
      <el-upload class="avatar-uploader" action :http-request="uploadFile" :show-file-list="false" accept=".jpg,.png">
        <img v-if="personForm.headImg" :src="personForm.headImg" class="avatar">
        <span class="upload-head"><i class="el-icon-edit"></i>更改头像</span>
      </el-upload>
      <el-form ref="personForm" :model="personForm" :rules="rules" label-width="100px">
        <el-form-item label="用户名称:" prop="name">
          <el-input v-model="personForm.name" placeholder="请输入用户名称"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="personForm.mobile" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email" :rules="[
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                  ]">
          <el-input v-model="personForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
      </el-form>
    </template>

    <template v-if="type==='password'">
      <div class="base-info">修改密码</div>
      <el-form ref="psdForm" :model="psdForm" :rules="psdRules" label-width="100px">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input type="password" v-model="psdForm.oldPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input type="password" v-model="psdForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input type="password" v-model="psdForm.checkPassword" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <div class="btn">
      <el-button type="primary" @click="saveHandle">保存</el-button>
    </div>
  </div>
</template>

<script>
import resourcePool from "../../news/resource/resource";
export default {
  name: "addEconnomics",
  components: {
    resourcePool
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else {
        if (this.psdForm.checkPassword !== '') {
          this.$refs.psdForm.validateField('checkPassword');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'));
      } else if (value !== this.psdForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var validPhone = (rule, value, callback) => {
      if (!value) {
        callback()
      } else if (!this.$utils.validate.validPhone(value)) {
        callback(new Error('请输入正确的11位手机号码'))
      } else {
        callback()
      }
    }
    return {
      personForm: {
        id: "",
        name: "",
        mobile: "",
        email: "",
        headImg: "",
      },
      psdForm: {
        id: "",
        oldPassword: "",
        password: "",
        checkPassword: ""
      },
      rules: {
        name: [{ required: true, message: "请输入用户名称", trigger: "blur" }],
        mobile: [{ validator: validPhone, trigger: "blur" }],
      },
      psdRules: {
        oldPassword: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
        password: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPassword: [{ required: true, validator: validatePass2, trigger: "blur" }],
      },
      type: ""
    };
  },

  mounted() {

    this.type = this.$route.query.type
    const userDetail = this.$store.state.userDetail
    this.personForm.id = userDetail.id
    this.personForm.name = userDetail.name
    this.personForm.mobile = userDetail.mobile
    this.personForm.email = userDetail.email
    this.psdForm.id = userDetail.id
    if (!userDetail.headImg) {
      this.personForm.headImg = require('../../../assets/head-img.png')
    } else {
      this.personForm.headImg = userDetail.headImg
    }
  },
  watch: {
    '$route.query.type'(newVal) {
      this.type = newVal
    }
  },
  methods: {
    uploadFile(item) {
      let fileObj = item.file;
      const form = new FormData();
      form.append("file", fileObj);
      this.$ajax.person.uploadHeadImg(form).then(res => {
        // console.log(res)
        if (res.code === 200) {
          this.personForm.headImg = res.data.url
          this.$message.success(res.msg);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 保存
    saveHandle() {
      if (this.type === "info") {
        this.$refs.personForm.validate(valid => {
          if (valid) {
            this.$ajax.person.updatePersonInfo(this.personForm).then(res => {
              if (res.code === 200) {
                this.$message.success("保存成功")
                this.$store.commit("updateUserDetail", this.personForm);
              } else {
                this.$message({
                  type: "warning",
                  message: res.msg
                });
              }
            }).catch(res => {
              this.$message({
                type: "warning",
                message: res.msg
              });
            })
          }
        })
      } else if (this.type === "password") {
        this.$refs.psdForm.validate(valid => {
          if (valid) {
            this.$ajax.person.resetPwd(this.psdForm).then(res => {
              if (res.code === 200) {
                this.$message.success("修改成功")
              } else {
                this.$message({
                  type: "warning",
                  message: res.msg
                });
              }
            }).catch(res => {
              this.$message({
                type: "warning",
                message: res.msg
              });
            })
          }
        })
      }

    },


  }
};
</script>
<style lang="less" scoped>
@import "../../../style/config.less";
@import "../../../style/styles";
.self-form {
  width: 100%;
  height: auto;
  flex: 1;
  overflow: hidden;
  padding: 20px 30px;
  background-color: white;
  display: flex;
  flex-direction: column;
  .base-info {
    font-size: 16px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 22px;
    margin-bottom: 20px;
  }

  .base-info:before {
    content: "";
    display: inline-block;
    width: 4px;
    height: 20px;
    background-color: @topNavBarBgColor;
    vertical-align: bottom;
    margin-right: 10px;
  }

  .avatar {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    border: 1px solid #ccc;
  }
  .upload-head {
    display: inline-block;
    margin-bottom: 20px;
    margin-left: 10px;
    vertical-align: middle;
    color: @topNavBarBgColor;
  }
  .btn {
    margin-left: 100px;
  }
}
</style>
<style lang="less">
@import "../../../style/config.less";
.sadadsadsd {
  .el-form {
    width: 700px;
  }
  .el-form-item__label {
    color: @leftNavBarBgColor;
  }
  .el-form-item__content,
  .el-select {
    width: 479px;
  }
  .el-dialog {
    margin-top: 2vh !important;
  }
}
</style>
