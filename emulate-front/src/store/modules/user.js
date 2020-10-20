import { login, fkLogin } from '@/api/user'

const user = {
    namespaced: true,
    state: {
        userInfo: {}
    },

    mutations: {
        SET_USERINFO: (state, userInfo) => {
            state.userInfo = userInfo
        }
    },

    actions: {
        // 登录
        Login({ commit }, userInfo) {
            const username = userInfo.email.trim()
            const password = userInfo.password
            return new Promise((resolve, reject) => {
                login(username, password).then(res => {
                    res.data.isShow = true
                    const data = JSON.stringify(res.data)
                    localStorage.setItem('userInfo', data)
                    commit('SET_USERINFO', res.data)
                    resolve(res)
                }).catch(error => {
                    console.log(error)
                    reject(error)
                })
            })
        },
        // 游客登录
        fkLogin({ commit }) {
            return new Promise((resolve, reject) => {
                fkLogin().then(res => {
                    res.data.isShow = false
                    const data = JSON.stringify(res.data)
                    localStorage.setItem('userInfo', data)
                    commit('SET_USERINFO', res.data)
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}

export default user
