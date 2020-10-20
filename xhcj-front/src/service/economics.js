import service from "./base";

class Economics {
    constructor(ajax) {
        this.ajax = ajax
    }

    //财经号新增
    addCjh(data) {
        return this.ajax.post("/cjh/add", data)
    }
    //财经号修改
    updateCjh(data) {
        return this.ajax.post("/cjh/update", data)
    }
    //财经号详情
    cjhDetail(organizeId) {
        return this.ajax.get(`/cjh/instance/${organizeId}`)
    }
    //财经号树列表
    cjhTree(data) {
        return this.ajax.post("/cjh/tree", data)
    }
}

export default new Economics(service)