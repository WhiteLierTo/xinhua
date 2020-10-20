import service from "./base";

class User {
  constructor(ajax) {
    this.ajax = ajax;
  }

  async loginSync(userName, password) {
    let data = new URLSearchParams();
    data.append("userName", userName);
    data.append("password", password);

    try {
      let res = await this.ajax.post("/login", data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      return [res.code === 200, res.token || res.msg];
    } catch (e) {
      return [false, "服务器错误"]
    }
  }

  async detail() {
    try {
      let res = await this.ajax.get("/getInfo");
      if (res.code !== 200) {
        // 获取详情失败 TODO 咋办
        return [false, res.msg]
      }
      return [true, res]
    } catch (e) {
      return [false, "失败"]
    }
  }

  async getRoute() {
    try {
      return await this.ajax.get("/getRouters")
    } catch (e) {
      return []
    }
  }
}

export default new User(service);
