<template>
	<view class="detail-content">
		<view class="base-info" v-if="baseInfo">
			<view class="detail">
				<text class="line"></text>
				<text class="word">基本信息 </text>
			</view>
			<view class="title">{{ baseInfo.artTitle }}</view>
			<view class="content">{{ baseInfo.artContent }}</view>
			<view class="boto">
				<text>发布时间：{{ baseInfo.artPublishTime }}</text>
				<text class="source">{{ baseInfo.artSourceName }}</text>
				<text class="type">{{ baseInfo.opinionTypeName }}</text>
			</view>
			<view class="link">
				<text class="label">原文链接：</text>
				<text class="source">{{ baseInfo.artUrl }}</text>
				<text class="copy" @click="copyClipboard(baseInfo.artUrl)">复制</text>
			</view>
		</view>
		<!-- 领导批示 -->
		<view class="process-details" v-if="baseInfo && baseInfo.leaderReplyUserName != null">
			<view class="detail">
				<text class="line"></text>
				<text class="word">领导批示</text>
			</view>
			<view>
				<view class="detail-item">
					<view class="item-node">申请人</view>
					<view class="item-time">时间</view>
				</view>
				<uni-collapse class="detail-collapse">
					<uni-collapse-item :title="baseInfo.leaderApplyUserName" :content="baseInfo.leaderApplyTime">
						<view class="item-cont">
							<text class="item-label">请示内容：</text>
							<text class="item-value">{{ baseInfo.leaderApplyContent }}</text>
						</view>
						<view class="item-cont">
							<text class="item-label">领导批示：</text>
							<text class="item-value">{{ baseInfo.leaderReplyContent }}</text>
						</view>
					</uni-collapse-item>
				</uni-collapse>
			</view>
		</view>
		<!-- 流程明细 -->
		<view class="process-details">
			<view class="detail">
				<text class="line"></text>
				<text class="word">流程明细</text>
			</view>
			<view class="detail-case" v-for="(process, idx) in flowInfo" :key="idx">
				<view class="detail-item">
					<view class="item-node">流程节点</view>
					<view class="item-time">时间</view>
					<view class="item-opt">操作</view>
				</view>
				<uni-collapse class="detail-collapse" v-for="(item, index) in process.processList" :key="index">
					<uni-collapse-item :title="cur.operatorDeptName" :content="cur.createTime" :operate="cur.operatorTypeName" v-for="(cur, i) in item.taskList"
					 :key="i">
						<view class="item-cont" v-if="cur.receiveDeptName != null && cur.receiveDeptName != ''">
							<text class="item-label">接收单位：</text>
							<text class="item-value">{{ cur.receiveDeptName }}</text>
						</view>
						<!-- 任务类型 -->
						<view class="item-cont" v-if="item.taskLevelName != null">
							<text class="item-label">任务类型：</text>
							<text class="item-value">{{ item.taskLevelName }}</text>
						</view>
						<!-- 处置时限 -->
						<view class="item-cont" v-if="item.timeLimitTxt != null">
							<text class="item-label">处置时限：</text>
							<text class="item-value">{{ item.timeLimitTxt }}</text>
						</view>
						<!-- 指导意见 -->
						<view class="item-cont" v-if="item.opinionInst != null && item.opinionInst != ''">
							<text class="item-label">指导意见：</text>
							<text class="item-value">{{ item.opinionInst }}</text>
						</view>
						<view class="item-cont" v-if="cur.resources.length > 0 && cur.operatorType == '3'">
							<text class="item-label">指导意见附件：</text>
							<view class="item-file">
								<text v-for="(re, reIndex) in cur.resources" :key="reIndex" @click="viewImage(re.url, re.resourceName)">
									{{re.resourceName}}
								</text>
							</view>
						</view>
						<view class="item-cont" v-if="cur.operatorContent != null && cur.operatorContent != ''">
							<text class="item-label">{{ cur.operatorType == '6' ? '驳回说明' : cur.operatorType == '10' ? '退回说明' : '处置说明' }}：</text>
							<text class="item-value">{{ cur.operatorContent }}</text>
						</view>
						<view class="item-cont" v-if="cur.resources.length > 0 && cur.operatorType != '3'">
							<text class="item-label">处置附件：</text>
							<view class="item-file">
								<text v-for="(re, reIndex) in cur.resources" :key="reIndex" @click="viewImage(re.url, re.resourceName)">
									{{re.resourceName}}
								</text>
							</view>
						</view>
					</uni-collapse-item>
				</uni-collapse>
			</view>
		</view>
		<!-- 提醒记录 -->
		<view class="process-details" v-if="remindInfo.length > 0">
			<view class="detail">
				<text class="line"></text>
				<text class="word">提醒记录</text>
			</view>
			<view>
				<view class="detail-item">
					<view class="item-node">接收单位</view>
					<view class="item-time">时间</view>
					<view class="item-opt">类型</view>
				</view>
				<uni-collapse class="detail-collapse">
					<uni-collapse-item :title="item.warnDeptName" :content="item.createTime" :operate="item.warnTye == 1 ? '催办' : '督办'"
					 v-for="(item, index) in remindInfo" :key="index">
						<view class="item-cont">
							<text class="item-label">发出单位：</text>
							<text class="item-value">{{ item.operatorDeptName }}</text>
						</view>
						<view class="item-cont">
							<text class="item-label">处置时限：</text>
							<text class="item-value">{{ item.timeLimitTxt }}</text>
						</view>
						<view class="item-cont">
							<text class="item-label">提醒意见：</text>
							<text class="item-value">{{ item.warnContent }}</text>
						</view>
					</uni-collapse-item>
				</uni-collapse>
			</view>
		</view>
		<!-- 输入领导意见 -->
		<view class="process-details" v-if="baseInfo != null && baseInfo.leaderReplyUserName == null">
			<view class="detail">
				<text class="line"></text>
				<text class="word">领导意见</text>
			</view>
			<view class="suggest">
				<view class="sug-item">
					<text class="sug-label">申请人：</text>
					<text class="sug-content">{{ baseInfo.leaderApplyUserName }}</text>
				</view>
				<view class="sug-item">
					<text class="sug-label">申请时间：</text>
					<text class="sug-content">{{ baseInfo.leaderApplyTime }}</text>
				</view>
				<view class="sug-item">
					<text class="sug-label">申请内容：</text>
					<text class="sug-content">{{ baseInfo.leaderApplyContent }}</text>
				</view>
				<view class="sug-submit">
					<text class="sug-input-label">批示意见：</text>
					<textarea style="overflow-y:scroll" class="sug-input" v-model="replyData.leaderReplyContent" maxlength="-1"
					 placeholder="请输入批示意见" placeholder-class="holder" />
					</view>
			</view>
		</view>
		<!-- 操作 -->
		<view class="work" v-if="baseInfo != null && baseInfo.leaderReplyUserName == null">
			<button @click="submitReply" :disabled="isLoading">领导批示</button>
		</view>
	</view>
