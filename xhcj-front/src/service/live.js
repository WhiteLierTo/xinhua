import service from "./base";

class Live {
  constructor(ajax) {
    this.ajax = ajax
  }

  //    消息列表 /live/chat/list
  liveInfoList(data) {
    return this.ajax.post("/live/chat/list", data)
  }

  //直播新增
  addLive(data) {
    return this.ajax.post("/live/add", data)
  }

  //直播详情
  detailLive(id) {
    return this.ajax.get(`/live/instance/${id}`)
  }

  //直播修改
  updateLive(data) {
    return this.ajax.post('/live/update', data)
  }

  //频道/专题树
  getLiveTree(data) {
    return this.ajax.post("/channel/tree", data)
  }

  //直播发送主持人消息
  chatAdd(data) {
    return this.ajax.post("/live/chat/add", data)
  }

  //直播发送主持人消息（撤回）
  chatDel(data) {
    return this.ajax.post("/live/chat/del", data)
  }

  //直播发送主持人消息（置顶）
  chatModify(data) {
    return this.ajax.post("/live/chat/update", data)
  }


  //直播获取推流和拉流地址
  pushInstance(id) {
    return this.ajax.get(`/live/push/instance/${id}`)
  }

  //app用户列表
  getUserList(data) {
    return this.ajax.post("/system/user/app/list", data)
  }

  //直播置顶/取消置顶
  updateTop(data) {
    return this.ajax.post("/live/updateTop", data)
  }

  //直播设置banner/取消banner
  updateBanner(data) {
    return this.ajax.post("/live/updateBanner", data)
  }

  checkName(data) {
    return this.ajax.post("/live/checkTitle", data)
  }
}


export default new Live(service)
