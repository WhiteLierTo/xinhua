/**
 * API接口配置文件
 */
module.exports = {
	miniLogin: (mini, programId) => {
		return 'mini/login/' + mini + '/' + programId
	},
	login: 'login', // 用户登录
	userInfo: 'getInfo', // 获取用户信息
	logout: 'logout', // 退出登录
	routers: 'getRouters', // 获取用户菜单
	work: { // 首页概览
		statis: 'index/statis', // 概览-统计数据
		trend: 'index/trend', // 舆情待办走势图
		timeList: 'index/time' // 已超期, 即将超期列表
	},
	draft: { // 草稿箱
		saveCommit: 'draft/save', // 提交or保存草稿
		list: 'draft/list', // 获取草稿list
		detail: (orderId) => {
			return 'draft/' + orderId
		}, // 查看草稿明细
		delete: (orderId) => {
			return 'draft/delete/' + orderId
		} // 删除草稿
	},
	opinion: { // 舆情数据操作相关
		list: 'opinion/list', // 数据列表(待办, 流转中, 已完结, 检索)
		// orderInfo: (orderId) => { return 'opinion/order/' + orderId }, // 舆情基本信息查询(不带流程信息) 好像是作废的方法
		orderInfoWithFlow: (orderId, processId) => {
			return 'opinion/order/' + orderId + '/' + processId
		}, // 舆情基本信息查询(带流程信息)
		flowInfo: (orderId) => {
			return 'opinion/flow/mini/' + orderId
		}, // 流程信息查询
		send: 'opinion/send', // 舆情分发
		approve: 'opinion/approve', // 舆情审核, 处置
		revokeForce: (orderId) => {
			return 'opinion/revokeforce/' + orderId
		}, // 强制撤销

	},
	warn: { // 提醒接口
		list: (orderId) => {
			return 'opinion/warn/list/' + orderId
		}, // 提醒记录列表
		commit: 'opinion/warn' // 催办, 督办提交
	},
	leader: { // 领导页面相关接口
		list: 'opinion/leader/list', // 领导待批示列表
		report: 'opinion/leader/report', // 舆情报送给领导
		reply: 'opinion/leader/reply' // 领导批示回复
	},
	common: {
		getDicts: (dictType) => {
			return 'system/dict/data/dictType/' + dictType
		},
		treeSelect: 'system/dept/treeselect', // 部门树查询
		uploadFile: 'opinion/upload' // 上传文件
	},
	pend: (queryType) => {
		return 'opinion/pend/count/' + queryType
	} //待办数量
}
