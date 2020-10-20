import service from "./base";

class DashBoard {

  static async channelsBase(data) {
    let res = await service.post("/report/forms/total/channels", data);
    return [res.code === 200, res.code === 200 ? res.data : res.msg]
  }

  static async channelClickSta(data) {
    let res = await service.post("/report/forms/total/channel/click", data);
    return [res.code === 200, res.code === 200 ? res.data : res.msg]
  }

  static async articleStatic() {
    let res = await service.get("/report/forms/total/articleList/data");
    return [res.code === 200, res.code === 200 ? res.data : res.msg]
  }

  static async todayReadingStatic() {
    let res = await service.get("/report/forms/total/articleList/click");
    return [res.code === 200, res.code === 200 ? res.data : res.msg]
  }

  static async articlePeriodData(data) {
    let res = await service.post("/report/forms/total/articleList/periodData", data);
    return [res.code === 200, res.code === 200 ? res.data : res.msg]
  }

  static async DAUPeriodData(data) {
    let res = await service.post("/report/forms/total/dau/periodData", data);
    return [res.code === 200, res.code === 200 ? res.data : res.msg]
  }

  static async DAUStaticData() {
    let res = await service.get("/report/forms/total/dau/data");
    return [res.code === 200, res.code === 200 ? res.data : res.msg]
  }
}

export default DashBoard
