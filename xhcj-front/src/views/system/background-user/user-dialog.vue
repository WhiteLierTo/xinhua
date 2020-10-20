<template>
  <dialogTemplate ref="dialogTemplate" :onClose="onClose" :onSubmit="onSubmit" :title="id?'用户修改':'用户新增'">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" style="height: 57vh;">

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
          <el-form-item label="登录密码" prop="pwd" class="pwd">
            <el-input type="password" v-model="form.pwd" placeholder="请输入登录密码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="重复密码" prop="rePwd" class="repwd">
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
          <el-form-item label="账号状态" prop="state">
            <el-select v-model="form.state" placeholder="请选择账号状态" style="width:100%">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="是否记者" prop="state">
            <el-radio v-model="form.isReporter" :label="0">否</el-radio>
            <el-radio v-model="form.isReporter" :label="1">是</el-radio>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="角色">
            <el-select multiple v-model="form.roleIds" placeholder="请选择角色" style="width:100%" class="select-roles">
              <el-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="所属组织" prop="organizeId">
            <treeselect v-model="form.organizeId" :options="organizeOptions" :show-count="true" placeholder="请选择所属组织" />
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
  props: {
    onClose: Function,
    id: String,
    isSelectReporter: {
      type: Boolean,
      default: false
    },
  },
  // props: ["onClose", "id"],
  components: { Treeselect },
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
        callback()
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
        roleIds: [],
        organizeId: null,
        state: "0",
        isReporter: this.isSelectReporter ? 1 : 0
      },

      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        loginName: [
          { required: true, message: "请输入登录名", trigger: "blur" }
        ],
        mobile: [{ validator: validPhone, trigger: "blur" }],
        pwd: [{ required: true, validator: validatePass, trigger: "blur" }],
        rePwd: [{ required: true, validator: validatePass2, trigger: "blur" }],
        organizeId: [{ required: true, message: "请选择所属组织", trigger: "change" }],
        state: [
          { required: true, message: "请选择账号状态", trigger: "change" }
        ]
      },
      organizeOptions: [],
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
      roleOptions: [],
      value: ""
    };
  },
  async mounted() {
    this.getOrganizeTree()
    this.getRoleList()
    if (this.id) {
      await this.getUserDetail()
    }
  },

  methods: {
    //详情
    async getUserDetail() {
      let res = await this.$ajax.system.getUserDetail(this.id);
      this.form = res;
      if (res) {
        if (res.state === 0) res.state = "0"
        if (res.state === 1) res.state = "1"
        if (res.state === 2) res.state = "2"
        this.form = res;
      } else {
        this.$message.error("数据查询失败");
      }
    },
    //获取部门树
    getOrganizeTree() {
      const data = {
        // state: 0,
        isTreeSelect: 1
      };
      this.$ajax.system.getOrganizeList(data).then(res => {
        this.organizeOptions = res.data;
      });
    },
    //角色
    async getRoleList() {
      const data = { state: 0 };
      this.$ajax.system.getRoleList(data).then(res => {
        res.data.forEach(item => {
          const obj = {};
          obj.value = item.id
          obj.label = item.name
          this.roleOptions.push(obj)
        });

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
            this.$ajax.system.updateUser(this.form).then(res => {
              if (res.code === 200) {
                this.$message.success(res.msg)
                this.$refs.dialogTemplate.closeSelf()
                flag = true
              } else {
                this.$message.error(res.msg);
              }
            });

          } else {
            this.$ajax.system.createUser(this.form).then(res => {
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

  }
}


</script>

<style lang="less" scoped>
// .pwd:before,
// .repwd:before {
//   position: absolute;
//   left: 0;
//   top: 10px;
//   content: "*";
//   color: #f56c6c;
//   margin-right: 4px;
// }

// .repwd:before {
//   left: 50.5%;
// }

// .select-roles .sel-select-dropdown__wrap {
//   overflow: hidden;
// }
</style>
