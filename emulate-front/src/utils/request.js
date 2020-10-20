import axios from 'axios'
import { Notification, MessageBox, Message } from 'element-ui'
import store from '@/store'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 创建axios实例
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: 'http://ngd.jsxhfh.com/admin/ngd',
    // 超时
    timeout: 10000
})
// request拦截器
service.interceptors.request.use(
    config => {
        // if (getToken()) {
        //     config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
        // }
        return config
    },
    error => {
        console.log(error)
        Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(res => {
    const code = res.data.code
    if (code !== 200) {
        /*Notification.error({
            title: res.data.msg
        })*/
        return Promise.reject(res.data.msg)
    } else {
        return res.data
    }
},
    error => {
        /* Message({
             message: error.message,
             type: 'error',
             duration: 5 * 1000
         })*/
        return Promise.reject(error)
    }
)

export default service
