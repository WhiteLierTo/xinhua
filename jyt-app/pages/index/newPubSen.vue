<template>
	<view class="add-content" v-if="showContent">
		<view class="item">
			<text class="xing">*</text>
			<text class="label">文章标题</text>
			<input type="text" v-model="formData.artTitle" placeholder="请输入文章标题" placeholder-class="holder" />
		</view>
		<view class="item">
			<text class="xing">*</text>
			<text class="label">数据来源</text>
			<view class="picker">
				<picker mode="selector" @change="bindPickerChange" :value="index" :range="type">
					<view class="uni-input">{{ type[index] }}</view>
					<image class="right" src="../../static/img/right.png" mode=""></image>
				</picker>
			</view>
			 
		</view>
		<view class="item">
			<text class="xing">*</text>
			<text class="label">来源渠道</text>
			<input type="text" v-model="formData.siteName" placeholder="请输入来源平台名称" />
		</view>
		<view class="item">
			<text class="xing">*</text>
			<text class="label">原文链接</text>
			<input type="text" v-model="formData.artUrl" placeholder="请输入文章的原文链接" />
		</view>
		<view class="item">
			<text class="xing">*</text>
			<text class="label">发布时间</text>
			<view class="datetime"  @click="onShowDatePicker()">
				<text v-if="formData.artPublishTime == ''">请选择发布时间</text>
				<text v-else>{{ formData.artPublishTime }}</text>
				<image class="right" src="../../static/img/right.png" mode=""></image>
			</view>
		</view>
		<view class="neirong">
			<view class="item1">
				<text class="xing">*</text>
				<text class="label">文章内容</text>
			</view>
			<view class="content">
				<textarea  style="overflow-y:scroll"   v-model="formData.artContent" placeholder="请输入文章内容" v-if="showText" maxlength="-1" />
				<view v-else class="area-place">{{ formData.artContent }}</view>
			</view>
			</text>
		</view>

		<view class="btn">
			<button form-type="submit" :disabled="isLoading" @click="formSubmit(1)">保存草稿</button>
			<button form-type="submit" class="active" :disabled="isLoading" @click="formSubmit(2)" v-if="formData.submitType == 1 || formData.orderStatus == 1">提交</button>
			<button form-type="submit" class="active" :disabled="isLoading" @click="formSubmit(3)" v-else>上报</button>
			<button @click="cancelDraft">取消</button>
		</view>
		<mx-date-picker
			:show="showPicker"
			:type="'datetime'"
			:value="pickDate"
			:show-seconds="true"
			:showHoliday="false"
			clearable
			:format="'yyyy-mm-dd hh:ii:ss'"
			@confirm="onSelectedTime"
			@cancel="onCancelTime"
		/>
	</view>
</template>

