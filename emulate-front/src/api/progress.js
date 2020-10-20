import request from '@/utils/request'

// 老师-报告列表
export function getTeacherReportList(data) {
    return request({
        url: '/process/reportList',
        method: 'post',
        data
    })
}

// 学生-报告列表
export function getStudentReportList(userId) {
    return request({
        url: `/process/myReportList/${userId}`,
        method: 'get',
    })
}
//查看报告
export function getReportInfo(userId) {
    return request({
        url: `/process/myReportInfo/${userId}`,
        method: 'get',
    })
}

//老师评分
export function scoring(data) {
    return request({
        url: '/process/scoring',
        method: 'post',
        data
    })
}
//学生填写报告-获取已完成步骤
export function processCompleted(userId) {
    return request({
        url: `/process/over/list/${userId}`,
        method: 'get',
    })
}

//学生填写报告-填写讨论和分析
export function subReport(data) {
    return request({
        url: '/process/subReport',
        method: 'post',
        data
    })
}
//上报流程/process/subProcess
export function subProcess(data) {
    return request({
        url: '/process/subProcess',
        method: 'post',
        data
    })
}
//是否已完成实验
export function finishedExperiment(userId) {
    return request({
        url: `/process/isFinished/${userId}`,
        method: 'get',
    })
}
// 批量删除
export function batchDel(data) {
    return request({
        url: '/process/batchDel',
        method: 'post',
        data
    })
}
