import axios from 'axios'
import Vue from "../main"
import setting from "../setting"


axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';

const service = axios.create();

service.defaults.baseURL = setting.baseUrl;

// request拦截器
service.interceptors.request.use(
    config => {
      if (Vue && Vue.$utils && Vue.$utils.cookie.get()) {
        config.headers['Authorization'] = 'Bearer ' + Vue.$utils.cookie.get()
      }
      return config
    },
    error => {
      console.log("err", error);
      Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(res => {
      const code = res.status;

      if (code === 401) {
        Vue.$message.error("401错误");
        return Promise.reject('error')

      } else if (code !== 200) {
        Vue.$message.error("非401错误");
        return Promise.reject('error')
      } else if (res.data.code === 401) {
        // 无权限
        if (Vue.$route.path !== '/login') {
          Vue.$router.push("/login");
        }
      } else if (res.data.code === 403) {
        Vue.$message.error("您没有权限")
      } else {
        return res.data
      }
    },
    error => {
      console.error(`请求错误:${error}`);
      return Promise.reject(error)
    }
);

export default service
