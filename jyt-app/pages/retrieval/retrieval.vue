<template>
	<view class="retrival-content">
		<!-- 搜索 -->
		 <view class="search-box">
			 <view class="search">
			 	<icon :type="'search'" :size="iconSize"/>
			 	<input type="text" v-model="queryInfo.searchValue" placeholder="搜索" placeholder-class="holder" confirm-type="search" @confirm="search" />
			 </view>	   	 
		 </view>
		 <!-- 检索条件 -->
		 <view class="condition">
		 	<!-- <view class="word">
				<text class="word-label">数据筛选 </text>
				<text v-if="showText" class="time-show">{{range[0]}} ~ {{range[1]}}</text>
		 	</view> -->
			<view class="items">
				<view class="label"> 
				    <view class="">
				     	时间筛选:
				     </view>
					<button :class="timeCheckIndex == 0 ? 'active' : ''" @click="handleTimeChange(0)">今日</button>
					<button :class="timeCheckIndex == 1 ? 'active' : ''" @click="handleTimeChange(1)">本周</button>
					<button :class="timeCheckIndex == 2 ? 'active' : ''" @click="handleTimeChange(2)">本月</button>
					<button :class="timeCheckIndex == 3 ? 'active' : ''" @click="handleTimeChange(3)">自定义</button>
				</view>
				<view class="label">
					<view class="">
						流程状态:
					</view>
					<button :class="statusCheckIndex == 0 ? 'active' : ''" @click="handleztChange(0)">全部</button>
					<button :class="statusCheckIndex == 1 ? 'active' : ''" @click="handleztChange(1)">待处理</button>
					<button :class="statusCheckIndex == 2 ? 'active' : ''" @click="handleztChange(2)">流转中</button>
					<button :class="statusCheckIndex == 3 ? 'active' : ''" @click="handleztChange(3)">已完结</button>
				</view>
			</view>
		 </view>
		<!-- <view class="rs-label">
			舆情列表
		 </view> -->
		 <!-- 内容 -->
		 <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
		  <view :class="item.leaderFlag == 1 ? 'cont-items' : 'cont-items no-agree'" v-for="(item, index) in opinionList" :key="index">
		  	<navigator :url="'/pages/ended/endedDetail?orderId=' + item.orderId + '&search=1'"  hover-class="none">
		 		<view class="title">
		 			{{ item.artTitle }}
		 		</view>
		 		<view class="content">
		 			{{ item.artContent }}
		 		</view>
		 		<view class="boto">
					<text class="time">发布时间：{{ item.artPublishTime }}</text>
		 		    <text class="source">{{ item.artSourceName == null ? '' : item.artSourceName }}</text>
		 		    <text class="type">{{ item.opinionTypeName == null ? '' : item.opinionTypeName }}</text>
		 		</view>
		 	</navigator>
		 	<view class="con-btn" v-if="item.leaderFlag == 1">
		 		<button class="agree">领导批示</button>	
		 	</view>
		  </view>
		 </mescroll-body>
		 <mx-date-picker
		 	:show="showPicker"
		 	:type="'range'"
		 	:value="range"
		 	:show-seconds="false"
		 	:showHoliday="false"
		 	:format="'yyyy-mm-dd'"
		 	@confirm="onSelectedTime"
		 	@cancel="onCancelTime"
		 />
	</view>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
