<template>
  <div class="self-table vdfase">
    <div class="setting-info">报名设置</div>
    <el-form ref="form" :model="enrollSettingForm" :inline="true" label-width="100px">
      <el-form-item label="报名人数:">
        <el-input-number v-model="enrollSettingForm.num" :min="1" :max="100000"></el-input-number>
      </el-form-item>
      <el-form-item label="开始时间:" class="left-box">
        <el-date-picker v-model="enrollSettingForm.applystarttime" type="datetime" :picker-options="applystarttime"
                        placeholder="选择开始日期" class="item"></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间:">
        <el-date-picker v-model="enrollSettingForm.applyendtime" type="datetime" :picker-options="applyendtime"
                        placeholder="选择结束日期" class="item"></el-date-picker>
      </el-form-item>
    </el-form>
    <el-table :data="enrolSettingData" stripe style="width: 96%; ">
      <el-table-column type="index" width="100" align="center"></el-table-column>
      <el-table-column prop="label" label="报名字段" width="auto" align="center"></el-table-column>
      <el-table-column label="是否需要填写" width="auto" align="center">
        <template slot-scope="scope">
          <el-radio-group v-model="scope.row.needflag" size="small">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="是否需要必填" width="auto" align="center">
        <template slot-scope="scope">
          <el-radio-group v-model="scope.row.notnullflag" size="small" :disabled="scope.row.needflag !== 1">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </template>
      </el-table-column>
      <el-table-column prop="label" width="80" align="left">
        <template slot-scope="scope">
          <el-button v-if="scope.row.isDelete" @click="delExpansionItem(scope.$index,scope.row)" size="mini">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="expansion-item">
      <span class="expansion-word">拓展项</span>
      <el-form ref="form" label-width="100px">
        <el-form-item label="拓展类型:" class="left-box">
          <el-select v-model="expansionType" placeholder="请选择">
            <el-option v-for="item in expansionOptions" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="拓展项名称:">
          <el-input v-model="expansionName" class="expansion-name" placeholder="请输入拓展项名称"></el-input>
          <el-button :disabled="isDisable" @click="addExpansionItem()">确认新增</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    name: "enrollmentSettings",
    props: {
      activityId: {
        type: String,
      }
    },
    data() {
      return {
        enrollSettingForm: {
          num: 0,
          applystarttime: "",
          applyendtime: ""
        },
        enrolSettingData: [
          {
            label: "姓名",
            value: "name",
            needflag: 0,
            notnullflag: 0
          },
          {
            label: "性别",
            value: "sex",
            needflag: 0,
            notnullflag: 0
          },
          {
            label: "手机号",
            value: "mobile",
            needflag: 0,
            notnullflag: 0
          },
          {
            label: "职业",
            value: "profession",
            needflag: 0,
            notnullflag: 0
          },
          {
            label: "公司",
            value: "company",
            needflag: 0,
            notnullflag: 0
          },
          {
            label: "职务",
            value: "post",
            needflag: 0,
            notnullflag: 0
          },
          {
            label: "备注",
            value: "remark",
            needflag: 0,
            notnullflag: 0
          }
        ],
        // 开始时间
        applystarttime: {
          disabledDate: this.checkStartTime
        },
        // 结束时间
        applyendtime: {
          disabledDate: this.checkEndTime
        },
        expansionOptions: [
          {
            value: 1,
            label: "文本"
          },
          {
            value: 2,
            label: "数字"
          },
          {
            value: 3,
            label: "邮箱"
          }
        ],
        expansionType: "",
        expansionName: "",
        exActFieldList: [],
        activityDetail: {},
        isDisable: false
      };
    },
    mounted() {
      this.getactivityDetail(this.activityId);
    },
    methods: {
      getactivityDetail(data) {
        this.$ajax.activity.getDetailSync(data).then(res => {
          this.activityDetail = res;
          let enrollmenSettingsInfo = this.activityDetail;
          if (enrollmenSettingsInfo) {
            this.enrollSettingForm.num = enrollmenSettingsInfo.num;
            this.enrollSettingForm.applystarttime = this.$utils.format.timeStampToStandardStr(
                enrollmenSettingsInfo.applystarttime
            );
            this.enrollSettingForm.applyendtime = this.$utils.format.timeStampToStandardStr(
                enrollmenSettingsInfo.applyendtime
            );
          }

          let configjson = JSON.parse(this.activityDetail.configjson);
          for (let i in configjson) {
            configjson[i].needflag = configjson[i].needflag ? 1 : 0;
            configjson[i].notnullflag = configjson[i].notnullflag ? 1 : 0
          }
          this.enrolSettingData = this.enrolSettingData.map(v => {
            v.needflag = configjson[v.value] ? configjson[v.value].needflag : v.needflag;
            v.notnullflag = configjson[v.value] ? configjson[v.value].notnullflag : v.notnullflag;
            return v
          });


          if (enrollmenSettingsInfo.exActFieldList.length !== 0) {
            enrollmenSettingsInfo.exActFieldList.forEach(item => {
              let obj = {};
              obj.label = item.name;
              obj.name = item.name;
              obj.type = item.type;
              obj.isDelete = true;
              obj.id = item.id;
              obj.aid = item.aid;
              obj.needflag = item.needflag;
              obj.notnullflag = item.notnullflag;
              this.exActFieldList.push(obj);
              this.enrolSettingData.push(obj);
            });
          }
        });
      },
      checkStartTime(time) {
        if (this.enrollSettingForm.applyendtime) {
          return (
              // time.getTime() < Date.now() - 8.64e7 ||
              time.getTime() >=
              new Date(this.enrollSettingForm.applyendtime).getTime()
          );
        } else {
          // 不能小于于当前日期  - 8.64e7则表示包当天
          // return time.getTime() < Date.now() - 8.64e7;
        }
      },
      checkEndTime(time) {
        if (this.enrollSettingForm.applystarttime) {
          return (
              // time.getTime() < Date.now() - 8.64e7 ||
              time.getTime() <=
              new Date(this.enrollSettingForm.applystarttime).getTime() - 8.64e7
          );
        } else {
          // 不能小于于当前日期  - 8.64e7则表示包当天
          // return time.getTime() < Date.now() - 8.64e7;
        }
      },
      addExpansionItem() {
        if (!this.expansionType) {
          this.$message.warning('拓展项类型不能为空！');
          return
        }
        if (!this.expansionName) {
          this.$message.warning('拓展项名称不能为空！');
          return
        }
        let obj = {
          type: this.expansionType,
          label: this.expansionName,
          name: this.expansionName,
          needflag: 1,
          notnullflag: 1,
          isDelete: true
        };

        //能否重复添加
        if (this.exActFieldList.length === 0) {
          this.exActFieldList.push(obj);
          this.enrolSettingData.push(obj);
        } else {
          var isContains = false;
          for (var i = 0; i < this.exActFieldList.length; i++) {
            if (this.exActFieldList[i].name === obj.name && this.exActFieldList[i].type === obj.type) {
              isContains = true;
              break;
            }
          }
          if (isContains == true) {
            this.$message({
              type: "warning",
              message: "不可重复添加!"
            });
            this.expansionType = ""
            this.expansionName = ""
            return
          } else {
            this.exActFieldList.push(obj);
            this.enrolSettingData.push(obj);
            this.expansionType = ""
            this.expansionName = ""
          }
        }
        this.isDisable = true
        setTimeout(() => {
          this.isDisable = false   //点击一次时隔两秒后才能再次点击
        }, 2000)
      },

      delExpansionItem(index, row) {
        this.$confirm("确认删除" + row.label + "?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
            .then(() => {
              if (row.id) {
                this.$ajax.activity.delExActField(row.id).then(res => {
                  if (res.code === 200) {
                    this.exActFieldList.splice(index, 1);
                    this.enrolSettingData.splice(index, 1);
                    this.$message({
                      type: "success",
                      message: res.msg
                    });
                  } else {
                    this.$message({
                      type: "fail",
                      message: res.msg
                    });
                  }
                });
              } else {
                this.exActFieldList.splice(index - 7, 1);
                this.enrolSettingData.splice(index, 1);
              }
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除"
              });
            });
      },


    }
  };
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

    .select {
      margin: 0 10px;

      .icon {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(218, 218, 218, 1);
        margin: 0 5px;
        vertical-align: middle;
      }

      .active {
        background: @topNavBarBgColor;
      }
    }

    .expansion-item {
      .expansion-word {
        font-size: 16px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 22px;
      }

      .el-form {
        margin-top: 30px;
      }

      .expansion-name,
      .expansion-time {
        width: 400px;
      }

      .expansion-name {
        margin-right: 10px;
      }
    }
  }
</style>
<style lang="less">
  @import "../../../../style/config";

  .vdfase {
    .el-form-item__label {
      color: @leftNavBarBgColor;
    }

    .el-table {
      margin: 0 auto;
      margin-bottom: 30px;
    }

    .el-table th {
      height: 40px;
      background: @defaultTableHeadBgColor;
      color: @defaultTableHeadColor;
      font-weight: 600;
    }

    .el-table tr {
      height: 40px;
    }

    .el-radio__inner {
      width: 12px;
      height: 12px;
      border-radius: 0;
      border: 0;
      background: rgba(218, 218, 218, 1);
    }

    .el-radio__input.is-checked .el-radio__inner {
      border: 0;
      color: @topNavBarBgColor;
    }

    .el-radio__inner::after {
      content: none;
    }

    .el-radio__input.is-checked + .el-radio__label {
      color: #606266;
    }
  }
</style>
