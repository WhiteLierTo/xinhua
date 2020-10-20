import configdata from './config'
import cache from './cache'

module.exports = {
	config: function(name) {
		var info = null;
		if (name) {
			var name2 = name.split("."); //字符分割
			if (name2.length > 1) {
				info = configdata[name2[0]][name2[1]] || null;
			} else {
				info = configdata[name] || null;
			}
			if (info == null) {
				let web_config = cache.get("web_config");
				if (web_config) {
					if (name2.length > 1) {
						info = web_config[name2[0]][name2[1]] || null;
					} else {
						info = web_config[name] || null;
					}
				}
			}
		}
		return info;
	},
	post: function(url, data, headerType) {
		headerType = headerType || "application/json";
		var header = {
			"content-type": headerType,
		}
		const token = cache.get("token")
		if (token) {
			header.Authorization = "Bearer " + token
		}
		url = this.config("APIHOST") + url;
		return new Promise((succ, error) => {
			uni.request({
				url: url,
				data: data,
				method: "POST",
				header: header,
				success: function(result) {
					if (result.data.code == 401) {
						uni.reLaunch({
							url: "/pages/login/login"
						})
						return
					}
					succ.call(self, result.data)
				},
				fail: function(e) {
					error.call(self, e)
				}
			})
		})
	},
	get: function(url, data, headerType) {
		headerType = headerType || "application/x-www-form-urlencoded";
		var header = {
			"content-type": headerType
		}
		const token = cache.get("token")



		if (token) {
			header.Authorization = "Bearer " + token
		}
		let tempUrl = url.slice(0, 10);
		if (tempUrl === 'mini/login') {
			header.Authorization = ''
		}
		url = this.config("APIHOST") + url;
		return new Promise((succ, error) => {
			uni.request({
				url: url,
				data: data,
				method: "GET",
				header: header,
				success: function(result) {
					if (result.data.code == 401) {
						uni.reLaunch({
							url: "/pages/login/login"
						})
						return
					}
					succ.call(self, result.data)
				},
				fail: function(e) {
					error.call(self, e)
				}
			})
		})
	}
}
