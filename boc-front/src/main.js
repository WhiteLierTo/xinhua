import Vue from 'vue'

import App from './App.vue'
import store from './store'
import router from './router/index'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'
import 'echarts-liquidfill'

Vue.use(Element)

Vue.config.productionTip = false

Vue.prototype.$echarts = echarts;

import base from "./common/baseWithTitle";

function componentsRegister(Vue) {
  Vue.component("BaseWidthTitle", base);
}

Vue.use(componentsRegister);

import $ajax from "./api/index";

Vue.prototype.$ajax = $ajax;

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
})
