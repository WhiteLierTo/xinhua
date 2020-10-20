import service from "./base";

class appUser {
    constructor(ajax) {
        this.ajax = ajax;
    }
    //获取用户详情 
    async getUserDetail(userId) {
        try {
            let res = await this.ajax.get(`/system/user/app/instance/${userId}`);
            if (res.code !== 200) {
                return {};
            }
            return res.data;
        } catch (e) {
            return {};
        }
    }

    // 标签列表/system/user/tage/list
    getTagList() {
        return this.ajax.get('/system/user/tage/list')
    }

    //新增用户/system/user/app/add
    createUser(data) {
        return this.ajax.post('/system/user/app/add', data);
    }
    //编辑用户
    async updateUser(data) {
        return this.ajax.post(`/system/user/app/update`, data);
    }

    // 新增标签
    createTag(data) {
        return this.ajax.post('/system/user/tage/add', data);
    }

    // 标签修改
    async addAndModifyTag(data) {
        let res = await this.ajax.post('/system/user/tage/update', data);
        return res.code === 200;
    }

    // 设置标签
    async bandingTags(data) {
        let res = await this.ajax.post('/system/user/tage/banding', data);
        return res.code === 200;
    }
}

export default new appUser(service);
