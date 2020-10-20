<template>
	<view>
		<view class="me-header">
			<image src="../../static/img/logo.png"></image>
			<text>{{userInfo.nickName}}</text>
		</view>
		<view class="me-content">
			<view class="me-item">
				<view class="me-img">
					<image src="../../static/img/dept.png" style="width: 43rpx; height: 41rpx;"/>
				</view>
				<text class="item-label">所属部门</text>
				<text>{{userInfo.dept.deptName}}</text>
			</view>
			<view class="me-item">
				<view class="me-img">
					<image src="../../static/img/phone.png"  style="width: 29rpx; height: 43rpx;"/>
				</view>
				<text class="item-label">手机号码</text>
				<text>{{userInfo.phonenumber}}</text>
			</view>
			<view class="me-item">
				<view class="me-img">
					<image src="../../static/img/email.png"  style="width: 40rpx; height: 27rpx;"/>
				</view>
				<text class="item-label">电子邮箱</text>
				<text>{{userInfo.email}}</text>
			</view>
			<view class="me-item">
				<view class="me-img">
					<image src="../../static/img/time.png"  style="width: 44rpx; height: 44rpx;"/>
				</view>
				<text class="item-label lastOne">创建日期</text>
				<text class="lastOne">{{userInfo.createTime}}</text>
			</view>
		</view>
		<view class="me-btn">
			<button @click="logout">退出登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: this.$SysCache.get('user_account')
			};
		},
		methods: {
			logout() {
				this.$SysCache.clear()
				this.$Request.get(this.$api.logout).then(res => {
					uni.reLaunch({
						url: '/pages/login/login'
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.me-header {
	width: 100%;
	margin: 60rpx 0 77rpx 0;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	image {
		width: 120rpx;
		height: 120rpx;
	}
	text {
		font-size:34rpx;
		font-weight: 600;
		color: rgba(51,51,51,1);
		line-height: 48rpx;
		padding-top: 32rpx;
	}
}
.me-content {
	width: 100%;
	.me-item {
		height: 104rpx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		.me-img {
			width: 124rpx;
			height: 100%;
			display: flex;
			align-items: center;
			image {
				padding-left: 41rpx;
			}
		}
		.item-label {
			width: 156rpx;
			height: 100%;
			font-size: 34rpx;
			color: rgba(102,102,102,1);
			line-height: 104rpx;
			text-align: left;
		}
		text {
			width: 440rpx;
			height: 100%;
			text-align: right;
			font-size: 32rpx;
			color: rgba(51,51,51,1);
			line-height: 104rpx;
			border-bottom: 1px solid rgba(238,238,238,1);;
		}
		.lastOne {
			border: none;
		}
	}
}
.me-btn {
	padding-top: 50rpx;
	width: 100%;
	height: 94rpx;
	button {
		width: 598rpx;
		height: 94rpx;
		box-sizing: border-box;
		border: 2rpx solid #3482FF;
		border-radius: 10rpx;
		background-color: #FFFFFF;
		color: #4383E4;
		font-size: 36rpx;
		line-height: 94rpx;
	}
}
</style>
