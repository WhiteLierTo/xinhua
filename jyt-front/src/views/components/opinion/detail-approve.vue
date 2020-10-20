<template>
  <div>
    <el-row>
      <div class="listtitle">
        <i></i>
        <div class="txt">处置信息</div>
      </div>
    </el-row>
    <el-row class="czbox" >
      <el-col :span="2" class="label-approve">
        <span style="color: red;">*</span>
        <span class="czsm">处置说明：</span>
      </el-col>
      <el-col :span="16">
        <el-input type="textarea" v-model="tixingtxt" placeholder="请输入处置说明" :autosize="{ minRows: 5, maxRows: 100}" />
      </el-col>
    </el-row>
    <el-row class="czbox label-upload" type="flex" align="middle">
      <el-col :span="2" class="label-approve">
        <span class="czsm">上传附件：</span>
      </el-col>
      <el-col :span="16">
          <el-upload
            ref="upload"
            action=""
            :on-remove="handleRemove"
            :headers="headers"
            :file-list="myFileList"
            name="file"
            multiple
            :auto-upload="true"
            :http-request="uploadFile"
            :accept="fileformat"
            :on-success="handleUploadSuccess"
          >
          <div slot="trigger">
            <img src="../../../assets/image/upload.png" class="upimg"/>
            <span class="click-upload" >点击上传</span>
            <span class="click-ins">（支持上传图片/文档）</span>
          </div>
          </el-upload>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { uploadFile } from "@/api/opinion/data";
import { getToken } from "@/utils/auth";
export default {
  data() {
    return {
      tixingtxt: "",
      // 文件上传
      myFileList: [],
      headers: {
        Authorization: "Bearer " + getToken()
      },
      fileformat: ".doc, .docx, .xls, .xlsx, .jpg, .jpeg, .png, .pdf",
      resourceList: []
    }
  },
  methods: {
    // 上传成功的钩子函数
    handleUploadSuccess(response, file, fileList) {
      this.resourceList.push(response.data[0]);
    },
    handleRemove(deleteimg) {
      var index = this.resourceList.findIndex((item, index) => {
        if (item.resourceName == deleteimg.name) return index;
      });
      this.resourceList.splice(index, 1);
    },
    uploadFile(fileobj) {
      var formData = new FormData()
      formData.append('file', fileobj.file)
      uploadFile(formData).then(res => {
        if (res.code == 200) {
          this.resourceList.push({
            url: res.data[0].fileUrl,
            resourceName: res.data[0].fileName,
            resourcePath: res.data[0].resourcePath
          })
        } else {
          this.$message.error("上传文件失败")
          console.log(res.msg)
        }
      }).catch(e => {
        this.$message.error("上传文件失败")
        console.log(e)
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.listtitle {
  margin-top: 15px;
  margin-bottom: 20px;
  padding-bottom: 6px;
  border-bottom: 1px solid #eee;
  .txt {
    font-size: 16px;
    color: #333;
    font-weight: 600;
    display: inline-block;
    vertical-align: middle;
  }
  i {
    display: inline-block;
    width: 4px;
    height: 20px;
    background: #2d8cf0;
    vertical-align: middle;
    margin-right: 10px;
    margin-left: 10px;
  }
}
.label-approve {
  text-align: right;
}
.label-upload {
  margin-top: 20px;
  img {
    width: 23px;
    height: 19px;
  }
}
.click-upload {
  color: #4383E4;
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
}
.click-ins {
  color: #999999;
  font-size: 14px;
  line-height: 20px;
}
</style>
<style lang="scss">
.czbox {
  padding-left: 25px;
  .czsm {
    height: 20px;
    font-size: 14px !important;
    font-weight: 400;
    color: #294874;
    line-height: 20px;
  }
}
</style>
