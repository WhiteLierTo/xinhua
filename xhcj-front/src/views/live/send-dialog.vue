<template>
  <div class="dfsgbvf">
    <dialogTemplate ref="dialogTemplate" :onClose="onClose" :onSubmit="onSubmit" title="直播消息发送" :width='width'>

      <div class="flexbox">

        <div class="form-box">
          <div class="title">
            直播主题：{{manuscript.title}}
          </div>
          <el-form ref="sendForm" :model="sendForm" :rules="rules" label-width="100px">
            <el-form-item label="消息内容:" prop="content">
              <el-input type="textarea" v-model="sendForm.content" :rows="6" placeholder="请输入消息内容"></el-input>
            </el-form-item>
            <el-form-item label="网站预览图:" prop="img">
              <el-select v-model="sendForm.type" placeholder="请选择资源类型" clearable @clear="clearUploadInfo" style="width: 30%">
                <el-option label="图片" value="1"></el-option>
                <el-option label="视频" value="2"></el-option>
              </el-select>
              <el-button type="primary" @click="onSubmit" size="small" v-allow="'live:chat:save'" style="float:right">
                发送
              </el-button>
              <div class="upload-box" v-if="sendForm.type === '1' ">
                <picCutting proportion="16:9" class="pic-cutting" uploadPath="/system/theme/upload" @input="uploadImg" :max-size="1500000"></picCutting>
                <span class="upload-tips">（仅支持上传jpg、png格式图片，且不超过1500kb;至多上传三张图）</span>
                <div class="no-pic-cover-left">
                  <div class="img-box" v-if="imgArr.length">
                    <div class="cloak" :src="item" v-for="( item,$index) in imgArr" :key="item" @mouseenter="enter($index) " @mouseleave="leave">
                      <img class="nopic-img" :src="item" alt />
                      <span v-show="showIcon&&$index===k" ref="icon">
                        <i class=" el-icon-circle-plus-outline" @click="watchImg(item)"> </i>
                        <i class="el-icon-delete" @click="deleteImg(item)"></i>
                      </span>
                    </div>
                  </div>
                  <img class="empty-img" src="../../assets/nopic.png" v-else />
                </div>
              </div>
            </el-form-item>
            <div v-if="sendForm.type === '2' " class="video-box">
              <el-form-item label="视频:" prop="vedioUrl">
                <videoUpload v-model="sendForm.vedioUrl" ref="videoContainer" />
              </el-form-item>
              <el-form-item label="封面图:" prop="coverPath">
                <div class="upload-box">
                  <picCutting proportion="16:9" class="pic-cutting" uploadPath="/system/theme/upload" v-model="sendForm.coverPath" :max-size="1500000"></picCutting>
                  <span class="upload-tips">（仅支持上传jpg、png格式图片，且不超过1500kb）</span>
                  <div class="no-pic-cover-right">
                    <img class="empty-img" src="../../assets/nopic.png" v-if="!sendForm.coverPath" alt />
                    <img class="nopic-img" :src="sendForm.coverPath" alt v-else />
                  </div>
                </div>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="send">
          <div class="sended">
            已发送
          </div>
          <div class="info">
            <el-timeline>
              <el-timeline-item class="item" v-for="(item,$index) in sendedLive" :key="$index" color="#4383e4">
                <div class="item-title">
                  <el-date-picker v-if="$index===i" v-model="item.createDate" type="datetime" :clearable="false" placeholder="选择发布时间" style="width:35%"></el-date-picker>
                  <span v-else>{{$utils.format.timeStampToStandardStr(item.createDate)}}</span>
                  <i class="el-icon-edit" @click="isShowTimePicker($index)" v-if="$index!==i"></i>
                  <span v-if="$index===i" class="edit-btn">
                    <el-button type="primary" @click="updateTime(item)" size="mini">保存</el-button>
                    <el-button type="info" size="mini" @click="cancleTime(item)">取消</el-button>
                  </span>
                  <span class="top" v-if="item.isTop">已置顶</span>
                  <el-dropdown trigger="click" @command="handleChange" class="operation">
                    <span class="el-dropdown-link">
                      操作 <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-allow="'live:chat:update'" :command="beforeHandleCommand(item,'modify')">修改</el-dropdown-item>
                      <el-dropdown-item v-allow="'live:chat:delete'" :command=" beforeHandleCommand(item,'delete')">删除</el-dropdown-item>
                      <el-dropdown-item :command=" beforeHandleCommand(item,'istop')" v-if="!item.isTop">置顶
                      </el-dropdown-item>
                      <el-dropdown-item :command=" beforeHandleCommand(item,'isNotop')" v-else>取消置顶</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
                <div class="item-con">
                  <p> {{item.content}}</p>

                  <div class="img-item">
                    <video :src="item.vedioUrl"   controls :poster="item.img" v-if="item.vedioUrl"> </video>
                    <div v-for="imgItem in item.img" :key="imgItem" v-show="item.img">
                      <img :src="imgItem" alt="">
                    </div>

                  </div>
                </div>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </div>
      <div slot="foot"></div>
    </dialogTemplate>
    <el-dialog title="" :visible.sync="previewImg" width="50%" :before-close="handleClose" class="previewImg">
      <img :src="previewImgUrl" alt="">
      <span slot="footer">
      </span>
    </el-dialog>
  </div>
