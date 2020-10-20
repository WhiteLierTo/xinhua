<template>
  <div class="self-form qwwqwqwq">
    <div class="base-info">频道{{id?'编辑':'新增'}}</div>
    <el-form ref="channalForm" :model="channalForm" :rules="rules" label-width="120px">
      <el-form-item label="频道名称:" prop="name">
        <el-input v-model="channalForm.name" placeholder="请输入频道名称"></el-input>
      </el-form-item>
      <el-form-item label="关键词:" prop="keyword">
        <el-input v-model="channalForm.keyword" placeholder="关键词之间请用英文半角符号间隔"></el-input>
      </el-form-item>
      <el-form-item label="描述:" prop="description">
        <el-input type="textarea" v-model="channalForm.description" :rows="6" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="客户端是否显示:" prop="displayFlag">
        <el-radio-group v-model="channalForm.displayFlag">
          <el-radio :label="1">显示</el-radio>
          <el-radio :label="0">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否展示快讯:" prop="isShowNewflash">
        <el-radio-group v-model="channalForm.isShowNewflash">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否固定位置:" prop="isFixed">
        <el-radio-group v-model="channalForm.isFixed">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div class="btn">
      <el-button @click="cancel()">取消</el-button>
      <el-button type="primary" @click="saveHandle">保存</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    name: "",
    data() {
      return {
        channalForm: {
          name: "",
          keyword: "",
          displayFlag: 1,
          description: "",
          isShowNewflash: 0,
          isFixed: 0
        },
        id: "",
        rules: {
          name: [{required: true, message: "请输入频道名称", trigger: "blur"}]
        }
      };
    },
    inject: ["modifyLastBreadcrumbLabel"],
    mounted() {
      this.id = this.$route.query.id;
      if (this.id) {
        this.$ajax.news.channel.channelDetail(this.id).then(res => {
          this.channalForm = res.data;
        });
      } else {
        this.modifyLastBreadcrumbLabel("频道新增")
      }
    },
    methods: {
      cancel() {
        for (let i in this.channalForm) {
          this.channalForm[i] = "";
        }
        this.$router.go(-1);
      },

      async saveHandle() {

        let nameRes = await this.$ajax.news.channel.checkName(this.channalForm.name, this.channalForm.id);
        if (nameRes.code !== 200) {
          this.$message.error("频道名字重复,请更换");
          return
        }

        this.$refs.channalForm.validate(valid => {
          if (valid) {
            if (this.id) {
              this.$ajax.news.channel.editChannel(this.channalForm).then(res => {
                if (res.code === 200) {
                  this.$message.success("修改成功");
                  this.$router.go(-1);
                } else {
                  this.$message.error(res.msg);
                }
              });
            } else {
              this.$ajax.news.channel.addChannel(this.channalForm).then(res => {
                if (res.code === 200) {
                  this.$message.success("新增成功");
                  this.$router.go(-1);
                } else {
                  this.$message.error(res.msg);
                }
              });
            }
          }
        });
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

    .btn {
      margin: 30px 100px;
    }
  }
</style>
<style lang="less">
  @import "../../../style/config.less";
  @import "../../../style/styles";

  .qwwqwqwq {
    .el-form {
      width: 700px;
    }

    .el-form-item__label {
      color: @leftNavBarBgColor;
    }

    .el-radio {
      width: 100px;
    }
  }
</style>
