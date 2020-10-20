import service from "./base";
import axios from "axios";

class Gadgets {
  constructor(ajax) {
    this.ajax = ajax;
  }

  async getConfigSync() {
    // TODO 错误处理
    try {
      let res = await axios.get("/config.json");
      return res.data;
    } catch (e) {
      return false
    }

  }

  async getExtraTableHeadSync(actId) {
    // 获取额外表头,目前只有报名审核与签到明细需要
    try {
      let res = await this.ajax.get(`/activity/headTable/${actId}`);
      if (res.code !== 200) {
        return [];
      }
      return res.data;
    } catch (e) {
      return [];
    }
  }

  async uploadFileSync(formData, path, progress = () => "") {
    // progress: function 上传进度监控的函数 入参:progressEvent

    try {
      let res = await this.ajax.post(path, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress: progress
      });
      if (res.code !== 200) return "";
      return res.data
    } catch (e) {
      return ""
    }
  }
}

export default new Gadgets(service);
