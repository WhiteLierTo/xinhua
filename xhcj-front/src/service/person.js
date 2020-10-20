import service from "./base";

class Person {
    constructor(ajax) {
        this.ajax = ajax
    }
    // 上传头像
    uploadHeadImg(data) {
        return this.ajax.post('/system/theme/upload', data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
        )
    }
    //个人信息修改 
    updatePersonInfo(data) {
        return this.ajax.post("/system/user/oneself/update", data)
    }

    // 修改密码/system/user/oneself/resetPwd
    resetPwd(data) {
        return this.ajax.post("/system/user/oneself/resetPwd", data)
    }
}

export default new Person(service)