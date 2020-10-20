<script>
	export default {
		onLaunch: function() {

		},
		onShow: function() {
			// if (this.$permit.checkRole(['leader'])) {
			// 	this.$store.dispatch('GetPendCount', 2).then(res => {
			// 		if (res.data) {
			// 			/*设置角标*/
			// 			uni.setTabBarBadge({
			// 				index: 2,
			// 				text: res.data.toString()
			// 			})
			// 		} else {
			// 			/**移除角标*/
			// 			uni.removeTabBarBadge({
			// 				index: 2
			// 			})
			// 		}
			// 	})
			// } else {
			// 	this.$store.dispatch('GetPendCount', 1).then(res => {
			// 		if (res.data) {
			// 			/*设置角标*/
			// 			uni.setTabBarBadge({
			// 				index: 2,
			// 				text: res.data.toString()
			// 			})
			// 		} else {
			// 			/**移除角标*/
			// 			uni.removeTabBarBadge({
			// 				index: 2
			// 			})
			// 		}
			// 	})
			// }
		},
		onHide: function() {
			console.log('App Hide')
			/**移除角标*/
			uni.removeTabBarBadge({
				index: 2
			})
		},
	}
</script>
<style>
	uni-tabbar .uni-tabbar__icon {
		width: 40rpx;
		height: 40rpx;
	}

	uni-tabbar .uni-tabbar__label {
		font-size: 18rpx !important;
	}

	button::after {
		border: 1px solid transparent;
	}
</style>
