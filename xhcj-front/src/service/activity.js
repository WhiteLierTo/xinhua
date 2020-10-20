import service from "./base";
import Vue from "../main";

class activity {
  constructor(ajax) {
    this.ajax = ajax
  }

  // 批量通过/不通过报名人员
  async applyAuditSync(applyStatus, ids = []) {
    let res = await this.ajax.post(`/activity/apply/audit`, {applyStatus, ids});
    return res.code === 200;
  }

  //签到管理人员投屏列表
  getSiginInScreenList(aid) {
    return this.ajax.get(`/activity/siginIn/screen/userList/${aid}`)
  }

  // 新建活动
  newActivity(data) {
    return this.ajax.post("/activity/add", data)
  }

  // 编辑活动
  editActivity(data) {
    return this.ajax.post("/activity/edit", data)
  }

  //删除扩展字段/activity/exActField/del/:fid
  delExActField(fid) {
    return this.ajax.get(`/activity/exActField/del/${fid}`)
  }

  // 活动详情
  async getDetailSync(id) {
    let res = await this.ajax.post("/activity/instance", {id});
    if (res.code !== 200) {
      return {}
    }
    return res.data
  }

  // 获取活动状态
  async getStateSync(id) {
    let detail = await this.getDetailSync(id);
    return detail.state || ""
  }

  async addAndModifySeat(id, seat) {
    let res = await this.ajax.post('/activity/apply/addSeat', {id, seat});
    return res.code === 200;
  }
}

export default new activity(service)
