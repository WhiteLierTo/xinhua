<template>
  <div class="create-container">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="活动基本信息"></el-step>
      <el-step title="报名设置"></el-step>
      <el-step title="直播信息"></el-step>
      <el-step title="发布设置"></el-step>
    </el-steps>
    <div class="active-info-management">
      <essentialInfo ref="essentialInfo" :aid="aid" v-if="active===0" />
      <enrollmenSettings ref="enrollmenSettings" :activityId="activityId" v-if="active===1" />
      <liveInfo ref="liveInfo" :liveId="activityId" v-if="active===2" />
      <publishingSettings ref="publishingSettings" :publishId="activityId" v-if="active===3" />
      <div class="btn" v-if="active===3&&isShowlog">
        <el-button class="next-step" @click="previous">上一步</el-button>
        <el-button type="primary" class="next-step" @click="saveActivityInfo">保存</el-button>
        <el-button @click="publishInfo">发布</el-button>
        <el-button
          type="primary"
          v-allow="'news:articleList:genPoster'"
          plain
          @click="showPoster"
        >生成海报</el-button>
        <el-button class="next-step" @click="showLogDialog">日志明细</el-button>
      </div>
      <div class="btn" v-else>
        <el-button class="next-step" @click="previous" v-if="active!==0">上一步</el-button>
        <el-button type="primary" class="next-step" @click="saveActivityInfo">保存</el-button>
        <el-button class="next-step" @click="next" v-if="active!==3">下一步</el-button>
        <el-button class="next-step" @click="publishInfo" v-if="active===3">发布</el-button>
        <el-button
          type="primary"
          v-allow="'news:articleList:genPoster'"
          plain
          v-if="active===3"
          @click="showPoster"
        >生成海报</el-button>
      </div>
    </div>
    <dialogTemplate
      title="日志明细"
      v-if="showDialog"
      :onClose="()=>{this.showDialog=false}"
      :width="width"
    >
      <div slot="foot"></div>
      <logDetail />
    </dialogTemplate>
    <posterImg v-if="isShowPoster" :onClose="onPosterImgClose" :article="posterArticle" />
  </div>
</template>

<script>
import essentialInfo from "./create-steps/essential-info";
import enrollmenSettings from "./create-steps/enrollment-settings";
import liveInfo from "./create-steps/live-info";
import publishingSettings from "./create-steps/publishing-settings";
import logDetail from "./create-steps/log-detail";
import posterImg from "../../news/manuscript/poster";

