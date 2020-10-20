<template>
	<view class="article-content">
		<view class="content">
			{{articleContent}}
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				articleContent:""
			}
		},
    	onLoad(option){
			this.articleContent=option.info
	    }
	}
</script>

<style lang="less" scoped>
	.article-content {
		padding: 30rpx;
		box-sizing: border-box;
		.content {
			width:688rpx;
			text-indent: 2rem;
			color:rgba(53,53,53,1);
			line-height:44rpx;
			word-break:break-all;
		}
	}
</style>
