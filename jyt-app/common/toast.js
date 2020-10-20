export default {
	showLoading(msg) {
		msg = msg == undefined ? "加载中" : msg;
		uni.showLoading({
			title: msg
		})
	},

	hideLoading() {
		uni.hideLoading()
	},

	showSuccess(msg) {
		msg = msg == undefined ? "操作成功" : msg;
		uni.showToast({
			icon: 'success',
			title: msg,
			icon: 'none'
		});
	},

	showFail(msg) {
		uni.showToast({
			title: msg,
			icon: "none"
		});
	},

	showException() {
		uni.showToast({
			title: "通讯异常，请重新登录",
			icon: "none"
		});
	}
}
