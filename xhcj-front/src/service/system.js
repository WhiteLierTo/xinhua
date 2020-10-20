import service from "./base";

class system {
    constructor(ajax) {
        this.ajax = ajax
    }

    // 菜单树列表
    getMenuList(data) {
        return this.ajax.post('/system/menu/list', data)
    }

    //菜单树下拉列表
    getTreeList(data) {
        return this.ajax.post('/system/menu/treeselect', data)
    }

    //菜单修改
    updateMenu(data) {
        return this.ajax.post('/system/menu/update', data)
    }

    //菜单删除
    deleteMenu(id) {
        return this.ajax.get(`/system/menu/del/${id}`)
    }

    //菜单新增
    postMenu(data) {
        return this.ajax.post('/system/menu', data)
    }


    //后台机构列表
    getOrganizeList(data) {
        return this.ajax.post('/system/organize/list', data)
    }

    /// 机构修改
    updateOrganize(data) {
        return this.ajax.post('system/organize/update', data)
    }

    /// 机构新增
    addOrganize(data) {
        return this.ajax.post('/system/organize/add', data)
    }
    //机构删除
    deleteOrganize(id) {
        return this.ajax.get(`/system/organize/del/${id}`)
    }

    async getMenuTree() {
        try {
            let res = await this.ajax.post(`/system/menu/treeselect`);
            if (res.code !== 200) {
                return [];
            }
            return res.data;
        } catch (e) {
            return [];
        }
    }

    //获取角色详情
    async getRoleDetail(roleId) {
        try {
            let res = await this.ajax.get(`/system/role/instance/${roleId}`);
            if (res.code !== 200) {
                return {};
            }
            return res.data;
        } catch (e) {
            return {};
        }
    }

    async updateRole(data) {
        try {
            let res = await this.ajax.post(`/system/role/update`, data);
            return [res.code === 200,res.msg];
        } catch (e) {
            return [false,"未知错误"];
        }
    }

    async createRole(data) {
        try {
            let res = await this.ajax.post(`/system/role/add`, data);
            return [res.code === 200,res.msg];
        } catch (e) {
            return [false,"未知错误"];
        }
    }

    //获取系统设置详情/system/config/:id
    async getSettingDetail(systemId) {
        try {
            let res = await this.ajax.get(`/system/config/${systemId}`);
            if (res.code !== 200) {
                return {};
            }
            return res.data;
        } catch (e) {
            return {};
        }
    }
    ///system/config/update
    async updateSetting(data) {
        return this.ajax.post(`/system/config/update`, data);

    }

    async createSetting(data) {
        return this.ajax.post('/system/config', data);

    }


    //获取用户详情/system/config/:id
    async getUserDetail(userId) {
        try {
            let res = await this.ajax.get(`/system/user/instance/${userId}`);
            if (res.code !== 200) {
                return {};
            }
            return res.data;
        } catch (e) {
            return {};
        }
    }
    ///system/config/update
    async updateUser(data) {
        return this.ajax.post(`/system/user/update`, data);
    }

    async createUser(data) {
        return this.ajax.post('/system/user/add', data);
    }

    //用户角色
    getRoleList(data) {
        return this.ajax.post('/system/role/out/list', data)
    }

    //   单个重置密码
    async resetUserPsd(data) {
        try {
            let res = await this.ajax.post('/system/user/resetPwd', data);
            return res.code === 200;
        } catch (e) {
            return false;
        }
    }

    // 批量删除
    async batchDel(data) {
        try {
            let res = await this.ajax.post('/system/user/batchDel', data);
            return res.code === 200;
        } catch (e) {
            return false;
        }
    }
    // 批量重置
    async batchResetRole(data) {
        try {
            let res = await this.ajax.post('/system/user/resetRole', data);
            return res.code === 200;
        } catch (e) {
            return false;
        }
    }

    //新增数据字典
    addDictList(data) {
        return this.ajax.post('/system/dict', data)
    }
    //数据字典详情
    getDictDetail(dictId) {
        return this.ajax.get(`/system/dict/${dictId}`)
    }
    //数据字典修改
    updateDictList(data) {
        return this.ajax.post('/system/dict/update', data)
    }
    // 数据字典选择框列表
    getOptionselect() {
        return this.ajax.get(`/system/dict/optionselect`)
    }
    //数据字典明细列表
    getLogList(data) {
        return this.ajax.post('/system/dict/data/list', data)
    }
    //数据字典明细新增
    addLogDictList(data) {
        return this.ajax.post('/system/dict/data', data)
    }
    //数据字典修改
    updateLogDictList(data) {
        return this.ajax.post('/system/dict/data/update', data)
    }
    //数据字典详情
    getLogDictDetail(dictDataId) {
        return this.ajax.get(`/system/dict/data/${dictDataId}`)
    }
    //敏感词明细修改
    updateSensitive(data) {
        return this.ajax.post('/system/dict/data/update', data)
    }
    //敏感词详情
    sensitiveDetail(id) {
        return this.ajax.get(`/system/dict/data/${id}`)
    }
    //敏感词新增
    addSensitive(data) {
        return this.ajax.post('/system/dict/data', data)
    }
    //批量导入
    import(data) {
        return this.ajax.post('/system/dict/data/import', data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
        )
    }
}

export default new system(service)
