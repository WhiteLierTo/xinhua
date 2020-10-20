import Vue from 'vue'
import App from './App'
import httpApi from './common/httpApi'
import HttpRequest from './common/httpRequest'
import HttpCache from './common/cache'
import store from './store'
import permit from './common/permission.js'
import toast from './common/toast.js'
import MescrollBody from "./components/mescroll-uni/mescroll-body.vue"
Vue.component('mescroll-body', MescrollBody)

Vue.config.productionTip = false
Vue.prototype.$api = httpApi
Vue.prototype.$Request = HttpRequest
Vue.prototype.$Sysconf = HttpRequest.config
Vue.prototype.$SysCache = HttpCache
Vue.prototype.$store = store
Vue.prototype.$toast = toast
Vue.prototype.$permit = permit

App.mpType = 'app'

// 获取时间
Vue.prototype.getDate=function(type) {
            const date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();

            if (type === 'start') {
                year = year - 60;
            } else if (type === 'end') {
                year = year + 2;
            }
            month = month > 9 ? month : '0' + month;;
            day = day > 9 ? day : '0' + day;
            return `${year}-${month}-${day}`;
        }

const app = new Vue({
    ...App
})
app.$mount()
