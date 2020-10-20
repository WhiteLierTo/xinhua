<template>
	<view class="page-content">
		<view class="index-content">
			<uni-grid :column="3" :showBorder="false">
				<uni-grid-item v-for="(item, index) in menus" :key="index">
					<view :class="'item ' + item.class" @click="gotoTarget(item.page, item.isTab)">
						<text class="tips" v-if="item.name==='待处理'&&getWaitNum">{{getWaitNum}}</text>
						<text class="tips" v-else-if="item.name==='待批示'&&getVerifyNum">{{getVerifyNum}}</text>
						<image :src="item.img" />
						<text>{{item.name != 'fill' ? item.name : ''}}</text>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>
	</view>
</template>

<script>
	import uniGrid from '@/components/uni-grid/uni-grid.vue';
	import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue';
	import util from '@/common/util.js';
	import {
		mapState
	} from 'vuex'
	export default {
		components: {
			uniGrid,
			uniGridItem
		},
		data() {
			return {
				menus: [],
			}
		},
		onLoad() {
			if (this.$permit.checkRole(['leader'])) {
				uni.setTabBarItem({
					index: 2,
					text: '待批示'
				})
				this.$store.dispatch('GetPendCount', 2)
			} else {
				uni.setTabBarItem({
					index: 2,
					text: '待处理'
				})
				this.$store.dispatch('GetPendCount', 1)
			}
			this.getUserRouters()
		},
		computed: {
			...mapState(['waitNum', 'verifyNum']),
			getWaitNum() {
				let count;
				if (this.waitNum > 99) {
					count = "99+"
				} else {
					count = this.waitNum
				}
				return count
			},
			getVerifyNum() {
				let count;
				if (this.verifyNum > 99) {
					count = "99+"
				} else {
					count = this.verifyNum
				}
				return count
			}
		},
		methods: {
			getUserRouters() {
				this.$Request.get(this.$api.routers).then(res => {
					if (res.code == 200) {
						const len = res.data.length
						for (var i = 0; i < len; i++) {
							if (res.data[i].meta.title == '舆情检索') {
								continue
							}
							var menuObj = util.getMenu(res.data[i].meta.title)
							if (menuObj != null) {
								this.menus.push(menuObj)
							}
						}
						const curLen = 9 - this.menus.length
						if (curLen > 0) {
							for (var i = 0; i < curLen; i++) {
								this.menus.push({
									name: "fill"
								})
							}
						}
						const nineLen = this.menus.length
						for (var i = 0; i < nineLen; i++) {
							if (i == 0 || i == 1 || i == 3 || i == 4) {
								this.menus[i].class = 'right-border bottom-border'
							} else if (i == 2 || i == 5) {
								this.menus[i].class = 'bottom-border'
							} else if (i == 6 || i == 7) {
								this.menus[i].class = 'right-border'
							}
						}
					} else {
						this.$toast.showFail(res.msg)
					}
				}).catch(e => {
					this.$toast.showException()
				})
			},
			gotoTarget(target, isTab) {
				if (isTab) {
					uni.switchTab({
						url: target
					})
				} else {
					uni.navigateTo({
						url: target
					})
				}
			}
		}
	};
</script>

<style lang="less" scoped>
	.page-content {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;

		.index-content {
			width: 690rpx;
			height: 100%;
			padding-top: 100rpx;

			.uni-grid-item {
				height: 360rpx !important;
			}

			.right-border {
				border-right: 1rpx solid #F2F2F2;
			}

			.bottom-border {
				border-bottom: 1rpx solid #F2F2F2;
			}

			.item {
				width: 100%;
				height: 100%;
				display: flex;
				flex-flow: column;
				align-items: center;
				justify-content: center;

				image {
					width: 80rpx;
					height: 80rpx;
				}

				text {
					font-size: 24rpx;
					color: rgba(102, 102, 102, 1);
					line-height: 33rpx;
					padding-top: 20rpx;
				}

				.tips {
					position: absolute;
					right: 70rpx;
					top: 47rpx;
					width: 35rpx;
					height: 20rpx;
					line-height: 0rpx;
					text-align: center;
					background-color: #ff0000;
					color: #FFFFFF;
					border-radius: 50%;
				}
			}
		}
	}
</style>