</template>
<script>
import uploadFormItem from "../news/resource/uploadFormItem"
import videoUpload from "../video/uploadVideo"

export default {
  name: "liveDialog",
  props: ["onClose", "manuscript"],
  components: { uploadFormItem, videoUpload },
  data() {
    return {
      width: window.innerWidth * 0.8,
      reverse: true,
      sendForm: {
        content: "",
        type: "",
        img: "",
        publicTime: "",
        vedioUrl: "",
        coverPath: "",
      },
      sendedLive: [],
      i: -1,

      imgArr: [],
      videoArr: [],
      targetVal: {},
      k: -1,
      showIcon: false,
      previewImg: false,
      previewImgUrl: "",

      rules: {
        vedioUrl: [{ required: true, message: "请上传视频", trigger: "blur" }],
        coverPath: [{ required: true, message: "请上传封面图", trigger: "blur" }],
      },

      isEdit: false,


    };
  },
  mounted() {
    const { id, compereUserId, compereUserName } = this.manuscript;
    this.targetVal = {
      lid: id,
      userId: compereUserId,
      userName: compereUserName
    };
    this.getSendedInfo()
  },

  methods: {
    // 获取以发送信息

    uploadImg(imgVal) {
      this.imgArr.push(imgVal)
    },


    getSendedInfo() {
      this.$ajax.live.liveInfoList(this.targetVal).then(res => {
        if (res.code === 200) {
          this.sendedLive = res.rows;
          this.sendedLive.forEach(item => {
            if (item.img) item.img = item.img.split(",")
          })
        }
      });
    },

    isShowTimePicker(index) {
      this.i = index
    },

    updateTime(item) {
      let obj = {
        id: item.id,
        createDate: +item.createDate
      }
      this.$ajax.live.chatModify(obj).then(res => {
        if (res.code === 200) {
          this.$message.success("时间更改成功");
          this.i = -1
          this.getSendedInfo()
        } else {
          this.$message.error(res.msg);
        }
      });
    },

    cancleTime(item) {
      this.i = -1
      this.getSendedInfo()
    },

    beforeHandleCommand(item, command) {
      return {
        item,
        command
      }
    },

    handleChange(command) {
      switch (command.command) {
        case "modify"://编辑
          this.isEdit = true;
          this.sendForm = JSON.parse(JSON.stringify(command.item));
          this.imgArr = JSON.parse(JSON.stringify(command.item.img));
          if (this.sendForm.type === '2') {
            this.imgArr.forEach(item => {
              if (item.endsWith('.mp4')) {
                this.sendForm.vedioUrl = item;
              } else {
                this.sendForm.coverPath = item;
              }
            })
          }
          break;
        case "delete"://删除
          this.delete(command.item)
          break;
        case "istop"://置顶
          this.isTop(command.item)
          break;
        case "isNotop"://置顶
          this.isNoTop(command.item)
          break;

      }


    },

    delete(item) {
      let id = [item.id]
      this.$confirm('确定删除直播内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$ajax.live.chatDel(id).then(res => {
          if (res.code === 200) {
            this.$message.success("删除成功");
            this.getSendedInfo()
          } else {
            this.$message.error(res.msg);
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },

    isTop(item) {
      let obj = {
        id: item.id,
        isTop: 1
      }
      this.$ajax.live.chatModify(obj).then(res => {
        if (res.code === 200) {
          this.$message.success("置顶成功");
          this.getSendedInfo()
        } else {
          this.$message.error(res.msg);
        }
      });
    },

    isNoTop(item) {
      let obj = {
        id: item.id,
        isTop: 0
      }
      this.$ajax.live.chatModify(obj).then(res => {
        if (res.code === 200) {
          this.$message.success("取消置顶成功");
          this.getSendedInfo()
        } else {
          this.$message.error(res.msg);
        }
      });
    },



    onSubmit() {
      if (this.sendForm.type === "1" && this.imgArr.length > 3) {
        this.$message.warning("至多上传三张图片");
        return;
      }
      if (this.sendForm.type === "2") {
        if (!this.sendForm.vedioUrl) {
          this.$message.warning("请上传视频");
          return
        }
        if (!this.sendForm.coverPath) {
          this.$message.warning("请上传封面图");
          return
        }

      }
      if (this.sendForm.type === "2") {
        // this.videoArr = []
        // this.videoArr.push(this.sendForm.vedioUrl)
        // this.videoArr.push(this.sendForm.coverPath)
        this.targetVal.vedioUrl = this.sendForm.vedioUrl
        this.targetVal.img = this.sendForm.coverPath
      } else {
        this.targetVal.img = this.imgArr.toString()
      }



      this.targetVal.content = this.sendForm.content;
      this.targetVal.type = this.sendForm.type;

      if (this.isEdit) {
        this.targetVal.id = this.sendForm.id
        this.$ajax.live.chatModify(this.targetVal).then(res => {
          if (res.code === 200) {
            this.$message.success("修改成功");
            this.sendForm = {};
            this.imgArr = [];
            this.videoArr = [];
            this.isEdit = false;
            this.getSendedInfo();
          } else {
            this.$messag.error(res.msg);
          }
        });
      } else {
        this.targetVal.id = ""
        this.$ajax.live.chatAdd(this.targetVal).then(res => {
          if (res.code === 200) {
            this.$message.success("发送成功");
            this.sendForm = {};
            this.imgArr = [];
            this.videoArr = [];
            this.getSendedInfo();
          } else {
            this.$message.error(res.msg);
          }
        });
      }

    },


    enter(index) {
      this.k = index;
      this.showIcon = true
    },

    leave() {
      this.showIcon = false
    },

    watchImg(imgurl) {
      this.previewImg = true
      this.previewImgUrl = imgurl
    },

    deleteImg(imgurl) {
      this.imgArr.forEach((item, index) => {
        if (item === imgurl) {
          this.imgArr.splice(index, 1)
        }
      })
    },

    handleClose() {
      this.previewImg = false
    },

    clearUploadInfo() {
      this.imgArr = [];
      this.videoArr = [];
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../style/config.less";
@import "../../style/styles";

.flexbox {
  width: 100%;
  height: 700px;
  display: flex;

  overflow: hidden;
  .title {
    border-left: 4px solid #409eff;
    padding-left: 10px;
    height: 20px;
    color: #333;
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    margin-bottom: 40px;
    margin-left: 20px;
  }

  .form-box {
    width: 52%;
    height: 100%;
    margin-right: 20px;
    padding: 20px;
    overflow: hidden;
    background: #fff;
    overflow: auto;
  }

  .send {
    flex: 1;
    padding: 20px;
    background-color: #fff;
    .sended {
      border-left: 4px solid #409eff;
      padding-left: 10px;
      height: 20px;
      color: #333;
      font-size: 16px;
      font-weight: 600;
      line-height: 20px;
      margin-bottom: 20px;
    }

    .info {
      height: 100%;
      overflow: auto;
      padding: 10px 20px 20px 10px;

      .item {
        padding: 10px 0;
        // border-bottom: 1px solid #dcdfe6;

        .item-title {
          color: #6f6f6f;

          .el-icon-edit {
            margin: 0 10px;
            cursor: pointer;
          }

          .edit-btn {
            margin-left: 5px;
          }

          .top {
            display: inline-block;
            width: 60px;
            // border: 1px solid red;
            text-align: center;
            color: red;
          }

          .el-dropdown {
            float: right;
            cursor: pointer;
          }
        }

        .item-con {
          margin-top: 10px;
          .img-item {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            margin: 10px 0;
            img,
            video {
              width: 170px;
              height: 119px;
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
}

.upload-box {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  width: 590px;
}

.pic-cutting {
  margin-top: 5px;
}

.upload-tips {
  font-size: 14px;
  color: #d38416;
}

.no-pic-cover-left,
.no-pic-cover-right {
  width: 212px;
  height: 119px;
  line-height: 150px;
  text-align: center;
  background: rgba(238, 238, 238, 1);
  margin: 10px 0;
  .no-pic-cover-right {
    .nopic-img {
      width: 212px;
      height: 119px;
      object-fit: contain;
    }
  }
  .empty-img {
    width: 50px;
  }

  .img-box {
    width: 300%;
    display: flex;
    flex-wrap: nowrap;
  }

  .cloak {
    position: relative;
    width: 212px;
    height: 119px;
    margin-right: 10px;

    .nopic-img {
      width: 212px;
      height: 119px;
      object-fit: contain;
    }

    .nopic-img:hover {
      z-index: 99;
      background-color: #000;
      opacity: 0.5;
    }

    .el-icon-circle-plus-outline,
    .el-icon-delete {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px;
      color: #fff;
    }

    .el-icon-circle-plus-outline {
      left: 40%;
      cursor: pointer;
    }

    .el-icon-delete {
      left: 55%;
      cursor: pointer;
    }
  }
}

.previewImg {
  img {
    display: block;
    width: 90%;
    height: 90%;
    margin: 0 auto;
  }
}

.video-box {
  display: inline-block;
  margin-top: 10px;
}
</style>
<style lang="less">
.dfsgbvf {
  .el-dropdown {
    color: #6f6f6f;
  }
}
</style>
