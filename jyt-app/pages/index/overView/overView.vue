<template>
		<view class="content">
			<navigator url="./statistics">
				<image src="../../../static/img/jiansuo/tjbackup.png"></image>
			</navigator>
			<navigator url="./trend">
				<image src="../../../static/img/jiansuo/peding.png"></image>
			</navigator>
			<navigator url="./willOverDue">
				<image src="../../../static/img/jiansuo/over.png"></image>
			</navigator>
			<navigator url="./overDue">
				<image src="../../../static/img/jiansuo/overbackup.png"></image>
			</navigator>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less">
  .content {
	  padding: 60rpx 56rpx 30rpx;
	  image{
		  display: block;
		  width: 638rpx;
		  height: 210rpx;
		  margin-bottom: 30rpx;
	  }
  }
</style>
