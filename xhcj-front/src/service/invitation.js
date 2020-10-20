// 邀请

import service from "./base";

class Invitation {
  static async create(data) {
    let res = await service.post("/inviteHist/add", data);
    return [res.code === 200, res.msg]
  }
}

export default Invitation