<script>
import mxDatePicker from '@/components/mx-datepicker/mx-datepicker.vue';
import uniCombox from '@/components/uni-combox/uni-combox';
import graceChecker from '@/common/graceChecker.js';
import util from '@/common/util.js';
export default {
	components: { uniCombox, mxDatePicker },
	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			showContent: false,
			isLoading: false,
			type: ['请选择来源'],
			index: 0,
			showPicker: false,
			pickDate: '',
			showText: true,
			formData: {
				orderId: '',
				artTitle: '',
				artSource: '',
				siteName: '',
				artUrl: '',
				artPublishTime: '',
				artContent: '',
				saveType: 0,
				submitType: 1
			}
		};
	},
	onLoad(params) {
		if (params.type == 0) {
			uni.setNavigationBarTitle({
				title: '舆情上报'
			})
		}
		this.initParams(params);
	},
	methods: {
		async initParams(params) {
			if (params.type) {
				this.formData.submitType = params.type;
			}
			if (params.id) {
				this.formData.orderId = params.id;
			}
			(this.nowDate = util.dateFormat(new Date(), 'yyyy-MM-dd HH:mm:ss')), await this.getType();
			if (this.formData.orderId == '') {
				this.showContent = true
			}
			this.getDraftDetail();
		},
		getType() {
			this.$Request.get(this.$api.common.getDicts('opinion_source')).then(res => {
				const len = res.data.length;
				for (var i = 0; i < len; i++) {
					this.type.push(res.data[i].dictLabel);
				}
			});
		},
		getDraftDetail() {
			if (this.formData.orderId != '') {
				this.$Request.get(this.$api.draft.detail(this.formData.orderId)).then(res => {
					if (res.code == 200) {
						this.index = res.data.artSource;
						this.formData = {
							orderId: res.data.orderId,
							artTitle: res.data.artTitle,
							artSource: res.data.artSource + '',
							siteName: res.data.siteName,
							artUrl: res.data.artUrl,
							artPublishTime: res.data.artPublishTime,
							artContent: res.data.artContent,
							saveType: null,
							orderStatus: res.data.orderStatus,
							submitType: res.data.orderStatus
						}
						this.showContent = true
					} else {
						this.$toast.showFail(res.msg);
					}
				}).catch(e => {
					this.$toast.showException();
				})
			}
		},
		onShowDatePicker() {
			this.showText = false;
			this.showPicker = true;
			this.value = this.nowDate;
		},
		onSelectedTime(e) {
			this.showText = true;
			this.showPicker = false;
			this.pickDate = e.value;
			this.formData.artPublishTime = e.value;
		},
		onCancelTime() {
			this.showText = true;
			this.showPicker = false;
		},
		formSubmit(saveType) {
			const rule = [
				{
					name: 'artTitle',
					checkType: 'notnull',
					errorMsg: '请输入文章标题'
				},
				{
					name: 'artSource',
					checkType: 'notnull',
					errorMsg: '请选择数据来源'
				},
				{
					name: 'siteName',
					checkType: 'notnull',
					errorMsg: '请输入来源平台名称'
				},
				{
					name: 'artUrl',
					checkType: 'notnull',
					errorMsg: '请输入文章的原文链接'
				},
				{
					name: 'artPublishTime',
					checkType: 'notnull',
					errorMsg: '请选择发布时间'
				},
				{
					name: 'artContent',
					checkType: 'notnull',
					errorMsg: '请输入文章内容'
				}
			];
			const checkRes = graceChecker.check(this.formData, rule);
			if (checkRes) {
				this.isLoading = true;
				this.formData.saveType = saveType;
				this.$Request
					.post(this.$api.draft.saveCommit, this.formData)
					.then(res => {
						if (res.code == 200) {
							uni.redirectTo({
								url: '/pages/index/drafts'
							});
							this.$store.dispatch('GetPendCount', 1)
						} else {
							this.$toast.showFail(res.msg);
							this.isLoading = false;
						}
					})
					.catch(e => {
						this.$toast.showException();
						this.isLoading = false;
					});
			} else {
				this.$toast.showFail(graceChecker.error);
				this.isLoading = false;
			}
		},
		bindPickerChange(e) {
			this.index = e.target.value;
			this.formData.artSource = e.target.value;
		},
		cancelDraft() {
			uni.reLaunch({
				url: '/pages/index/index'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.add-content {
	font-size: 34rpx;
}
.item {
	position: relative;
	display: flex;
	width: 100%;
	height: 88rpx;
	line-height: 88rpx;
	padding: 0 30rpx;
	box-sizing: border-box;
	border-bottom: 1px solid rgba(231, 231, 231, 1);
	align-items: center;
	.xing {
		width: 4%;
		color: red;
	}
	.label {
		width: 20%;
	}
	input {
		width: 75%;
		text-align: right;
		height: 45rpx;
		line-height: 45rpx;
		font-size: 32rpx;
	}
	.datetime {
		width: 60%;
	}
	.holder {
		height: 45rpx;
		font-size: 32rpx;
		color: #b2b2b2;
	}
	 
	.picker,
	.datetime{
		width: 70%;
		text-align: right;
		.right {
			position: absolute;
			right: 30rpx;
			top: 30rpx;
			width: 16rpx;
			height: 26rpx;
		}
	}
	
}
.neirong {
	.item1 {
		display: flex;
		width: 100%;
		height: 88rpx;
		font-size: 34rpx;
		line-height: 88rpx;
		padding: 0 30rpx;
	}
	.xing {
		width: 4%;
		color: red;
	}
	.label {
		width: 50%;
	}
	.content {
		height: 332rpx;
		overflow: hidden;
		width: 690rpx;
		margin: 0 30rpx;
		padding: 30rpx;
		box-sizing: border-box;
		background: rgba(246, 246, 246, 1);
		textarea {
			width: 100% !important;
			height: 100% !important;
		}
	}
	.area-place {
		position: relative;
		margin-left: 30rpx;
		padding: 30rpx;
		box-sizing: border-box;
		width: 690rpx;
		height: 332rpx;
		background: rgba(246, 246, 246, 1);
		overflow: hidden;
	}
}
.btn {
	display: flex;
	justify-content: space-around;
	padding: 50rpx 0;
	button {
		font-size: 34rpx;
		width: 28%;
		height: 70rpx;
		line-height: 66rpx;
		color: rgba(67, 131, 228, 1);
		border-radius: 10rpx;
		border: 1px solid rgba(67, 131, 228, 1);
		background-color: rgba(255,255,255,1);
	}
	.active {
		background-color: rgba(67, 131, 228, 1);
		color: #fff;
		border: none;
	}
}
</style>
