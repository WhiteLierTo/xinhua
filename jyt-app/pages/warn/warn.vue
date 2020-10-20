<template>
	<view class="detail-content">
		<view class="detail">
			<text class="line"></text>
			<text class="word">流程{{ title }}</text>
		</view>
		<textarea  placeholder="请输入提醒内容" v-model="warnparams.warnContent"></textarea>
		<view class="btn">
			<button class="active" @click="submitWarn">确定</button>
			<button @click="cancelWarn">取消</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: '',
			warnparams: {
				processId: null,
				warnType: null,
				warnDeptId: null,
				warnContent: ''
			}
		};
	},
	onLoad(params) {
		this.title = params.type == 1 ? '催办' : '督办';
		this.warnparams.processId = params.pid;
		this.warnparams.warnDeptId = params.did;
		this.warnparams.warnType = params.type;
	},
	methods: {
		submitWarn() {
			this.$Request.post(this.$api.warn.commit, this.warnparams).then(res => {
				if (res.code == 200) {
					this.$toast.showSuccess(this.title + '成功');
					this.cancelWarn();
				} else {
					this.$toast.showFail(res.msg);
				}
			}).catch(() => {
				this.$toast.showException();
			});
		},
		cancelWarn() {
			uni.navigateBack({
				delta: 1
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.detail-content {
	height: 100vh;
	font-size: 34rpx;
	background: rgba(245, 245, 251, 1);
	.detail {
		height: 105rpx;
		display: flex;
		align-items: center;
		.line {
			display: inline-block;
			width: 6rpx;
			height: 36rpx;
			vertical-align: middle;
			margin: 0 30rpx 0 10rpx;
			background: rgba(67, 131, 228, 1);
		}
		.word {
			width: 30%;
			line-height: 110rpx;
			font-size: 36rpx;
			font-weight: bold;
			color: rgba(0, 0, 0, 1);
			line-height: 45px;
		}
	}
	.holder {
		font-size: 28rpx;
		color: rgba(178, 178, 178, 1);
		line-height: 40rpx;
	}
	textarea {
		width: 690rpx;
		height: 332rpx;
		margin-left: 30rpx;
		box-sizing: border-box;
		background: rgba(246, 246, 246, 1);
		font-size: 28rpx;
		line-height: 40rpx;
	}
	.btn {
		display: flex;
		justify-content: space-around;
		padding: 50rpx 0;
		button {
			font-size: 34rpx;
			width: 28%;
			height: 70rpx;
			line-height: 66rpx;
			color: rgba(67, 131, 228, 1);
			border-radius: 10rpx;
			border: 1px solid rgba(67, 131, 228, 1);
		}
		.active {
			background-color: rgba(67, 131, 228, 1);
			color: #fff;
		}
	}
}
</style>
