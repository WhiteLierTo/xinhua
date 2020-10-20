import service from "./base";

class Video {
    constructor(ajax) {
        this.ajax = ajax
    }

    //视频新增
    addVideo(data) {
        return this.ajax.post("/video/add", data)
    }
    //视频详情 
    videoDetail(id) {
        return this.ajax.get(`/video/instance/${id}`)
    }
    //视频修改
    updateVideo(data) {
        return this.ajax.post('/video/update', data)
    }
    //频道/专题树
    getLiveTree(data) {
        return this.ajax.post("/channel/tree", data)
    }


    //app用户列表
    getUserList(data) {
        return this.ajax.post("/system/user/app/list", data)
    }

    //直播置顶/取消置顶
    updateTop(data) {
        return this.ajax.post("/video/updateTop", data)
    }
    //直播设置banner/取消banner
    updateBanner(data) {
        return this.ajax.post("/video/updateBanner", data)
    }

    //处理审核通过/ 撤稿
    audit(data) {
        return this.ajax.post("/video/updatePublic", data)
    }

    //校验稿件名
    checkTitle(data) {
        return this.ajax.post("/video/checkTitle", data)
    }
}


export default new Video(service)