export default {
  name: "add",
  components: {
    essentialInfo,
    enrollmenSettings,
    liveInfo,
    publishingSettings,
    logDetail,
    posterImg,
  },
  data() {
    return {
      active: 0,
      aid: "",
      activityId: "",
      showDialog: false,
      isShowlog: false,
      width: window.innerWidth * 0.6,
      startdate: "",
      enddate: "",

      isShowPoster: false,
      posterArticle: {},
    };
  },
  mounted() {
    this.activityId = this.$route.query.id;
    if (this.activityId) {
      this.isShowlog = true;
    }
  },

  methods: {
    next() {
      if (this.active === 0) {
        if (this.activityId) this.editEssebtialInfo();
        else {
          this.submitEssebtialInfo();
        }
      } else if (this.active === 1) {
        this.submitEnrollSetting();
      } else if (this.active === 2) {
        this.submitLiveInfo();
      } else if (this.active === 3) {
        this.submitPublicInfo();
      }
    },
    previous() {
      if (this.active == 0) {
        this.active = 0;
      } else {
        this.active--;
      }
    },
    // 保存
    saveActivityInfo() {
      let isSave = true;
      if (this.active === 0) {
        if (this.activityId) this.editEssebtialInfo(isSave);
        else {
          this.submitEssebtialInfo(isSave);
        }
      } else if (this.active === 1) {
        this.submitEnrollSetting(isSave);
      } else if (this.active === 2) {
        this.submitLiveInfo(isSave);
      } else if (this.active === 3) {
        this.submitPublicInfo(isSave);
      }
    },
    //发布
    publishInfo() {
      let publishForm = this.$refs.publishingSettings.publishForm;
      let data = {
        id: this.activityId,
        isPushIndex: publishForm.isPushIndex,
        state: "1",
        finishedStep: this.active + 1,
      };
      this.$ajax.activity.editActivity(data).then((res) => {
        if (res.code == 200) {
          this.active = 3;
          this.$message({
            type: "success",
            message: "发布成功",
          });
          this.$router.push("/activity/info");
        }
      });
    },

    // 活动基本信息（新增/保存）
    submitEssebtialInfo(isSave) {
      this.$refs.essentialInfo.validForm();
      if (this.$refs.essentialInfo.validFlag) {
        let addActivityForm = this.$refs.essentialInfo.addActivityForm;
        addActivityForm.startdate = +new Date(addActivityForm.startdate);
        addActivityForm.enddate = +new Date(addActivityForm.enddate);
        this.startdate = addActivityForm.startdate;
        this.enddate = addActivityForm.enddate;
        if (addActivityForm.startdate >= addActivityForm.enddate) {
          this.$message({
            type: "warning",
            message: "开始时间不能早于或等于结束时间！",
          });
          return;
        }
        this.$ajax.activity.newActivity(addActivityForm).then((res) => {
          if (res.code == 200) {
            this.aid = res.data;
            this.activityId = res.data;
          }
          if (isSave) {
            this.active = 0;
            this.$message({
              type: "success",
              message: "保存成功",
            });
          } else {
            this.active++;
          }
        });
      }
    },

    // 活动基本信息（修改/保存）
    editEssebtialInfo(isSave) {
      this.$refs.essentialInfo.validForm();
      if (this.$refs.essentialInfo.validFlag) {
        let addActivityForm = this.$refs.essentialInfo.addActivityForm;
        addActivityForm.id = this.activityId;
        addActivityForm.finishedStep = this.active + 1;
        addActivityForm.startdate = +new Date(addActivityForm.startdate);
        addActivityForm.enddate = +new Date(addActivityForm.enddate);
        this.startdate = addActivityForm.startdate;
        this.enddate = addActivityForm.enddate;
        if (addActivityForm.startdate >= addActivityForm.enddate) {
          this.$message({
            type: "warning",
            message: "开始时间不能早于或等于结束时间！",
          });
          return;
        }
        this.$ajax.activity.editActivity(addActivityForm).then((res) => {
          if (isSave) {
            this.active = 0;
            this.$message({
              type: "success",
              message: "保存成功",
            });
          } else {
            this.active++;
          }
        });
      }
    },
    //  报名设置数据（新增）
    submitEnrollSetting(isSave) {
      let enrollSettingForm = this.$refs.enrollmenSettings.enrollSettingForm;
      enrollSettingForm.applystarttime = +new Date(
        enrollSettingForm.applystarttime
      );
      enrollSettingForm.applyendtime = +new Date(
        enrollSettingForm.applyendtime
      );

      if (enrollSettingForm.applystarttime >= enrollSettingForm.applyendtime) {
        this.$message({
          type: "warning",
          message: "开始时间不能早于或等于结束时间！",
        });
        return;
      }

      // 活动起止时间
      if (
        enrollSettingForm.applystarttime > this.startdate ||
        enrollSettingForm.applyendtime > this.startdate
      ) {
        this.$message({
          type: "warning",
          message: "报名开始结束时间应早于活动起止时间！",
        });
        return;
      }

      let enrolSettingData1 = JSON.parse(
        JSON.stringify(this.$refs.enrollmenSettings.enrolSettingData)
      ).splice(0, 7);
      let configjson = {};
      let obj = {};
      enrolSettingData1.forEach((item) => {
        item.notnullflag = item.notnullflag === 1 && item.needflag === 1;
        item.needflag = item.needflag === 1;
        obj = {
          needflag: item.needflag,
          notnullflag: item.notnullflag,
        };
        configjson[item.value] = obj;
      });

      let data = {
        id: this.activityId,
        num: enrollSettingForm.num,
        applystarttime: enrollSettingForm.applystarttime,
        applyendtime: enrollSettingForm.applyendtime,
        finishedStep: this.active + 1,
        configjson: JSON.stringify(configjson),
        exActFieldList: this.$refs.enrollmenSettings.exActFieldList,
        enrolSettingData: this.$refs.enrollmenSettings.enrolSettingData,
      };

      this.$ajax.activity.editActivity(data).then((res) => {
        if (res.code === 200) {
          if (isSave) {
            this.active = 1;
            this.$message({
              type: "success",
              message: "保存成功",
            });
          } else {
            this.active++;
          }
        }
      });
    },

    //直播信息
    submitLiveInfo(isSave) {
      let liveForm = this.$refs.liveInfo.liveForm;
      liveForm.liveStartTime = +new Date(liveForm.liveStartTime);
      liveForm.liveEndTime = +new Date(liveForm.liveEndTime);
      if (liveForm.liveStartTime >= liveForm.liveEndTime) {
        this.$message({
          type: "warning",
          message: "开始时间不能早于或等于结束时间！",
        });
        return;
      }
      let data = {
        id: this.activityId,
        liveUrl: liveForm.liveUrl,
        liveStartTime: +liveForm.liveStartTime,
        liveEndTime: +liveForm.liveEndTime,
        finishedStep: this.active + 1,
      };
      this.$ajax.activity.editActivity(data).then((res) => {
        if (res.code === 200) {
          if (isSave) {
            this.active = 2;
            this.$message({
              type: "success",
              message: "保存成功",
            });
          } else {
            this.active++;
          }
        }
      });
    },

    //发布设置
    submitPublicInfo(isSave) {
      let publishForm = this.$refs.publishingSettings.publishForm;
      let data = {
        id: this.activityId,
        isPushIndex: publishForm.isPushIndex,
        finishedStep: this.active + 1,
      };
      this.$ajax.activity.editActivity(data).then((res) => {
        if (res.code === 200) {
          if (isSave) {
            this.active = 3;
            this.$message({
              type: "success",
              message: "保存成功",
            });
          } else {
            this.active = 3;
          }
        }
      });
    },

    showLogDialog() {
      this.showDialog = true;
    },

    async showPoster() {
      this.posterArticle = {
        id: this.$route.query.id,
        articleType: 7,
      };
      this.isShowPoster = true;
    },

    onPosterImgClose() {
      this.isShowPoster = false;
    },
  },
};
</script>

<style scoped lang="less">
@import "../../../style/config";

.active-info-management {
  width: 100%;
  height: 100%;
  flex: 1;
  overflow: hidden;
  padding: 20px 30px;
  background-color: white;
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  .btn {
    margin: 30px 100px;
  }
}
</style>
<style lang="less">
@import "../../../style/config";

.create-container {
  .el-step__head.is-success,
  .el-step__title.is-success {
    color: @topNavBarBgColor;
    border-color: @topNavBarBgColor;
  }
}
</style>
