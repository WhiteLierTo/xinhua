import Vue from 'vue'

import App from './App.vue'
import store from './store'
import router from './router/index'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './permission' // permission control
import 'lib-flexible/flexible.js'
import echarts from 'echarts'
import 'echarts-liquidfill'

Vue.use(Element)

Vue.config.productionTip = false

Vue.prototype.$echarts = echarts;

// 划分数组
Vue.prototype.$group = function (array, subGroupLength) {
    let index = 0;
    let newArray = [];
    while (index < array.length) {
        newArray.push(array.slice(index, index += subGroupLength));
    }
    return newArray;
}

// 定义流程
window.Vue = new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
})
