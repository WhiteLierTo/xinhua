import request from "@/utils/request";

// 舆情统计的数据列表
export function getStatis() {
    return request({
        url: "/index/statis",
        method: "get"
    });
}

// 舆情待办走势图
export function getTrend() {
    return request({
        url: "/index/trend",
        method: "get"
    });
}

// 已超期 / 即将超期列表
export function getTimeLimitList() {
    return request({
        url: "/index/time",
        method: "get"
    });
}

// 提交or保存草稿
export function saveCommit(query) {
    return request({
        url: "/draft/save",
        method: "post",
        data: query
    });
}

// 获取草稿list
export function getdraftlist(query) {
    return request({
        url: "/draft/list",
        method: "post",
        data: query
    });
}

// 查看草稿明细
export function getdraftdetail(orderId) {
    return request({
        url: "/draft/" + orderId,
        method: "get"
    });
}

// 删除草稿
export function deletedraft(ids) {
    return request({
        url: "/draft/delete/batch",
        method: "post",
        data: ids
    });
}

// 上传文件
export function uploadFile(file) {
    return request({
        url: "/opinion/upload",
        method: "post",
        headers: {
            "Content-Type": "multipart/form-data"
        },
        data: file
    });
}

// 下载文件
export function downloadFile(id) {
    window.location.href =
        process.env.VUE_APP_BASE_API + "/common/resource/" + id;
}

// 待办or流转中or已完结or检索
export function getopinionlist(query) {
    return request({
        url: "/opinion/list",
        method: "post",
        data: query
    });
}

// 领导待批示列表
export function getLeaderList(query) {
    return request({
        url: "/opinion/leader/list",
        method: "post",
        data: query
    });
}

// 舆情基本信息查询
export function getbaseopinion(orderId) {
    return request({
        url: "/opinion/order/" + orderId,
        method: "get"
    });
}
// 舆情基本信息查询
export function getbaseopinionWithProcess(orderId, processId) {
    return request({
        url: "/opinion/order/" + orderId + "/" + processId,
        method: "get"
    });
}

// 流程信息查询
export function getflowopinion(orderId) {
    return request({
        url: "/opinion/flow/" + orderId,
        method: "get"
    });
}

// 提醒记录
export function getremindd(orderId) {
    return request({
        url: "/opinion/warn/list/" + orderId,
        method: "get"
    });
}

// 舆情分发
export function opinionsend(query) {
    return request({
        url: "/opinion/send",
        method: "post",
        traditional: true,
        data: query
    });
}

// 审核 处置
export function opinionapprove(query) {
    return request({
        url: "/opinion/approve",
        method: "post",
        data: query
    });
}

// 催办督办
export function opinionwarn(query) {
    return request({
        url: "/opinion/warn",
        method: "post",
        data: query
    });
}

// 报送领导
export function leaderreport(query) {
    return request({
        url: "/opinion/leader/report",
        method: "post",
        data: query
    });
}

// 领导批示
export function leaderreply(query) {
    return request({
        url: "/opinion/leader/reply",
        method: "post",
        data: query
    });
}

// 部门树查询
export function depttreeselect(query) {
    return request({
        url: "/system/dept/treeselect",
        method: "post",
        data: query
    });
}

// 文件上传
export function fileupload(query) {
    return request({
        url: "/opinion/upload",
        method: "post",
        data: query
    });
}
// 导出报告
export function exportReport(orderId) {
    window.location.href =
        process.env.VUE_APP_BASE_API + "/common/export/" + orderId;
}

// 强制撤销
export function revokeForce(orderId) {
    return request({
        url: "/opinion/revokeforce/" + orderId,
        method: "get"
    });
}

// 待办数量
export function getPendCount(queryType) {
    return request({
        url: "/opinion/pend/count/" + queryType,
        method: "get"
    });
}

// 上报部门树查询
export function reportDeptTree() {
    return request({
        url: '/system/dept/report/tree',
        method: 'get',
    })
}