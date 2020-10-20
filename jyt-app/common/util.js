module.exports = {
	// 日期格式化
	dateFormat: function(date, fmt) {
		var o = {
			"M+": date.getMonth() + 1, //月份
			"d+": date.getDate(), //日
			"h+": date.getHours(), //小时
			"m+": date.getMinutes(), //分
			"s+": date.getSeconds(), //秒
			"q+": Math.floor((date.getMonth() + 3) / 3), //季度
			"S": date.getMilliseconds() //毫秒
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	},
	// 获取本周开始日期
	getWeekStartDate: function(nowYear, nowMonth, nowDay, nowDayOfWeek) {
	    var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
	    return this.dateFormat(weekStartDate, 'yyyy-MM-dd');
	},
	//获得本月的开始日期
	getMonthStartDate: function(nowYear, nowMonth) {
	    var monthStartDate = new Date(nowYear, nowMonth, 1);
	    return this.dateFormat(monthStartDate, 'yyyy-MM-dd');
	},
	// 获取用户菜单
	getMenu: function(name) {
		var menuObj = null
		const menus = [
			{ name: '舆情概览', page: '/pages/index/overView/overView', img: '/static/img/index/gailan.png' },
			{ name: '舆情新增', page: '/pages/index/newPubSen?type=1', img: '/static/img/index/xinzeng.png' },
			{ name: '草稿箱', page: '/pages/index/drafts', img: '/static/img/index/caogao.png' },
			{ name: '待处理', page: '/pages/pending/pending', isTab: true, img: '/static/img/index/daichuli.png'},
			{ name: '处理中', page: '/pages/processing/processing', img: '/static/img/index/chulizhong.png' },
			{ name: '已完结', page: '/pages/ended/ended', img: '/static/img/index/yiwanjie.png' },
			{ name: '舆情检索', page: '/pages/retrieval/retrieval', isTab: true, img: '/static/img/index/jiansuo.png'},
			{ name: '舆情上报', page: '/pages/index/newPubSen?type=0', img: '/static/img/index/shangbao.png' },
			{ name: '待批示', page: '/pages/leader/leader?type=1', img: '/static/img/index/daipishi.png' },
			{ name: '已批示', page: '/pages/leader/leader?type=2', img: '/static/img/index/yipishi.png' }
		]
		const len = menus.length
		for (var i = 0; i < len; i++) {
			if (name == menus[i].name) {
				menuObj = menus[i]
				break
			}
		}
		return menuObj
	},
	// 处置时限格式化
	timeLimitFmt: function(timeLimit) {
		var fmt = null
		if (timeLimit == null || timeLimit == 0) {
		  return fmt
		} else if (timeLimit / 24 < 1) {
		  fmt = timeLimit % 24 + '小时'
		} else if (timeLimit % 24 == 0) {
		  fmt = timeLimit / 24 + '天'
		} else {
		  Math.floor(timeLimit / 24) + '天' + timeLimit % 24 + '小时'
		}
		return fmt
	},
	// 流程操作格式化
	formatOperatorType: function (value) {
	  // 1-提交 2-上报 3-分发 4-重新分发 5-办结 6-驳回下级 7-撤销 8-提交上级 9-处置 10-退回上级 11-强制撤销
	  var label = ""
	  if (value != null && value != '') {
	    switch (value) {
	      case '1': label = '提交'; break;
	      case '2': label = '上报'; break;
	      case '3': label = '分发'; break;
	      case '4': label = '重新分发'; break;
	      case '5': label = '办结'; break;
	      case '6': label = '驳回下级'; break;
	      case '7': label = '撤销'; break;
	      case '8': label = '提交上级'; break;
	      case '9': label = '处置'; break;
	      case '10': label = '退回上级'; break;
	      case '11': label = '强制撤回'; break;
	    }
	  }
	  return label
	},
	// 生成序列
	initRangeArray: function (start, end) {
	    return Array.from({ length: end + 1 - start }).map((v, i) => i + start)
	},
	checkFileType: function (name) {
		const docTypes = ['doc', 'xls', 'ppt', 'pdf', 'docx', 'xlsx', 'pptx']
		const imgTypes = ['bmp', 'jpg', 'jpeg', 'png', 'gif']
		var i = name.lastIndexOf(".")
		var ext = name.substr(i+1, name.length)
		var lowExt = ext.toLowerCase()
		if (imgTypes.includes(lowExt)) {
			return "image"
		}
		if (docTypes.includes(lowExt)) {
			return "file"
		}
	},
	
}
