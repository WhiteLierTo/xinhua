<template>
	<scroll-view class="qiun-columns" :scroll-y="true">
		<view class="qiun-charts">
			<canvas canvasId="trend" id="trend" />
			<slot />
		</view>
		<!-- 表格 -->
		<view class="tableBox">
			<view class="t-th">
				<text>序号</text>
				<text>日期</text>
				<text>待处理数</text>
			</view>
			<view class="t-tr" v-for="(item, index) in tableList" :key="index">
				<text>{{ index + 1 }}</text>
				<text>{{ item.createTime }}</text>
				<text>{{ item.pendNum }}</text>
			</view>
		</view>
	</scroll-view>
</template>

<script>
import uCharts from '@/components/u-charts/u-charts.min.js';
export default {
	data() {
		return {
			tableList: [],
			xData: [],
			yData: [],
			lineData: [],
			cWidth: 0,
			cHeight: 0
		};
	},
	onLoad() {
		this.cWidth = uni.upx2px(700);
		this.cHeight = uni.upx2px(647);
		this.getTrend();
	},
	methods: {
		getTrend() {
			this.$Request.get(this.$api.work.trend).then(res => {
				if (res.code == 200) {
					var data = res.data;
					for (var i = 0; i < data.length; i++) {
						this.tableList.push({
							createTime: data[i].createTime,
							pendNum: data[i].pendNum
						})
						this.xData.push(data[i].createTime.substr(5));
						this.yData.push(data[i].pendNum);
					}
					this.lineData.push({
						color: '#4383E4',
						data: this.yData
					})
					this.initTrend()
				} else {
					this.$toast.showFail(res.msg);
				}
			}).catch(e => {
				this.$toast.showException();
			});
		},
		initTrend() {
			new uCharts({
				$this: this,
				canvasId: 'trend',
				type: 'line',
				fontSize: 12,
				legend: {show: false},
				padding: [30, 10, 10, 15],
				dataLabel: false,
				dataPointShape: true,
				background: '#FFFFFF',
				categories: this.xData,
				series: this.lineData,
				animation: true,
				xAxis: {
					disableGrid: true,
					rotateLabel: true,
					boundaryGap: 'justify',
					axisLineColor: '#DEDEDE'
				},
				yAxis: {
					format: (val) => { return val.toFixed(1) }
				},
				width: this.cWidth,
				height: this.cHeight,
				extra: {
					line:{
						type: 'straight'
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.qiun-charts {
	width: 750rpx;
	height: 647rpx;
	background-color: #ffffff;
	canvas {
		width: 100%;
		height: 100%;
	}
}
.tableBox {
	padding: 60rpx 30rpx;
	.t-th {
		font-size: 32rpx;
		font-weight: 400;
		color: #666666;
		height: 70rpx;
		line-height: 45rpx;
		border: 1rpx solid #cdcdcd;
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
		border-bottom: 1rpx solid #cdcdcd;
		border-left: 1rpx solid #cdcdcd;
		border-right: 1rpx solid #cdcdcd;
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
