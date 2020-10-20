import service from "./base";

class Menu {
    constructor(ajax) {
        this.ajax = ajax
    }

    //主题新增
    addTheme(data) {
        return this.ajax.post("/system/theme/add", data)
    }
    //主题列表
    themeList(data) {
        return this.ajax.post("/system/theme/list", data)
    }
    //主题修改
    updateTheme(data) {
        return this.ajax.post("/system/theme/update", data)
    }
    //主题详情
    themeDetail(themeId) {
        return this.ajax.get(`/system/theme/instance/${themeId}`)
    }
    //修改主题生效时间
    updateTime(data) {
        return this.ajax.post("/system/theme/update/time", data)
    }
    //主题生效
    themeEffect(themeId) {
        return this.ajax.get(`/system/theme/effect/${themeId}`)
    }
    //主题删除
    deleteTheme(data) {
        return this.ajax.post("/system/theme/batchDel", data)
    }
}

export default new Menu(service)