<template>
	<view>
		<view class="qiun-charts" >
			<canvas canvasId="pieStatis" id="pieStatis" />
			<slot />
		</view>
		<!-- 表格 -->
		<view class="tableBox">
			<view class="t-th">
				<text>类型</text>
				<text>数量</text>
				<text>任务占比</text>
			</view>
			<view class="t-tr" v-for="item in tableList" :key="item.id">
				<text>{{item.type}}</text>
				<text>{{item.num}}</text>
				<text>{{item.percent}}%</text>
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.min.js';
	export default {
		data() {
			return {
				tableList: [],
				pieData: [],
				cWidth: 0,
				cHeight: 0,
				labelWidth: 0,
				ringWidth: 0
			}
		},
		onLoad() {
			this.cWidth = uni.upx2px(750)
			this.cHeight = uni.upx2px(647)
			this.labelWidth = uni.upx2px(20)
			this.ringWidth = uni.upx2px(100)
			this.getStatis()
		},
		methods: {
			getStatis() {
				this.$Request.get(this.$api.work.statis).then(res => {
					if (res.code == 200) {
						const totalNum = res.data.totalNum
						const pendNum = res.data.pendNum
						const pendPer = pendNum == 0 ? 0 : parseFloat((pendNum / totalNum * 100).toFixed(1))
						const processNum = res.data.processNum
						const processPer = processNum == 0 ? 0 : parseFloat((processNum / totalNum * 100).toFixed(1))
						const draftNum = res.data.draftNum
						const draftPer = draftNum == 0 ? 0 : parseFloat((100 - pendPer - processPer).toFixed(1))
						
						this.tableList.push({
							id: 1,
							type: '待处理',
							num: pendNum,
							percent: pendPer
						})
						this.tableList.push({
							id: 2,
							type: '流转中',
							num: processNum,
							percent: processPer
						})
						this.tableList.push({
							id: 3,
							type: '草稿箱',
							num: draftNum,
							percent: draftPer
						})
						this.pieData.push({
							name: '待处理',
							data: pendNum
						})
						this.pieData.push({
							name: '流转中',
							data: processNum
						})
						this.pieData.push({
							name: '草稿箱',
							data: draftNum
						})
						this.initPie()
					} else {
						this.$toast.showFail(res.msg)
					}
				}).catch(e => {
					this.$toast.showException()
				})
			},
			initPie() {
				new uCharts({
					$this: this,
					canvasId: 'pieStatis',
					type: 'ring',
					colors: ['#5B8FF9', '#73DEB3', '#F9BF3F'],
					width: this.cWidth,
					height: this.cHeight,
					legend: true,
					fontSize: 16,
					background: '#FFFFFF',
					animation: true,
					series: this.pieData,
					dataLabel: true,
					extra: {
						pie: {
						  labelWidth: this.labelWidth,
						  ringWidth: this.ringWidth
						}
					},
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.qiun-charts {
		width: 750rpx;
		height: 647rpx;
		background-color: #FFFFFF;
		canvas {
			width: 100%;
			height: 100%;
		}
	}
	.tableBox {
		padding: 30rpx;
		.t-th {
			font-size: 32rpx;
			font-weight: 400;
			color: #666666;
			height: 70rpx;
			line-height: 45rpx;
			border: 1rpx solid #CDCDCD;
			display: flex;
			flex-flow: row;
			align-items: center;
			text-align: center;
			text {
				flex: 1;
			}
		}
		.t-tr {
			height: 70rpx;
			font-size: 32rpx;
			line-height: 45rpx;
			color: #333333;
			border-bottom: 1rpx solid #CDCDCD;
			border-left: 1rpx solid #CDCDCD;
			border-right: 1rpx solid #CDCDCD;
			display: flex;
			flex-flow: row;
			align-items: center;
			text-align: center;
			text {
				flex: 1;
			}
		}
	}
</style>
