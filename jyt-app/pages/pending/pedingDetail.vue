<template>
	<view class="detail-content">
		<view class="base-info" v-if="baseInfo">
			<view class="detail">
				<text class="line"></text>
				<text class="word">基本信息</text>
				<text class="watchDetail" @click="watchDetail(baseInfo.artContent)">查看详情</text>
			</view>
			<!-- <view class="title">
				{{baseInfo.artTitle}}
			</view> -->
			<view class="content">
				{{baseInfo.artContent}}
			</view>
			<view class="boto">
				<text>发布时间：{{ baseInfo.artPublishTime }}</text>
				<text class="source">{{ baseInfo.artSourceName == null ? '' : baseInfo.artSourceName }}</text>
				<text class="type">{{ baseInfo.opinionTypeName == null ? '' : baseInfo.opinionTypeName }}</text>
			</view>
			<view class="link">
				<text class="label">原文链接：</text>
				<text class="source">{{ baseInfo.artUrl }}</text>
				<text class="copy" @click="copyClipboard(baseInfo.artUrl)">复制</text>
			</view>
		</view>
		<!-- 领导批示 -->
		<view class="process-details" v-if="baseInfo && baseInfo.leaderFlag == 1">
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
							<text class="item-value">{{baseInfo.leaderApplyContent}}</text>
						</view>
						<view class="item-cont">
							<text class="item-label">领导批示：</text>
							<text class="item-value">{{baseInfo.leaderReplyContent}}</text>
						</view>
					</uni-collapse-item>
				</uni-collapse>
			</view>
		</view>
		<!-- 流程明细 -->
		<view class="process-details" v-if="flowInfo.length != 0">
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
							<text class="item-value">{{cur.receiveDeptName}}</text>
						</view>
						<!-- 任务类型 -->
						<view class="item-cont" v-if="item.taskLevelName != null">
							<text class="item-label">任务类型：</text>
							<text class="item-value">{{item.taskLevelName}}</text>
						</view>
						<!-- 处置时限 -->
						<view class="item-cont" v-if="item.timeLimitTxt != null">
							<text class="item-label">处置时限：</text>
							<text class="item-value">{{item.timeLimitTxt}}</text>
						</view>
						<!-- 指导意见 -->
						<view class="item-cont" v-if="item.opinionInst != null && item.opinionInst != ''">
							<text class="item-label">指导意见：</text>
							<text class="item-value">{{item.opinionInst}}</text>
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
							<text class="item-label">
								{{cur.operatorType == '6' ? '驳回说明' : (cur.operatorType == '10' ? '退回说明' : '处置说明')}}：
							</text>
							<text class="item-value">{{cur.operatorContent}}</text>
						</view>
						<view class="item-cont" v-if="cur.resources.length > 0 && cur.operatorType != '3'">
							<text class="item-label">处置附件：</text>
							<view class="item-file">
								<text v-for="(re, reIndex) in cur.resources" :key="reIndex" @click="viewImage(re.url, re.resourceName)">
									{{re.resourceName}}
								</text>
							</view>
						</view>
						<view class="item-cont" v-if="cur.operatorType == 3 && cur.operatorDeptId == userDeptId && (item.timeStatus == 1 || item.timeStatus == 2)">
							<text class="item-label">提醒：</text>
							<text class="item-value">
								<button class="cuiban" v-if="permit.warn && item.timeStatus == 1" @click="handleWarnBox(item.processId, item.timeStatus, cur.receiveDeptId)">催办</button>
								<button class="duban" v-if="permit.warn && item.timeStatus == 2" @click="handleWarnBox(item.processId, item.timeStatus, cur.receiveDeptId)">督办</button>
							</text>
						</view>
						<view class="item-cont" v-if="(process.processList.length-1 == index) 
							&& (item.taskList.length-1 == i) 
							&& (item.lastOperatorType == 8 || item.lastOperatorType == 9 || item.lastOperatorType == 10) 
							|| (item.lastOperatorType == 6 && item.showReject == 'Y')">
							<text class="item-label">操作：</text>
							<view class="item-opt">
								<button class="verify" :disabled="isLoading" @click="approve(item.processId, 8)" v-if="permit.submit && (item.lastOperatorType == 8 || item.lastOperatorType == 9)">提交上级</button>
								<button class="verify" :disabled="isLoading" @click="approve(item.processId, 4)" v-if="permit.resend && item.lastOperatorType == 10">重新分发</button>
								<button class="verify" :disabled="isLoading" @click="approve(item.processId, 5)" v-if="permit.over && ((item.lastOperatorType == 8 || item.lastOperatorType == 9))">办结</button>
								<button class="verify" :disabled="isLoading" @click="approve(item.processId, 7)" v-if="permit.revoke && item.lastOperatorType == 10">撤销</button>
								<button class="verify" :disabled="isLoading" @click="approve(item.processId, 6)" v-if="permit.reject && (item.lastOperatorType == 8 || item.lastOperatorType == 9 || item.lastOperatorType == 10)">驳回下级</button>
								<button class="verify" :disabled="isLoading" @click="approve(item.processId, 6)" v-if="permit.reject && item.lastOperatorType == 6 && item.showReject == 'Y'">驳回下级</button>
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
					<uni-collapse-item :title="item.warnDeptName" :content="item.createTime" :operate="item.warnType == '1' ? '催办' : '督办'"
					 v-for="(item, index) in remindInfo" :key="index">
						<view class="item-cont">
							<text class="item-label">提醒对象：</text>
							<text class="item-value">{{item.operatorDeptName}}</text>
						</view>
						<view class="item-cont">
							<text class="item-label">处置时限：</text>
							<text class="item-value">{{item.timeLimitTxt}}</text>
						</view>
						<view class="item-cont">
							<text class="item-label">指导意见：</text>
							<text class="item-value">{{item.warnContent}}</text>
						</view>
					</uni-collapse-item>
				</uni-collapse>
			</view>
		</view>
		<!-- 分发详情 -->
		<view class="distribute-detail" v-if="permit.send 
			&& baseInfo != null 
			&& (baseInfo.lastOperatorType == 1 || baseInfo.lastOperatorType == 2 || baseInfo.lastOperatorType == 3 || baseInfo.lastOperatorType == 4)">
			<view class="detail">
				<text class="line"></text>
				<text class="word">分发详情</text>
				<text class="leader" v-if="baseInfo.leaderApplyUserId > 0">已报送领导</text>
				<text class="leader" v-else @click="isSendLeader">报送领导</text>
			</view>
			<!-- 舆情类别 -->
			<view class="distribute">
				<text class="xing">*</text>
				<text class="label">舆情类别</text>
			</view>
			<view class="btn btn-type" v-if="opinionType">
				<button v-for="item in opinionType" :key="item.dictValue" @click="selType(item.dictValue)" :class="item.dictValue == assignForm.opinionType ? 'active' : ''">
					{{ item.dictLabel }}
				</button>
			</view>
			<!-- 上传附件 -->
			<view class="upload-box">
				<view class="word">
					上传附件
					<text>（仅支持上传图片）</text>
				</view>
				<view class="icon">
					<view class="img-list" @tap="uploadFile(0)">
						<image src="../../static/img/uploadImg.png" />
					</view>
					<view class="img-list" v-for="(item, index) in myFileList" :key="index">
						<image :src="item.url" @click="viewImage(item.url, item.resourceName)" />
						<uni-icons class="img-del" type="clear" @click="delImg(index, 0)"></uni-icons>
					</view>
				</view>
			</view>

			<!-- 接收单位 -->
			<view class="distribute">
				<text class="xing">*</text>
				<text class="label">接收单位</text>
				<view class="addAddmis" @tap="addOrgan">
					<view class="add-icon">
						<uni-icons type="plus" color="rgba(67,131,228,1)"></uni-icons>
					</view>
					<text>请添加行政机构</text>
				</view>
				<tki-tree ref="tkitree" multiple selectParent :range="showDeptList" rangeKey="label" @confirm="treeConfirm"
				 confirmColor="#4e8af7" />
			</view>

			<view class="company" v-for="item in sendDepts" :key="item.operatorDeptId">
				<view class="cname">
					<text>{{ item.operatorDeptName }}</text>
					<uni-icons type="close" @tap="delDepart(item.operatorDeptId)" color="rgba(67,131,228,1)" />
				</view>
				<view class="grade">
					<view>
						<text class="xing">*</text>
						<text class="label">任务等级：</text>
					</view>
					<view class="btn">
						<button v-for="btn in taskLevelBtn" @tap="selTaskType(btn.value, item.operatorDeptId)" :key="btn.value" :class="btn.value == item.taskLevel ? 'active' : ''">
							{{ btn.label }}
						</button>
					</view>
				</view>
				<view class="disposal">
					<text class="xing">*</text>
					<text class="label">处置时限：</text>
					<view class="picker">
						<picker class="selectPicker" mode="multiSelector" @change="bindTimeLimitPicker($event, item.operatorDeptId)"
						 :range="timeListRange" :value="item.timeIndex">
							<view class="uni-input">
								{{timeListRange[0][item.timeIndex[0]]}} 天 {{timeListRange[1][item.timeIndex[1]]}} 小时
							</view>
						</picker>
					</view>
				</view>
				<view class="neirong">
					<view class="label">指导意见：</view>
					<view class="neirong-value">
						<textarea v-model="item.opinionInst" placeholder="请输入指导意见" maxlength="-1" />
						</view>
				</view>
			</view>
		</view>
		<!-- 处置信息 -->
		<view class="management" v-if="permit.deal 
			&& baseInfo != null 
			&& (baseInfo.lastOperatorType == 3 || baseInfo.lastOperatorType == 6)">
			<view class="detail">
			    <text class="line"></text>
				<text class="word">处置信息</text>
			</view>
			<!-- 处置说明 -->
			<view class="neirong">
				<view class="item1">
					<text class="xing">*</text>
					<text class="label">处置说明：</text>
				</view>
				<view class="contenfont">
					<textarea v-show="showTextarea" v-model="operatorContent" maxlength="-1" placeholder="请输入处置说明"></textarea>
					</view>
				</view>
				<!-- 上传附件 -->
				<view class="upload-box">
					<view class="word">上传附件<text>（仅支持上传图片）</text></view>
					<view class="icon">
						<view class="img-list" @tap="uploadFile(1)">
							<image src="../../static/img/uploadImg.png" />
						</view>
						<view class="img-list" v-for="(item, index) in dealFileList" :key="index">
							<image :src="item.url" @click="viewImage(item.url, item.resourceName)" />
							<uni-icons class="img-del" type="clear" @click="delImg(index, 1)"></uni-icons>
						</view>
					</view>
				</view>
			</view>
			<!-- 底部操作 -->
			<view class="work" v-if="baseInfo != null">
				<button :disabled="isLoading" v-if="baseInfo.lastOperatorType == 2 && permit.report" @click="shangbao">上报</button>
				<button :disabled="isLoading" v-if="(baseInfo.lastOperatorType == 1 || baseInfo.lastOperatorType == 2 || baseInfo.lastOperatorType == 3 || baseInfo.lastOperatorType == 4) && permit.send"
				 @click="toDistribute">分发</button>
				<button :disabled="isLoading" v-if="(baseInfo.lastOperatorType == 3 || baseInfo.lastOperatorType == 6) && permit.deal"
				 @click="yuqingchuzhi">处置</button>
				<button :disabled="isLoading" v-if="(baseInfo.lastOperatorType == 1 || baseInfo.lastOperatorType == 2 || baseInfo.lastOperatorType == 4) && permit.optRevoke"
				 @click="revoke">撤销</button>
				<button :disabled="isLoading" v-if="(baseInfo.lastOperatorType == 3 || baseInfo.lastOperatorType == 6) && permit.back"
				 @click="returnBoss">退回上级</button>
			</view>

			<!-- 报送领导 -->
			<uni-popup ref="popup" type="center" :animation="false">
				<view class="uni-tip">
					<text class="uni-tip-title">将本任务汇报至领导账号</text>
					<textarea v-model="leaderApplyContent" class="uni-tip-content" maxlength="-1" placeholder="请填写汇报内容" />
					<view class="uni-tip-group-button">
					<text class="uni-tip-button cancel" @click="cancelBtn()">取消</text>
					<text class="uni-tip-button" @click="sureBtn()">确定</text>
				</view>
			</view>
		</uni-popup>

		<!-- 通用reject弹出 -->
		<uni-popup ref="revoke_popup" type="center" :animation="false">
			<view class="uni-tip">
				<text class="uni-tip-title">{{ dialogTitle }}</text>
				<view class="label xing">{{ dialogLabel }} :</view>
				<textarea class="uni-tip-content  " v-model="rejectForm.operatorContent" maxlength="-1"  :placeholder="dialogContent" />
				<view class="uni-tip-group-button">
					<text class="uni-tip-button cancel" @click="cancelWithContent()">取消</text>
					<text class="uni-tip-button" @click="approveWithContent(dialogContent)">确定</text>
				</view>
			</view>
		</uni-popup>
		
		<!-- 催办or督办弹出 -->
		<uni-popup ref="warn_popup" type="center" :animation="false">
			<view class="uni-tip">
				<text class="uni-tip-title">{{ dialogTitle }}</text>
				<view class="label">{{ dialogLabel }} :</view>
				<textarea class="uni-tip-content" v-model="warnparams.warnContent" :placeholder="dialogContent" />
				<view class="uni-tip-group-button">
					<text class="uni-tip-button cancel" @click="cancelWarn()">取消</text>
					<text class="uni-tip-button" @click="approveWarn()">确定</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
