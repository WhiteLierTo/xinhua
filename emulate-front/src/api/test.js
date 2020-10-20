import request from '@/utils/request'

// 实验预习与测试
export function getPracticeList() {
    const data = {}
    return request({
        url: '/library/practice/list',
        method: 'get',
        params: data
    })
}
// 流程习题
export function getProcessList(userId, process) {
    return request({
        url: `/library/process/list/${userId}/${process}`,
        method: 'get',
    })
}
//实习测试提交
export function subPractice(userId) {
    return request({
        url: `/library/subPractice/${userId}`,
        method: 'get',
    })
}
//流程测试提交
export function subProcess(userId, libraryList) {
    const data = {
        userId,
        libraryList
    }
    return request({
        url: '/library/subProcess',
        method: 'post',
        data
    })
}
// 查看流程已做过的流程习题
export function getFinishList(userId, process) {
    return request({
        url: `/library/process/finishList/${userId}/${process}`,
        method: 'get',
    })
}
