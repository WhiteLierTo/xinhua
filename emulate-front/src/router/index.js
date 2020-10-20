import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRoutes = [{
    path: '/',
    component: () =>
        import('../views/login/login'),
    name: 'login'

},
{
    path: '/home',
    component: () =>
        import('../views/home/home'),
    name: 'home'

},
// 注册
{
    path: '/register',
    component: () =>
        import('../views/register/register'),
    name: 'register'
},
// 登录
{
    path: '/login',
    component: () =>
        import('../views/login/login'),
    name: 'login'
},
{
    path: '/purpose',
    component: () =>
        import('../views/home/purpose/purpose'),
    name: 'purpose'
},
{
    path: '/methods',
    component: () =>
        import('../views/home/methods/methods'),
    name: 'methods'
},
{
    path: '/tests',
    component: () =>
        import('../views/home/tests/tests'),
    name: 'tests'

},
// 个人中心
{
    path: '/personalCenter',
    component: () =>
        import('../views/home/personalCenter/index'),
    name: 'personalCenter'
},

{
    path: '/introduce',
    component: () =>
        import('../views/home/experiment/introduce'),
    name: 'introduce'
},
{
    path: '/publicOpinion',
    component: () =>
        import('../views/home/experiment/publicOpinion'),
    name: 'publicOpinion'
},
{
    path: '/publicOpinionRep',
    component: () =>
        import('../views/home/experiment/publicOpinionRep'),
    name: 'publicOpinionRep'
},
{
    path: '/publicOpinionTran',
    component: () =>
        import('../views/home/experiment/publicOpinionTran'),
    name: 'publicOpinionTran'
},
//舆情接收
{
    path: '/publicOpinionAccept',
    component: () =>
        import('../views/home/experiment/publicOpinionAccept'),
    name: 'publicOpinionAccept'
},
//舆情接收项目
{
    path: '/publicOpinionAcceptDetail',
    component: () =>
        import('../views/home/experiment/publicOpinionAcceptDetail'),
    name: 'publicOpinionAcceptDetail'
},
//舆情治理
{
    path: '/publicGovern',
    component: () =>
        import('../views/home/experiment/publicGovern'),
    name: 'publicGovern'
},

//完成结果报告-报告管理（老师）
{
    path: '/experimentalReport',
    component: () =>
        import('../views/home/personalCenter/reportManage/experimentalReport'),
    name: 'experimentalReport'
},
//实验报告查看 -报告管理(学生)
{
    path: '/experimentalResultReport',
    component: () =>
        import('../views/home/personalCenter/reportManage/experimentalResultReport'),
    name: 'experimentalResultReport'
},
// 测试题目
{
    path: '/testQuestions',
    component: () =>
        import('../views/home/experiment/testQuestions'),
    name: 'testQuestions'
},


//报告(以下页面)
//舆情上报
{
    path: '/publicOpinionRep',
    component: () =>
        import('../views/home/experiment/publicOpinionRep'),
    name: 'publicOpinionRep'
},
//舆情发生+舆情传播
{
    path: '/publicOpinionTran',
    component: () =>
        import('../views/home/experiment/publicOpinionTran'),
    name: 'publicOpinionTran'
},
//舆情接收
{
    path: '/publicOpinionAccept',
    component: () =>
        import('../views/home/experiment/publicOpinionAccept'),
    name: 'publicOpinionAccept'
},
//舆情接收详情
{
    path: '/publicOpinionAcceptDetail',
    component: () =>
        import('../views/home/experiment/publicOpinionAcceptDetail'),
    name: 'publicOpinionAcceptDetail'
},
//舆情治理
{
    path: '/publicGovern',
    component: () =>
        import('../views/home/experiment/publicGovern'),
    name: 'publicGovern'
},
//不报告（以下页面）
//舆情扩散
{
    path: '/publicSpread',
    component: () =>
        import('../views/home/experiment/publicSpread'),
    name: 'publicSpread'
},
//舆情监测
{
    path: '/publicMonitor',
    component: () =>
        import('../views/home/experiment/publicMonitor'),
    name: 'publicMonitor'
},
//舆情分析
{
    path: '/publicAnalysis',
    component: () =>
        import('../views/home/experiment/publicAnalysis'),
    name: 'publicAnalysis'
},
//舆情消散
{
    path: '/publicDissipate',
    component: () =>
        import('../views/home/experiment/publicDissipate'),
    name: 'publicDissipate'
},
//完成实验报告
{
    path: '/completionResultsReport',
    component: () =>
        import('../views/home/experiment/completionResultsReport'),
    name: 'completionResultsReport'
}
]

export default new Router({
    mode: 'history',
    routes: constantRoutes
})