import tkiTree from '@/components/tki-tree/tki-tree.vue';
import uniIcons from "@/components/uni-icons/uni-icons.vue"
import util from '@/common/util.js';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import config from '@/common/config'

export default {
	components: {
		uniCollapse,
		uniCollapseItem,
		tkiTree,
		uniIcons,
		uniPopup
	},
	data() {
		return {
			test:"lichao零",
			isLoading: false,
			showTextarea: true,
			baseInfo: null,
			flowInfo: [],
			remindInfo: [],
			leaderApplyContent:"",//报送领导内容
			opinionType: [], //舆情类型
			taskLevelBtn: [
				{ value: '1', label: '常态任务'},
				{ value: '2', label: '警示任务'},
				{ value: '3', label: '紧急任务'}
			],
			assignForm: {
			  orderId: 0,
			  processId: 0,
			  opinionType: '1',
			  resourceList: [],
			  sendDepts: []
			},
			userDeptId: this.$SysCache.get("user_account").deptId,
			taskLevel: '1', //选中的任务类型
			myFileList: [], // 分发文件上传列表
			dealFileList: [], // 处置文件上传列表
			depList: [], //部门树
			showDeptList: [], // 需要在弹出选择部门时，进行赋值，否则控件内容可能会为空
			sendDepts: [], //已选择的部门
			index: [0,0],
			operatorContent: '', //  处置说明
			// 操作弹窗数据
			selectedVal: '',
			dialogTitle: '',
			dialogLabel: '',
			dialogContent: '',
			// 操作提交数据
			rejectForm: {
				processId: 0,
				operatorType: null,
				operatorContent: ''
			},
			warnparams: {
			  processId: null,
			  warnType: null,
			  warnDeptId: null,
			  warnContent: ''
			},
			timeListRange: [
				["天"].concat(util.initRangeArray(0, 30)),
				["小时"].concat(util.initRangeArray(0, 23))
			],
			permit: {
				// 流程审批
				submit: this.$permit.checkPermission(['opinion:verify:submit']), // 提交上级
				resend: this.$permit.checkPermission(['opinion:verify:resend']), // 重新分发
				over: this.$permit.checkPermission(['opinion:verify:over']), // 办结
				revoke: this.$permit.checkPermission(['opinion:verify:revoke']), // 审批撤销
				reject: this.$permit.checkPermission(['opinion:verify:reject']), // 驳回下级
				warn: this.$permit.checkPermission(['opinion:verify:warn']), // 催办
				supervise: this.$permit.checkPermission(['opinion:verify:supervise']), // 督办
				// 底部操作
				report: this.$permit.checkPermission(['opinion:pend:report']), // 上报
				send: this.$permit.checkPermission(['opinion:pend:send']), // 分发
				deal: this.$permit.checkPermission(['opinion:pend:deal']), // 处置
				optRevoke: this.$permit.checkPermission(['opinion:pend:revoke']), // 底部操作撤销
				back: this.$permit.checkPermission(['opinion:pend:back']), // 退回上级
				leader: this.$permit.checkRole(['leader'])
			},
		};
	},

	onLoad(option) {
		this.getBaseInfo(option.orderId, option.processId)
		this.getType()
		this.deptTreeSelect()
		this.assignForm.orderId = option.orderId
		this.assignForm.processId = option.processId
		uni.hideHomeButton()
	},
	methods: {
		// 获取基础信息 流程信息 提醒记录
		getBaseInfo(orderId, processId) {
			// 获取基本信息
			this.$Request.get(this.$api.opinion.orderInfoWithFlow(orderId, processId)).then(res => {
		      if (res.code == 200) {
		        this.baseInfo = res.data
		      } else {
				  this.$toast.showFail(res.msg)
			  }
		    }).catch(e => {
		      this.$toast.showException()
		    })
			// 获取流程信息
			this.$Request.get(this.$api.opinion.flowInfo(orderId)).then(res => {
		      if (res.code == 200) {
		        this.flowInfo = res.data
				for (var i = 0; i < this.flowInfo.length; i++) {
					var allProcess = this.flowInfo[i]
					for (var m = 0; m < allProcess.processList.length; m++) {
						var itemProcess = allProcess.processList[m]
						allProcess.processList[m].timeLimitTxt = util.timeLimitFmt(itemProcess.timeLimit)
						for (var n = 0; n < itemProcess.taskList.length; n++) {
							itemProcess.taskList[n].operatorTypeName = util.formatOperatorType(itemProcess.taskList[n].operatorType)
						}
					}
				}
		      } else {
				  this.$toast.showFail(res.msg)
			  }
		    }).catch(e => {
		      this.$toast.showException()
		    })
			// 获取提醒记录
			this.$Request.get(this.$api.warn.list(orderId)).then(res => {
				if (res.code == 200) {
					this.remindInfo = res.data;
					for (var i = 0; i < this.remindInfo.length; i++) {
						this.remindInfo[i].timeLimitTxt = util.timeLimitFmt(this.remindInfo[i].timeLimit)
					}
				} else {
					this.$toast.showFail(res.msg)
				}
			}).catch(e => {
				this.$toast.showException()
			})
		},
	    // 查看详情
		watchDetail(info){
			uni.navigateTo({
				url:"./articleContent?info="+info
			})
		},
		// 复制剪贴板 H5不支持
		copyClipboard(url) {
			uni.setClipboardData({
			    data: url,
			    success: function () {
			        this.$toast.showSuccess("复制成功")
			    }
			})
		},
		// 舆情类别字典 任务类别字典
		getType() {
			this.$Request.get(this.$api.common.getDicts('opinion_type')).then(res => {
				if (res.code == 200) {
					this.opinionType = res.data;
				} else {
					this.$toast.showFail(res.msg);
				}
			}).catch(e => {
				this.$toast.showException();
			})
		},
		//选择的舆情类型
		selType(type) {
			this.assignForm.opinionType = type;
		},
		// 选中的任务等级
		selTaskType(taskLevel, deptId) {
			this.sendDepts.forEach(item => {
				if (item.operatorDeptId == deptId) {
					this.taskLevel = taskLevel;
					item.taskLevel = taskLevel;
					return;
				}
			});
		},
		// 添加行政机构
		addOrgan() {
			this.showDeptList = this.depList
			this.showDeptList.push("")
			this.showDeptList.pop("")
			this.$refs.tkitree._show();
		},
		// 获取部门树
		deptTreeSelect() {
			const data = {
				parentId: this.$SysCache.get("user_account").deptId
			}
			this.$Request.post(this.$api.common.treeSelect, data).then(res => {
				if (res.code == 200) {
					var depList = res.data;
					this.setDefaultDepList(depList);
					this.depList = depList;
				} else {
					this.$toast.showFail(res.msg);
				}
			}).catch(e => {
				this.$toast.showException();
			})
		},
		// 设置默认部门树
		setDefaultDepList(depList) {
			depList.forEach(item => {
				item.checked = false
				if (item.children && item.children.length > 0) {
					this.setDefaultDepList(item.children);
				} 
			})
		},
		// 选择的部门
		treeConfirm(e) {
			let checkIds = []
			let selectIds = []
			if (e.length == 0) {
				this.sendDepts = []
			}
			e.forEach(item => {
				checkIds.push(item.id)
			})
			var tempSendDepts = []
			for (var i = 0; i < this.sendDepts.length; i++) {
				var cur = this.sendDepts[i];
				if (checkIds.indexOf(cur.operatorDeptId) == -1) {
					this.sendDepts.splice(i, 1);
					i = i - 1
				} 
			}
			e.forEach(item => {
				var isAdd = true;
				for (var i = 0; i < this.sendDepts.length; i++) {
					var cur = this.sendDepts[i];
					if (item.id == cur.operatorDeptId) {
						isAdd = false;
						break;
					}
				}
				if (isAdd) {
					this.sendDepts.push({
						operatorDeptId: item.id,
						operatorDeptName: item.label,
						opinionInst: '',
						taskLevel: '1',
						timeLimit: 0,
						timeIndex: [1, 1]
					});
				}
			});
			this.setShowCheckDepList(checkIds, this.depList);
		},
		// 设置已选择部门
		setShowCheckDepList(checkIds, depList) {
			depList.forEach(item => {
				if (checkIds.indexOf(item.id) != -1) {
					item.checked = true
				} else {
					item.checked = false
				}
				if (item.children && item.children.length > 0) {
					this.setShowCheckDepList(checkIds, item.children);
				} 
			})
		},
		
		// 删除已选中的部门
		delDepart(id) {
			for (var i = 0; i < this.sendDepts.length; i++) {
				var cur = this.sendDepts[i];
				if (cur.operatorDeptId == id) {
					this.sendDepts.splice(i, 1);
					this.setDelDeptList(id, this.depList);
				}
			}
		},
		setDelDeptList(delId, depList) {
			depList.forEach(item => {
				if (item.id == delId) {
					item.checked = false
					return
				} 
				if (item.children && item.children.length > 0) {
					this.setDelDeptList(delId, item.children);
				} 
			})
		},
		bindTimeLimitPicker(e, deptId) {
			const day = e.detail.value[0]
			const hour = e.detail.value[1]
			var plusHour = 0
			if (day > 0) {
				plusHour += (24 * (day - 1))
			}
			if (hour > 0) {
				plusHour += (hour - 1)
			}
			this.sendDepts.forEach(item => {
				if (item.operatorDeptId == deptId) {
					item.timeLimit = plusHour;
					item.timeIndex = [day == 0 ? 1 : day, hour == 0 ? 1 : hour]
					return;
				}
			})
		},
		// 上传附件
		uploadFile(type) {
			let that = this
			var uploadUrl = config.APIHOST + that.$api.common.uploadFile
			uni.chooseImage({
				count: 9,
				success: chooseImageRes => {
					const tempFiles = chooseImageRes.tempFiles;
					for(var i = 0; i < tempFiles.length; i++) {
						uni.uploadFile({
							url: uploadUrl,
							filePath: tempFiles[i].path,
							name: 'file',
							header: {
								Authorization: that.$SysCache.get('token')
							},
							success: res => {
								if (res.statusCode == 200) {
									var json = JSON.parse(res.data)
									if (type == 0) { //分发上传
										that.myFileList.push({
											url: json.data[0].fileUrl,
											resourceName: json.data[0].fileName,
											resourcePath: json.data[0].resourcePath
										})
									} else { // 处置上传
										that.dealFileList.push({
											url: json.data[0].fileUrl,
											resourceName: json.data[0].fileName,
											resourcePath: json.data[0].resourcePath
										})
									}
								} else {
									that.$toast.showFail("文件上传失败")
								}
							}
						})
					}
				}
			});
		},

		// 是否报送领导
		isSendLeader() {
			this.flag = true;
			// if (this.flag) {
				this.$refs.popup.open();
			// }
		},
		cancelBtn() {
			this.$refs.popup.close();
			this.flag = false;
		},
		sureBtn() {
			var data = {
				orderId: this.baseInfo.orderId,
				leaderApplyContent: this.leaderApplyContent
			};
			if (this.leaderApplyContent == '') {
				this.$toast.showFail('请填写汇报内容');
				return false;
			}
			this.$Request
				.post(this.$api.leader.report, data)
				.then(res => {
					if (res.code == 200) {
						this.$toast.showSuccess('汇报领导成功');
						this.$refs.popup.close();
						this.leaderApplyContent=""
						this.$store.dispatch('GetPendCount', 1)
					} else {
						this.$toast.showFail('汇报领导失败');
					}
				})
				.catch(e => {
					this.$toast.showException();
				});
		},
		// 上报
		shangbao() {
			let that = this
			uni.showModal({
				title: '提示',
				content: '确认上报上级？',
				success: function(e) {
					if (e.confirm) {
						const params = {
						  processId: that.baseInfo.processId,
						  operatorType: 2,
						  operatorContent: ''
						}
						that.isLoading = true
						that.$Request.post(that.$api.opinion.approve, params).then(res => {
							if (res.code == 200) {
								uni.switchTab({
									url: './pending'
								})
								this.$store.dispatch('GetPendCount', 1)
							} else {
								that.isLoading = false
								that.$toast.showFail(res.msg);
							}
						}).catch(e => {
							that.isLoading = false
							that.$toast.showException()
						})
					}
				}
			})
		},
		// 分发
		toDistribute() {
			let that = this
			const len = this.sendDepts.length
			if (len == 0) {
				this.$toast.showFail("请选择分发的单位")
				return
			}
			var isCheck = false
			for (var i = 0; i < len; i++) {
				if (this.sendDepts[i].timeLimit == 0) {
					isCheck = true
					break
				}
			}
			if (isCheck) {
				this.$toast.showFail("处置时限需要大于0")
				return
			}
			this.assignForm.sendDepts = this.sendDepts
			this.assignForm.resourceList = this.myFileList
			that.isLoading = true
			this.$Request.post(this.$api.opinion.send, this.assignForm).then(res => {
				if (res.code == 200) {
					this.$toast.showSuccess('分发成功');
					uni.switchTab({
						url: './pending'
					})
					this.$store.dispatch('GetPendCount', 1)
				} else {
					that.isLoading = false
					this.$toast.showFail(res.msg);
				}
			}).catch(e => {
				that.isLoading = false
				this.$toast.showException();
			})
		},
		// 处置
		yuqingchuzhi() {
		  if (this.operatorContent == null || this.operatorContent == '') {
		    this.$toast.showFail('请输入处置说明')
		    return
		  }
		  let that = this
		  uni.showModal({
		  	title: '提示',
		  	content: '确认处置该舆情信息？',
		  	success: function(e) {
		  		if (e.confirm) {
		  			const params = {
		  			  processId: that.baseInfo.processId,
		  			  operatorType: 9,
		  			  operatorContent: that.operatorContent,
		  			  resourceList: that.dealFileList
		  			}
					that.isLoading = true
		  			that.$Request.post(that.$api.opinion.approve, params).then(res => {
		  				if (res.code == 200) {
		  					uni.switchTab({
		  						url: './pending'
		  					})
							this.$store.dispatch('GetPendCount', 1)
		  				} else {
							that.isLoading = false
		  					that.$toast.showFail(res.msg);
		  				}
		  			}).catch(e => {
						that.isLoading = false
		  				that.$toast.showException()
		  			})
		  		}
		  	}
		  })
		},
		// 撤销
		revoke() {
			this.dialogTitle = '撤销';
			this.dialogLabel = '撤销理由';
			this.dialogContent = '请输入撤销理由';
			this.rejectForm.processId = this.baseInfo.processId
			this.rejectForm.operatorType = 7
			this.$refs.revoke_popup.open();
		},
		//取消
		cancelWithContent() {
			this.$refs.revoke_popup.close();
			this.rejectForm.operatorContent = '';
			this.showTextarea = true
		},
		//确定
		approveWithContent(dialogContent) {
			let that = this
			this.showTextarea = true
			if(this.rejectForm.operatorContent==""){
				this.$toast.showFail(dialogContent);
				return false;
			}
			var data = this.rejectForm;
			that.isLoading = true
			this.$Request.post(this.$api.opinion.approve, data).then(res => {
				if (res.code == 200) {
					this.$refs.revoke_popup.close();
					uni.switchTab({
						url: './pending'
					})
					this.$store.dispatch('GetPendCount', 1)
				} else {
					that.isLoading = false
					this.$toast.showFail(res.msg);
				}
			}).catch(e => {
				that.isLoading = false
				this.$toast.showException();
			})
		},
		// 退回上级
		returnBoss() {
		  this.rejectForm.processId = this.baseInfo.processId
		  this.rejectForm.operatorType = 10
		  this.rejectForm.operatorContent = ''
		  this.dialogTitle = '退回上级'
		  this.dialogLabel = '退回理由'
		  this.dialogContent = '请输入退回理由'
		  this.showTextarea = false
		  this.$refs.revoke_popup.open()
		},
		// 审核操作
		approve(id, statustype) {
		  if (statustype == 6 || statustype == 7) {
		    this.dialogTitle = statustype == 6 ? '驳回下级' : '撤销'
		    this.dialogLabel = statustype == 6 ? '驳回理由' : '撤销理由'
		    this.dialogContent = statustype == 6 ? '请输入驳回理由' : '请输入撤销理由'
		    this.rejectForm.processId = id
		    this.rejectForm.operatorType = statustype
			this.$refs.revoke_popup.open()
		  } else {
			let that = this
			uni.showModal({
				title: '提示',
				content: '确认是否进行此操作？',
				success: function(e) {
					if (e.confirm) { 
						const params = {
						  processId: that.baseInfo.processId,
						  operatorType: statustype,
						  operatorContent: that.operatorContent,
						  resourceList: that.resourceList
						}
						that.isLoading = true
						that.$Request.post(that.$api.opinion.approve, params).then(res => {
							if (res.code == 200) {
								uni.switchTab({
									url: './pending'
								})
								this.$store.dispatch('GetPendCount', 1)
							} else {
								that.isLoading = false
								that.$toast.showFail(res.msg);
							}
						}).catch(e => {
							that.isLoading = false
							that.$toast.showException()
						})
					}
				}
			})
		  }
		},
		// 催办 or 督办
		handleWarnBox(processId, status, deptId) {
		  this.dialogTitle = status == 1 ? '催办' : '督办'
		  this.dialogLabel = status == 1 ? '催办说明' : '督办说明'
		  this.dialogContent = status == 1 ? '请输入催办说明' : '请输入督办说明'
		  this.warnparams.processId = processId
		  this.warnparams.warnType = status
		  this.warnparams.warnDeptId = deptId
		  this.warnparams.warnContent = ''
		  this.$refs.warn_popup.open()
		},
		//取消提醒
		cancelWarn() {
			this.$refs.warn_popup.close()
			this.warnparams = {
				processId: null,
				warnType: null,
				warnDeptId: null,
				warnContent: ''
			}
		},
		//确定提醒
		approveWarn() {
			var data = this.warnparams;
			this.$Request.post(this.$api.warn.commit, this.warnparams).then(res => {
				if (res.code == 200) {
					this.$refs.warn_popup.close();
					this.$toast.showSuccess(this.dialogTitle + '成功')
					this.$store.dispatch('GetPendCount', 1)
				} else {
					this.$toast.showFail(res.msg);
				}
			}).catch(e => {
				this.$toast.showException();
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
		},
		delImg(index, type) {
			if (type == 0) {
				this.myFileList.splice(index, 1)
			} else {
				this.dealFileList.splice(index, 1)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.detail-content {
	height: 100%;
	background: rgba(245, 245, 251, 1);
}
// 基本信息
.base-info {
	height: 100%;
	margin-bottom: 30rpx;
	padding: 30rpx;
	background-color: #fff;
	.detail {
		position: relative;
		height: 95rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		.line {
			display: inline-block;
			width: 6rpx;
			height: 36rpx;
			margin-right: 20rpx;
			background: rgba(67, 131, 228, 1);
		}
		.word {
			width: 30%;
			font-size: 32rpx;
			font-weight: bold;
			color: rgba(0, 0, 0, 1);
		}
		.watchDetail {
			position: absolute;
			right: 0;
			width:100rpx;
			height:28rpx;
			font-size:24rpx;
			color:rgba(67,131,228,1);
			line-height:28rpx;
		}
	}
	
	.content {
		width: 100%;
		font-size: 28rpx;
		color: #353535;
		margin-bottom: 20rpx;
		 display: -webkit-box;
		 -webkit-box-orient: vertical;
		 -webkit-line-clamp: 2;
		 overflow: hidden;
		 text-overflow: ellipsis;
	}
	.boto {
		width: 100%;
		height: 45rpx;
		font-size: 24rpx;
		color: rgba(105, 128, 171, 1);
		line-height: 33rpx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		.source {
			padding-left: 30rpx;
			color: rgba(23,72,146,1);
		}
		.type {
			padding-left: 30rpx;
			color: rgba(29, 163, 98, 1);
		}
	}
	.link {
		height: 55rpx;
		position: relative;
		font-size: 26rpx;
		color: rgba(67, 131, 228, 1);
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: flex-start;
		.label {
			width: 25%;
			color: rgba(53, 53, 53, 1);
		}
		.source {
			width: 485rpx;
			overflow: hidden;
			white-space: nowrap;
			color: rgba(102,102,102,1);
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
		background: rgba(67,131,228,0.1);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		font-weight: 600;
		color: rgba(29,61,110,1);
		text-align: center;
		.item-node {
			width: 35%;
		}
		.item-time {
			width: 46%;
		}
		.item-opt {
			width: 19%;
			text-align: left;
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
				button {
					position: relative;
					margin-left: 0rpx;
					width: 118rpx;
					height: 46rpx;
					line-height: 46rpx;
					font-size: 24rpx;
					color: #FFFFFF;
					border-radius: 6rpx;
				}
				.cuiban {
					background: rgba(67,131,228,1);
				}
				.duban {
					background-color: rgba(235,123,22,1);
				}
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
			.item-opt {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				flex-wrap: wrap;
				.verify {
					width: auto;
					height: 46rpx;
					background: rgba(67,131,228,0.1);
					border-radius: 6rpx;
					border: 1rpx solid rgba(46,129,236,1);
					font-size: 24rpx;
					line-height: 46rpx;
					margin: 10rpx 20rpx 10rpx 0;
				}
			}
		}
	}
}
// 分发详情
.distribute-detail {
	padding: 0 30rpx;
	padding-bottom: 30rpx;
	margin-bottom: 30rpx;
	background-color: #fff;
	font-size: 28rpx;
	.detail {
		height: 105rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		.line {
			display: inline-block;
			width: 6rpx;
			height: 36rpx;
			margin-right: 20rpx;
			background: rgba(67, 131, 228, 1);
		}
		.word {
			width: 78%;
			font-size: 32rpx;
			font-weight: bold;
			color: rgba(0, 0, 0, 1);
		}
		.leader {
			width: 22%;
			padding-bottom: 2rpx;
			color: #4383E4;
			// border-bottom: 1rpx solid #4383E4;
		}
	}
	.distribute {
		width: 100%;
		height: 70rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		.xing {
			width: 4%;
			color: red;
		}
		.label {
			width: 53%;
			height: 70rpx;
			color: rgba(53, 53, 53, 1);
			line-height: 70rpx;
		}
		.addAddmis {
			color: rgba(67,131,228,1);
			border:1px solid rgba(67,131,228,1);
			box-sizing: border-box;
			border-radius: 7rpx;
			width: 289rpx;
			height: 60rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			.add-icon {
				width: 32rpx;
				height: 32rpx;
				padding-right: 20rpx;
				.uni-icons {
					font-size: 32rpx !important;
				}
			}
		}
	}
	.btn {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		margin-bottom: 20rpx;
		button {
			font-size: 28rpx;
			width: auto;
			height: 50rpx;
			padding: 0 20rpx;
			margin: 8rpx 10rpx;
			line-height: 50rpx;
			color: rgba(51, 51, 51, 1);
			border-radius: 10rpx;
			border: 1px solid rgba(67, 131, 228, 1);
			box-sizing: border-box;
			background-color: rgba(255, 255, 255, 1);
		}
		.active {
			background-color: rgba(67, 131, 228, 0.8) !important;
			color: #fff;
			border: none;
		}
	}
	.btn-type {
		button {
			color: rgba(67, 131, 228, 1);
			background-color: rgba(255, 255, 255, 1);
		}
	}
	.upload-box {
		.word {
			font-size: 28rpx;
			color: rgba(51, 51, 51, 1);
			line-height: 40px;
			padding-bottom: 20rpx;
			text {
				color: rgba(201, 201, 201, 1);
			}
		}
		.icon {
			width: 100%;
			height: auto;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			flex-wrap: wrap;
			.img-list {
				width: 116rpx;
				height: 116rpx;
				margin-right: 20rpx;
				margin-bottom: 20rpx;
				position: relative;
				box-sizing: border-box;
				image {
					position: absolute;
					margin: 0;
					width: 100%;
					height: 100%;
				}
				.img-del {
					position: absolute;
					top: 3rpx;
					right: 3rpx;
				}
			}
		}
	}
	.company {
		width: 100%;
		height: 100%;
		padding: 20rpx;
		box-sizing: border-box;
		background: rgba(246, 246, 246, 1);
		margin-top: 30rpx;
		.cname {
			height: 70rpx;
			font-size: 28rpx;
			line-height: 70rpx;
			font-weight: 600;
			color: rgba(29, 61, 110, 1);
			padding:0 30rpx;
			border: 1rpx solid rgba(151, 151, 151, 1);
			border-bottom: none;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.uni-icons {
				font-size: 34rpx !important;
			}
			
		}
		.grade {
			font-size: 24rpx;
			height: 70rpx;
			line-height: 70rpx;
			padding: 0 30rpx;
			border: 1px solid rgba(151, 151, 151, 1);
			box-sizing: border-box;
			display: flex;
			flex-direction: row;
			align-items: center;
			.xing {
				color: red;
			}
			.label {
				color: rgba(53, 53, 53, 1);
			}
			.btn {
				margin: 0;
				button {
					width: auto;
					height: 46rpx;
					border-radius: 6rpx;
					border: 1rpx solid rgba(46,129,236,1);
					font-size: 24rpx;
					line-height: 46rpx;
					padding: 0 11rpx;
					box-sizing: border-box;
					background-color: rgba(67, 131, 228, 0.1);
					.active {
						background: rgba(67, 131, 228, 0.8);
						color: #FFFFFF;
						border: none;
					}
				}
			}
		}
		.disposal {
			font-size: 24rpx;
			height: 70rpx;
			line-height: 70rpx;
			padding: 0 30rpx;
			border: 1px solid rgba(151, 151, 151, 1);
			border-top: none;
			box-sizing: border-box;
			display: flex;
			flex-direction: row;
			align-items: center;
			.xing {
				color: red;
			}
			.label {
				color: rgba(53, 53, 53, 1);
			}
			.picker {
				padding-left: 10rpx;
				flex: 1;
				 
			}
			.selectPicker {
				width: 40%;
				text-align: center;
				margin: 20rpx 0;
				border-radius: 10rpx;
				line-height: 50rpx;
				background-color: rgba(67, 131, 228, 0.8);
				color: #fff;
			}
		}
		.neirong {
			font-size: 24rpx;
			height: 230rpx;
			line-height: 70rpx;
			padding: 0 30rpx;
			border: 1px solid rgba(151, 151, 151, 1);
			border-top: none;
			display: flex;
			flex-direction: column;
			.label {
				height: 70rpx;
			}
			.neirong-value {
				height: 160rpx;
				textarea {
					width: 100%;
					height: 160rpx;
					font-size: 24rpx;
					color: #B2B2B2;
					padding-bottom: 20rpx;
					box-sizing: border-box;
				}
			}
		}
	}
	.send-leader {
		margin: 20rpx 0;
	}
}
// 处置信息
.management {
	padding: 0 30rpx;
	padding-bottom: 30rpx;
	margin-bottom: 30rpx;
	background-color: #fff;
	font-size: 28rpx;
	.detail {
		height: 105rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		.line {
			display: inline-block;
			width: 6rpx;
			height:36rpx;
			margin-right: 20rpx;
			background: rgba(67, 131, 228, 1);
		}
		.word {
			width: 30%;
			font-size: 32rpx;
			font-weight: bold;
			color: rgba(0, 0, 0, 1);
		}
	}
	.neirong {
		.item1 {
			display: flex;
			width: 100%;
			height: 88rpx;
			line-height: 88rpx;
		}
		.xing {width: 4%;color: red; }
		.label{width: 50%;color: rgba(53,53,53,1);}
		.contenfont {
			width: 100%;
			height:50%;
			padding: 20rpx 30rpx;
			box-sizing: border-box;
			background:rgba(246,246,246,1);
			textarea {
				width: 100%;
				font-size: 28rpx;
			}
		}
	}
	.upload-box {
		padding-top: 20rpx;
		.word {
			color: rgba(51, 51, 51, 1);
			line-height: 40px;
			padding-bottom: 20rpx;
			text {
				color: rgba(201, 201, 201, 1);
			}
		}
		.icon {
			width: 100%;
			height: auto;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			flex-wrap: wrap;
			.img-list {
				width: 116rpx;
				height: 116rpx;
				margin-right: 20rpx;
				margin-bottom: 20rpx;
				position: relative;
				box-sizing: border-box;
				image {
					position: absolute;
					margin: 0;
					width: 100%;
					height: 100%;
				}
				.img-del {
					position: absolute;
					top: 3rpx;
					right: 3rpx;
				}
			}
		}
	}
}
.leader-reply {
	padding: 0 30rpx;
	padding-bottom: 30rpx;
	margin-bottom: 30rpx;
	background-color: #fff;
	font-size: 28rpx;
	.detail {
		height: 105rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		.line {
			display: inline-block;
			width: 6rpx;
			height:36rpx;
			margin-right: 20rpx;
			background: rgba(67, 131, 228, 1);
		}
		.word {
			width: 30%;
			font-size: 32rpx;
			font-weight: bold;
			color: rgba(0, 0, 0, 1);
		}
	}
	.apply-item {
		display: flex;
		height: 70rpx;
		line-height: 70rpx;
		flex-direction: row;
		justify-content: space-between;
	}
	.apply-content {
		color: #B2B2B2;
		margin-bottom: 20rpx;
		text-align: justify;
	}
	.reply-content {
		display: flex;
		flex-direction: column;
		.label {
			height: 70rpx;
			span {
				color: red;
			}
		}
		.content {
			width: 100%;
			box-sizing: border-box;
			font-size: 28rpx;
			background-color: #F6F6F6;
			padding: 20rpx 30rpx;
			textarea {
				width: 100%;
				font-size: 28rpx;
			}
		}
	}
}
.work {
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	padding-top: 40rpx;
	height: 200rpx;
	box-sizing: border-box;
	button {
		font-size: 32rpx;
		width: 190rpx;
		height: 70rpx;
		padding: 0;
		line-height: 70rpx;
		color: rgba(67, 131, 228, 1);
		border-radius: 10rpx;
		border: 1px solid rgba(67, 131, 228, 1);
		box-sizing: border-box;
		background-color: rgba(255,255,255,1);
	}
	.active {
		background-color: rgba(67, 131, 228, 1);
		color: #fff;
		border: none;
	}
}
/* 提示窗口 */
.uni-tip {
	display: flex;
	flex-direction: column;
	width: 600rpx;
	padding: 30rpx;
	background-color: #fff;
	border-radius: 10rpx;
	justify-content: center;
	box-sizing: border-box;
	.uni-tip-title {
		text-align: left;
		font-weight: 600;
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 0;
	}
	.label {
		font-size: 28rpx;
		padding: 20rpx 0 20rpx 20rpx;
	}
	.xing:before{
		content: "*";
		color:  rgba(212,34,34,1);
		position: absolute;
		left: 30rpx;
	}
	.uni-tip-content {
		padding:0 30rpx;
		width: 100%;
		font-size: 28rpx;
		color: #666;
		box-sizing: border-box;
	}
	 
	.uni-tip-group-button {
		display: flex;
		justify-content: flex-end;
		margin-right: 20rpx;
		.uni-tip-button {
			font-size: 24rpx;
			width: 110rpx;
			height: 50rpx;
			padding: 0;
			line-height: 46rpx;
			color: rgba(67, 131, 228, 1);
			border-radius: 10rpx;
			text-align: center;
			color: #fff;
			background-color: rgba(67, 131, 228, 1);
			box-sizing: border-box;
			margin: 20rpx 10rpx;
		}
		.cancel {
			border:1px solid rgba(46,129,236,1);
			background-color: #F7F7F7;
			color: rgba(67, 131, 228, 1);
		}
	}
}
</style>
