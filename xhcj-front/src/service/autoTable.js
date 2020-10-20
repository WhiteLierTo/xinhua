import service from "./base";
import Vue from "../main"

class AutoTable {
  constructor(ajax) {
    this.ajax = ajax;
  }

  get(url, data) {
    return this.ajax.post(url, data)
  }

  async getSync(url, data, method = "POST") {
    let reqFunc;
    if (method === "POST") {
      reqFunc = this.ajax.post
    } else {
      reqFunc = (url, data) => {
        return this.ajax.get(url, {
          params: data || {}
        })
      }
    }

    let res = await reqFunc(url, data);
    if (res.code !== 200) {
      Vue.$message.error("请求失败");
      // TODO 不一定对
      return {
        total: 0,
        rows: []
      }
    }
    return res
  }

  deleteAll(url, data) {
    return this.ajax.post(url, data)
  }

  async deleteAllSync(url, data) {
    let res = await this.ajax.post(url, data);
    if (res.code !== 200) {
      Vue.$message.error(res.msg);
      return false
    }
    return true
  }


  async moveTo(url, data) {
    let res = await this.ajax.post(url, data);
    return [res.code === 200, res.msg];
  }

  async sort(url, data) {
    let res = await this.ajax.post(url, data);
    return res.code === 200;
  }
}

export default new AutoTable(service);
