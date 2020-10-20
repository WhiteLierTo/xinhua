/**
 * 利用缓存的方式 如果用户登录成功后，将信息缓存下来
 * @createTime 2019-04-05
 */
import Vue from 'vue'
import Vuex from 'vuex'
import HttpCache from '../common/cache'
import Request from '../common/httpRequest.js'
import api from '../common/httpApi.js'
Vue.use(Vuex)
const userAccount = HttpCache.get("user_account"); // 获取用户信息
const store = new Vuex.Store({
	state: {
		hasLogin: userAccount ? true : false, // 登录状态
		token: null,
		userinfo: userAccount ? userAccount : {}, // 用户信息 
		waitNum: null,
		verifyNum: null
	},
	mutations: {
		login(state, token) {
			state.hasLogin = true;
			state.token = token;
		},
		setToken(state, token) {
			state.token = token;
			HttpCache.put("token", token)
		},
		setUserInfo(state, userInfo) {
			state.userinfo = userInfo
			HttpCache.put("user_account", userInfo.user)
			HttpCache.put("permissions", userInfo.permissions)
			HttpCache.put("roles", userInfo.roles)
		},
		logout(state) {
			state.hasLogin = false;
			HttpCache.clear()
		},
		save(state, data) {
			var user = state.userinfo;
			for (let i in data) {
				user[i] = data[i];
				if (i == "openid") {
					state.openid = data[i];
				}
			}
			state.userinfo = user;
			HttpCache.put("user_account", user); // 缓存用户信息
		},
		getUseriInfo(state) {
			return HttpCache.get("user_account"); // 获取用户信息
		},
		getWait(state, waitNum) {
			state.waitNum = waitNum;
		},
		getVerify(state, verifyNum) {
			state.verifyNum = verifyNum;
		}
	},
	actions: {
		// 登录
		doLogin({
			commit
		}, userInfo) {
			HttpCache.clear()
			return new Promise((resolve, reject) => {
				Request.post(api.login, userInfo, "application/x-www-form-urlencoded").then(res => {
					if (res.code == 200) {
						commit("setToken", res.token)
						Request.get(api.userInfo).then(u => {
							if (u.code == 200) {
								commit("setUserInfo", u)
								resolve(u)
							} else {
								resolve(u)
							}
						})
					} else {
						resolve(res)
					}
				}).catch(error => {
					reject(error)
				})
			}).catch(error => {
				reject(error)
			})
		},
		getUserOpenId: async function({
			commit,
			state
		}) {
			return await new Promise((resolve, reject) => {
				if (state.openid) {
					resolve(state.openid)
				} else {
					uni.login({
						success: (data) => {
							commit('login')
							setTimeout(function() { //模拟异步请求服务器获取 openid
								const openid = '123456789'
								console.log('uni.request mock openid[' + openid +
									']');
								commit('setOpenid', openid)
								resolve(openid)
							}, 1000)
						},
						fail: (err) => {
							console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err)
							reject(err)
						}
					})
				}
			})
		},
		// 获取待处理数量
		GetPendCount({
			commit
		}, queryType) {
			return new Promise((resolve, reject) => {
				Request.get(api.pend(queryType)).then(u => {
					if (u.code == 200) {
						if (queryType === 1) {
							commit("getWait", u.data);
						} else if (queryType === 2) {
							commit("getVerify", u.data);
						}
						resolve(u)
					} else {
						resolve(u)
					}
				})
			}).catch(error => {
				reject(error)
			})
		},
	}
})

export default store
