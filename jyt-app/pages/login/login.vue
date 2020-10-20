<template>
	<view class="login-content">
		<view class="logo">
			<image src="../../static/img/logo.png" mode=""></image>
			<text>江苏教育舆情管理工作平台</text>
		</view>
		<form @submit="handlerLogin" v-if="autoForm.mini!=='1'">
			<view class="uname">
				<input type="text" v-model="form.username" name="username" placeholder="用户名" :placeholder-class="isUserHolder ? 'holder': ''"
				 @focus="disUserHolder" @blur="showUserHolder" />
			</view>
			<view class="upass">
				<input type="password" v-model="form.password" name="password" placeholder="密码" :placeholder-class="isPsdHolder ? 'holder': ''"
				 @focus="disPsdHolder" @blur="showPsdHolder" />
			</view>
			<button form-type="submit" class="btn" :loading="isLoading" :disabled="isLoading">登录</button>
		</form>
	</view>
</template>

<script>
	import graceChecker from '@/common/graceChecker.js'
	import {
		Base64_decode
	} from '../../common/base64.js'
	export default {
		data() {
			return {
				isLoading: false,
				isUserHolder: false,
				isPsdHolder: false,
				form: {
					username: "",
					password: ""
				},
				autoForm: {
					mini: "",
					programId: "",
					redirect: '',
					orderId: '',
					processId: ''
				},

			};
		},
		onLoad(option) {
			if (option.mini) {
				this.autoForm.mini = option.mini
				this.autoForm.programId = option.programId
				this.autoForm.redirect = Base64_decode(option.redirect)
				uni.showLoading({
					title: '加载中'
				});
				this.autoLogin()
			}


		},
		methods: {
			disUserHolder() {
				this.isUserHolder = true
			},
			showUserHolder(e) {
				if (e.detail.value == "") {
					this.isUserHolder = false
				}
			},
			disPsdHolder() {
				this.isPsdHolder = true
			},
			showPsdHolder(e) {
				if (e.detail.value == "") {
					this.isPsdHolder = false
				}
			},
			handlerLogin(e) {
				const rule = [{
					name: "username",
					checkType: "notnull",
					errorMsg: "请输入用户名"
				}, {
					name: "password",
					checkType: "notnull",
					errorMsg: "请输入密码"
				}]
				const formData = e.detail.value
				const checkRes = graceChecker.check(formData, rule)
				if (checkRes) {
					this.isLoading = true
					this.$store.dispatch('doLogin', this.form).then(res => {
						if (res.code == 200) {
							uni.reLaunch({
								url: '/pages/index/index'
							})
						} else {
							this.$toast.showFail(res.msg)
							this.isLoading = false
						}
					}).catch(e => {
						this.$toast.showFail(e.msg)
						this.isLoading = false
					})
				} else {
					this.$toast.showFail(graceChecker.error)
					this.isLoading = false
				}
			},
			autoLogin() {
				const {
					mini,
					programId
				} = this.autoForm
				this.$Request.get(this.$api.miniLogin(mini, programId)).then(res => {
					this.$store.commit("setToken", res.token)
					this.$Request.get(this.$api.userInfo).then(u => {
						if (u.code == 200) {
							uni.redirectTo({
								url: this.autoForm.redirect
							})
							uni.hideLoading();
							this.$store.commit("setUserInfo", u)
						} else {
							resolve(u)
						}
					})
				}).catch((err) => {
					uni.showLoading({
						title: '加载中'
					});
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.login-content {
		font-size: 34rpx;
	}

	.logo {
		width: 100%;
		margin-top: 100rpx;
		display: flex;
		flex-flow: column;
		align-items: center;
		justify-content: center;

		image {
			width: 180rpx;
			height: 180rpx;
		}

		text {
			width: 100%;
			height: 120rpx;
			font-size: 36rpx;
			text-align: center;
			line-height: 120rpx;
		}
	}

	.uname,
	.upass {
		width: 80%;
		margin: 20rpx auto;
		padding: 20rpx 0;
		border-bottom: 1px solid rgba(229, 229, 229, 1);
	}

	.holder {
		color: #FFFFFF;
	}

	.btn {
		width: 80%;
		margin: 80rpx auto;
		background: rgba(67, 131, 228, 1);
		border-radius: 10rpx;
		color: #fff;
		font-size: 34rpx;
	}
</style>
