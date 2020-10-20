import axios from 'axios'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// let baseUrl = "api/";
let baseUrl = "http://boc.jsxhfh.com/admin/"

function login() {
  return axios.get(`${baseUrl}fengniao/doLogin`)
}

//客户舆情信息
function customerInfo() {
  return axios.get(`${baseUrl}fengniao/customer`)
}

//舆情滑话题
function topic() {
  return axios.get(`${baseUrl}fengniao/topic`)
}

// 形象分+情感柱状图+数量走势图
function emotionTrend(searchType) {
  return axios.get(`${baseUrl}fengniao/emotionTrend/${searchType}`)
}

// 舆情展示
function opinionList(searchType, side) {
  return axios.get(`${baseUrl}fengniao/opinionList/${searchType}/${side}`)
}

// 舆论热刺
function hotWord() {
  return axios.get(`${baseUrl}fengniao/wordCloud`)
}

// 媒体分布
function media() {
  return axios.get(`${baseUrl}fengniao/media`)
}

// 舆情地域分布
function areaMap() {
  return axios.get(`${baseUrl}fengniao/map`)
}


//网点口碑排行TOP5
function bankList() {
  return axios.get(`${baseUrl}dianPing/awom/bankList`)
}

//热词
function wordList() {
  return axios.get(`${baseUrl}dianPing/awom/list`)
}

//获取行政区域下 银行+评分+标签 信息
function areaList(isMyself, addName) {
  return axios.post(`${baseUrl}dianPing/bank/list`, {
    isMyself,
    addName
  })
}

//客户信息
function customerList(data) {
  return axios.post(`${baseUrl}vip/list`, data)
}

//股权结构
function stockholder(data) {
  return axios.post(`${baseUrl}vip/stockholder`, data)
}

// 企业变更信息
function changelist(data) {
  return axios.post(`${baseUrl}vip/changelist`, data)
}

export default {
  login,
  emotionTrend,
  opinionList,
  hotWord,
  media,
  areaMap,
  customerInfo,
  topic,
  bankList,
  wordList,
  areaList,
  customerList,
  stockholder,
  changelist
}
