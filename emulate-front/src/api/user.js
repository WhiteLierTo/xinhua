import request from '@/utils/request'

// 登录方法
export function login(email, password) {
    const data = {
        email,
        password,
    }
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}


//访客登陆
export function fkLogin() {
    return request({
        url: '/user/fkLogin',
        method: 'get'
    })
}

//注册
export function register(userInfo) {
    const { userName, userSex, email, studentId, school, profession, password } = userInfo
    const data = {
        userName,
        userSex,
        email,
        studentId,
        school,
        profession,
        password
    }
    return request({
        url: '/user/create',
        method: 'post',
        data
    })
}

//用户修改
export function updateUser(userInfo) {
    const { userName, userSex, email, studentId, school, profession, userId, userDescription, password } = userInfo
    const data = {
        userName,
        userSex,
        email,
        studentId,
        school,
        profession,
        password,
        userId,
        userDescription
    }
    return request({
        url: '/user/update',
        method: 'post',
        data
    })
}

//用户修改密码
export function updatePassword(parmas) {
    const data = parmas
    return request({
        url: '/user/updatePassword',
        method: 'post',
        data
    })
}

// 邮箱是否存在校验
export function checkEmail(email) {
    return request({
        url: `/user/checkEmail/${email}`,
        method: 'get',
    })
}