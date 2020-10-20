<template>
	<view :class="{ 'uni-collapse-cell--disabled': disabled,'uni-collapse-cell--notdisabled': !disabled, 'uni-collapse-cell--open': isOpen,'uni-collapse-cell--hide':!isOpen }"
	 class="uni-collapse-cell">
		<view class="uni-collapse-cell__title" @click="onClick">
			<image v-if="thumb" :src="thumb" class="uni-collapse-cell__title-img" />
			<text class="uni-collapse-cell__title-text"><text>{{ title }}</text></text>
			<text class="uni-collapse-cell__title-content">{{ content }}</text>
			<text class="uni-collapse-cell__title-opt" v-if="operate">{{ operate }}</text>
			<view class="uni-collapse-cell__title-icon">
				<image src="../../static/img/distribute.png"></image>
			</view>
<!-- 			<uni-icons :class="{ 'uni-collapse-cell__title-arrow-active': isOpen, 'uni-collapse-cell--animation': showAnimation === true }"
			 class="uni-collapse-cell__title-arrow" color="#bbb" size="20" type="arrowdown" /> -->
		</view>
		<view :class="{'uni-collapse-cell__content--hide':!isOpen}" class="uni-collapse-cell__content">
			<view :class="{ 'uni-collapse-cell--animation': showAnimation === true }" class="uni-collapse-cell__wrapper" :style="{'transform':isOpen?'translateY(0)':'translateY(-50%)','-webkit-transform':isOpen?'translateY(0)':'translateY(-50%)'}">
				<slot />
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from '../uni-icons/uni-icons.vue'
	export default {
		name: 'UniCollapseItem',
		components: {
			uniIcons
		},
		props: {
			title: {
				// 列表标题
				type: String,
				default: ''
			},
			content: {
				type: String,
				default: ''
			},
			operate: {
				type: String,
				default: ''
			},
			name: {
				// 唯一标识符
				type: [Number, String],
				default: 0
			},
			disabled: {
				// 是否禁用
				type: Boolean,
				default: false
			},
			showAnimation: {
				// 是否显示动画
				type: Boolean,
				default: false
			},
			open: {
				// 是否展开
				type: Boolean,
				default: false
			},
			thumb: {
				// 缩略图
				type: String,
				default: ''
			}
		},
		data() {
			return {
				isOpen: false
			}
		},
		watch: {
			open(val) {
				this.isOpen = val
			}
		},
		inject: ['collapse'],
		created() {
			this.isOpen = this.open
			this.nameSync = this.name ? this.name : this.collapse.childrens.length
			this.collapse.childrens.push(this)
			if (String(this.collapse.accordion) === 'true') {
				if (this.isOpen) {
					let lastEl = this.collapse.childrens[this.collapse.childrens.length - 2]
					if (lastEl) {
						this.collapse.childrens[this.collapse.childrens.length - 2].isOpen = false
					}
				}
			}
		},
		methods: {
			onClick() {
				if (this.disabled) {
					return
				}
				if (String(this.collapse.accordion) === 'true') {
					this.collapse.childrens.forEach(vm => {
						if (vm === this) {
							return
						}
						vm.isOpen = false
					})
				}
				this.isOpen = !this.isOpen
				this.collapse.onChange && this.collapse.onChange()
				this.$forceUpdate()
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/uni.scss';

	.uni-collapse-cell {
		flex-direction: column;
		border: 1rpx solid #E7E7E7;
		box-sizing: border-box;
	}

	.uni-collapse-cell--hover {
		background-color: $uni-bg-color-hover;
	}

	.uni-collapse-cell--open {
		background-color: $uni-bg-color-hover;
	}

	.uni-collapse-cell--disabled {
		background-color: $uni-bg-color-hover;
		// opacity: 0.3;
	}


	.uni-collapse-cell--hide {
		height: 84rpx;
	}

	.uni-collapse-cell--animation {
		// transition: transform 0.3s ease;
		transition-property: transform;
		transition-duration: 0.3s;
		transition-timing-function: ease;
	}

	.uni-collapse-cell__title {
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		width: 100%;
		box-sizing: border-box;
		/* #endif */
		height: 84rpx;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		transform-origin: center center;
	}

	.uni-collapse-cell__title:active {
		background-color: $uni-bg-color-hover;
	}

	.uni-collapse-cell__title-img {
		height: $uni-img-size-base;
		width: $uni-img-size-base;
		margin-right: 10rpx;
	}

	.uni-collapse-cell__title-arrow {
		width: 20rpx;
		height: 20rpx;
		transform: rotate(0deg);
		transform-origin: center center;

	}

	.uni-collapse-cell__title-arrow-active {
		transform: rotate(180deg);
	}

	.uni-collapse-cell__title-text {
		width: 33%;
		font-size: $uni-font-size-base;
		height: 84rpx;
		padding: 0 10rpx;
		display: flex;
		align-items: center;
	}
	
	.uni-collapse-cell__title-content {
		width: 43%;
		font-size: $uni-font-size-base;
		height: 84rpx;
		display: flex;
		align-items: center;
	}
	.uni-collapse-cell__title-opt {
		width: 19%;
		font-size: $uni-font-size-base;
		height: 84rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.uni-collapse-cell__title-icon {
		width: 5%;
		padding-right: 5rpx;
		image {
			width: 31rpx;
			height: 31rpx;
		}
	}
	.uni-collapse-cell__content {
		overflow: hidden;
	}

	.uni-collapse-cell__wrapper {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
	}

	.uni-collapse-cell__content--hide {
		height: 0px;
		line-height: 0px;
	}
</style>