</template>

<script>
import uniCollapse from '@/components/uni-collapse/uni-collapse.vue';
import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue';
import util from '@/common/util.js';
export default {
	components: {
		uniCollapse,
		uniCollapseItem
	},
	data() {
		return {
			isLoading: false,
			search: 0,
			baseInfo: null,
			flowInfo: [],
			remindInfo: [],
			replyData: {
				orderId: 0,
				leaderReplyContent: ''
			}
		};
	},
	onLoad(params) {
		if(option.mini){
			this.$Request.get(this.$api.miniLogin(option.mini,option.programId)).then(res => {
				this.$store.commit("setToken", res.token)
			})
		}
		Promise.resolve().then(()=>{
			return this.getBaseInfo(params.orderId, 0);
		})
		this.search = params.search;
		this.replyData.orderId = params.orderId;
	},
	methods: {
		// 获取基础信息 流程信息 提醒记录
		getBaseInfo(orderId, processId) {
			// 获取基本信息
			this.$Request
				.get(this.$api.opinion.orderInfoWithFlow(orderId, processId))
				.then(res => {
					if (res.code == 200) {
						this.baseInfo = res.data;
						console.log('baseInfo:'+JSON.stringify(this.baseInfo))
					} else {
						this.$toast.showFail(res.msg);
					}
				})
				.catch(e => {
					this.$toast.showException();
				});
			// 获取流程信息
			this.$Request
				.get(this.$api.opinion.flowInfo(orderId))
				.then(res => {
					if (res.code == 200) {
						this.flowInfo = res.data;
						for (var i = 0; i < this.flowInfo.length; i++) {
							var allProcess = this.flowInfo[i];
							for (var m = 0; m < allProcess.processList.length; m++) {
								var itemProcess = allProcess.processList[m];
								allProcess.processList[m].timeLimitTxt = util.timeLimitFmt(itemProcess.timeLimit);
								for (var n = 0; n < itemProcess.taskList.length; n++) {
									itemProcess.taskList[n].operatorTypeName = util.formatOperatorType(itemProcess.taskList[n].operatorType);
								}
							}
						}
					} else {
						this.$toast.showFail(res.msg);
					}
				})
				.catch(e => {
					this.$toast.showException();
				});
			// 获取提醒记录
			this.$Request
				.get(this.$api.warn.list(orderId))
				.then(res => {
					if (res.code == 200) {
						this.remindInfo = res.data;
						for (var i = 0; i < this.remindInfo.length; i++) {
							this.remindInfo[i].timeLimitTxt = util.timeLimitFmt(this.remindInfo[i].timeLimit);
						}
					} else {
						this.$toast.showFail(res.msg);
					}
				})
				.catch(e => {
					this.$toast.showException();
				});
		},
		copyClipboard(url) {
			uni.setClipboardData({
				data: url,
				success: function() {
					this.$toast.showSuccess('复制成功');
				}
			});
		},
		submitReply() {
			if (this.replyData.leaderReplyContent == '') {
				this.$toast.showFail('请输入批示意见');
				return;
			}
			let that = this;
			uni.showModal({
				title: '提示',
				content: '确认提交批示意见？',
				success: (e)=> {
					if (e.confirm) {
						that.isLoading = true
						that.$Request.post(that.$api.leader.reply, that.replyData).then(res => {
							if (res.code == 200) {
								this.$store.dispatch("GetPendCount", 2)
								uni.redirectTo({
									url: './leader?type=1'
								})
								
							} else {
								this.$toast.showFail(res.msg)
								that.isLoading = false
							}
							
						}).catch(e => {
							that.isLoading = false
							this.$toast.showException()
						});
					}
				}
			})
		},
		viewImage(path, name) {
			const fileType = util.checkFileType(name)
			if (fileType == 'image') {
				uni.previewImage({
					urls: [path]
				})
			} else if (fileType == 'file') {
				uni.openDocument({
					filePath: path
				})
			} else {
				this.$toast.showFail("文件类型未知，打开失败")
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.detail-content {
	height: 100%;
	background: rgba(245, 245, 251, 1);
}
// 基本信息
.base-info {
	height: 370rpx;
	margin-bottom: 30rpx;
	background-color: #fff;
	.detail {
		height: 95rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		.line {
			display: inline-block;
			width: 6rpx;
			height: 36rpx;
			margin: 0 20rpx 0 30rpx;
			background: rgba(67, 131, 228, 1);
		}
		.word {
			width: 30%;
			font-size: 32rpx;
			font-weight: bold;
			color: rgba(0, 0, 0, 1);
		}
	}
	.title {
		color: #353535;
		font-size: 32rpx;
		height: 60rpx;
		padding: 0 30rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.content {
		font-size: 28rpx;
		color: #353535;
		margin-bottom: 20rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		padding: 0 30rpx;
	}
	.boto {
		width: 100%;
		height: 45rpx;
		padding: 0 30rpx;
		font-size: 24rpx;
		color: rgba(105, 128, 171, 1);
		line-height: 33rpx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		.source {
			padding-left: 30rpx;
			color: rgba(67, 131, 228, 1);
		}
		.type {
			padding-left: 30rpx;
			color: rgba(29, 163, 98, 1);
		}
	}
	.link {
		height: 55rpx;
		position: relative;
		padding: 0 30rpx;
		font-size: 26rpx;
		color: rgba(67, 131, 228, 1);
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: flex-start;
		.label {
			width: 130rpx;
			color: rgba(53, 53, 53, 1);
		}
		.source {
			width: 475rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.copy {
			width: 75rpx;
			height: 40rpx;
			line-height: 40rpx;
			text-align: center;
			font-size: 24rpx;
			color: rgba(53, 53, 53, 1);
			border-radius: 6rpx;
			border: 1px solid rgba(136, 136, 136, 1);
		}
	}
}

//流程明细
.process-details {
	padding: 0 30rpx;
	padding-bottom: 30rpx;
	margin-bottom: 30rpx;
	background-color: #fff;
	.detail-case {
		border: 1rpx sold #000;
		padding-bottom: 30rpx;
	}
	.detail-item {
		height: 70rpx;
		background: rgba(67, 131, 228, 0.1);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		font-weight: 600;
		color: rgba(29, 61, 110, 1);
		text-align: center;
		.item-node {
			width: 35%;
		}
		.item-time {
			width: 46%;
		}
		.item-opt {
			width: 19%;
		}
	}
	.detail {
		height: 105rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		.line {
			display: inline-block;
			width: 6rpx;
			height: 36rpx;
			margin: 0 20rpx 0 0;
			background: rgba(67, 131, 228, 1);
		}
		.word {
			width: 30%;
			font-size: 32rpx;
			font-weight: bold;
			color: rgba(0, 0, 0, 1);
		}
	}
	.detail-collapse {
		.item-cont {
			min-height: 70rpx;
			font-size: 24rpx;
			color: rgba(102, 102, 102, 1);
			background: rgba(247, 247, 247, 1);
			border-top: 1rpx solid rgba(231, 231, 231, 1);
			box-sizing: border-box;
			display: flex;
			flex-direction: row;
			align-items: center;
			.item-label {
				width: 200rpx;
				padding-right: 10rpx;
				text-align: right;
			}
			.item-value {
				width: 450rpx;
				text-align: justify;
				padding: 10rpx 0;
			}
			.item-file {
				width: 450rpx;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: flex-start;
				text {
					height: 60rpx;
					padding-right: 20rpx;
					padding-bottom: 10rpx;
					line-height: 60rpx;
				}
			}
		}
	}
}
.suggest {
	font-size: 28rpx;
	.sug-item {
		min-height: 70rpx;
		line-height: 70rpx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		.sug-label {
			flex: 1;
		}
		.sug-content {
			flex: 3;
			color: #b2b2b2;
		}
	}
	.sug-submit {
		min-height: 70rpx;
		.sug-input-label {
			line-height: 70rpx;
		}
		.sug-input {
			width: 100%;
			font-size: 28rpx;
			background:rgba(246,246,246,1);
			padding: 10rpx;
			box-sizing: border-box;
		}
	}
}
.work {
	padding: 50rpx 30rpx;
	button {
		font-size: 34rpx;
		background-color: rgba(67, 131, 228, 1);
		color: #fff;
	}
}
</style>
