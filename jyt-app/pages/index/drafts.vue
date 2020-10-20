<template>
	<view class="drafts-content">
		<!-- 搜索 -->
		<view class="search-box">
			<view class="search">
				<icon :type="'search'" :size="iconSize" />
				<input type="text" v-model="queryInfo.searchValue" placeholder="搜索" placeholder-class="holder" confirm-type="search" @confirm="search" />
			</view>
		</view>
		<!-- 内容 -->
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<view class="cont-items" v-for="(item, index) in draftList" :key="index">
				<navigator :url="'./draftsDetail?id=' + item.orderId" hover-class="none">
					<view class="title">{{ item.artTitle }}</view>
					<view class="content">{{ item.artContent }}</view>
					<view class="boto">
						<text class="time">发布时间：{{ item.artPublishTime }}</text>
						<text class="source">{{ item.artSourceName }}</text>
					</view>
				</navigator>
				<view class="btn"><button @click="confirmDel(item.orderId)">删除</button></view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
export default {
	mixins: [MescrollMixin], // 使用mixin
	data() {
		return {
			queryInfo: {
				searchValue: '',
				pageNum: 1,
				pageSize: 5
			},
			iconSize: uni.upx2px(34),
			draftList: [],
			downOption: {
				auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
				native: false
			},
			upOption: {
				use: true,
				auto: false,
				page: {
					num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					size: 5 // 每页数据的数量,默认10
				},
				noMoreSize: 4, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
				empty: {
					tip: '暂无数据',
					 
				}
			}
		};
	},
	methods: {
		search() {
			this.queryInfo.pageNum = 1;
			this.downCallback();
		},
		getDraftList() {
			this.$Request
				.post(this.$api.draft.list, this.queryInfo)
				.then(res => {
					if (res.code == 200) {
						this.draftList = res.rows;
					} else {
						this.$toast.showFail(res.msg);
					}
				})
				.catch(e => {
					this.$toast.showException();
				});
		},
		downCallback() {
			this.mescroll.resetUpScroll();
		},
		upCallback(page) {
			this.queryInfo.pageNum = page.num;
			this.$Request
				.post(this.$api.draft.list, this.queryInfo)
				.then(res => {
					if (res.code == 200) {
						let curPageData = res.rows;
						let totalSize = res.total;
						let curPageLen = curPageData.length;
						let totalPage = (totalSize + this.queryInfo.pageSize - 1) / this.queryInfo.pageSize;
						if (page.num == 1) {
							this.draftList = []; //如果是第一页需手动置空列表
						}
						this.draftList = this.draftList.concat(curPageData); //追加新数据
						this.mescroll.endByPage(curPageLen, totalPage);
					} else {
						this.$toast.showFail(res.msg);
						this.mescroll.endErr();
					}
				})
				.catch(e => {
					console.log(e);
					this.$toast.showException();
					this.mescroll.endErr();
				});
		},
		confirmDel(orderId) {
			let that = this
			uni.showModal({
				title: '删除',
				content: '是否确认删除此数据？',
				success: function(e) {
					if (e.confirm) {
						that.$Request.get(that.$api.draft.delete(orderId)).then(res => {
							if (res.code == 200) {
								that.$toast.showSuccess('删除成功');
								that.getDraftList();
							} else {
								that.$toast.showFail(res.msg);
							}
						}).catch(e => {
							that.$toast.showException()
						})
					}
				}
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.drafts-content {
	height: 100%;
	font-size: 34rpx;
	background: rgba(245, 245, 251, 1);
}
.search-box {
	height: 99rpx;
	border-bottom: 1px solid rgba(231, 231, 231, 1);
	background-color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	.search {
		width: 690rpx;
		height: 60rpx;
		background: rgba(238, 238, 238, 1);
		border-radius: 30rpx;
		color: #b4b4b4;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		icon {
			position: relative;
			margin-left: 40rpx;
			width: 34rpx;
			height: 34rpx;
		}
		.holder {
			color: rgba(180, 180, 180, 1);
			font-size: 28rpx;
			line-height: 60rpx;
		}
		input {
			position: relative;
			width: 100%;
			margin-left: 20rpx;
			height: 60rpx;
			line-height: 60rpx;
			font-size: 28rpx;
			color: #353535;
		}
	}
}
.cont-items {
	width: 100%;
	height: 336rpx;
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
		color: #b2b2b2;
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
		border-top: 1rpx solid #e7e7e7;
		display: flex;
		align-items: center;
		button {
			position: absolute;
			right: 0;
			font-size: 28rpx;
			width: 127rpx;
			height: 60rpx;
			line-height: 60rpx;
			color: #F56C6C;
			border-radius: 10rpx;
			background-color: rgba(255,255,255,1);
			border: 1px solid #F56C6C;
		}
	}
}
</style>