import mxDatePicker from '@/components/mx-datepicker/mx-datepicker.vue';
import util from '@/common/util.js';
export default {
	mixins: [MescrollMixin], // 使用mixin
	components: { mxDatePicker },
	data() {
		return {
			queryInfo: {
			  searchValue: '',
			  beginTime: '',
			  endTime: '',
			  searchType: 4,
			  queryType: 0,
			  pageNum: 1,
			  pageSize: 5
			},
			iconSize: uni.upx2px(34),
			opinionList: [],
			showPicker: false,
			range: [],
			showText: false,
			timeCheckIndex: 1,
			statusCheckIndex: 0,
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
					tip: '暂无数据'
				}
			}, 
			date: {}
		}
	},
	onLoad() {
		var now = new Date()
		var nowDayOfWeek = now.getDay()
		var nowDay = now.getDate()
		var nowMonth = now.getMonth()
		var nowYear = now.getFullYear()
		this.date = {
			now: now,
			nowDayOfWeek: nowDayOfWeek, 
			nowDay: nowDay,
			nowMonth: nowMonth,
			nowYear: nowYear
		}
	},
	methods: {
		search() {
			this.queryInfo.pageNum = 1;
			this.downCallback();
		},
		getOpinionList() {
			this.$Request.post(this.$api.opinion.list, this.queryInfo).then(res => {
				if (res.code == 200) {
					this.opinionList = res.rows;
				} else {
					this.$toast.showFail(res.msg);
				}
			}).catch(e => {
				this.$toast.showException();
			});
		},
		downCallback() {
			this.mescroll.resetUpScroll();
		},
		upCallback(page) {
			this.queryInfo.pageNum = page.num;
			this.$Request.post(this.$api.opinion.list, this.queryInfo).then(res => {
				if (res.code == 200) {
					let curPageData = res.rows;
					let totalSize = res.total;
					let curPageLen = curPageData.length;
					let totalPage = (totalSize + this.queryInfo.pageSize - 1) / this.queryInfo.pageSize;
					if (page.num == 1) {
						this.opinionList = []; //如果是第一页需手动置空列表
					}
					this.opinionList = this.opinionList.concat(curPageData); //追加新数据
					this.mescroll.endByPage(curPageLen, totalPage);
				} else {
					this.$toast.showFail(res.msg);
					this.mescroll.endErr();
				}
			}).catch(e => {
				this.$toast.showException();
				this.mescroll.endErr();
			});
		},
		handleTimeChange(timeIndex) {
		  this.timeCheckIndex = timeIndex
		  var patten = 'yyyy-MM-dd'
		  switch (timeIndex) {
		    case 0: this.queryInfo.beginTime = util.dateFormat(this.date.now, patten); break;
		    case 1: this.queryInfo.beginTime = util.getWeekStartDate(this.date.nowYear, this.date.nowMonth, this.date.nowDay, this.date.nowDayOfWeek); break;
		    case 2: this.queryInfo.beginTime = util.getMonthStartDate(this.date.nowYear, this.date.nowMonth); break;
		    case 3: break;
		  }
		  if (timeIndex != 3) {
		    this.queryInfo.endTime = util.dateFormat(this.date.now, patten)
			this.showText = false
			this.range = []
			this.downCallback()
		  } else {
			  this.showPicker = true
		  }
		},
		handleztChange(ztIndex) {
		  this.statusCheckIndex = ztIndex
		  this.queryInfo.queryType = ztIndex
		  this.downCallback()
		},
		onSelectedTime(e) {
			this.showPicker = false
			this.range = e.value
			this.showText = true
			this.queryInfo.beginTime = e.value[0]
			this.queryInfo.endTime = e.value[1]
			this.search()
		},
		onCancelTime() {
			this.showPicker = false;
		}
	}
}
</script>

<style lang="scss" scoped>
.retrival-content {
   height: 100%;
   font-size: 34rpx;
   background: rgba(245, 245, 251, 1);
}
.search-box {
	height: 100rpx;
	border-bottom: 1px  solid rgba(231,231,231,1);
	box-sizing: border-box;
	background-color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	.search {
		width: 690rpx;
		height: 60rpx;
		box-sizing: border-box;
		background:rgba(238,238,238,1);
		border-radius:30rpx;
		color: #B4B4B4;
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
.condition {
	width: 100%;
	height: 165rpx;
	padding:  30rpx 0;
	background-color: #fff;
	border-bottom:1px solid rgba(231,231,231,1);
	.word {
		height: 84rpx;
		padding-left: 30rpx;
		display: flex;
		flex-direction: row;
		.word-label {
			height: 84rpx;
			color: rgba(153,153,153,1);
			line-height: 84rpx;
		}
		.time-show {
			height: 84rpx;
			width: 530rpx;
			line-height: 84rpx;
			font-size: 28rpx;
			color: #333333;
			text-align: right;
		}
	}
	.items {
		font-size: 28rpx;
		width: 100%;
		height: 80rpx;
		.label {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			line-height: 80rpx;
			padding-left: 30rpx;
			button {
				margin: 10rpx;
				padding: 0;
				width: 120rpx;
				height: 60rpx;
				box-sizing: border-box;
				line-height: 56rpx;
				border-radius: 10rpx;
				color: rgba(67,131,228,1);
				border: 2rpx solid rgba(67,131,228,1);	
				font-size: 28rpx;
				background-color: #fff;
			}
			.active {
				background-color: rgba(67,131,228,1);
				color: #fff;
			}
		}
	}
}
.rs-label {
	height: 84rpx;
	color: rgba(153,153,153,1);
	line-height: 84rpx;
	padding-left: 30rpx;
	background-color: #fff;
}
.cont-items {
	width: 100%;
	height: 305rpx;
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
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		.source {
			color: #4383e4;
			padding: 0 15rpx;
		}
		.opt-type {
			color: #1DA362;
		}
	}
	.con-btn {
		.agree {
			display: inline-block;
			width: 130rpx;
			height: 50rpx;
			line-height: 50rpx;
			font-size: 24rpx;
			color: #fff;
			border-radius: 10rpx;
			background: rgba(67,131,228,1);
			padding: 0;
		}
	}
}
.no-agree {
	height: 255rpx;
}
</style>