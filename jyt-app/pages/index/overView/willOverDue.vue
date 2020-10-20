<template>
	<view class="pending-content">
		<mescroll-empty v-if="emptyShow"></mescroll-empty>
		<!-- 内容 -->
			<view class="cont-items" v-for="(item, index) in willDue" :key="index">
				<navigator :url="'../../processing/processingDetail?orderId=' + item.orderId" hover-class="none">
					<view class="title">{{item.artTitle}}</view>
					<view class="content">
					{{item.artContent}}
				</view>
				<view class="boto"><text class="time">发布时间：{{item.artPublishTime}}</text></view>
				</navigator>
				<view class="btn"><button @click="openWarn(item.processId, item.operatorDeptId)">催办</button></view>
			</view>
	</view>
</template>

<script>
import MescrollEmpty from '@/components/mescroll-uni/components/mescroll-empty.vue';
export default {
	components: { MescrollEmpty },
	data() {
		return {
			willDue: [],
			emptyShow: false,
		}
	},
	methods: {
		showWarn() {
			this.$Request.get(this.$api.work.timeList).then(res => {
				if (res.code == 200) {
					const data = res.data
					const len = data.length
					for (var i = 0; i < len; i++) {
						if (data[i].timeStatus == 1) {
						  this.willDue.push(data[i])
						}
					}
					if (this.willDue.length == 0) {
						this.emptyShow = true
					}
				} else {
					this.$toast.showFail(res.msg)
				}
			}).catch(e => {
				this.$toast.showException()
			})
		},
		openWarn(pid, did) {
			uni.navigateTo({
				url: '/pages/warn/warn?type=1&pid=' + pid + '&did=' + did
			})
		}
	},
	onLoad() {
		this.showWarn()
	}
};
</script>

<style lang="scss" scoped>
.pending-content {
	height: 100%;
	font-size: 34rpx;
	background: rgba(245, 245, 251, 1);
	.mescroll-empty {
		height: 100vh !important;
	}
}
.cont-items {
	width: 100%;
	height: 339rpx;
	padding: 0 30rpx;
	margin-bottom: 30rpx;
	background-color: #fff;
	box-sizing: border-box;
	.title {
		// 单行文本一处隐藏
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		height: 78rpx;
		font-size: 32rpx;
		color: #353535;
		position: relative;
		top: 31rpx;
	}
	.content {
		font-size: 28rpx;
		color: #B2B2B2;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		height: 80rpx;
		line-height: 40rpx;
		position: relative;
		top: 6rpx;
	}
	.boto {
		font-size: 26rpx;
		font-weight: 400;
		color: rgba(105, 128, 171, 1);
		line-height: 73rpx;
		height: 73rpx;
		.time {
			display: inline-block;
			width: 60%;
		}
		.source {
			color: #4383e4;
		}
	}
	.btn {
		position: relative;
		height: 99rpx;
		border-top: 1rpx solid #E7E7E7;
		display: flex;
		align-items: center;
		button {
			position: absolute;
			right: 30rpx;
			font-size: 28rpx;
			color: #fff;
			width: 127rpx;
			height: 60rpx;
			line-height: 60rpx;
			border-radius: 10rpx;
			background: #4383E4;
		}
	}
}
</style>
