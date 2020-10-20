<template>
  <dialogTemplate ref="dialogTemplate" :onClose="onClose" :onSubmit="onSubmit" :title="id?'用户修改':'用户新增'">
    <el-form ref="form" :model="form" :rules="rules" label-width="90px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="form.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="登录名" prop="loginName">
            <el-input v-model="form.loginName" placeholder="请输入登录名"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="!id">
        <el-col :span="12">
          <el-form-item label="登录密码" prop="pwd">
            <el-input type="password" v-model="form.pwd" placeholder="请输入登录密码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="重复密码" prop="rePwd">
            <el-input type="password" v-model="form.rePwd" placeholder="请输入重复密码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="手机号码" prop="mobile">
            <el-input v-model="form.mobile" placeholder="请输入手机号码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="email" :rules="[
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                  ]">
            <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="角色">
            <el-select v-model="form.roleNames" placeholder="请选择角色" style="width:100%">
              <el-option v-for="item in roleOptions" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="标签">
            <el-select multiple v-model="form.tagIds" placeholder="请选择标签" style="width:100%">
              <el-option v-for="item in tagOptions" :key="item.id" :label="item.tagName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>

        <el-col :span="12">
          <el-form-item label="账号状态">
            <el-select v-model="form.state" placeholder="请选择账号状态" style="width:100%">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证姓名">
            <el-input v-model="form.idName" placeholder="请输入身份证姓名"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>

        <el-col :span="12">
          <el-form-item label="公司名称">
            <el-input v-model="form.company" placeholder="请输入公司名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="id">
        <el-col :span="12">
          <el-form-item label="微信">
            <div v-if="form.wxInfo">
              <span>{{form.wxInfo}}</span>
              <span class="clearBinding" @click="clearWXBinding">解除绑定</span>
            </div>
            <div v-else>
              <span class="noBinding">未绑定</span>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="QQ">
            <div v-if="form.qqInfo">
              <span>{{form.qqInfo}}</span>
              <span class="clearBinding" @click="clearQQBinding">解除绑定</span>
            </div>
            <div v-else>
              <span class="noBinding">未绑定</span>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="个人简介">
            <el-input v-model="form.meno" type="textarea" :rows="4" placeholder="请输入个人简介"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </dialogTemplate>
</template>

<script>
  import Treeselect from "@riophae/vue-treeselect"
  import "@riophae/vue-treeselect/dist/vue-treeselect.css";

  export default {
    name: "userDialog",
    props: ["onClose", "id"],
    components: {Treeselect},
    data() {
      let validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else {
          if (this.form.rePwd !== "") {
            this.$refs.form.validateField("rePwd");
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.form.pwd) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };
      var validPhone = (rule, value, callback) => {
        if (!value) {
          callback(new Error("请输入手机号码"))
        } else if (!this.$utils.validate.validPhone(value)) {
          callback(new Error('请输入正确的11位手机号码'))
        } else {
          callback()
        }
      }
      return {
        form: {
          name: "",
          loginName: "",
          pwd: "",
          rePwd: "",
          mobile: "",
          email: "",
          roleNames: "",
          tagIds: [],
          state: "0",
          idName: "",
          company: "",
          meno: "",
          wxInfo: "",
          qqInfo: ""
        },

        rules: {
          name: [
            {required: true, message: "请输入用户名", trigger: "blur"}
          ],
          loginName: [
            {required: true, message: "请输入登录名", trigger: "blur"}
          ],
          mobile: [{required: true, validator: validPhone, trigger: "blur"}],
          pwd: [{required: true, validator: validatePass, trigger: "blur"}],
          rePwd: [{required: true, validator: validatePass2, trigger: "blur"}],
        },

        options: [
          {
            value: "0",
            label: "正常"
          },
          {
            value: "1",
            label: "锁定"
          },
          {
            value: "2",
            label: "禁用"
          }
        ],

        roleOptions: [
          {
            value: "主持人",
            label: "主持人"
          },
          {
            value: "主播",
            label: "主播"
          },

        ],
        tagOptions: [],

      };
    },
    async mounted() {
      this.getTagList()
      if (this.id) {
        await this.getUserDetail()
      }
    },
    methods: {
      //详情
      async getUserDetail() {
        let res = await this.$ajax.appUser.getUserDetail(this.id);
        if (res) {
          if (res.state === 0) res.state = "0"
          if (res.state === 1) res.state = "1"
          if (res.state === 2) res.state = "2"
          this.form = res;
        } else {
          this.$message.error("数据查询失败");
        }
        this.form = res;
        this.form.wxInfo = res.wxInfo
        this.form.qqInfo = res.qqInfo
      },
      // 标签
      getTagList() {
        this.$ajax.appUser.getTagList().then(res => {
          this.tagOptions = res.rows
        });
      },
      onSubmit() {
        if (this.submitLoading) return;
        let flag;
        this.submitLoading = true;
        this.$refs.form.validate(async valid => {
          if (valid) {
            this.form.state = parseInt(this.form.state)
            if (this.id) {
              this.$ajax.appUser.updateUser(this.form).then(res => {
                if (res.code === 200) {
                  this.$message.success(res.msg)
                  this.$refs.dialogTemplate.closeSelf()
                  flag = true
                } else {
                  this.$message.error(res.msg);
                }
              });

            } else {
              this.$ajax.appUser.createUser(this.form).then(res => {
                if (res.code === 200) {
                  this.$message.success(res.msg)
                  this.$refs.dialogTemplate.closeSelf()
                  flag = true
                } else {
                  this.$message.error(res.msg);
                }
              });
            }
          }
          this.submitLoading = false;
          return flag
        })

      },
      // 解绑微信
      clearWXBinding() {
        this.form.wxInfo = ""
      },
      // 解绑QQ
      clearQQBinding() {
        this.form.qqInfo = ""
      }
    }
  }


</script>

<style lang="less" scoped>
  @import "../../../style/config";
  @import "../../../style/styles";

  .clearBinding,
  .noBinding {
    color: @defaultBlueClick;
    margin-left: 5px;
  }

  .clearBinding {
    cursor: pointer;
  }
</style>
